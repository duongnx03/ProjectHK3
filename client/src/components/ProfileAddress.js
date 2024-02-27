import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileAddress = () => {
    const [userInfo, setUserInfo] = useState({
        userId: '',
        fullName: '',
        address: '',
        phone:'',
    });

    const [initialUserInfo, setInitialUserInfo] = useState({}); // State to store initial values
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedSuccess, setUpdatedSuccess] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('https://localhost:7240/api/User/getUserById', {
                withCredentials: true,
            });

            if (response.status !== 200) {
                console.error('Lỗi khi lấy thông tin người dùng. Máy chủ trả về:', response.status);
                return;
            }

            setUserInfo({
                ...response.data,
                isEmailConfirmed: response.data.isConfirmed,
            });

            // Store initial values when fetching user info
            setInitialUserInfo(response.data);
        } catch (error) {
            console.error('Lỗi trong quá trình fetchUserInfo:', error);
        }
    };

    const handleUpdateInfo = async () => {
        try {
            if (!userInfo.fullName || !userInfo.address || !userInfo.phone) {
                setFullnameError('Full Name is required.');
                setAddressError('Address is required.');
                setPhoneError('Phone is required.');
                return;
            }

            // Validate phone number length
            if (userInfo.phone.length !== 10) {
                setPhoneError('Phone number must be 10 digits long.');
                return;
            }

            // Clear errors if valid
            setFullnameError('');
            setAddressError('');
            setPhoneError('');

            const response = await axios.put(
                'https://localhost:7240/api/User/editInfo',
                {
                    Fullname: userInfo.fullName,
                    Address: userInfo.address,
                    Phone: userInfo.phone
                },
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                // Exit edit mode after successful update
                setIsEditMode(false);
                setUpdatedSuccess("Update successfully!");
            } else {
                // Handle failure
                console.error('Failed to change info. Server response:', response);
            }
        } catch (error) {
            console.error('Error while updating info:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleCancelEdit = () => {
        // Revert form fields to initial values
        setUserInfo(initialUserInfo);
        // Clear any existing error messages
        setFullnameError('');
        setAddressError('');
        setPhoneError('');
        // Exit edit mode
        setIsEditMode(false);
    };

    return (
        <div className="tab-pane fade active show" id="account-general">
            <hr className="border-light m-0" />
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={userInfo.fullName}
                        readOnly={!isEditMode}
                        onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={userInfo.address}
                        readOnly={!isEditMode}
                        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={userInfo.phone}
                        readOnly={!isEditMode}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    />
                </div>
                <div className="text-right mt-3">
                    {isEditMode ? (
                        <div>
                            <button type="button" className="btn btn-secondary mr-2" onClick={handleCancelEdit}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdateInfo}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <button type="button" className="btn btn-primary" onClick={() => setIsEditMode(true)}>
                            Update
                        </button>
                    )}
                </div>
                {updatedSuccess && <div className="alert alert-success mt-2">{updatedSuccess}</div>}
            </div>
        </div>
    );
};

export default ProfileAddress;
