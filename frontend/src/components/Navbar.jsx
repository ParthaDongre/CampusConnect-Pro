import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    // this function handles logging out by clearing local storage
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>CampusConnect</Link>
            </div>
            <div className="links">
                {user ? (
                    <>
                        <span>Welcome, {user.name}</span>
                        <Link to="/">Dashboard</Link>
                        <Link to="/upload">Upload</Link>
                        <a href="#" onClick={handleLogout}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
