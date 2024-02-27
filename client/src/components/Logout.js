import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Xóa trạng thái đăng nhập khỏi localStorage
        localStorage.removeItem('isLoggedIn');

        // Gọi API logout
        const logout = async () => {
            try {
                await axios.get('https://localhost:7240/api/User/logout', { withCredentials: true });
                navigate('/index');
                console.log('Logout successful');
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        logout();
    }, []);
};

export default Logout;
