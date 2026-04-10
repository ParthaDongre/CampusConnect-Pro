const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// this route is for signing up a new student
router.post('/signup', async (req, res) => {
    try {
        const { name, email, branch, password } = req.body;

        // check if all fields are filled
        if (!name || !email || !branch || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // hashing the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating the new user
        const newUser = new User({
            name,
            email,
            branch,
            password: hashedPassword
        });

        // saving to mongodb
        await newUser.save();

        res.status(201).json({ message: 'User created successfully! You can now login.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong on the server' });
    }
});

// this route is for logging in
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // creating a jwt token
        const token = jwt.sign(
            { id: user._id, name: user.name, branch: user.branch },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                branch: user.branch
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router;
