import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-content">
        <h1>Welcome to the Main Page</h1>
        <p>Click the button below to go to the login form:</p>
        <Link to="/login">
          <button className="login-btn">Go to Login</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
