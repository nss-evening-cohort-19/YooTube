/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function ViewVideo() {
  // const [video, setVideo] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getTheVideo = () => {
    // getSingleVideo(firebaseKey).then(setVideo);
  };

  useEffect(() => {
    getTheVideo();
  }, []);

  return (
    <h1>{firebaseKey}</h1>
  );
}
export default ViewVideo;
