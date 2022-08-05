/* eslint-disable react/void-dom-elements-no-children */
import { React } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteSingleVideo } from '../api/videoData';

// eslint-disable-next-line react/prop-types
function VideoCard({
  obj, opts, onUpdate, user,
}) {
  const deleteThisVideo = () => {
    if (window.confirm('Delete This Video?')) {
      deleteSingleVideo(obj.videoFirebaseKey).then(() => onUpdate());
    }
  };
  return (
    <div>
      <Card className="videoCard">
        <YouTube opts={opts} videoId={obj.videoId} />
        <Card.Body className="videoCardBody">
          <Image className="vidCardCreatorImage" src={obj.creatorImage} />
          <div className="videoCardTextdiv">
            <Link href={`/video/${obj.videoFirebaseKey}`} passHref>
              <Card.Title className="vidCardTitle">{obj.title}</Card.Title>
            </Link>
            <Card.Text className="vidCardCreatorName">{obj.creatorName}</Card.Text>
            <Card.Text className="vidCardLikes">Likes: {obj.likes}</Card.Text>
          </div>
          {obj.uid === user.uid ? (
            <>
              <Link href={`/video/edit/${obj.videoFirebaseKey}`} passHref>
                <Button variant="outline-secondary">EDIT</Button>
              </Link>
              <Button variant="outline-danger" onClick={deleteThisVideo} className="m-2">
                DELETE
              </Button>
            </>
          ) : (
            <div />
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

VideoCard.propTypes = {
  obj: PropTypes.shape({
    videoFirebaseKey: PropTypes.string,
    title: PropTypes.string,
    videoId: PropTypes.string,
    videoURL: PropTypes.string,
    likes: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    category: PropTypes.string,
    isPublic: PropTypes.bool,
    creatorImage: PropTypes.string,
    creatorName: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  opts: PropTypes.shape({

  }).isRequired,
};

export default VideoCard;
