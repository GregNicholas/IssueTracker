import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Signup from "./authentication/Signup";
import { AuthProvider } from "../contexts/AuthContext";
import Login from "./authentication/Login";
import Logout from "./authentication/Logout";
import PrivateWrapper from "./authentication/PrivateWrapper";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";

//import AdminDashboard from "./AdminDashboard";
import { db } from "../firebase";

import Header from "./Header";
import Home from "./Home";
import Issues from "./Issues";
import AddIssue from "./AddIssue";
import EditIssue from "./EditIssue";
import Profile from "./Profile";

// import IssuesContext from "../contexts/IssuesContext";

export default function App() {
  return (
    <div className="page-container">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route element={<PrivateWrapper />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/add-issue" element={<AddIssue />} />
            <Route path="/edit-issue" element={<EditIssue />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}
