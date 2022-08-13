import PropTypes from 'prop-types';
import {
  Card, Image, DropdownButton, Dropdown,
} from 'react-bootstrap';
import {
  FaEllipsisV, FaTrashAlt, FaPencilAlt,
} from 'react-icons/fa';
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
    window.scrollTo(1, 0);
  };

  const { user } = useAuth();
  return (
    <Card.Body className="commentCard">
      <Image className="commentUserImage" src={commentObj.photoURL} />
      <Card.Body>
        <Card.Text>{ commentObj.displayName }</Card.Text>
        <Card.Text>{ commentObj.commentText }</Card.Text>
        <Card.Text>{ commentObj.date }</Card.Text>
      </Card.Body>
      { user.uid === commentObj.uid ? (
        <div>
          <DropdownButton align="end" className="cardDropdown" title={<FaEllipsisV className="droptoggleicon" />}>
            <Dropdown.Item
              aria-label="edit"
              className="cardDropDownItem"
              onClick={() => {
                setCommentToUpdate(commentObj);
                scroll();
              }}
            ><FaPencilAlt className="dropIcon" /> Edit Comment
            </Dropdown.Item>
            <Dropdown.Item aria-label="delete" className="cardDropDownItem" onClick={deleteThisComment}><FaTrashAlt className="dropIcon" /> Delete Comment</Dropdown.Item>
          </DropdownButton>
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
