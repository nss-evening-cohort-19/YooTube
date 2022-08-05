/* eslint-disable react-hooks/exhaustive-deps */
// import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import getPublicVideos from '../.husky/api/videoData';
import VideoCard from '../components/videoCard';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  // const { user } = useAuth();
  const [videos, setVideos] = useState();

  const getAllPublicVideos = () => {
    getPublicVideos().then((theVideos) => {
      console.warn(theVideos);
      setVideos(theVideos);
      console.warn(videos);
    });
  };

  useEffect(() => {
    getAllPublicVideos();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {videos?.map((video) => (
          <VideoCard key={video.firebaseKey} obj={video} opts={{ height: '160', width: '280' }} onUpdate={getAllPublicVideos} />
        ))}
      </div>

    </div>
  );
}

export default Home;
