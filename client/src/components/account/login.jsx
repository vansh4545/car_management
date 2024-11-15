// src/components/account/Login.js

import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Import the CSS file
import { api } from '../../constants/config';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
                navigate('/cars');
            }
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="login-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            <p className="signup-text">
                New User? <Link to="/signup" className="signup-link">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
