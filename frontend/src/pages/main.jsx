import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/mainpage.scss";

const MainPage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser && loggedInUser.apiToken) {
      navigate("/recipes");
    } else {
      navigate("/recipes-list");
    }
  };
  return (
    <div className="main-page">
      <div className="main-content">
        <img src="/mainpage.png" alt="main" />
        <button className="explore-btn" onClick={handleExploreClick}>
          Explore
        </button>
      </div>
    </div>
  );
};

export default MainPage;
