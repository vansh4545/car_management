// src/components/account/Signup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css'; // Import the CSS file
import { api } from '../../constants/config';

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('ghj');
            await axios.post('http://localhost:8000/signup', { name, username, email, password });
            alert('Signup successful! Please login.');
            navigate('/login'); // Redirect to login page after signup
        } catch (error) {
            console.error('Signup failed:', error.response?.data?.message || error.message);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="signup-input"
                />
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="signup-input"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="signup-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="signup-input"
                />
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
            <p className="login-text">
                Already have an account? <a href="/login" className="login-link">Login</a>
            </p>
        </div>
    );
};

export default Signup;
