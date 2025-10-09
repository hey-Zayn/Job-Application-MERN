import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Jobs from "./pages/Jobs";
// import { useSelector } from "react-redux";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import SingleJob from "./pages/job/SingleJob";

const App = () => {
  // const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={ <Home /> }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/singlejob" element={<SingleJob />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
