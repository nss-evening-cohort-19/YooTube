import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getVideos } from '../api/videoData';
import VideoCard from '../components/videoCard';
import logo from '../components/images/studio.jpg';
import ProfileCard from '../components/ProfileCard';

function YourVideos() {
  const [videos, setVideos] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getYourVideos = () => {
    getVideos(user.uid).then(setVideos);
  };

  useEffect(() => {
    getYourVideos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div className="studio">
        <Image src={logo} alt="Yootube Studio" />
        <ProfileCard />
      </div>
      <h2>My Videos</h2>
      <div className="d-flex flex-wrap">
        {videos?.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} opts={{ height: '160', width: '280' }} onUpdate={getYourVideos} router={router.asPath} />
        ))}
      </div>

    </div>
  );
}

export default YourVideos;
