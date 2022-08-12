/* eslint-disable react-hooks/exhaustive-deps */
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { getUsersLikedVideos } from '../api/mergedData';
import LikedVideoCard from '../components/likedVideoCard';
import { useAuth } from '../utils/context/authContext';

function LikedVideos() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);

  const getLikedVideos = () => {
    getUsersLikedVideos(user.uid).then(setVideos);
  };

  useEffect(() => {
    getLikedVideos();
  }, []);

  return (
    <div className="likedVideosPage">
      <div className="userLikedDiv">
        <h4 className="likedHeader">Liked Videos</h4>
        <YouTube className="likedPlayer" opts={{ height: '180', width: '330' }} videoId={videos[0]?.videoId} />
        <Image className="likedUserImage" src={user.photoURL} />
        <h5 className="likedUserName">{user.displayName}</h5>
        <span>| {videos.length} Videos</span>
      </div>
      <div className="likedVideosDiv">
        {user.uid ? (
          <>
            {videos?.map((video) => (
              <LikedVideoCard obj={video} opts={{ height: '95', width: '175' }} />
            ))}
          </>
        ) : (
          <div>
            <h1>Sign in to see Liked Videos</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default LikedVideos;
