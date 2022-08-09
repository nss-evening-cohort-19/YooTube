/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { getUserHistory } from '../api/mergedData';
import VideoCard from '../components/videoCard';
import { useAuth } from '../utils/context/authContext';

function library() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  const getLibraryData = () => {
    getUserHistory(user.uid).then(setHistory);
  };

  useEffect(() => {
    getLibraryData();
  }, [history]);

  return (
    <div>
      <h5>History</h5>
      <div className="historyDiv">
        { history?.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} opts={{ height: '160', width: '280' }} />
        ))}
      </div>
      <h5>Watch Later</h5>
    </div>
  );
}

export default library;
