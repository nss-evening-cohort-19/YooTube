import React from 'react';
import { Button } from 'react-bootstrap';
import { getAllPublicVideosAndLikes } from '../api/mergedData';

function Explore() {
  const handleClick = () => {
    console.warn(getAllPublicVideosAndLikes());
  };

  return (
    <div>
      explore
      <Button onClick={handleClick}>Press Me</Button>
    </div>
  );
}

export default Explore;
