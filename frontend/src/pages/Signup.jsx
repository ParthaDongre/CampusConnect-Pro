import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        branch: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
            setMessage(res.data.message);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error signing up');
        }
    };

    return (
        <div className="auth-card">
            <h2>Create Account</h2>
            {message && <p style={{ color: 'blue' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Branch</label>
                    <select name="branch" onChange={handleChange} required>
                        <option value="">Select Branch</option>
                        <option value="Computer">Computer</option>
                        <option value="IT">IT</option>
                        <option value="EXTC">EXTC</option>
                        <option value="ECS">ECS</option>
                        <option value="AIDS">AIDS</option>
                        <option value="Automation & Robotics">Automation & Robotics</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn">Sign Up</button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Signup;
