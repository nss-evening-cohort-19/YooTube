/* eslint-disable import/prefer-default-export */
import { deleteComment, getVideoComments } from './commentData';
import { getUser, updateUser } from './userData';
import {
  deleteSingleVideo, getPublicVideos, getSingleVideo, updateVideo,
} from './videoData';
import { getLikesByUser, getVideoLikes } from './likeData';

const getVideoAndComments = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleVideo(firebaseKey).then((videoObj) => {
    getVideoComments(firebaseKey).then((videoCommentsArr) => {
      resolve({ ...videoObj, comments: videoCommentsArr });
    });
  }).catch(reject);
});

const getUserHistory = (uid) => new Promise((resolve, reject) => {
  getUser(uid).then((userObj) => {
    if (userObj.history) {
      const getHistoryVideos = userObj.history.map((firebaseKey) => getSingleVideo(firebaseKey));
      Promise.all(getHistoryVideos).then(resolve);
    } else {
      resolve([]);
    }
  }).catch(reject);
});

const getUserWatchLater = (uid) => new Promise((resolve, reject) => {
  getUser(uid).then((userObj) => {
    if (userObj.watchLater) {
      const getWatchLaterVideos = userObj.watchLater.map((firebaseKey) => getSingleVideo(firebaseKey));
      Promise.all(getWatchLaterVideos).then(resolve);
    } else {
      resolve([]);
    }
  }).catch(reject);
});

const addToUserHistory = (uid, videoFirebaseKey) => new Promise((resolve, reject) => {
  getSingleVideo(videoFirebaseKey).then((video) => {
    const payload = { views: video.views + 1 };
    updateVideo(payload, videoFirebaseKey).then(resolve);
  });
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

const addToUserWatchLater = (uid, videoFirebaseKey) => new Promise((resolve, reject) => {
  getUser(uid).then((userObj) => {
    const userWatchLater = userObj.watchLater;
    if (userWatchLater === undefined) {
      const updatedUser = { ...userObj, watchLater: [videoFirebaseKey] };
      updateUser(uid, updatedUser).then(resolve);
    } else if (!userWatchLater?.includes(videoFirebaseKey)) {
      const update = [videoFirebaseKey, ...userWatchLater];
      const updatedUser = { ...userObj, watchLater: update };
      updateUser(uid, updatedUser).then(resolve);
    }
  }).catch(reject);
});

const deleteUserHistory = (uid, videoFirebaseKey) => new Promise((resolve, reject) => {
  getUser(uid).then((userObj) => {
    const { history } = userObj;
    history.splice(history.indexOf(videoFirebaseKey), 1);
    updateUser(uid, userObj)
      .then(resolve);
  }).catch(reject);
});

const deleteWatchLater = (uid, videoFirebaseKey) => new Promise((resolve, reject) => {
  getUser(uid).then((userObj) => {
    const { watchLater } = userObj;
    watchLater.splice(watchLater.indexOf(videoFirebaseKey), 1);
    updateUser(uid, userObj)
      .then(resolve);
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
  getVideoAndComments, getUsersLikedVideos, deleteVideoComments, getAllPublicVideosAndLikes, getUserHistory, addToUserHistory, addToUserWatchLater, getUserWatchLater, deleteUserHistory, deleteWatchLater,
};
