/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { getAllPublicVideosAndLikes } from '../api/mergedData';
import VideoCard from '../components/videoCard';
import { useAuth } from '../utils/context/authContext';

function Explore() {
  const { user } = useAuth();
  const [videosWithLikes, setVideosWithLikes] = useState([]);

  const getMostLikedVideos = () => {
    getAllPublicVideosAndLikes().then((videos) => {
      setVideosWithLikes(videos);
    });
  };

  useEffect(() => {
    getMostLikedVideos();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>Most Liked Videos</h1>
      <div className="d-flex flex-wrap">
        {videosWithLikes?.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} user={user} opts={{ height: '160', width: '280' }} onUpdate={getMostLikedVideos} />
        ))}
      </div>
    </div>
  );
}

export default Explore;
