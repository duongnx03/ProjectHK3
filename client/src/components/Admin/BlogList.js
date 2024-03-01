import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7240/api/blog/');
        const sortedBlogs = response.data.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
        setBlogs(sortedBlogs);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      const response = await axios.get(`https://localhost:7240/api/blog/search?keyword=${searchTerm}`);
      const sortedBlogs = response.data.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
      setBlogs(sortedBlogs);
    } catch (error) {
      console.error('Error searching blogs:', error);
    }
  };

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
            <span className="brand-text font-weight-light">Admin Laundry</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
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
              <form onSubmit={handleSearch}>
                <div className="row">
                  <div className="col-md-10 offset-md-1">
                    <div className="form-group">
                      <div className="input-group input-group-lg">
                        <input
                          type="search"
                          className="form-control form-control-lg"
                          placeholder="Search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
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
                      <h3><Link to='/admin/createblog'>Create New Blog</Link></h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <table id="example2" className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Index</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author(s)</th>
                            <th>Date Time</th>
                            <th>Image</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map((blog, index) => (
                            <tr key={blog.id}>
                              <td>{index + 1}</td> {/* Index column */}
                              <td>{blog.title}</td>
                              <td>{blog.content.substring(0, 100)}{blog.content.length > 100 && "..."}</td>
                              <td>{blog.author}</td>
                              <td>{new Date(blog.datePublished).toLocaleString()}</td>
                              <td>
                                {blog.imageUrl && (
                                  <img src={blog.imageUrl} alt="Blog" style={{ width: '100px', height: 'auto' }} />
                                )}
                              </td>
                              <td>
                                {/* Đặt liên kết để chuyển đến trang chỉnh sửa */}
                                <button><Link to={`/admin/editblog/${blog.blogPostId}`} style={{ color: 'green' }}>Edit</Link></button>
                                <button onClick={() => handleDelete(blog.blogPostId)} style={{ color: 'red' }}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* <div class="row">
                      <div class="col-sm-12 col-md-5">
                      </div>
                      <div class="col-sm-12 col-md-7">
                        <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                          <ul class="pagination">
                            <li class="paginate_button page-item previous disabled" id="example2_previous">
                              <a href="#" aria-controls="example2" data-dt-idx="0" tabIndex="0" class="page-link">Previous</a>
                            </li>
                            <li class="paginate_button page-item active"><a href="#" aria-controls="example2" data-dt-idx="1" tabIndex="0" class="page-link">1</a></li>
                            <li class="paginate_button page-item next" id="example2_next"><a href="#" aria-controls="example2" data-dt-idx="7" tabIndex="0" class="page-link">Next</a></li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
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
          <strong>Copyright © 2014-2021.</strong>
          All rights reserved.
          <div className="float-right d-none d-sm-inline-block">
            <b>LaundryStore </b>
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