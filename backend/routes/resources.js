const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Resource = require('../models/Resource');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

router.get('/', async (req, res) => {
    try {
        const { branch } = req.query;
        let query = {};
        
        if (branch && branch !== 'All') {
            query.branch = branch;
        }

        const resources = await Resource.find(query).sort({ createdAt: -1 });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching resources' });
    }
});

router.post('/upload', auth, async (req, res) => {
    try {
        const { title, description, branch, fileURL } = req.body;

        if (!title || !description || !branch || !fileURL) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newResource = new Resource({
            title,
            description,
            branch,
            fileURL,
            uploadedBy: req.user.id,
            uploaderName: req.user.name
        });

        await newResource.save();
        res.status(201).json({ message: 'Resource shared successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error uploading resource' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await Resource.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        if (item.uploadedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own posts' });
        }

        await Resource.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting resource' });
    }
});

module.exports = router;
