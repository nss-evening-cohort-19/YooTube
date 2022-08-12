/* eslint-disable react-hooks/exhaustive-deps */
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getUsersLikedVideos } from '../api/mergedData';
import LikedVideoCard from '../components/likedVideoCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [videos, setVideos] = useState();

  const getLikedVideos = () => {
    getUsersLikedVideos(user.uid).then(setVideos);
  };

  useEffect(() => {
    getLikedVideos();
  }, []);

  return (
    <div className="likedVideosPage">
      <div className="userLikedDiv">
        <h4>Liked Videos</h4>
        <Image className="likedUserImage" src={user.photoURL} />
        <h5>{user.displayName}</h5>
      </div>
      <div className="likedVideosDiv">
        {user.uid ? (
          <div className="d-flex flex-wrap">
            {videos?.map((video) => (
              <LikedVideoCard obj={video} opts={{ height: '130', width: '220' }} />
            ))}
          </div>
        ) : (
          <div>
            <h1>Sign in to see Liked Videos</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
