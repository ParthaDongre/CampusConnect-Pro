const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(cors());

const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources');

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);

app.get('/', (req, res) => {
    res.send('CampusConnect API is running...');
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });
