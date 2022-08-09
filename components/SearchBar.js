import React, { useState } from 'react';
import { Nav, Button, Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
// import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

// eslint-disable-next-line no-unused-vars
export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    // const results = videos.filter((video) => video.name.toLowerCase().includes(value.toLowerCase()));
    console.warn(value);
    // setFilteredData(results);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.warn(router.query);
      console.warn('Enter pressed');
      router.push({
        pathname: '/search',
        query: { keyword: searchInput },
      });
      setSearchInput('');
    }
  };

  return (
    <Nav.Item className="searchBar ms-auto">
      <Form className="d-flex">
        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={searchInput} onChange={handleChange} onKeyDown={handleKeyDown} />
        <Button variant="outline-dark">
          <SearchIcon />
        </Button>
      </Form>
    </Nav.Item>
  );
}

// SearchBar.propTypes = {
//   videos: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string,
//   })).isRequired,
//   setFilteredData: PropTypes.func.isRequired,
// };
