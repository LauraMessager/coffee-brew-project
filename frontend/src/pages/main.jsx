import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import "../styles/mainpage.scss";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-content">
        <img src="/mainpage.png" alt="main" />
        <Link to="/login">
          <button className="login-btn">Explore</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
