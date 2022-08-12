/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import { Card, Image } from 'react-bootstrap';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import IconButton from '@mui/material/IconButton';
import { addToUserHistory, getVideoAndComments } from '../../api/mergedData';
import CommentCard from '../../components/CommentCard';
import { useAuth } from '../../utils/context/authContext';
import { createLike, deleteSingleLike, getVideoLikes } from '../../api/likeData';
import CommentForm from '../../components/forms/CommentForm';
import { getPublicVideosbyCategory } from '../../api/videoData';
import VideoCard from '../../components/videoCard';

function ViewVideo() {
  const [video, setVideo] = useState({});
  const [related, setRelated] = useState([]);
  const [likes, setLikes] = useState([]);
  const [commentToUpdate, setCommentToUpdate] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const getTheVideo = () => {
    getVideoAndComments(firebaseKey).then(setVideo);
    getVideoLikes(firebaseKey).then(setLikes);
  };
  const getRelatedVideos = () => {
    getPublicVideosbyCategory(video.category).then((videos) => videos.filter((videoObj) => videoObj.videoFirebaseKey !== firebaseKey)).then(setRelated);
  };

  const handleClick = () => {
    const userLiked = likes.filter((like) => like.uid === user.uid);
    if (userLiked.length) {
      deleteSingleLike(userLiked[0].likeFirebaseKey);
    } else {
      const payload = {
        uid: user.uid,
        videoFirebaseKey: firebaseKey,
      };
      createLike(payload);
    }
  };

  useEffect(() => {
    getTheVideo();
    getRelatedVideos();
  }, [video.videoFirebaseKey, video]);

  const addVideoToUserHistory = () => {
    if (user) {
      addToUserHistory(user.uid, firebaseKey);
    // eslint-disable-next-line no-empty
    } else {
    }
  };

  useEffect(() => {
    addVideoToUserHistory();
  }, []);

  return (
    <div className="viewVideoPage">
      <div className="videosDiv">
        <div className="viewVideoDiv">
          <Card className="viewVideCard">
            <YouTube opts={{ height: '483', width: '900' }} videoId={video.videoId} />
            <Card.Body className="videoBody">
              <div className="videoTextdiv">
                <Card.Title className="vidTitle">{video.title}</Card.Title>
                <Card.Text className="videoDescription">{video.description}</Card.Text>
                <Image className="vidCardCreatorImage" src={video.creatorImage} />
                <Card.Text className="vidCreatorName">{video.creatorName}</Card.Text>
                <Card.Text className="vidDate">{video.date}</Card.Text>
              </div>
              <div className="vidButtonDiv">
                <IconButton aria-label="like-btn" className="like-btn " onClick={handleClick}>
                  {likes.filter((like) => like.uid === user.uid).length ? (
                    <ThumbUpAltIcon />
                  ) : (
                    <ThumbUpOffAltIcon />
                  ) }
                </IconButton>
                <Card.Text className="vidLikes"><strong>Likes: {likes.length}</strong></Card.Text>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div id="commentDiv" className="commentsDiv">
          <div className="addComment">
            <CommentForm commentObj={commentToUpdate} videoFirebaseKey={video.videoFirebaseKey} />
          </div>
          {
        video.comments?.map((comment) => (
          <CommentCard setCommentToUpdate={setCommentToUpdate} commentObj={comment} key={comment.commentfirebaseKey} onUpdate={getVideoAndComments} />
        ))
        }
        </div>
      </div>
      <div className="relatedVideos">
        <h5 style={{ textAlign: 'center' }}>Related Videos</h5>
        {related.map((vid) => (
          <VideoCard obj={vid} opts={{ height: '160', width: '280' }} onUpdate={getTheVideo} user={user} />
        ))}
      </div>
    </div>
  );
}
export default ViewVideo;
