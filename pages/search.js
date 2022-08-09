import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPublicVideos } from '../api/videoData';
import VideoCard from '../components/videoCard';

export default function SearchPage() {
  const router = useRouter();
  // const [videos, setVideos] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // const getFilteredVideos = () => {

  //   console.warn(videos);

  //   console.warn(results);

  //   console.warn(filteredData);
  // };

  const getVideos = () => {
    getPublicVideos().then((videoArr) => {
      const value = router.query.keyword;
      setFilteredData(videoArr);
      const results = videoArr.filter((video) => video.title.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(results);
    });
  };

  useEffect(() => {
    getVideos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Search Results</h1>
      <h2>You searched for...{router.query.keyword}</h2>
      <div>
        {filteredData.length ? filteredData.map((video) => (
          <VideoCard key={video.videoFirebaseKey} obj={video} opts={{ height: '160', width: '280' }} onUpdate={getVideos} />
        )) : <h2>No Results Found.</h2>}
      </div>
    </>
  );
}
