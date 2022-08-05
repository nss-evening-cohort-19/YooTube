import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPublicVideos = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/videos.json?orderBy="isPublic"&equalTo=true`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleVideo = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/videos/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createVideo = (videoObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/videos.json`, videoObj)
    .then((response) => {
      const payload = { videoFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/videos/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
});

const getVideos = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/videos.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const updateVideo = (videoObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/videos/${videoObject.firebaseKey}.json`, videoObject)
    .then(() => {
      getVideos(videoObject.uid).then(resolve);
    })
    .catch(reject);
});

const deleteSingleVideo = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/videos/${firebaseKey}.json`)
    .then(() => {
      getVideos(firebaseKey).then((videosArray) => resolve(videosArray));
    })
    .catch((error) => reject(error));
});

export {
  createVideo, updateVideo, getVideos, getSingleVideo, getPublicVideos, deleteSingleVideo,
};
