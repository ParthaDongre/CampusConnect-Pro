import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        } catch (err) {
            setErr(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-card">
            <h2>Login</h2>
            {err && <p style={{ color: 'red' }}>{err}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Don't have an account? <Link to="/signup">Signup here</Link>
            </p>
        </div>
    );
};

export default Login;
