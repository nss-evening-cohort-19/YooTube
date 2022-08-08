import React from 'react';
import { Nav, Button, Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <Nav.Item className="searchBar ms-auto">
      <Form className="d-flex">
        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
        <Button variant="outline-dark">
          <SearchIcon />
        </Button>
      </Form>
    </Nav.Item>
  );
}
