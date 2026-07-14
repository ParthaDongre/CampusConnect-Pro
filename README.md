# 🎓 CampusConnect Pro

A comprehensive, full-stack Academic Resource Sharing Platform designed specifically for college campuses. CampusConnect Pro serves as a secure, centralized hub enabling students to discover, view, upload, and manage study materials, course notes, and past exam papers sorted specifically by academic branch.

---

## 🌟 Features

*   **Secure User Authentication:** SignUp and Login system powered by JSON Web Tokens (JWT) and Bcrypt password hashing.
*   **Branch-Wise Sorting:** Organizes and filters study resources dynamically based on academic departments (e.g., Computer Science, IT, Electronics).
*   **Material Upload Center:** Easy-to-use form allowing authenticated users to post files, titles, descriptions, and branch categorizations.
*   **Interactive Dashboard:** A central feed displaying recently uploaded resources with quick links to download/view files.
*   **Owner Access Controls:** Provides deletion rights to the uploaders so they can manage their own shared documents securely.
*   **Responsive Glassmorphism UI:** Styled using vanilla CSS for a modern, glassmorphic, and high-performance design across mobile and desktop.

---

## 📁 Project Structure

*   **CampusConnect-Pro/** (Root directory)
    *   **backend/** — Node.js and Express.js API Server
        *   **models/** — Mongoose database models (User, Resource)
        *   **routes/** — API endpoints (auth.js, resources.js)
        *   **server.js** — Main backend server and database connector
    *   **frontend/** — React and Vite single-page application
        *   **src/**
            *   **components/** — Shared UI components (Navbar, Resource Card)
            *   **pages/** — View pages (Dashboard, Login, Signup, Upload)
            *   **App.jsx** — Main routing configuration
            *   **index.css** — Modern global styling and design tokens
        *   **index.html** — Entry point HTML template
    *   **README.md** — Project documentation and setup guide

---

## ⚙️ Setup and Installation

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **MongoDB** installed on your local computer.

### 2. Backend Installation and Environment Setup
Open your terminal, navigate to the **backend** directory, and install dependencies by running the following commands:

*   **cd backend**
*   **npm install**

Create a new file named **.env** in the **backend** directory and add your configurations:

*   **PORT=5000**
*   **MONGO_URI=your_mongodb_connection_string**
*   **JWT_SECRET=your_secret_jwt_key**

### 3. Frontend Installation
Open a new terminal window, navigate to the **frontend** directory, and install dependencies by running the following commands:

*   **cd frontend**
*   **npm install**

---

## 🚀 Running the Web App

You will need to run both the backend server and the frontend client simultaneously.

### 1. Start the Backend Server
In your backend terminal, run the command:
*   **node server.js**

The API server will start running at the local address: **http://localhost:5000**

### 2. Start the Frontend Client
In your frontend terminal, run the command:
*   **npm run dev**

The frontend application will start running at the local address: **http://localhost:5173**

---

## 🛑 Stopping the Web App

To stop either the backend server or the frontend client:
1. Go to the terminal window where the process is running.
2. Press **Ctrl + C** on your keyboard.
3. The server/client will shut down gracefully.

---

## 🧠 How it Works

1.  **Authentication:** When a user registers or logs in, their password is encrypted using Bcrypt. On login, the backend responds with a signed JWT.
2.  **Protected Operations:** When sharing a resource or deleting one, the frontend includes this JWT in the request headers (**Authorization**). The backend verifies the token prior to executing database changes.
3.  **Data Fetching:** The React dashboard performs Axios calls to **/api/resources** on load, fetching matching records from MongoDB and dynamically updating the UI.

---

## 📄 License
This project is built for educational and demonstration purposes. Feel free to modify and expand its functionality!
