import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const AddMembership = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        phone: '',
        email: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('https://localhost:7240/api/User/getUserById', {
                withCredentials: true,
            });

            if (response.status !== 200) {
                console.error('Error fetching user information. Server response:', response.status);
                return;
            }

            setUserInfo({
                ...response.data,
            });
        } catch (error) {
            console.error('Error in fetchUserInfo:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const currentDate = new Date();
            const expirationDate = new Date();
            expirationDate.setDate(currentDate.getDate() + 30);
            const updatedFormData = {
                customerName: userInfo.fullName,
                email: userInfo.email,
                phone: userInfo.phone, 
                DateReigsterMembership: currentDate.toISOString(),
                ExpirationDate: expirationDate.toISOString(),
            };

            const response = await axios.post('https://localhost:7240/api/Membership', updatedFormData,  {withCredentials:true});
            alert('Membership added successfully');
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setErrorMessage('Email already exists.');
            } else {
                setErrorMessage('Failed to add membership.');
            }
        }
    };

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
                  <Link to="/service" className="nav-item nav-link active">Service</Link>
                  <Link to="/blog" className="nav-item nav-link">Blog</Link>
                  <Link to="/profile/general" className="nav-item nav-link ">Profile</Link>
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
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h2 className="text-center mb-4">Add Membership</h2>
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control type="text" name="customerName" value={userInfo.fullName} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={userInfo.email} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" name="phone" value={userInfo.phone} readOnly />
                        </Form.Group>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        <Button type="submit" className="w-100">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
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

export default AddMembership;
