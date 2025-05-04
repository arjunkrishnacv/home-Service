import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Header = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUsername(parsed.username || parsed.uname || '');
      } catch {
        setUsername('');
      }
    } else {
      setUsername('');
    }
  }, [location]); // <- Add location here

  // Hide Header on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUsername('');
    Swal.fire({
      title: 'Logged Out!',
      text: 'You have been successfully logged out.',
      icon: 'success',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK'
    });
    navigate('/login');
  };

  return (
    <Navbar expand="md" className="bg-success">
      <Container>
        <Navbar.Brand>
          <img width={"70px"} src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-around align-items-center">
            <a href='/' style={{ textDecoration: 'none' }} className="text-white fw-bold fs-5">Home</a>
            <a href='#contacts' style={{ textDecoration: 'none' }} className="text-white fw-bold fs-5">Contact</a>
            <a href='/services' style={{ textDecoration: 'none' }} className="text-white fw-bold fs-5">Services</a>

            {username ? (
              // <NavDropdown title={username} id="user-nav-dropdown" className="text-white fw-semibold" menuVariant="light">
              //   <NavDropdown.Item onClick={() => navigate('/cart')}>Cart</NavDropdown.Item>
              //   <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              // </NavDropdown>
              <div className="d-flex align-items-center">
                <a href='/cart' style={{ textDecoration: 'none' }} className="text-white fw-bold fs-5 me-3">Cart</a>
                <span className="text-white fw-bold fs-5 ms-5">Hi, {username}</span>
                <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
               
              </div>
            ) : (
              <NavDropdown title="Login" id="login-nav-dropdown" className="text-white fw-semibold" menuVariant="light">
                <NavDropdown.Item onClick={() => navigate('/login')}>Login</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/register')}>Register</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
