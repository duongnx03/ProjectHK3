import React, { useEffect } from 'react';
import axios from 'axios';

const UserActivityTracker = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      checkAndUpdateUserStatus();
    }, 30000); 

    // Xóa bộ đếm khi component bị hủy
    return () => clearInterval(interval);
  }, []);

  // Hàm gửi yêu cầu kiểm tra và cập nhật trạng thái người dùng
  const checkAndUpdateUserStatus = async () => {
    try {
        await axios.get('https://localhost:7240/api/User/checkAndUpdateUserStatus', {withCredentials:true});
      console.log('User status checked and updated.');
    } catch (error) {
      console.error('Error while checking and updating user status:', error);
    }
  };

  // Hàm gửi yêu cầu cập nhật thời gian hoạt động của người dùng
  const updateUserActivityTime = async () => {
    try {
      await axios.get('https://localhost:7240/api/User/updateUserActivityTime', {withCredentials:true});
      console.log('User activity time updated.');
    } catch (error) {
      console.error('Error while updating user activity time:', error);
    }
  };

  // Xử lý sự kiện khi người dùng thực hiện hành động trên trang web
  const handleUserAction = () => {
    updateUserActivityTime();
  };

  // Lắng nghe sự kiện click hoặc các sự kiện khác
  useEffect(() => {
    window.addEventListener('click', handleUserAction);
    // Xóa lắng nghe khi component bị hủy
    return () => {
      window.removeEventListener('click', handleUserAction);
    };
  }, []);

  return <></>;
};

export default UserActivityTracker;
