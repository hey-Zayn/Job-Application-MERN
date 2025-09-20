# JobSync - Job Application Portal

A full-stack, responsive web application designed to connect job seekers with recruiters. This platform allows recruiters to create company profiles, post detailed job listings, and manage applications. Job seekers can create profiles, upload resumes, search for jobs, and track their applications.

![JobSync Screenshot](link-to-a-screenshot-or-gif-here) *// Add a screenshot later!*

## 🚀 Live Demo

Experience the application live: {---- Comming Soon ----}// Replace with your link*

## ✨ Features

### 👥 Role-Based Access Control
- **Job Seeker Role:** Create a profile, upload a resume, apply to jobs, and track applications.
- **Recruiter Role:** Create a company profile, post, edit, and manage job listings, and review applications.

### 💼 Core Functionality
- **User Authentication & Authorization:** Secure login/logout using JWT.
- **Company Profiles:** Recruiters can create and manage detailed company pages.
- **Job Listings:** Post new jobs with details like title, description, salary, and requirements.
- **Applications Management:** Job seekers can apply with one click; recruiters can view applicants' profiles and resumes.
- **Responsive Design:** Fully functional on desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Redux Toolkit (RTK Query for state management & caching), Shadcn/UI (built on Tailwind CSS)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Multer (for resume uploads, stored locally or on Cloudinary)
- **Deployment:** Vercel (Frontend), Render/Railway (Backend), MongoDB Atlas (Database)

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/jobsync-mern.git
    cd jobsync-mern
    ```

2.  **Install dependencies for both frontend and backend:**
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3.  **Environment Variables:**
    - Create a `.env` file in the `backend` directory:
      ```env
      MONGODB_URI=your_mongodb_connection_string
      JWT_SECRET=your_super_secret_jwt_key
      CLIENT_URL=http://localhost:5173 # Your frontend URL
      ```
    - Create a `.env` file in the `frontend` directory (if needed for e.g., API base URL):
      ```env
      VITE_API_BASE_URL=http://localhost:5000/api
      ```

4.  **Run the application:**
    ```bash
    # Run the backend (from /backend)
    npm run dev

    # Run the frontend (from /frontend)
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 📁 Project Structure
