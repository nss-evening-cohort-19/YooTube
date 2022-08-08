import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserHistory = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${uid}.json`)
    .then((reponse) => resolve(reponse.data.history))
    .catch((reject));
});

// eslint-disable-next-line import/prefer-default-export
export { getUserHistory };
