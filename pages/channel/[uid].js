import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import VideoCard from '../../components/videoCard';
import { getUserVideos } from '../../api/videoData';

function UserVideos() {
  const [videos, setVideos] = useState([]);
  const router = useRouter();

  const getChannelVideos = () => {
    getUserVideos(videos.uid).then(setVideos);
    console.warn(videos);
  };

  useEffect(() => {
    getChannelVideos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div className="userChannel">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>name here</Card.Title>
          </Card.Body>
        </Card>
      </div>
      <h2>User Videos</h2>
      <div className="d-flex flex-wrap">
        {videos?.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} opts={{ height: '160', width: '280' }} onUpdate={getChannelVideos} router={router.asPath} />
        ))}
      </div>

    </div>
  );
}

export default UserVideos;
