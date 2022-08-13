import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getUserVideos } from '../api/videoData';
import VideoCard from '../components/videoCard';
import logo from '../components/images/studio.jpg';
import ProfileCard from '../components/ProfileCard';

function YourVideos() {
  const [videos, setVideos] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getYourVideos = () => {
    getUserVideos(user.uid).then(setVideos);
  };

  useEffect(() => {
    getYourVideos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      {user.uid ? (
        <div className="YootubeStudioLargeLogo-wrapper studio">
          <div className="myVideosLogoTitleDiv">
            <div>
              <h2 className="myVideosh2">My Videos</h2>
            </div>
            <div>
              <Image src={logo} alt="Yootube Studio" width={150} height={150} />
            </div>
            <ProfileCard className="profileCardYourVideos" />
          </div>
          {/* <div></div> */}
          <div className="myVideosDiv">
            {videos?.map((video) => (
              <VideoCard key={video.videoFirebaseKey} obj={video} opts={{ height: '160', width: '280' }} onUpdate={getYourVideos} router={router.asPath} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1>Sign in to see Your Videos</h1>
        </div>
      )}
    </div>
  );
}

export default YourVideos;
