import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7240/api/blog/');
        setBlogs(response.data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7240/api/blog/${id}`);
      setBlogs(blogs.filter(blog => blog.blogPostId !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  <h1>BlogList</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Blog List</li>
                  </ol>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <form action="enhanced-results.html">
                <div className="row">
                  <div className="col-md-10 offset-md-1">
                    <div className="row">
                      {/* <div className="col-6">
                    <div className="form-group">
                      <label>Result Type:</label>
                      <select className="select2" multiple="multiple" data-placeholder="Any" style={{ width: '100%' }}>
                      </select>
                    </div>
                  </div> */}
                      <div className="col-3">
                        <div className="form-group">
                          <label>Sort By Name:</label>
                          <select className="select2" style={{ width: '100%' }}>
                            <option selected>ASC</option>
                            <option>DESC</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label>Sort By Date:</label>
                          <select className="select2" style={{ width: '100%' }}>
                            <option selected>ASC</option>
                            <option>DESC</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-lg">
                        <input type="search" className="form-control form-control-lg" placeholder="Search" />
                        <div className="input-group-append">
                          <button type="submit" className="btn btn-lg btn-default">
                            <i className="fa fa-search" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
          {/* Content Header (Page header) */}
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      {/* <h3 className="card-title"><a href=''>Create New Blog</a></h3> */}
                      <h3><Link to='/createblog'>Create New Blog</Link></h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <table id="example2" className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author(s)</th>
                            <th>Date Time</th>
                            <th>Image</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map((blog) => (
                            <tr key={blog.id}>
                              <td>{blog.title}</td>
                              <td>{blog.content}</td>
                              <td>{blog.author}</td>
                              <td>{new Date(blog.datePublished).toLocaleString()}</td>
                              <td>
                                {blog.imageUrl && (
                                  <img src={blog.imageUrl} alt="Blog" style={{ width: '100px', height: 'auto' }} />
                                )}
                              </td>
                              <td>
                                {/* Đặt liên kết để chuyển đến trang chỉnh sửa */}
                                <Link to={`/editblog/${blog.blogPostId}`}>Edit</Link>
                                <button onClick={() => handleDelete(blog.blogPostId)}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 col-md-5">
                        <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 0 of 8 entries
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-7">
                        <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                          <ul class="pagination">
                            <li class="paginate_button page-item previous disabled" id="example2_previous">
                              <a href="#" aria-controls="example2" data-dt-idx="0" tabIndex="0" class="page-link">Previous</a>
                            </li>
                            <li class="paginate_button page-item active"><a href="#" aria-controls="example2" data-dt-idx="1" tabIndex="0" class="page-link">1</a></li>
                            <li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="2" tabIndex="0" class="page-link">2</a></li>
                            {/* <li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="3" tabIndex="0" class="page-link">3</a></li>
                      <li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="4" tabIndex="0" class="page-link">4</a></li>
                      <li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="5" tabIndex="0" class="page-link">5</a></li>
                      <li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="6" tabIndex="0" class="page-link">6</a></li> */}
                            <li class="paginate_button page-item next" id="example2_next"><a href="#" aria-controls="example2" data-dt-idx="7" tabIndex="0" class="page-link">Next</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                  </div>
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

export default BlogList;