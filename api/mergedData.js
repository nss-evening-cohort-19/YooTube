/* eslint-disable import/prefer-default-export */
import { getVideoComments } from './commentData';
import { getUser, updateUser } from './userData';
import { getSingleVideo } from './videoData';
import { getVideoComments, deleteComment } from './commentData';
import { deleteSingleVideo, getSingleVideo } from './videoData';
import { getLikesByUser } from './likeData';

const getVideoAndComments = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleVideo(firebaseKey).then((videoObj) => {
    getVideoComments(firebaseKey).then((videoCommentsArr) => {
      resolve({ ...videoObj, comments: videoCommentsArr });
    });
  }).catch(reject);
});

const addToUserHistory = (uid, videoFirebaseKey) => new Promise((resolve, reject) => {
  getUser(uid).then((userObj) => {
    console.warn(userObj);
    // eslint-disable-next-line prefer-destructuring
    const history = userObj.history;
    const update = [videoFirebaseKey, ...history];
    const updatedUser = { ...userObj, history: update };
    updateUser(uid, updatedUser).then(resolve);
  }).catch(reject);
});

export { getVideoAndComments, addToUserHistory };
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

export { getVideoAndComments, getUsersLikedVideos, deleteVideoComments, addToUserHistory };
