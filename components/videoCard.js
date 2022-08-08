/* eslint-disable react/void-dom-elements-no-children */
import { React } from 'react';
import { Card, Image } from 'react-bootstrap';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';

import { deleteSingleVideo } from '../api/videoData';

// eslint-disable-next-line react/prop-types
function VideoCard({
  obj, opts, onUpdate, router,
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
          </div>
        </Card.Body>
        {router === '/yourVideos' ? (
          <div className="card-buttons">
            <Link href={`/video/edit/${obj.videoFirebaseKey}`} passHref>
              <IconButton aria-label="edit" className="edit-btn">
                <EditIcon style={{ color: 'white' }} />
              </IconButton>
            </Link>
            <IconButton aria-label="delete" className="delete-btn " onClick={deleteThisVideo}>
              <DeleteIcon style={{ color: 'white' }} />
            </IconButton>
          </div>
        ) : (
          <div />
        )}
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
    description: PropTypes.string,
    date: PropTypes.string,
    category: PropTypes.string,
    isPublic: PropTypes.bool,
    creatorImage: PropTypes.string,
    creatorName: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  /* user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired, */
  opts: PropTypes.shape({
  }).isRequired,
  router: PropTypes.string,
};

VideoCard.defaultProps = {
  router: '',
};

export default VideoCard;
