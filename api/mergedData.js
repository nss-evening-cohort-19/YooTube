/* eslint-disable import/prefer-default-export */
import { deleteComment, getVideoComments } from './commentData';
import { getUser, updateUser } from './userData';
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
    const userHistory = userObj.history;
    if (userObj.history === undefined) {
      const updatedUser = { ...userObj, history: [videoFirebaseKey] };
      updateUser(uid, updatedUser).then(resolve);
    } else if (userHistory?.includes(videoFirebaseKey)) {
      userHistory.splice(userHistory.indexOf(videoFirebaseKey), 1).unshift(videoFirebaseKey);
      const update = [videoFirebaseKey, ...userHistory];
      const updatedUser = { ...userObj, history: update };
      updateUser(uid, updatedUser).then(resolve);
    } else {
      const update = [videoFirebaseKey, ...userHistory];
      const updatedUser = { ...userObj, history: update };
      updateUser(uid, updatedUser).then(resolve);
    }
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

export {
  getVideoAndComments, addToUserHistory, getUsersLikedVideos, deleteVideoComments,
};
