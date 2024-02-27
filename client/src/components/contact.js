import React from "react";
import './css/bootstrap.min.css';
import './css/style.css';
import { Link } from "react-router-dom";

const Contact = ({ }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
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
                <Link to="/index" className="nav-item nav-link ">Home</Link>
                <Link to="/service" className="nav-item nav-link">Service</Link>
                <Link to="/contact" className="nav-item nav-link active">Contact</Link>
                <Link to="/blog" className="nav-item nav-link">Blog</Link>
                <Link to="/profile/general" className="nav-item nav-link">Profile</Link>
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
      {/* Contact Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-5 wow fadeInUp" data-wow-delay=".3s">
            <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">Get In Touch</h5>
            <h1 className="display-5 w-50 mx-auto">Contact for any query</h1>
          </div>
          <div className="row g-5 mb-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="h-100">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001583.639214438!2d-78.4099249913019!3d42.71993723844549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1687175686342!5m2!1sen!2sbd" className="border-0 rounded w-100 h-100" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
              <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
              <div className="rounded contact-form">
                <div className="mb-4">
                  <input type="text" className="form-control p-3" placeholder="Your Name" />
                </div>
                <div className="mb-4">
                  <input type="email" className="form-control p-3" placeholder="Your Email" />
                </div>
                <div className="mb-4">
                  <input type="text" className="form-control p-3" placeholder="Subject" />
                </div>
                <div className="mb-4">
                  <textarea className="w-100 form-control p-3" rows={6} cols={10} placeholder="Message" defaultValue={""} />
                </div>
                <button className="btn btn-primary border-0 py-3 px-4 rounded-pill" type="button">Send Message</button>
              </div>
            </div>
          </div>
          <div className="row g-4 wow fadeInUp" data-wow-delay=".3s">
            <div className="col-xxl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="d-flex bg-light p-3 rounded contact-btn-link">
                <div className="flex-shrink-0 d-flex align-items-center justify-content-center bg-primary rounded-circle p-3 ms-3" style={{ width: 64, height: 64 }}>
                  <i className="fa fa-share text-dark" />
                </div>
                <div className="ms-3 contact-link">
                  <h4 className="text-dark">fallow Us</h4>
                  <div className="d-flex justify-content-center">
                    <a className="pe-2" href="#"><i className="fab fa-facebook-f text-dark" /></a>
                    <a className="px-2" href="#"><i className="fab fa-twitter text-dark" /></a>
                    <a className="px-2" href="#"><i className="fab fa-instagram text-dark" /></a>
                    <a className="px-2" href="#"><i className="fab fa-linkedin-in text-dark" /></a>
                    <a className="px-2" href="#"><i className="fab fa-youtube text-dark" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="d-flex bg-light p-3 rounded contact-btn-link">
                <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle p-3 ms-3" style={{ width: 64, height: 64 }}>
                  <i className="fas fa-map-marker-alt text-dark" />
                </div>
                <div className="ms-3 contact-link">
                  <h4 className="text-dark">Address</h4>
                  <a href="#">
                    <h5 className="text-dark d-inline fs-6">123 Street, CA, USA</h5>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="d-flex bg-light p-3 rounded contact-btn-link">
                <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle p-3 ms-3" style={{ width: 64, height: 64 }}>
                  <i className="fa fa-phone text-dark" />
                </div>
                <div className="ms-3 contact-link">
                  <h4 className="text-dark">Call Us</h4>
                  <a className="h5 text-dark fs-6" href="tel:+0123456789">+012 3456 7890</a>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="d-flex bg-light p-3 rounded contact-btn-link">
                <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle p-3 ms-3" style={{ width: 64, height: 64 }}>
                  <i className="fa fa-envelope text-dark" />
                </div>
                <div className="ms-3 contact-link">
                  <h4 className="text-dark">Email Us</h4>
                  <a className="h5 text-dark fs-6" href="#">info@example.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
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
      {/* Template Javascript */}
    </div>

  );
}

export default Contact;