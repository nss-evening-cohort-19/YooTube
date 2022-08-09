/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { getAllPublicVideosAndLikes } from '../api/mergedData';
import { getPublicVideos } from '../api/videoData';
import VideoCard from '../components/videoCard';
import { useAuth } from '../utils/context/authContext';

function Explore() {
  const { user } = useAuth();
  const [allPublicVideosAndLikesArray, setAllPublicVideosAndLikesArray] = useState([]);
  const [publicVideos, setPublicVideos] = useState([]);
  const [mostLikedVideos, setMostLikedVideos] = useState([]);

  const getMostLikedVideos = () => {
    getAllPublicVideosAndLikes().then((response) => {
      setAllPublicVideosAndLikesArray(response);
    });
    getPublicVideos().then((video) => {
      setPublicVideos(video);
    });
    const sortedAllPublicVideosAndLikesArray = allPublicVideosAndLikesArray.sort((a, b) => b.length - a.length);
    const videosWithLikes = sortedAllPublicVideosAndLikesArray.filter((video) => video.length);
    const mostLikedVideoIds = videosWithLikes.map((video) => video[0].videoFirebaseKey);
    setMostLikedVideos(publicVideos.filter((video) => mostLikedVideoIds.includes(video.videoFirebaseKey)));
  };

  useEffect(() => {
    getMostLikedVideos();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {mostLikedVideos?.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} user={user} opts={{ height: '160', width: '280' }} onUpdate={getMostLikedVideos} />
        ))}
      </div>
    </div>
  );
}

export default Explore;
