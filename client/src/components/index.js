import React from "react";
import './css/bootstrap.min.css';
import './css/style.css';
import './img/logo.png';
import hinh1 from './img/hinh1.jpeg';
import { Link } from "react-router-dom";

const Index = ({ }) => {
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
                                <Link to="/index" className="nav-item nav-link active">Home</Link>
                                <Link to="/service" className="nav-item nav-link">Service</Link>
                                <Link to="/contact" className="nav-item nav-link">Contact</Link>
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
            {/* About Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-6 col-md-12 wow fadeInUp" data-wow-delay=".3s">
                            <div className="about-img">
                                <div className="rotate-left bg-dark" />
                                <div className="rotate-right bg-dark" />
                                <img src={hinh1} className="img-fluid h-100" alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 wow fadeInUp" data-wow-delay=".6s">
                            <div className="about-item overflow-hidden">
                                <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">About LaundryStore</h5>
                                <h1 className="display-5 mb-2">The best online laundry place</h1>
                                <p className="fs-5" style={{ textAlign: 'justify' }}>We are Laundry Store, when you come to us, you will experience the best laundry service here, we have enough washing machines to meet everyone's needs, and customers will experience many services such as drying, bleaching and some other services completely free of charge when coming to Laudry Store, everyone will be multiplied Our staff guides the laundry process at LaundryStore so that users have the most comfortable experience when experiencing our services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
            {/* pricing Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="text-center mb-5 wow fadeInUp" data-wow-delay=".3s">
                        <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">Our Pricing</h5>
                        <h1 className="display-5 w-50 mx-auto">Affordable Pricing Plan For Pest Control Services</h1>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".3s">
                            <div className="rounded bg-light pricing-item">
                                <div className="bg-primary py-3 px-5 text-center rounded-top border-bottom border-dark">
                                    <h2 className="m-0">Basic</h2>
                                </div>
                                <div className="px-4 py-5 text-center bg-primary pricing-label mb-2">
                                    <h1 className="mb-0">$60<span className="text-secondary fs-5 fw-normal">/mo</span></h1>
                                    <p className="mb-0">Basic Pest Control</p>
                                </div>
                                <div className="p-4 text-center fs-5">
                                    <p><i className="fa fa-check text-success me-2" />Household pests Control</p>
                                    <p><i className="fa fa-check text-success me-2" />Rodent Control</p>
                                    <p><i className="fa fa-check text-success me-2" />Re-Service at No-Charge</p>
                                    <p><i className="fa fa-times text-danger me-2" />Termite Control</p>
                                    <p><i className="fa fa-times text-danger me-2" />Mosquito Reduction</p>
                                    <button type="button" className="btn btn-primary border-0 rounded-pill px-4 py-3 mt-3">Get Started</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".5s">
                            <div className="rounded bg-light pricing-item">
                                <div className="bg-dark py-3 px-5 text-center rounded-top border-bottom border-primary">
                                    <h2 className="m-0 text-primary">Standerd</h2>
                                </div>
                                <div className="px-4 py-5 text-center bg-dark pricing-label pricing-featured mb-2">
                                    <h1 className="mb-0 text-primary">$80<span className="fs-5 fw-normal">/mo</span></h1>
                                    <p className="mb-0 text-white">Standard Pest Control</p>
                                </div>
                                <div className="p-4 text-center fs-5">
                                    <p><i className="fa fa-check text-success me-2" />Household pests Control</p>
                                    <p><i className="fa fa-check text-success me-2" />Rodent Control</p>
                                    <p><i className="fa fa-check text-success me-2" />Re-Service at No-Charge</p>
                                    <p><i className="fa fa-check text-success me-2" />Termite Control</p>
                                    <p><i className="fa fa-times text-danger me-2" />Mosquito Reduction</p>
                                    <button type="button" className="btn btn-dark border-0 text-primary rounded-pill px-4 py-3 mt-3">Get Started</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".7s">
                            <div className="rounded bg-light pricing-item">
                                <div className="bg-primary py-3 px-5 text-center rounded-top border-bottom border-dark">
                                    <h2 className="m-0">Premium</h2>
                                </div>
                                <div className="px-4 py-5 text-center bg-primary pricing-label mb-2">
                                    <h1 className="mb-0">$120<span className="text-secondary fs-5 fw-normal">/mo</span></h1>
                                    <p className="mb-0">Premium Pest Control</p>
                                </div>
                                <div className="p-4 text-center fs-5">
                                    <p><i className="fa fa-check text-success me-2" />Household pests Control</p>
                                    <p><i className="fa fa-check text-success me-2" />Rodent Control</p>
                                    <p><i className="fa fa-check text-success me-2" />Re-Service at No-Charge</p>
                                    <p><i className="fa fa-check text-success me-2" />Termite Control</p>
                                    <p><i className="fa fa-check text-success me-2" />Mosquito Reduction</p>
                                    <button type="button" className="btn btn-primary border-0 rounded-pill px-4 py-3 mt-3">Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pricing End */}
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
};

export default Index;