/* eslint-disable import/prefer-default-export */
import { getVideoComments } from './commentData';
import { getSingleVideo } from './videoData';

const getVideoAndComments = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleVideo(firebaseKey).then((videoObj) => {
    getVideoComments(firebaseKey).then((videoCommentsArr) => {
      resolve({ ...videoObj, comments: videoCommentsArr });
    });
  }).catch(reject);
});

export { getVideoAndComments };
