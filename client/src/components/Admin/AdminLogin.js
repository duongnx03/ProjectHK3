import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const userData = {
        username,
        password,
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            var response = await axios.post("https://localhost:7240/api/User/login", userData, { withCredentials: true });

            if (response.status === 200) {
                console.log("Login successful");
                // Redirect or handle success scenario
                navigate("/admin/blog")
            } else {
                throw new Error("Login failed. Invalid Username or Password.");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error occurred:", error);
        }
    };

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />
            {/* Font Awesome */}
            <link rel="stylesheet" href="../../plugins/fontawesome-free/css/all.min.css" />
            {/* icheck bootstrap */}
            <link rel="stylesheet" href="../../plugins/icheck-bootstrap/icheck-bootstrap.min.css" />
            {/* Theme style */}
            <link rel="stylesheet" href="../../dist/css/adminlte.min.css" />
            <div className="d-flex justify-content-center">
                <div className="login-box">
                    <div className="login-logo">
                        <b>Admin</b>
                    </div>
                    {/* /.login-logo */}
                    <div className="card">
                        <div className="card-body login-card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email or Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                    </div>
                                    {/* /.col */}
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                    </div>
                                    {/* /.col */}
                                </div>
                            </form>
                        </div>
                        {/* /.login-card-body */}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminLogin;
