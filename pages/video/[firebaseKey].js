/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import { Card, Button, Image } from 'react-bootstrap';
import { getVideoAndComments } from '../../api/mergedData';
import CommentCard from '../../components/CommentCard';
import CommentForm from '../../components/forms/CommentForm';

function ViewVideo() {
  const [video, setVideo] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getTheVideo = () => {
    getVideoAndComments(firebaseKey).then(setVideo);
    console.warn(video);
  };

  useEffect(() => {
    getTheVideo();
  }, [video]);

  return (
    <div className="">
      <div className="viewVideoDiv">
        <Card className="viewVideCard" style={{ width: '75%' }}>
          <YouTube opts={{ height: '390', width: '640' }} videoId={video.videoId} />
          <Card.Body className="videoBody">
            <div className="videoTextdiv">
              <Card.Title className="vidTitle">{video.title}</Card.Title>
              <Card.Text className="videoDescription">{video.description}</Card.Text>
              <Image className="vidCardCreatorImage" src={video.creatorImage} />
              <Card.Text className="vidCreatorName">{video.creatorName}</Card.Text>
              <Card.Text className="vidDate">{video.date}</Card.Text>
            </div>
            <div className="vidButtonDiv">
              <Button>👍</Button>
              <Card.Text className="vidLikes">Likes: {video.likes}</Card.Text>
              <Button>👎</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="addComment">
        <CommentForm videoFirebaseKey={video.videoFirebaseKey} />
      </div>
      <div className="commentsDiv">
        {
        video.comments?.map((comment) => (
          <CommentCard commentObj={comment} key={comment.commentfirebaseKey} />
        ))
        }
      </div>
    </div>
  );
}
export default ViewVideo;
