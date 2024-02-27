import React, { useState } from "react";
import './userStyle/userStyle.css';
import 'boxicons/css/boxicons.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      var response = await axios.post("https://localhost:7240/api/User/login", userData, {withCredentials:true});
      if(response.status === 200){
        setLoading(true);
        localStorage.setItem('isLoggedIn', true);
        toast.info('Processing...',  { position: 'top-center' });
      }
      navigate('/index');
    } catch (error) {
      setLoading(true);
      toast.error(error.response.data,  { position: 'top-center' });
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className="wrappers">
      {/* Form box */}
      <div className="form-box">
        {/* Login form */}
        <form className="login-container" id="login" onSubmit={handleSubmit}>
          <div className="top">
            <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
            <header>Login</header>
          </div>
          <div className="input-box">
            <input type="text" className="input-field" placeholder="Username or Email" value={username} onChange={(e) => setUsername(e.target.value)} />
            <i className="bx bx-user"></i>
          </div>
          <div className="input-box">
            <input type="password" className="input-field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <i className="bx bx-lock-alt"></i>
          </div>
          <div className="input-box">
            <input type="submit" className="submit" value="Sign In" />
          </div>
          <div className="two-col">
            <div className="one">
            </div>
            <div className="two">
              <label><Link to="/forgotpassword">Forgot password?</Link></label>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;