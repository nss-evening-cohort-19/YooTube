/* eslint-disable import/prefer-default-export */
import { getVideoComments } from './commentData';
import { getLikesByUser } from './likeData';
import { getSingleVideo } from './videoData';

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

export { getVideoAndComments, getUsersLikedVideos };
