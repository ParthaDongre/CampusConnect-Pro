const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Resource = require('./models/Resource');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB for seeding...'))
    .catch(err => console.log('Seeding error:', err));

const seedData = [
    // Computer Branch
    {
        title: 'Operating Systems Unit 2 Notes',
        description: 'Comprehensive guide to OS scheduling and memory management.',
        branch: 'Computer',
        fileURL: 'https://www.tutorialspoint.com/operating_system/operating_system_tutorial.pdf',
        uploaderName: 'Admin'
    },
    {
        title: 'Data Structures Lab Manual',
        description: 'Step-by-step implementations of fundamental algorithms.',
        branch: 'Computer',
        fileURL: 'https://www.cl.cam.ac.uk/teaching/1011/AlgorithI/algs-notes-annotated.pdf',
        uploaderName: 'Admin'
    },
    {
        title: 'Algorithm Analysis Guide',
        description: 'Deep dive into Big O notation and algorithm efficiency.',
        branch: 'Computer',
        fileURL: 'https://www.cs.princeton.edu/courses/archive/spr10/cos226/lectures/01-12AnalysisOfAlgorithms-2x2.pdf',
        uploaderName: 'Admin'
    },
    // IT Branch
    {
        title: 'DBMS SQL Cheat Sheet',
        description: 'Essential SQL commands for quick exam revision.',
        branch: 'IT',
        fileURL: 'https://web.stanford.edu/class/cs145/cheatsheet.pdf',
        uploaderName: 'Admin'
    },
    {
        title: 'Web Tech Project Ideas',
        description: 'A curated list of modern full-stack project concepts.',
        branch: 'IT',
        fileURL: 'https://www.w3schools.com/whatis/whatis_backend_fullstack.asp',
        uploaderName: 'Admin'
    },
    {
        title: 'Network Security Fundamentals',
        description: 'Basics of securing modern data networks.',
        branch: 'IT',
        fileURL: 'https://www.cisco.com/c/dam/en_us/about/ac123/ac147/archived_issues/ipj_10-1/101_network-security.pdf',
        uploaderName: 'Admin'
    },
    // EXTC Branch
    {
        title: 'Microprocessor 8085 Pin Diagrams',
        description: 'Technical pin-out documentation for the 8085 chip.',
        branch: 'EXTC',
        fileURL: 'https://nptel.ac.in/content/storage2/courses/108107029/module1/lecture1.pdf',
        uploaderName: 'Admin'
    },
    {
        title: 'Analog Communication PPT',
        description: 'Detailed presentation on modulation techniques.',
        branch: 'EXTC',
        fileURL: 'https://examupdates.in/wp-content/uploads/2017/04/Analog-Communication-Notes.pdf',
        uploaderName: 'Admin'
    },
    {
        title: 'Antenna Theory Notes',
        description: 'Engineering principles of radio frequency communication.',
        branch: 'EXTC',
        fileURL: 'http://www.jpier.org/PIER/pier.php?paper=0512161',
        uploaderName: 'Admin'
    },
    // ECS Branch
    {
        title: 'Control Systems Handwritten Notes',
        description: 'High-quality scans of hand-written control system examples.',
        branch: 'ECS',
        fileURL: 'https://nitsri.ac.in/Department/Electrical%20Engineering/Control_Systems_Notes.pdf',
        uploaderName: 'Admin'
    },
    {
        title: 'Digital Logic Design PYQs',
        description: 'Past year papers focused on boolean algebra and gates.',
        branch: 'ECS',
        fileURL: 'https://www.tutorialspoint.com/digital_circuits/digital_circuits_tutorial.pdf',
        uploaderName: 'Admin'
    },
    {
        title: 'Circuit Analysis Basics',
        description: 'Fundamental circuit theorems for electronics students.',
        branch: 'ECS',
        fileURL: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-01sc-introduction-to-electrical-engineering-and-computer-science-i-spring-2011/unit-1-software-engineering/circuits/MIT6_01SCS11_chap05.pdf',
        uploaderName: 'Admin'
    },
    // AIDS Branch
    {
        title: 'Intro to Neural Networks PDF',
        description: 'A mathematical introduction to biological and artificial neurons.',
        branch: 'AIDS',
        fileURL: 'https://proglib.io/p/pandas-cheat-sheet-2021-03-12',
        uploaderName: 'Admin'
    },
    {
        title: 'Pandas & Numpy Tutorial',
        description: 'Data science cheat sheets for python libraries.',
        branch: 'AIDS',
        fileURL: 'https://s3.amazonaws.com/assets.datacamp.com/blog_assets/PandasPythonForDataScience.pdf',
        uploaderName: 'Admin'
    },
    {
        title: 'Machine Learning Roadmap',
        description: 'Comprehensive guide to beginning a career in AI.',
        branch: 'AIDS',
        fileURL: 'https://web.stanford.edu/class/cs229/notes/cs229-notes1.pdf',
        uploaderName: 'Admin'
    },
    // Automation & Robotics Branch
    {
        title: 'Kinematics of Robots Guide',
        description: 'Mathematical foundations of robotic movement.',
        branch: 'Automation & Robotics',
        fileURL: 'https://www.cs.duke.edu/brd/Teaching/BioGeometry/Lectures/Intro/robotics-kinematics.pdf',
        uploaderName: 'Admin'
    },
    {
        title: 'PLC Programming Basics',
        description: 'Industrial automation using programmable logic controllers.',
        branch: 'Automation & Robotics',
        fileURL: 'https://www.eng.utoledo.edu/~wevans/chap1_web.pdf',
        uploaderName: 'Admin'
    },
    {
        title: 'Sensor & Actuator Handbook',
        description: 'Physical components used in robotic systems.',
        branch: 'Automation & Robotics',
        fileURL: 'https://www.ece.rutgers.edu/~jmcneely/ee382/sensors_actuators.pdf',
        uploaderName: 'Admin'
    }
];

const seedDB = async () => {
    try {
        let admin = await User.findOne({ email: 'admin@campusconnect.com' });
        if (!admin) {
            admin = new User({
                name: 'System Admin',
                email: 'admin@campusconnect.com',
                branch: 'IT',
                password: 'adminpassword123'
            });
            await admin.save();
        }

        await Resource.deleteMany({});

        const finalData = seedData.map(item => ({
            ...item,
            uploadedBy: admin._id
        }));

        await Resource.insertMany(finalData);
        console.log('Database Seeded Successfully with Fixed Bug URLs!');
        process.exit();
    } catch (err) {
        console.log('Error during seeding:', err);
        process.exit(1);
    }
};

seedDB();
