import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import ProfileChangePassword from './ProfileChangePassword';
import ProfileGeneral from './ProfileGeneral';
import ProfileMembership from './ProfileMembership'
import ProfileAddress from './ProfileAddress';
import './userStyle/userStyle.css';
import './css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    return (
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap" rel="stylesheet" />
        {/* Icon Font Stylesheet */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
        {/* Navbar Start */}
        <div className="container-fluid bg-dark">
          <div className="container">
            <nav className="navbar navbar-dark navbar-expand-lg py-lg-0">
              <Link to="/index">
                <h1 className="text-primary mb-0 display-5">Laundry<span className="text-white">Store</span><i /></h1>
              </Link>
              <button className="navbar-toggler bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars text-dark" />
              </button>
              <div className="collapse navbar-collapse me-n3" id="navbarCollapse">
                <div className="navbar-nav ms-auto">
                  <Link to="/index" className="nav-item nav-link">Home</Link>
                  <Link to="/service" className="nav-item nav-link">Service</Link>
                  <Link to="/contact" className="nav-item nav-link">Contact</Link>
                  <Link to="/blog" className="nav-item nav-link">Blog</Link>
                  <Link to="/profile/general" className="nav-item nav-link active">Profile</Link>
                  {isLoggedIn ? (
                    <Link to="/logout" className="nav-item nav-link">Logout</Link>
                  ) : (
                    <Link to="/login" className="nav-item nav-link">Login</Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Navbar End */}
        <div className="container py-5">
          <div className="alert alert-warning" role="alert">
            You need to log in to view your personal information.
          </div>
        </div>

        {/* Footer Start */}
        <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay=".3s">
          <div className="container py-5">
            <div className="row g-4 footer-inner">
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <h4 className="text-white fw-bold mb-4">About LaundryStore.</h4>
                  <p>Coming to us, you will experience the best online laundry service today.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <h4 className="text-white fw-bold mb-4">Usefull Link</h4>
                  <div className="d-flex flex-column align-items-start">
                    <Link to="/index" className="nav-item nav-link">Home</Link>
                    <Link to="/contact" className="nav-item nav-link">Contact</Link>
                    <Link to="/blog" className="nav-item nav-link">Blog</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <h4 className="text-white fw-bold mb-4">Services Link</h4>
                  <div className="d-flex flex-column align-items-start">
                    <Link to="/service" className="nav-item nav-link">Service</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <h4 className="text-white fw-bold mb-4">Contact Us</h4>
                  <a href className="btn btn-link w-100 text-start ps-0 pb-3 border-bottom rounded-0"><i className="fa fa-map-marker-alt me-3" />123 Street, CA, USA</a>
                  <a href className="btn btn-link w-100 text-start ps-0 py-3 border-bottom rounded-0"><i className="fa fa-phone-alt me-3" />+012 345 67890</a>
                  <a href className="btn btn-link w-100 text-start ps-0 py-3 border-bottom rounded-0"><i className="fa fa-envelope me-3" />info@example.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}
        {/* Copyright Start */}
        <div className="container-fluid copyright bg-dark py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                <a href="#" className="text-primary mb-0 display-6">Laundry<span className="text-white">Store</span></a>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright End */}
        {/* Back to Top */}
        <a href="#" className="btn btn-primary rounded-circle border-3 back-to-top"><i className="fa fa-arrow-up" /></a>
        {/* JavaScript Libraries */}
      </div>
    );
  }
  return (
    <div>
      {/* Google Web Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap" rel="stylesheet" />
      {/* Icon Font Stylesheet */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
      {/* Navbar Start */}
      <div className="container-fluid bg-dark">
        <div className="container">
          <nav className="navbar navbar-dark navbar-expand-lg py-lg-0">
            <Link to="/index">
              <h1 className="text-primary mb-0 display-5">Laundry<span className="text-white">Store</span><i /></h1>
            </Link>
            <button className="navbar-toggler bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="fa fa-bars text-dark" />
            </button>
            <div className="collapse navbar-collapse me-n3" id="navbarCollapse">
              <div className="navbar-nav ms-auto">
                <Link to="/index" className="nav-item nav-link">Home</Link>
                <Link to="/service" className="nav-item nav-link">Service</Link>
                <Link to="/contact" className="nav-item nav-link">Contact</Link>
                <Link to="/blog" className="nav-item nav-link">Blog</Link>
                <Link to="/profile/general" className="nav-item nav-link active">Profile</Link>
                {isLoggedIn ? (
                  <Link to="/logout" className="nav-item nav-link">Logout</Link>
                ) : (
                  <Link to="/login" className="nav-item nav-link">Login</Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
      <div className="container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <NavLink to="/profile/general" className="list-group-item list-group-item-action" >
                  General
                </NavLink>
                <NavLink to="/profile/address" className="list-group-item list-group-item-action">
                  Address
                </NavLink>
                <NavLink to="/profile/change-password" className="list-group-item list-group-item-action">
                  Change password
                </NavLink>
                <NavLink to="/profile/membership" className="list-group-item list-group-item-action">
                  Membership
                </NavLink>
                {/* Add nav links for other profile-related pages... */}
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <Routes>
                  <Route path="general" element={<ProfileGeneral />} />
                  <Route path="address" element={<ProfileAddress />} />
                  <Route path="change-password" element={<ProfileChangePassword />} />
                  <Route path="membership" element={<ProfileMembership />} />
                  {/* Add routes for other profile-related pages... */}
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Start */}
      <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay=".3s">
        <div className="container py-5">
          <div className="row g-4 footer-inner">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-white fw-bold mb-4">About LaundryStore.</h4>
                <p>Coming to us, you will experience the best online laundry service today.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-white fw-bold mb-4">Usefull Link</h4>
                <div className="d-flex flex-column align-items-start">
                  <Link to="/index" className="nav-item nav-link">Home</Link>
                  <Link to="/contact" className="nav-item nav-link">Contact</Link>
                  <Link to="/blog" className="nav-item nav-link">Blog</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-white fw-bold mb-4">Services Link</h4>
                <div className="d-flex flex-column align-items-start">
                  <Link to="/service" className="nav-item nav-link">Service</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-white fw-bold mb-4">Contact Us</h4>
                <a href className="btn btn-link w-100 text-start ps-0 pb-3 border-bottom rounded-0"><i className="fa fa-map-marker-alt me-3" />123 Street, CA, USA</a>
                <a href className="btn btn-link w-100 text-start ps-0 py-3 border-bottom rounded-0"><i className="fa fa-phone-alt me-3" />+012 345 67890</a>
                <a href className="btn btn-link w-100 text-start ps-0 py-3 border-bottom rounded-0"><i className="fa fa-envelope me-3" />info@example.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      {/* Copyright Start */}
      <div className="container-fluid copyright bg-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
              <a href="#" className="text-primary mb-0 display-6">Laundry<span className="text-white">Store</span></a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright End */}
      {/* Back to Top */}
      <a href="#" className="btn btn-primary rounded-circle border-3 back-to-top"><i className="fa fa-arrow-up" /></a>
      {/* JavaScript Libraries */}
    </div>
  );
};


export default Profile;
