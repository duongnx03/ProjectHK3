import React, { useState, useEffect } from "react";
import { Link , useParams} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        dateTime: new Date().toISOString(),
        image: null
    });

    const navigate = useNavigate();
    const { id } = useParams(); // Lấy ID bài đăng blog từ params URL

    useEffect(() => {
        if (id) {
            // Lấy dữ liệu bài đăng blog nếu đang chỉnh sửa
            fetchBlogPost(id);
        }
    }, [id]);

    const fetchBlogPost = async (id) => {
        try {
            const response = await axios.get(`https://localhost:7240/api/blog/${id}`);
            const { title, content, author, dateTime, imageUrl } = response.data;
            setFormData({ title, content, author, dateTime, image: null }); // Giả sử ảnh không thể chỉnh sửa
        } catch (error) {
            console.error('Lỗi khi lấy bài đăng blog:', error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
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

            if (id) {
                // Nếu đang chỉnh sửa, gửi yêu cầu PUT để cập nhật bài đăng blog
                await axios.put(`https://localhost:7240/api/blog/${id}`, formDataToSend);
            } else {
                // Nếu tạo mới, gửi yêu cầu POST để tạo bài đăng blog mới
                await axios.post('https://localhost:7240/api/blog/', formDataToSend);
            }
            navigate('/adminblogs');
        } catch (error) {
            console.error('Lỗi khi tạo/chỉnh sửa bài đăng blog:', error);
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
                    {/* Brand Logo */}
                    <a href="index.html" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">Admin</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Group 3</a>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item menu-open">
                                    <Link to="/admin" className="nav-link">
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Dashboard
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/adminblogs" className="nav-link">
                                        <i className="nav-icon fas fa-book" />
                                        <p>
                                            Blogs
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/widgets.html" className="nav-link">
                                        <i className="nav-icon fas fa-th" />
                                        <p>
                                            Widgets
                                            <span className="right badge badge-danger">New</span>
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-header">ORTHER</li>
                                <li className="nav-item">
                                    <a href="pages/calendar.html" className="nav-link">
                                        <i className="nav-icon fas fa-calendar-alt" />
                                        <p>
                                            Calendar
                                            <span className="badge badge-info right">2</span>
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/kanban.html" className="nav-link">
                                        <i className="nav-icon fas fa-columns" />
                                        <p>
                                            Kanban Board
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon far fa-envelope" />
                                        <p>
                                            Mailbox
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/mailbox/mailbox.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Inbox</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/mailbox/compose.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Compose</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/mailbox/read-mail.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Read</p>
                                            </a>
                                        </li>
                                    </ul>
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
                                    <h1>Edit Blog</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Edit Blog</li>
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
                                        <button type="submit" className="btn btn-primary">Update</button>

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

export default EditBlog;