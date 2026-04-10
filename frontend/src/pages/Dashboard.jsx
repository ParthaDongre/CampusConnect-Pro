import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [resources, setResources] = useState([]);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchResources = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/resources?branch=${filter}`);
            setResources(res.data);
        } catch (err) {
            console.log('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchResources();
    }, [filter]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;
        
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/resources/${id}`, {
                headers: { Authorization: token }
            });
            fetchResources();
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting');
        }
    };

    const filteredResources = resources.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
    });

    const getBranchClass = (branch) => {
        if (branch === 'Automation & Robotics') return 'branch-Automation';
        return `branch-${branch}`;
    };

    return (
        <div className="container">
            <div className="dash-header">
                <div>
                    <h1>CampusConnect Pro</h1>
                    <p>Sharing knowledge across branches</p>
                </div>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search by title..." 
                        className="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="filter-section">
                <label>Filter by Branch:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All Branches</option>
                    <option value="Computer">Computer</option>
                    <option value="IT">IT</option>
                    <option value="EXTC">EXTC</option>
                    <option value="ECS">ECS</option>
                    <option value="AIDS">AIDS</option>
                    <option value="Automation & Robotics">Automation & Robotics</option>
                </select>
                <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#666' }}>
                    Latest First
                </span>
            </div>

            <div className="grid">
                {filteredResources.length > 0 ? (
                    filteredResources.map((item) => (
                        <div key={item._id} className="card">
                            <span className={`branch-tag ${getBranchClass(item.branch)}`}>
                                {item.branch}
                            </span>
                            <h3>{item.title}</h3>
                            <p className="description">{item.description}</p>
                            
                            <a 
                                href={item.fileURL} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="btn view-btn"
                            >
                                View Resource
                            </a>

                            <div className="footer">
                                <span>By: {item.uploaderName}</span>
                                {user && user.id === item.uploadedBy && (
                                    <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No resources found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
