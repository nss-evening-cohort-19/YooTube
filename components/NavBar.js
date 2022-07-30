/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
<<<<<<< HEAD
  Navbar, Container, Nav,
} from 'react-bootstrap';
=======
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
>>>>>>> origin/with-auth

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>CHANGE ME</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
<<<<<<< HEAD
            <Link passHref href="/delete-me">
              <Nav.Link>Delete Me</Nav.Link>
            </Link>
=======
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
>>>>>>> origin/with-auth
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
