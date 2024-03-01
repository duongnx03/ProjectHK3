import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMessage, setSearchMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://localhost:7240/api/User/getAllUsers', {
                withCredentials: true,
            });
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handleSearch = () => {
        axios.get(`https://localhost:7240/api/User/searchUser/${searchTerm}`, {
            withCredentials: true,
        })
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data);
                    setSearchMessage('');
                } else {
                    setUsers([]);
                    setSearchMessage('Not found.');
                }
            })
            .catch(error => {
                console.error('Error searching for users:', error);
            });
    };

    const handleBanUser = (userId) => {
        const endpoint = `banUser/${userId}`;
        axios.get(`https://localhost:7240/api/User/${endpoint}`, {
            withCredentials: true,
        })
            .then(response => {
                console.log(response.data);
                fetchUsers(); // Làm mới danh sách người dùng sau khi thực hiện hành động ban
            })
            .catch(error => {
                console.error('Error banning user:', error);
            });
    };

    const handleCancelBanUser = (userId) => {
        const endpoint = `cancelBanUser/${userId}`;
        axios.get(`https://localhost:7240/api/User/${endpoint}`, {
            withCredentials: true,
        })
            .then(response => {
                console.log(response.data);
                fetchUsers(); // Làm mới danh sách người dùng sau khi thực hiện hành động hủy ban
            })
            .catch(error => {
                console.error('Error canceling ban for user:', error);
            });
    };

    function formatRegisterTime(registerTime) {
        if (!registerTime) return ''; // Handle case when registerTime is not available

        const date = new Date(registerTime);
        return date.toLocaleString(); // Use toLocaleString for a localized date and time representation
    }

    return (
        <div>
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
                        {/* Sidebar user panel (optional) */}
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item">
                                    <Link to="/admin/userlist" className="nav-link active">
                                        <i className="nav-icon fas fa-book" />
                                        <p>
                                            Users
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/blogs" className="nav-link">
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
                            <div className="row">
                                <div className="col-sm-6">
                                    <h1>User List</h1>
                                </div>
                                <div className="col-sm-6 d-none d-sm-block">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">User List</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="content pb-3">
                        <div className="input-group">
                            <input
                                type="search"
                                className="form-control form-control-lg"
                                placeholder="Type username to search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className="btn btn-lg btn-default"
                                    onClick={handleSearch}
                                >
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <br />
                        {searchMessage && (
                            <div className="alert alert-info" role="alert">
                                {searchMessage}
                            </div>
                        )}
                        {users.length > 0 && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Membership</th>
                                        <th scope="col">Register time</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Ban</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.userName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.membership ? user.membership : 'Not registered'}</td>
                                            <td>{formatRegisterTime(user.registerTime)}</td>
                                            <td>{user.isOnline}</td>
                                            <td>
                                                <button className={`btn ${user.isBan ? 'btn-warning' : 'btn-primary'}`} onClick={() => user.isBan ? handleCancelBanUser(user.userId) : handleBanUser(user.userId)}>
                                                    {user.isBan ? 'Cancel' : 'Ban'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </section>
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

export default UserList;