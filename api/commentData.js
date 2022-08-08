import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createComment = (commentObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/comments.json`, commentObj)
    .then((response) => {
      const payload = { commentFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/comments/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
});

const getVideoComments = (videoFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/comments.json?orderBy="videoFirebaseKey"&equalTo="${videoFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const updateComment = (commentObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/comments/${commentObj.commentfirebaseKey}.json`, commentObj)
    .then(() => {
      getVideoComments(commentObj.videoFirebaseKey).then(resolve);
    })
    .catch(reject);
});

const deleteComment = (commentfirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/comments/${commentfirebaseKey}.json`)
    .then(() => {
      getVideoComments().then((commentsArray) => resolve(commentsArray));
    })
    .catch((error) => reject(error));
});

export {
  getVideoComments, updateComment, deleteComment, createComment,
};
