import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleVideo } from '../../../api/videoData';
import VideoForm from '../../../components/forms/VideoForm';

export default function EditPlayer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { videoFirebaseKey } = router.query;

  useEffect(() => {
    getSingleVideo(videoFirebaseKey).then(setEditItem);
  }, [videoFirebaseKey]);

  return (<VideoForm obj={editItem} />);
}
