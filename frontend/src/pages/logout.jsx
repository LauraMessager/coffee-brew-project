import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        logout();
        navigate("/login");
      } catch (error) {
        setError("An error occurred while logging out. Please try again.");
      } finally {
        setIsLoggingOut(false);
      }
    };

    logoutUser();
  }, [logout, navigate]);

  return (
    <div>
      {isLoggingOut ? (
        <p>Logging you out...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>You have been logged out successfully.</p>
      )}
    </div>
  );
};

export default Logout;
