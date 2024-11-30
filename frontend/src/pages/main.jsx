import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-content">
        <h1>Welcome to Coffee Brew</h1>
        <p>Click the button below to start your caffeinated adventure</p>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
