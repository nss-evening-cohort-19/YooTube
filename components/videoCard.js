/* eslint-disable no-nested-ternary */
/* eslint-disable react/void-dom-elements-no-children */
import { React } from 'react';
import {
  Card, Image, Dropdown, DropdownButton,
} from 'react-bootstrap';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { getVideoComments } from '../api/commentData';
import {
  addToUserWatchLater, deleteUserHistory, deleteVideoComments, deleteWatchLater,
} from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';

// eslint-disable-next-line react/prop-types
function VideoCard({
  obj, opts, onUpdate, router, name,
}) {
  const { user } = useAuth();
  const deleteThisVideo = () => {
    if (window.confirm('Delete this video?')) {
      getVideoComments(obj.videoFirebaseKey).then(() => {
        deleteVideoComments(obj.videoFirebaseKey).then(() => onUpdate());
      });
    }
  };

  const addToWatchLater = () => {
    addToUserWatchLater(user.uid, obj.videoFirebaseKey);
  };

  const removeFromHistory = async () => {
    await deleteUserHistory(user.uid, obj.videoFirebaseKey);
    onUpdate();
  };

  const removeFromWatchLater = async () => {
    await deleteWatchLater(user.uid, obj.videoFirebaseKey);
    onUpdate();
  };

  const timeDifference = () => {
    const diff = Math.abs(new Date() - new Date(obj.date.replace(/-/g, '/')));
    if (diff / 1000 < 60) {
      if ((diff / 1000 < 60) < 1.5) {
        return `${Math.round(diff / 1000)} Second Ago`;
      }
      return `${Math.round(diff / 1000)} Seconds Ago`;
    } if (diff / (1000 * 60) < 60) {
      if ((diff / (1000 * 60) < 1.5)) {
        return `${Math.round(diff / (1000 * 60))} Minute Ago`;
      }
      return `${Math.round(diff / (1000 * 60))} Minutes Ago`;
    } if (diff / (1000 * 60 * 60) < 23.5) {
      if ((diff / (1000 * 60 * 60) < 1.5)) {
        return `${Math.round(diff / (1000 * 60 * 60))} Hour Ago`;
      }
      return `${Math.round(diff / (1000 * 60 * 60))} Hours Ago`;
    } if (diff / (1000 * 60 * 60 * 24) < 6.5) {
      if ((diff / (1000 * 60 * 60 * 24) < 1.5)) {
        return `${Math.round(diff / (1000 * 60 * 60 * 24))} Day Ago`;
      }
      return `${Math.round(diff / (1000 * 60 * 60 * 24))} Days Ago`;
    } if (diff / (1000 * 60 * 60 * 24 * 7) < 4) {
      if ((diff / (1000 * 60 * 60 * 24 * 7) < 1.5)) {
        return `${Math.round(diff / (1000 * 60 * 60 * 24 * 7))} Week Ago`;
      }
      return `${Math.round(diff / (1000 * 60 * 60 * 24 * 7))} Weeks Ago`;
    }
    return 'A While Ago';
  };

  const uploadstatement = timeDifference();

  return (
    <div>
      <Card className="videoCard" style={name === 'liked' ? { width: '100%' } : ''}>
        <YouTube opts={opts} videoId={obj.videoId} />
        <Card.Body className="videoCardBody">
          <Image className="vidCardCreatorImage" src={obj.creatorImage} />
          <div className="videoCardTextdiv">
            <Link href={`/video/${obj.videoFirebaseKey}`} passHref>
              <Card.Title className="vidCardTitle">{obj.title}</Card.Title>
            </Link>
            <Card.Text className="vidCardCreatorName">{obj.creatorName}</Card.Text>
            <Card.Text className="uploaded">{obj.views} view{obj.views === 1 ? '' : 's'} • {uploadstatement}</Card.Text>
          </div>
          <DropdownButton align="end" className="cardDropdown">
            {name === 'history' ? (
              <><Dropdown.Item className="cardDropDownItem" onClick={addToWatchLater}>Save to Watch Later</Dropdown.Item><Dropdown.Divider /><Dropdown.Item className="cardDropDownItem" onClick={removeFromHistory}>Remove From Watch History</Dropdown.Item></>
            ) : name === 'watch-later' ? (
              <Dropdown.Item className="cardDropDownItem" onClick={removeFromWatchLater}>Remove From Watch Later</Dropdown.Item>
            ) : (
              <Dropdown.Item className="cardDropDownItem" onClick={addToWatchLater}>Save to Watch Later</Dropdown.Item>
            )}
          </DropdownButton>
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
    description: PropTypes.string,
    date: PropTypes.string,
    category: PropTypes.string,
    isPublic: PropTypes.bool,
    creatorImage: PropTypes.string,
    creatorName: PropTypes.string,
    uid: PropTypes.string,
    views: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  opts: PropTypes.shape({
  }).isRequired,
  router: PropTypes.string,
  name: PropTypes.string,
};

VideoCard.defaultProps = {
  router: '',
  name: '',
};

export default VideoCard;
