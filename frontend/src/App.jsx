import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Jobs from "./pages/Jobs";
import { useSelector } from "react-redux";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import SingleJob from "./pages/job/SingleJob";
import Dashboard from "./pages/recuter-Dashboard/Dashboard";

import MyJobs from "./pages/Applicant/MyJobs";
import RegisterCompany from "./pages/recuter-Dashboard/RegisterCompany";
import Recruiterjobs from "./pages/recuter-Dashboard/recruiterjobs";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={user ? <Jobs /> : <Navigate to="/login" />} />
        <Route path="/singlejob/:id" element={user ? <SingleJob /> : <Navigate to="/login" />} />
        <Route path="/companies" element={user ? <Browse /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/recruiter/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/recruiter/jobs" element={user ? <Recruiterjobs /> : <Navigate to="/login" />} />



        <Route path="/register-company" element={user ? <RegisterCompany /> : <Navigate to="/login" />} />

        <Route path="/my-jobs" element={user ? <MyJobs /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
