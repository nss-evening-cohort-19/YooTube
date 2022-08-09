/* eslint-disable react-hooks/exhaustive-deps */
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUsersLikedVideos } from '../api/mergedData';
// import { Button } from 'react-bootstrap';
import VideoCard from '../components/videoCard';
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
    <div className="text-center my-4">
      {user.uid ? (
        <div className="d-flex flex-wrap">
          {videos?.map((video) => (
            <VideoCard key={video.videoFirebaseKey} obj={video} user={user} opts={{ height: '160', width: '280' }} onUpdate={getLikedVideos} />
          ))}
        </div>
      ) : (
        <div>
          <h1>Sign in to see Liked Videos</h1>
        </div>
      )}

    </div>
  );
}

export default Home;
