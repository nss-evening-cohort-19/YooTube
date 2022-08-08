import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((reponse) => resolve(reponse.data))
    .catch((reject));
});

const getUserHistory = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((reponse) => resolve(reponse.data.history))
    .catch((reject));
});

const updateUser = (uid, userUpdate) => new Promise((resolve, reject) => {
  getUser(uid).then((userObj) => {
    axios.patch(`${dbUrl}/users/${userObj.userFirebaseKey}.json`, userUpdate)
      .then(resolve);
  }).catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getUserHistory, updateUser, getUser };
