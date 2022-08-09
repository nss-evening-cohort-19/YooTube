import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { deleteComment, getVideoComments } from '../api/commentData';
import { useAuth } from '../utils/context/authContext';

function CommentCard({ commentObj, onUpdate, setCommentToUpdate }) {
  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      getVideoComments(commentObj.videoFirebaseKey).then(() => {
        deleteComment(commentObj.commentFirebaseKey).then(() => onUpdate());
      });
    }
  };
  const scroll = () => {
    window.scrollTo(0, 0);
  };

  const { user } = useAuth();
  return (
    <Card.Body style={{ width: '36rem' }}>
      <Image className="vidCardCreatorImage" src={commentObj.photoURL} />
      <Card.Body>
        <Card.Text>{ commentObj.displayName }</Card.Text>
        <Card.Text>{ commentObj.commentText }</Card.Text>
        <Card.Text>{ commentObj.date }</Card.Text>
      </Card.Body>
      { user.uid === commentObj.uid ? (
        <div>
          <IconButton
            aria-label="edit"
            className="edit-btn"
            onClick={() => {
              setCommentToUpdate(commentObj);
              scroll();
            }}
          >
            <EditIcon style={{ color: 'blue' }} />
          </IconButton>
          <IconButton aria-label="delete" className="delete-btn " onClick={deleteThisComment}>
            <DeleteIcon style={{ color: 'red' }} />
          </IconButton>

        </div>
      ) : '' }
    </Card.Body>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    commentFirebaseKey: PropTypes.string,
    videoFirebaseKey: PropTypes.string,
    photoURL: PropTypes.string,
    commentText: PropTypes.string,
    displayName: PropTypes.string,
    date: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  setCommentToUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
