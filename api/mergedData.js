/* eslint-disable import/prefer-default-export */
import { getVideoComments, deleteComment } from './commentData';
import { deleteSingleVideo, getPublicVideos, getSingleVideo } from './videoData';
import { getLikesByUser, getVideoLikes } from './likeData';

const getVideoAndComments = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleVideo(firebaseKey).then((videoObj) => {
    getVideoComments(firebaseKey).then((videoCommentsArr) => {
      resolve({ ...videoObj, comments: videoCommentsArr });
    });
  }).catch(reject);
});

const getUsersLikedVideos = async (uid) => {
  const userLikes = await getLikesByUser(uid);
  const likedVideos = userLikes.map((like) => like.videoFirebaseKey);
  const videoObjects = await likedVideos.map((firebaseKey) => getSingleVideo(firebaseKey));
  const videoObjectArray = await Promise.all(videoObjects);
  return videoObjectArray;
};

const deleteVideoComments = (videoFirebaseKey) => new Promise((resolve, reject) => {
  getVideoComments(videoFirebaseKey).then((commentsArray) => {
    console.warn(commentsArray);
    const deleteCommentPromises = commentsArray.map((comment) => deleteComment(comment.commentFirebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleVideo(videoFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

const getAllPublicVideosAndLikes = async () => {
  const allPublicVideos = await getPublicVideos();
  const allPublicVideoLikes = allPublicVideos.map((video) => getVideoLikes(video.videoFirebaseKey));
  const allPublicVideoLikesArray = await Promise.all(allPublicVideoLikes);
  const videosWithLikes = allPublicVideoLikesArray.filter((video) => video.length);
  const sortedVideosWithLikes = videosWithLikes.sort((a, b) => b.length - a.length);
  const sortedVideoIdsWithLikes = sortedVideosWithLikes.map((video) => video[0].videoFirebaseKey);
  const mostLikedVideos = allPublicVideos.filter((video) => sortedVideoIdsWithLikes.includes(video.videoFirebaseKey));
  return mostLikedVideos;
};

export {
  getVideoAndComments, getUsersLikedVideos, deleteVideoComments, getAllPublicVideosAndLikes,
};
