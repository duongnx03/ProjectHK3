import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileGeneral = () => {
    const [userInfo, setUserInfo] = useState({
        userId: '',
        userName: '',
        phone: '',
        email: '',
        avatar: '',
        isEmailConfirmed: false,
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [avatarError, setAvatarError] = useState('');

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('https://localhost:7240/api/User/getUserById', {
                withCredentials: true,
            });

            if (response.status !== 200) {
                console.error('Error fetching user information. Server response:', response.status);
                return;
            }

            setUserInfo({
                ...response.data,
                isEmailConfirmed: response.data.isConfirmed,
            });
        } catch (error) {
            console.error('Error in fetchUserInfo:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);
    };

    const handleSaveChanges = async () => {
        try {
            // Kiểm tra avatarFile
            if (!avatarFile) {
                setAvatarError('Avatar is required.');
                return;
            }

            // Xóa lỗi nếu hợp lệ
            setAvatarError('');

            const formData = new FormData();
            formData.append('avatarFile', avatarFile);

            const response = await axios.post('https://localhost:7240/api/User/uploadAvatar', formData, {
                withCredentials: true,
            });

            if (response.status === 200) {
                fetchUserInfo();
                setShowForm(false);
            } else {
                console.error('Không thể cập nhật avatar. Máy chủ trả về:', response.status);
            }
        } catch (error) {
            console.error('Lỗi trong quá trình handleSaveChanges:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        setAvatarUrl(`https://localhost:7240/api/User/getAvatar?${Math.random()}`);
    }, [userInfo]);

    return (
        <div className="tab-pane fade active show" id="account-general">
            <div className="card-body d-flex align-items-center">
                <img src={avatarUrl} alt="Avatar" className="d-block ui-w-80" crossOrigin="use-credentials" />
                <div className="ml-4 d-flex align-items-center">
                    {!showForm ? (
                        <button type="button" className="btn btn-primary btn-change" onClick={() => setShowForm(true)}>
                            Update Avatar
                        </button>
                    ) : (
                        <form>
                            <label className="btn mb-0">
                                <input type="file" className="form-control" onChange={handleFileChange} />
                            </label>
                            <button type="button" className="btn btn-primary ml-2" onClick={handleSaveChanges}>
                                Save
                            </button>
                            <div>
                                {avatarError && <div className="text-danger">{avatarError}</div>}
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <hr className="border-light m-0" />
            <div className="card-body">
                <input type="text" className="form-control" name="userId" value={userInfo.userId} hidden />
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" value={userInfo.userName} readOnly />
                </div>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={userInfo.email}
                        readOnly
                    />
                    {userInfo.isEmailConfirmed ? (
                        <div className="alert alert-success mt-2">
                            Your email is confirmed.
                        </div>
                    ) : (
                        <div className="alert alert-warning mt-2">
                            Your email is not confirmed. Please check your inbox.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileGeneral;
