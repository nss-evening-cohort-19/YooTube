import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createVideo, splitVideoId, updateVideo } from '../../api/videoData';

const initialState = {
  likes: 0,
  views: 0,
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // getCategories().then(setCategories);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
    console.warn(date());
    if (obj.firebaseKey) {
      updateVideo(formInput)
        .then(() => router.push('/yourVideos'));
    } else {
      const payload = {
        ...formInput, uid: user.uid, date: date(), creatorName: user.displayName, creatorImage: user.photoURL,
      };
      createVideo(payload).then((videoFirebaseKey) => splitVideoId(videoFirebaseKey).then((embedURL) => {
        const idPayload = { videoId: embedURL };
        updateVideo(idPayload);
      })).then(() => router.push('/yourVideos'));
    }
  };

  return (
    <>
      <h1>Add A Video</h1>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Upload'} Video</h2>

        <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Title"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Video URL" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Video URL"
            name="videoURL"
            value={formInput.videoURL}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Description" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Description"
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Category">
          <Form.Select
            aria-label="Category"
            name="category"
            onChange={handleChange}
            className="mb-3"
            value={obj.category}
            // required
          >
            <option value="">Select a Category</option>
            {
            categories.map((category) => (
              <option
                key={category.firebaseKey}
                value={category.firebaseKey}
              >
                {category.categoryName}
              </option>
            ))
          }
          </Form.Select>

          <Form.Check
            className="text-black mb-3"
            type="switch"
            id="public"
            name="isPublic"
            label="Public?"
            checked={formInput.isPublic}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                public: e.target.checked,
              }));
            }}
          />
        </FloatingLabel>

        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Upload'} Video</Button>
      </Form>
    </>

  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
    teamId: PropTypes.string,
    category: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
