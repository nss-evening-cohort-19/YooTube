/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { getUserHistory } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

function library() {
  const { user } = useAuth();
  getUserHistory(user.uid).then((userData) => {
    console.warn(userData);
  });

  return (
    <div>library</div>
  );
}

export default library;
