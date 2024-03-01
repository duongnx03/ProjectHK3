import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        dateTime: new Date().toISOString(), // DateTime now
        image: null // Initialize image as null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] }); // Update image with selected file
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('author', formData.author);
            formDataToSend.append('dateTime', formData.dateTime);
            formDataToSend.append('image', formData.image);

            await axios.post('https://localhost:7240/api/blog/', formDataToSend);
            // Navigate to BlogList after successful blog creation
            navigate('/admin/blogs');
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };


    return (
        <div>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Admin</title>
            {/* Google Font: Source Sans Pro */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />
            {/* Font Awesome Icons */}
            <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css" />
            {/* overlayScrollbars */}
            <link rel="stylesheet" href="plugins/overlayScrollbars/css/OverlayScrollbars.min.css" />
            {/* Theme style */}
            <link rel="stylesheet" href="dist/css/adminlte.min.css" />
            <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.1/dist/css/adminlte.min.css" />
            <div className="wrapper">
                {/* Navbar */}
                <nav className="main-header navbar navbar-expand navbar-dark">
                    {/* Left navbar links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="index.html" className="nav-link">Home</a>
                        </li>
                    </ul>
                    {/* Right navbar links */}
                    <ul className="navbar-nav ml-auto">
                        {/* Navbar Search */}
                        <li className="nav-item">
                            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                                <i className="fas fa-search" />
                            </a>
                            <div className="navbar-search-block">
                                <form className="form-inline">
                                    <div className="input-group input-group-sm">
                                        <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                        <div className="input-group-append">
                                            <button className="btn btn-navbar" type="submit">
                                                <i className="fas fa-search" />
                                            </button>
                                            <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                                <i className="fas fa-times" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                </nav>
                {/* /.navbar */}
                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <a href="index.html" className="brand-link">
                        <span className="brand-text font-weight-light">Admin Laundry</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item">
                                    <Link to="/admin/userlist" className="nav-link">
                                        <i className="nav-icon fas fa-book" />
                                        <p>
                                            Users
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/blogs" className="nav-link active">
                                        <i className="nav-icon fas fa-book" />
                                        <p>
                                            Blogs
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
                <div className="content-wrapper">

                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Create Blog</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Create Blog</li>
                                    </ol>
                                </div>
                            </div>
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* Content Header (Page header) */}
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Title:</label>
                                            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Content:</label>
                                            <textarea className="form-control" name="content" value={formData.content} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Author:</label>
                                            <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Image:</label>
                                            <input type="file" className="form-control-file" name="image" onChange={handleChange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Create</button>
                                    </form>
                                </div>
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
                <footer className="main-footer">
                    <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>New Decade </b>
                    </div>
                </footer>
            </div>

            <script src="plugins/jquery/jquery.min.js"></script>

            <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
            <script src="dist/js/adminlte.js"></script>

            <script src="https://cdn.jsdelivr.net/npm/admin-lte@3.1/dist/js/adminlte.min.js"></script>

            <script src="plugins/jquery-mousewheel/jquery.mousewheel.js"></script>
            <script src="plugins/raphael/raphael.min.js"></script>
            <script src="plugins/jquery-mapael/jquery.mapael.min.js"></script>
            <script src="plugins/jquery-mapael/maps/usa_states.min.js"></script>
            <script src="plugins/chart.js/Chart.min.js"></script>

            <script src="dist/js/demo.js"></script>
            <script src="dist/js/pages/dashboard2.js"></script>
        </div>
    )
}

export default CreateBlog;