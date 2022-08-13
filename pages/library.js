/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
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

  const playTheVideo = (e) => {
    console.warn(e);
    e.target.playVideo();
    e.target.seekTo(27.5);
  };

  return (
    <div>
      <h3 className="libraryHeaders">History</h3>
      <div className="mainVideos">
        { history.length ? (history?.map((video) => (
          <VideoCard key={video?.videoFirebaseKey} obj={video} onUpdate={getLibraryData} name="history" opts={{ height: '160', width: '280' }} />
        ))
        ) : (
          <h6 className="libraryDefault">Watch some videos to make History !</h6>
        )}
      </div>
      <h3 className="libraryHeaders">Watch Later</h3>
      <div className="mainVideos">
        { watchLater.length ? (watchLater?.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} onUpdate={getLibraryData} name="watch-later" opts={{ height: '160', width: '280' }} />
        ))
        ) : (
          <div className="watchLaterDefault">
            <h6 className="libraryDefault">This space is like your <strong>BACK POCKET</strong>.  Put videos here for later.</h6>
            <YouTube className="libraryDefault" opts={{ height: '390', width: '640' }} onReady={playTheVideo} videoId="yG96RttfZtM" />
          </div>
        )}
      </div>
    </div>
  );
}

export default library;
