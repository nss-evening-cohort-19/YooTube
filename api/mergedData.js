/* eslint-disable import/prefer-default-export */
import { getVideoComments } from './commentData';
import { getUser, updateUser } from './userData';
import { getSingleVideo } from './videoData';

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
