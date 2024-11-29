import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/login/loginForm";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async ({ mail, password }) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      } else {
        const userData = await response.json();

        if (userData && userData.apiToken) {
          login(userData);
          navigate(
            userData.roles.includes("ROLE_ADMIN") ? "/admin" : "/brew-guide"
          );
        } else {
          setError("No valid roles found");
        }
      }
    } catch (err) {
      setError("An error occurred during login");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <LoginForm
        onSubmit={handleLoginSubmit}
        errorMessage={error}
        loading={loading}
      />
    </div>
  );
};

export default LoginPage;
