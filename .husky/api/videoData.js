import axios from 'axios';
import { clientCredentials } from '../../utils/client';

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
})

export default getPublicVideos
