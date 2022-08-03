import { React } from 'react';
import { Card, Image } from 'react-bootstrap';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function VideoCard({ obj }) {
  return (
    <div>
      <Card className="videoCard">
        <YouTube opts={{ height: '160', width: '280' }} videoId={obj.videoId} />
        <Card.Body className="videoCardBody">
          <Image className="vidCardCreatorImage" src={obj.creatorImage} />
          <div className="videoCardTextdiv">
            <Card.Title className="vidCardTitle">{obj.title}</Card.Title>
            <Card.Text className="vidCardCreatorName">{obj.creatorName}</Card.Text>
            <Card.Text className="vidCardLikes">Likes: {obj.likes}</Card.Text>
          </div>
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
