/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { getUserHistory, getUserWatchLater } from '../api/mergedData';
import VideoCard from '../components/videoCard';
import { useAuth } from '../utils/context/authContext';

function library() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  const getLibraryData = () => {
    getUserHistory(user.uid).then(setHistory);
    getUserWatchLater(user.uid).then(setWatchLater);
  };

  useEffect(() => {
    getLibraryData();
  }, []);

  return (
    <div>
      <h5>History</h5>
      <div className="libraryVideoDivs">
        { history?.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} onUpdate={getLibraryData} name="history" opts={{ height: '160', width: '280' }} />
        ))}
      </div>
      <h5>Watch Later</h5>
      <div className="libraryVideoDivs">
        { watchLater?.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} onUpdate={getLibraryData} name="watch-later" opts={{ height: '160', width: '280' }} />
        ))}
      </div>
    </div>
  );
}

export default library;
