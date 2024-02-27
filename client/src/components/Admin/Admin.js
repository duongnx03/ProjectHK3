import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


const Admin = () => {
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
                                <Link to="/admin" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>
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
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Dashboard</h1>
                                </div>{/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>{/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            {/* Info boxes */}
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="info-box">
                                        <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Revenue</span>
                                            <span className="info-box-number">
                                                10,000. 23
                                                <small>$</small>
                                            </span>
                                        </div>
                                        {/* /.info-box-content */}
                                    </div>
                                    {/* /.info-box */}
                                </div>
                                {/* /.col */}
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="info-box mb-3">
                                        <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-thumbs-up" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Likes</span>
                                            <span className="info-box-number">41,410</span>
                                        </div>
                                        {/* /.info-box-content */}
                                    </div>
                                    {/* /.info-box */}
                                </div>
                                {/* /.col */}
                                {/* fix for small devices only */}
                                <div className="clearfix hidden-md-up" />
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="info-box mb-3">
                                        <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Sales</span>
                                            <span className="info-box-number">760</span>
                                        </div>
                                        {/* /.info-box-content */}
                                    </div>
                                    {/* /.info-box */}
                                </div>
                                {/* /.col */}
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="info-box mb-3">
                                        <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">New Members</span>
                                            <span className="info-box-number">2,000</span>
                                        </div>
                                        {/* /.info-box-content */}
                                    </div>
                                    {/* /.info-box */}
                                </div>
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                            <div className="row">
                                <div className="col-md-12">
                                </div>
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                            {/* Main row */}
                            <div className="row">
                                {/* Left col */}
                                <div className="col-md-8">
                                    {/* /.card */}
                                    {/* TABLE: LATEST ORDERS */}
                                    <div className="card">
                                        <div className="card-header border-transparent">
                                            <h3 className="card-title">Latest Orders</h3>
                                            <div className="card-tools">
                                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                    <i className="fas fa-minus" />
                                                </button>
                                                <button type="button" className="btn btn-tool" data-card-widget="remove">
                                                    <i className="fas fa-times" />
                                                </button>
                                            </div>
                                        </div>
                                        {/* /.card-header */}
                                        <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table className="table m-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Order ID</th>
                                                            <th>Item</th>
                                                            <th>Status</th>
                                                            <th>Popularity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><a href="pages/examples/invoice.html">OR9842</a></td>
                                                            <td>Call of Duty IV</td>
                                                            <td><span className="badge badge-success">Shipped</span></td>
                                                            <td>
                                                                <div className="sparkbar" data-color="#00a65a" data-height={20}>90,80,90,-70,61,-83,63</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><a href="pages/examples/invoice.html">OR1848</a></td>
                                                            <td>Samsung Smart TV</td>
                                                            <td><span className="badge badge-warning">Pending</span></td>
                                                            <td>
                                                                <div className="sparkbar" data-color="#f39c12" data-height={20}>90,80,-90,70,61,-83,68</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                                            <td>iPhone 6 Plus</td>
                                                            <td><span className="badge badge-danger">Delivered</span></td>
                                                            <td>
                                                                <div className="sparkbar" data-color="#f56954" data-height={20}>90,-80,90,70,-61,83,63</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                                            <td>Samsung Smart TV</td>
                                                            <td><span className="badge badge-info">Processing</span></td>
                                                            <td>
                                                                <div className="sparkbar" data-color="#00c0ef" data-height={20}>90,80,-90,70,-61,83,63</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><a href="pages/examples/invoice.html">OR1848</a></td>
                                                            <td>Samsung Smart TV</td>
                                                            <td><span className="badge badge-warning">Pending</span></td>
                                                            <td>
                                                                <div className="sparkbar" data-color="#f39c12" data-height={20}>90,80,-90,70,61,-83,68</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><a href="pages/examples/invoice.html">OR7429</a></td>
                                                            <td>iPhone 6 Plus</td>
                                                            <td><span className="badge badge-danger">Delivered</span></td>
                                                            <td>
                                                                <div className="sparkbar" data-color="#f56954" data-height={20}>90,-80,90,70,-61,83,63</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><a href="pages/examples/invoice.html">OR9842</a></td>
                                                            <td>Call of Duty IV</td>
                                                            <td><span className="badge badge-success">Shipped</span></td>
                                                            <td>
                                                                <div className="sparkbar" data-color="#00a65a" data-height={20}>90,80,90,-70,61,-83,63</div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* /.table-responsive */}
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer clearfix">
                                            <a href="javascript:void(0)" className="btn btn-sm btn-info float-left">Place New Order</a>
                                            <a href="javascript:void(0)" className="btn btn-sm btn-secondary float-right">View All Orders</a>
                                        </div>
                                        {/* /.card-footer */}
                                    </div>
                                    {/* /.card */}
                                </div>
                                {/* /.col */}
                                <div className="col-md-4">
                                    {/* Info Boxes Style 2 */}
                                    <div className="info-box mb-3 bg-warning">
                                        <span className="info-box-icon"><i className="fas fa-tag" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Inventory</span>
                                            <span className="info-box-number">5,200</span>
                                        </div>
                                        {/* /.info-box-content */}
                                    </div>
                                    {/* /.info-box */}
                                    <div className="info-box mb-3 bg-success">
                                        <span className="info-box-icon"><i className="far fa-heart" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Mentions</span>
                                            <span className="info-box-number">92,050</span>
                                        </div>
                                        {/* /.info-box-content */}
                                    </div>
                                    {/* /.info-box */}
                                    <div className="info-box mb-3 bg-danger">
                                        <span className="info-box-icon"><i className="fas fa-cloud-download-alt" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Downloads</span>
                                            <span className="info-box-number">114,381</span>
                                        </div>
                                        {/* /.info-box-content */}
                                    </div>
                                    {/* /.info-box */}
                                    <div className="info-box mb-3 bg-info">
                                        <span className="info-box-icon"><i className="far fa-comment" /></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Direct Messages</span>
                                            <span className="info-box-number">163,921</span>
                                        </div>
                                        {/* /.info-box-content */}
                                    </div>
                                </div>
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                        </div>{/*/. container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
                {/* /.content-wrapper */}
                {/* Control Sidebar */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                </aside>
                {/* /.control-sidebar */}
                {/* Main Footer */}
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

export default Admin;