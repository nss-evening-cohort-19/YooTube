/* eslint-disable no-nested-ternary */
/* eslint-disable react/void-dom-elements-no-children */
import { React } from 'react';
import {
  Card, Image, Dropdown, DropdownButton,
} from 'react-bootstrap';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  FaEllipsisV, FaClock, FaTrashAlt, FaPencilAlt,
} from 'react-icons/fa';
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
      <Card className="videoCard">
        <YouTube opts={opts} videoId={obj.videoId} />
        <Card.Body className="videoCardBody">
          <div className="vidCardImageDiv">
            <Image className="vidCardCreatorImage" src={obj.creatorImage} />
          </div>
          <div className="videoCardTextdiv">
            <Link href={`/video/${obj.videoFirebaseKey}`} passHref>
              <Card.Title className="vidCardTitle">{obj.title}</Card.Title>
            </Link>
            <Card.Text className="vidCardCreatorName">{obj.creatorName}</Card.Text>
            <Card.Text className="uploaded">{obj.views} view{obj.views === 1 ? '' : 's'} • {uploadstatement}</Card.Text>
          </div>
          <DropdownButton align="end" className="cardDropdown" title={<FaEllipsisV className="droptoggleicon" />}>
            {name === 'history' ? (
              <><Dropdown.Item className="cardDropDownItem" onClick={addToWatchLater}><FaClock className="dropIcon" /> Save to Watch Later</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="cardDropDownItem" onClick={removeFromHistory}><FaTrashAlt className="dropIcon" /> Remove From Watch History</Dropdown.Item>
              </>
            ) : name === 'watch-later' ? (
              <Dropdown.Item className="cardDropDownItem" onClick={removeFromWatchLater}><FaTrashAlt className="dropIcon" /> Remove From Watch Later</Dropdown.Item>
            ) : (
              <Dropdown.Item className="cardDropDownItem" onClick={addToWatchLater}><FaClock className="dropIcon" /> Save to Watch Later</Dropdown.Item>
            )}
            {router === '/yourVideos' ? (
              <>
                <Link href={`/video/edit/${obj.videoFirebaseKey}`} passHref>
                  <Dropdown.Item aria-label="edit" className="cardDropDownItem"><FaPencilAlt className="dropIcon" /> Edit Video</Dropdown.Item>
                </Link><Dropdown.Item aria-label="delete" className="cardDropDownItem" onClick={deleteThisVideo}><FaTrashAlt className="dropIcon" /> Delete Video</Dropdown.Item>
              </>
            ) : (
              <div />
            )}
          </DropdownButton>
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
