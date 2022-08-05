import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllComments = (videoFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/comments.json?orderBy="videoFirebaseKey"&equalTo="${videoFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export { getAllComments };
