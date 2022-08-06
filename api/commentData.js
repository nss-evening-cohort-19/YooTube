import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

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

const deleteComment = (commentfirebaseKey, videoFirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/comments/${commentfirebaseKey}.json`)
    .then(() => {
      getVideoComments(videoFirebaseKey).then(resolve);
    })
    .catch(reject);
});

export { getVideoComments, updateComment, deleteComment };
