import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isLogined,setisLogined] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  
  // Hide Header on login page
  if (location.pathname === '/login') {
    return null;
  }
  if (location.pathname === '/register') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear()
    sessionStorage.clear()
    setisLogined(false);
    navigate('/login');
    
  }
 
  
  return (
    <>
      <Navbar expand="md" className="bg-success">
        <Container>
          <Navbar.Brand>
            <img width={"70px"} src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex justify-content-around">
              <Nav.Link onClick={() => navigate('/')} className="text-white fw-bold fs-5">Home</Nav.Link>
              <Nav.Link className="text-white fw-bold fs-5">Contact</Nav.Link>
              <Nav.Link className="text-white fw-bold fs-5">About</Nav.Link>
              { isLogined ?
                <Nav.Link onClick={() => navigate('/login')} className="text-white fw-bold fs-5"><i className='fa-solid fa-user'></i>User</Nav.Link>
              :
              <Nav.Link onClick={() => navigate('/login')} className="text-white fw-bold fs-5"><i className='fa-solid fa-user'></i>User</Nav.Link>
              }
              <Nav.Link onClick={() => navigate('/cart')} className="text-white fw-bold fs-5"><i className='fa-solid fa-cart-shopping'></i>Cart</Nav.Link>
              <Nav.Link onClick={handleLogout} className="text-white fw-bold fs-5">LogOut</Nav.Link>
              

              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
