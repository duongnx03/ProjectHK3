import React, { useEffect, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import axios from 'axios';
import { useAppContext } from './AppContext'; // Import the AppContext
import { useNavigate } from 'react-router-dom';

function SignalRLogout() {
    const { banned, setBanned } = useAppContext(); // Access the context
    const [countdown, setCountdown] = useState(10); // Initial countdown value
    const navigate = useNavigate();

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7240/banUserHub")
            .build();

        connection.start()
            .then(() => {
                console.log("SignalR connected");
            })
            .catch(error => {
                console.error("SignalR connection failed: ", error);
            });

        connection.on("UserBanned", () => {
            console.log("UserBanned event received");
            setBanned(true);
            const timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            // Clear the interval after 10 seconds
            setTimeout(() => {
                clearInterval(timer);
                localStorage.removeItem('isLoggedIn');
                logout();
            }, 10000);
        });

        return () => {
            connection.stop(); // Stop connection when component unmounts
        }
    }, []);

    function logout() {
        axios.get('https:localhost:7240/api/User/logout', { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    navigate('/login');
                    setBanned(false); // Reset banned state to false upon successful logout
                    // Redirect to login page or perform any additional actions after successful logout
                } else {
                    console.error("Logout failed: ", response.data.message);
                }
            })
            .catch(error => {
                console.error("Logout failed: ", error);
            });
    }

    return (
        <div>
            {banned && (
                <div className="alert alert-danger" role="alert">
                    You have been banned! Logging out in {countdown} seconds...
                </div>
            )}
        </div>
    );
}

export default SignalRLogout;
