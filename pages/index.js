/* eslint-disable react-hooks/exhaustive-deps */
// import Link from 'next/link';
import { Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import { getPublicVideos, getPublicVideosbyCategory } from '../api/videoData';
import VideoCard from '../components/videoCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [videos, setVideos] = useState();
  // const [label, setLabel] = useState();

  const getAllPublicVideos = () => {
    getPublicVideos().then((theVideos) => {
      setVideos(theVideos);
    });
  };

  const handleClick = (event) => {
    const val = event.target.innerHTML;
    if (val === 'all') {
      getPublicVideos().then((theVideos) => {
        setVideos(theVideos);
      });
    } else {
      getPublicVideosbyCategory(val).then((result) => {
        setVideos(result);
      });
    }
  };

  useEffect(() => {
    getAllPublicVideos();
  }, []);

  return (
    <>
      <div>
        <Stack direction="row" spacing={1}>
          <Chip label="comedy" value="comedy" variant="outlined" onClick={handleClick} />
          <Chip label="education" value="education" variant="outlined" onClick={handleClick} />
          <Chip label="entertainment" value="entertainment" variant="outlined" onClick={handleClick} />
          <Chip label="food" value="food" variant="outlined" onClick={handleClick} />
          <Chip label="movies" value="movies" variant="outlined" onClick={handleClick} />
          <Chip label="music" value="music" variant="outlined" onClick={handleClick} />
          <Chip label="sports" value="sports" variant="outlined" onClick={handleClick} />
          <Chip label="television" value="television" variant="outlined" onClick={handleClick} />
          <Chip label="travel" value="travel" variant="outlined" onClick={handleClick} />
          <Chip label="all" variant="outlined" onClick={handleClick} />
        </Stack>
      </div>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {videos?.map((video) => (
            <VideoCard key={video.videoFirebaseKey} obj={video} user={user} opts={{ height: '160', width: '280' }} onUpdate={getAllPublicVideos} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
