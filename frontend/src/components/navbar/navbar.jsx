import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.scss";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <label htmlFor="hamburger-input" className="navbar__label">
        <span>&#9776;</span>
      </label>
      <Link to="/">
        <img src="/CoffeeBrewLogo.png" alt="Logo" />
      </Link>
      <input
        type="checkbox"
        id="hamburger-input"
        className="navbar__input"
        style={{ display: "none" }}
      />
      <div>
        <ul>
          {!user && (
            <>
              <li>
                <Link to="/recipes-list">Recipes</Link>
              </li>
              <li>
                <Link to="/ratio">Ratio</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
              <li>
                <Link to="/brew-guide">Brew Guide</Link>
              </li>
              <li>
                <Link to="/ratio">Ratio</Link>
              </li>

              {Array.isArray(user.roles) &&
                user.roles.map((role, index) => {
                  if (role === "ROLE_ADMIN") {
                    return (
                      <React.Fragment key={`admin-${index}`}>
                        <li>
                          <Link to="/methods">Methods</Link>
                        </li>
                        <li>
                          <Link to="/admin">Admin</Link>
                        </li>
                      </React.Fragment>
                    );
                  }
                  return null;
                })}

              <li>
                <a href="/logout" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
