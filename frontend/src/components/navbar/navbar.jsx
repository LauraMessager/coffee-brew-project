import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.scss";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <label htmlFor="hamburger-input" className="navbar__label">
        <span>&#9776;</span>
      </label>
      <img src="/CoffeeBrewLogo.png" alt="Logo" />
      <input
        type="checkbox"
        id="hamburger-input"
        className="navbar__input"
        style={{ display: "none" }}
      />
      <div>
        <ul>
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
              <li>
                <Link to="/brew-guide">Brew Guide</Link>
              </li>

              {Array.isArray(user.roles) &&
                user.roles.map((role, index) => {
                  if (role === "ROLE_ADMIN") {
                    return (
                      <React.Fragment key={`admin-${index}`}>
                        <li key={`methods-${index}`}>
                          <Link to="/methods">Methods</Link>
                        </li>
                        <li key={`admin-${index}`}>
                          <Link to="/admin">Admin</Link>
                        </li>
                      </React.Fragment>
                    );
                  }
                  return null;
                })}

              <li>
                <Link to="/logout" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
