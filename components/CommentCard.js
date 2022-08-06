import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

function CommentCard({ commentObj }) {
  return (
    <Card style={{ width: '36rem' }}>
      <Image className="vidCardCreatorImage" src={commentObj.photoURL} />
      <Card.Body>
        <Card.Text>{ commentObj.displayName }</Card.Text>
        <Card.Text>{ commentObj.commentText }</Card.Text>
        <Card.Text>{ commentObj.date }</Card.Text>
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    photoURL: PropTypes.string,
    commentText: PropTypes.string,
    displayName: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
};

export default CommentCard;
