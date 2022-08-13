import React from 'react';
import {
  Card, Dropdown, DropdownButton,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import YouTube from 'react-youtube';
import { FaEllipsisV, FaClock } from 'react-icons/fa';
import { addToUserWatchLater } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';

function LikedVideoCard({ obj, opts }) {
  const { user } = useAuth();

  const addToWatchLater = () => {
    addToUserWatchLater(user.uid, obj.videoFirebaseKey);
  };

  return (
    <Card className="likedVideoCard">
      <div className="likedPlayerDiv">
        <YouTube className="likedPlayer" opts={opts} videoId={obj.videoId} />
      </div>
      <Card.Body className="likedCardBody">
        <Link href={`/video/${obj.videoFirebaseKey}`} passHref>
          <Card.Title className="likedCardTitle">{obj.title}</Card.Title>
        </Link>
        <Card.Text className="likedCardCreator">{obj.creatorName}</Card.Text>
        <DropdownButton align="end" className="likedCardDropdown" title={<FaEllipsisV className="droptoggleicon" />}>
          <Dropdown.Item className="cardDropDownItem" onClick={addToWatchLater}><FaClock className="dropIcon" /> Save to Watch Later</Dropdown.Item>
        </DropdownButton>
      </Card.Body>
    </Card>
  );
}
LikedVideoCard.propTypes = {
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
  opts: PropTypes.shape({
  }).isRequired,
};

LikedVideoCard.defaultProps = {
};

export default LikedVideoCard;
