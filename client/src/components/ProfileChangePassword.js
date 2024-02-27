import React, { useState } from 'react';
import axios from 'axios';

const ProfileChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !repeatNewPassword) {
      setSuccessMessage('');
      setErrorMessage('Please fill in all fields');
      return;
    }
    const passwordRegex = /^(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/;
    if (!passwordRegex.test(newPassword)) {
        setSuccessMessage('');
        setErrorMessage('New password must contain at least one special character');
        return;
    }
    if (newPassword !== repeatNewPassword) {
      setSuccessMessage('');
      setErrorMessage('New passwords do not match');
      return;
    }
  
    try {
      const response = await axios.put(
        'https://localhost:7240/api/User/changePassword',
        {
          OldPassword: oldPassword,
          NewPassword: newPassword,
        },
        {
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        setSuccessMessage('Password changed successfully');
        setErrorMessage('');
      } 
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="tab-pane fade active show" id="account-change-password">
      <div className="card-body pb-2">
        <div className="form-group">
          <label className="form-label">Current password</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">New password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Repeat new password</label>
          <input
            type="password"
            className="form-control"
            value={repeatNewPassword}
            onChange={(e) => setRepeatNewPassword(e.target.value)}
          />
        </div>
        <div className="text-right mt-3">
          <button type="button" className="btn btn-primary" onClick={handleChangePassword}>
            Save changes
          </button>
          &nbsp;
        </div>
        {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default ProfileChangePassword;
