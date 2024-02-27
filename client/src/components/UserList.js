import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
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
    );
}

export default UserList;