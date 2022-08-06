/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import { Card, Button, Image } from 'react-bootstrap';
import { getSingleVideo } from '../../api/videoData';
// import CommentCard from '../../components/CommentCard';

function ViewVideo() {
  const [video, setVideo] = useState({});
  // const [comments, setComments] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getTheVideo = () => {
    getSingleVideo(firebaseKey).then(setVideo);
  };
  // const getTheComments = () => {
  //   getComments().then(setComments);
  // };

  useEffect(() => {
    getTheVideo();
    // getTheComments();
  }, [video]);

  return (
    <div className="">
      <div className="viewVideoDiv">
        <Card className="viewVideCard" style={{ width: '75%' }}>
          <YouTube opts={{ height: '390', width: '640' }} videoId={video.videoId} />
          <Card.Body>
            <div className="videoTextdiv">
              <Image className="vidCardCreatorImage" src={video.creatorImage} />
              <Card.Title className="vidTitle">{video.title}</Card.Title>
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
      <div className="commentsDiv">
        {/* {
        comments.map((comment) => (
          <CommentCard commentObj={comment} key={comment.commentfirebaseKey} />
        ))
        }; */}
      </div>
    </div>

  );
}
export default ViewVideo;
