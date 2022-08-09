import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../api/commentData';

const initialState = {
  commentText: '',
};

const obj = {};

// eslint-disable-next-line react/prop-types
function CommentForm({ videoFirebaseKey }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  // useEffect(() => {
  //   if (obj.commentFirebaseKey) setFormInput(obj);
  // }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const date = () => {
    const d = new Date();
    const dateValue = d.toLocaleString();
    return dateValue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.commentFirebaseKey) {
      updateComment(formInput)
        .then(() => router.push(`/video/${videoFirebaseKey}`));
    } else {
      const payload = {
        ...formInput, uid: user.uid, date: date(), displayName: user.displayName, photoURL: user.photoURL, videoFirebaseKey,
      };
      createComment(payload).then(() => router.push(`/video/${videoFirebaseKey}`));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <FloatingLabel controlId="floatingInput3" label="Add a comment.." className="mb-3">
          <Form.Control
            type="text"
            placeholder="Add a comment..."
            name="commentText"
            value={formInput.commentText}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button type="submit">{obj.commentFirebaseKey ? 'Update' : ''} Comment</Button>
      </Form>
    </>

  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    commentFirebaseKey: PropTypes.string,
    videoFirebaseKey: PropTypes.string,
    name: PropTypes.string,
  }),
};

CommentForm.defaultProps = {
  obj: initialState,
};

export default CommentForm;
