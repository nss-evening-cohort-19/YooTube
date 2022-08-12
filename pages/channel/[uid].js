import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import VideoCard from '../../components/videoCard';
import { getUser } from '../../api/userData';
import { getUserVideos } from '../../api/videoData';

function UserVideos() {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState({});
  const router = useRouter();

  const getThisUser = () => {
    getUser(user.uid).then(setUser);
    console.warn(user);
  };

  const getTheseVideos = () => {
    getUserVideos(user.uid).then(setVideos);
  };

  useEffect(() => {
    getThisUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTheseVideos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div className="userChannel">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{user.displayName}</Card.Title>
          </Card.Body>
        </Card>
      </div>
      <h2>User Videos</h2>
      <div className="d-flex flex-wrap">
        {videos?.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} opts={{ height: '160', width: '280' }} onUpdate={getTheseVideos} router={router.asPath} />
        ))}
      </div>

    </div>
  );
}

export default UserVideos;
