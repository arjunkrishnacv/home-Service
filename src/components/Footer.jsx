import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {

  const location = useLocation();
  
  // Hide Header and Footer on login page
  if (location.pathname === '/login') {
    return null;
  }
  if (location.pathname === '/register') {
    return null;
  }
  return (
    <div className="bg-primary p-4">
      <div className="container">
        <div className="row">
          {/* Intro */}
          <div className="col-md-4 mb-4">
            <h5 className="text-white"><i className="fa-solid fa-house me-3"></i>AK Home Services</h5>
            <p className="text-white">
              Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.
            </p>
            <p className="text-white">Licensed by Luminar Technolab</p>
            <p className="text-white">Version 2</p>
          </div>

          {/* Links */}
          <div className="col-md-2 mb-4">
            <h5 className="text-white">Links</h5>
            <Link to={'/'} className="text-white text-decoration-none d-block">Landing Page</Link>
            <Link to={'/home'} className="text-white text-decoration-none d-block">Home Page</Link>
            <Link to={'/history'} className="text-white text-decoration-none d-block">History Page</Link>
          </div>

          {/* Guides */}
          <div className="col-md-2 mb-4">
            <h5 className="text-white">Guides</h5>
            <a target='_blank' href="https://react.dev/" className="text-white text-decoration-none d-block">React</a>
            <a target='_blank' href="https://bootswatch.com/" className="text-white text-decoration-none d-block">Bootswatch</a>
            <a target='_blank' href="https://react-bootstrap.netlify.app/" className="text-white text-decoration-none d-block">React Bootstrap</a>
          </div>

          {/* Contact */}
          <div className="col-md-4">
            <h5 className="text-white">Contact Us</h5>
            <div className="d-flex">
              <input type="text" placeholder="Enter your Email" className="form-control me-2" />
              <button className="btn btn-secondary"><i className="fa-solid fa-arrow-right"></i></button>
            </div>

            {/* Social Links */}
            <div className="d-flex justify-content-between mt-3">
              <a href="https://react.dev/" className="text-white text-decoration-none"><i className="fa-brands fa-twitter"></i></a>
              <a href="https://react.dev/" className="text-white text-decoration-none"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://react.dev/" className="text-white text-decoration-none"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="https://react.dev/" className="text-white text-decoration-none"><i className="fa-brands fa-facebook"></i></a>
              <a href="https://react.dev/" className="text-white text-decoration-none"><i className="fa-brands fa-linkedin"></i></a>
              <a href="https://react.dev/" className="text-white text-decoration-none"><i className="fa-brands fa-github"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;