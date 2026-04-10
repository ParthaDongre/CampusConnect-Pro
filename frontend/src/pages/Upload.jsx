import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [branch, setBranch] = useState(''); 
    const [fileURL, setFileURL] = useState('');
    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Attempt:', { title, description, branch, fileURL });

        if (!title.trim() || !description.trim() || !branch.trim() || !fileURL.trim()) {
            alert('Please fill all fields. Make sure to select a Branch!');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Session expired. Please login again.');
                return navigate('/login');
            }

            const dataToSubmit = {
                title: title.trim(),
                description: description.trim(),
                branch: branch,
                fileURL: fileURL.trim()
            };

            await axios.post('http://localhost:5000/api/resources/upload', dataToSubmit, {
                headers: { Authorization: token }
            });

            alert('Resource shared successfully!');
            navigate('/'); 
        } catch (err) {
            console.error("Upload Error:", err);
            alert(err.response?.data?.message || 'Server error during upload');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', marginTop: '50px' }}>
            <div className="auth-card" style={{ padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Share Resource</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold' }}>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Operating Systems Unit 1"
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold' }}>Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            placeholder="Briefly describe the contents..."
                        ></textarea>
                    </div>

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold' }}>Branch</label>
                        <select
                            className="form-control"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                        >
                            <option value="">-- Click to Select Branch --</option>
                            <option value="Computer">Computer</option>
                            <option value="IT">IT</option>
                            <option value="EXTC">EXTC</option>
                            <option value="ECS">ECS</option>
                            <option value="AIDS">AIDS</option>
                            <option value="Automation & Robotics">Automation & Robotics</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '25px' }}>
                        <label style={{ fontWeight: 'bold' }}>Resource URL (Google Drive / PDF)</label>
                        <input
                            type="text"
                            className="form-control"
                            value={fileURL}
                            onChange={(e) => setFileURL(e.target.value)}
                            placeholder="https://drive.google.com/..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '10px', fontWeight: 'bold' }}
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Post Note'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload;