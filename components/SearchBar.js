import React, { useState } from 'react';
import { Nav, Button, Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

export default function SearchBar({ videos, setFilteredData }) {
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = videos.filter((video) => video.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredData(results);
  };

  return (
    <Nav.Item className="searchBar ms-auto">
      <Form className="d-flex">
        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={searchInput} onChange={handleChange} />
        <Button variant="outline-dark">
          <SearchIcon />
        </Button>
      </Form>
    </Nav.Item>
  );
}

SearchBar.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  setFilteredData: PropTypes.func.isRequired,
};
