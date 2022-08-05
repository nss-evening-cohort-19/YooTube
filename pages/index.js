/* eslint-disable react-hooks/exhaustive-deps */
// import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import { getPublicVideos } from '../api/videoData';
import VideoCard from '../components/VideoCard';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  // const { user } = useAuth();
  const [videos, setVideos] = useState();

  const getAllPublicVideos = () => {
    getPublicVideos().then((theVideos) => {
      setVideos(theVideos);
    });
  };

  useEffect(() => {
    getAllPublicVideos();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {videos?.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} opts={{ height: '160', width: '280' }} onUpdate={getAllPublicVideos} />
        ))}
      </div>

    </div>
  );
}

export default Home;
