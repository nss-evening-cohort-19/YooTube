import { React } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

function VideoCard({ obj }) {
  return (
    <div>
      <Card style={{ width: '20rem' }}>
        <YouTube videoId={obj.videoId} />
        <Card.Body>
          <Card.Title>{obj.title}</Card.Title>
          <Card.Text>{obj.description}</Card.Text>
          <Card.Text>Likes: {obj.likes}</Card.Text>
          <Image src={obj.creatorImage} />
          <Card.Text>{obj.creatorName}</Card.Text>
          <Button variant="primary">Edit</Button>
          <Button variant="danger">Delete</Button>
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
  }).isRequired,
};

export default VideoCard;
