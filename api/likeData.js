import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createLike = (likeObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/likes.json`, likeObj)
    .then((response) => {
      const payload = { likeFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/likes/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
});

const getSingleLike = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/likes/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getLikesByUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/likes.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getVideoLikes = (videoFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/likes.json?orderBy="videoFirebaseKey"&equalTo="${videoFirebaseKey}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteSingleLike = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/likes/${firebaseKey}.json`)
    .then(resolve)
    .catch((error) => reject(error));
});

export {
  getVideoLikes, createLike, getSingleLike, deleteSingleLike, getLikesByUser,
};
