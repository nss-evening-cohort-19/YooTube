import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createVideo, updateVideo } from '../../api/videoData';
import getCategories from '../../api/categoryData';

const initialState = {
  views: 0,

};

function VideoForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);
    if (obj.videoFirebaseKey) setFormInput(obj);
  }, [obj]);

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
    if (obj.videoFirebaseKey) {
      updateVideo(formInput)
        .then(() => router.push('/yourVideos'));
    } else {
      const lastIndex = formInput.videoURL.lastIndexOf('/');
      const payload = {
        ...formInput, uid: user.uid, date: date(), creatorName: user.displayName, creatorImage: user.photoURL, videoId: formInput.videoURL.slice(lastIndex + 1),
      };
      createVideo(payload).then(() => router.push('/yourVideos'));
    }
  };

  return (
    <div>
      {user.uid ? (
        <div>
          <h1>Add a Video</h1>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-black mt-5">{obj.videoFirebaseKey ? 'Update' : 'Upload'} Video</h2>

            <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
              <Form.Control type="text" placeholder="Enter Title" name="title" value={formInput.title} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput2" label="Video URL (right-click video and copy video URL)" className="mb-3">
              <Form.Control type="text" placeholder="Enter Video URL" name="videoURL" value={formInput.videoURL} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput3" label="Description" className="mb-3">
              <Form.Control type="text" placeholder="Enter Description" name="description" value={formInput.description} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingSelect" label="Category">
              <Form.Select aria-label="Category" name="category" onChange={handleChange} className="mb-3" value={obj.category} required>
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category.categoryName} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Select>

              <Form.Check
                className="text-black mb-3"
                type="switch"
                id="isPublic"
                name="isPublic"
                label="Public?"
                checked={formInput.isPublic}
                onChange={(e) => {
                  setFormInput((prevState) => ({
                    ...prevState,
                    isPublic: e.target.checked,
                  }));
                }}
              />
            </FloatingLabel>
            <Button type="submit">{obj.videoFirebaseKey ? 'Update' : 'Upload'} Video</Button>
          </Form>
        </div>
      ) : (
        <div>
          <h1>Sign in to Add/Edit a Video</h1>
        </div>
      )}
    </div>
  );
}

VideoForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    videoFirebaseKey: PropTypes.string,
    firebaseKey: PropTypes.string,
    teamId: PropTypes.string,
    category: PropTypes.string,
  }),
};

VideoForm.defaultProps = {
  obj: initialState,
};

export default VideoForm;
