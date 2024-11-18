import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = ({insideTasklist}) => {
  const navigate = useNavigate();


  // Handle logout
  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <>
      <Navbar className='py-3' bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Task Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Only show the Logout button if the user is logged in */}
              {insideTasklist && (
                <Button onClick={handleLogout} variant="outline-light" href="#logout" className="ms-2">
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
