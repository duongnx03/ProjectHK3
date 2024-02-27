import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        let timer;
        if (isCodeSent && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsCodeSent(false);
        }

        return () => clearTimeout(timer);
    }, [isCodeSent, countdown]);

    const handleSendCode = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://localhost:7240/api/User/sendCodeToResetPassword/${username}`);
            setLoading(false);
            toast.success(response.data);
            setCountdown(60);
            setIsCodeSent(true);
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message || { position: 'top-center' });
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const response = await axios.get(`https://localhost:7240/api/User/resetPassword/${username}/${newPassword}/${code}`);
            setLoading(false);
            toast.success(response.data);
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message || { position: 'top-center' });
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Forgot Password</div>
                        <div className="card-body">
                            <form onSubmit={handleResetPassword}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="code">Code</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="code"
                                            placeholder="Enter code"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            required
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className={`btn btn-primary ${isCodeSent ? 'disabled' : ''}`}
                                                onClick={handleSendCode}
                                                disabled={loading || isCodeSent} // Disable the button if loading or code already sent
                                            >
                                                {isCodeSent && countdown > 0 ? `Resend Code (${countdown}s)` : 'Get Code'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Reset Password
                                </button>
                            </form>
                            <div className="mt-3">
                                <Link to="/login">Back to Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
