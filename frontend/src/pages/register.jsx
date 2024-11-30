import React, { useState, useEffect } from "react";
import RegisterForm from "../components/users/registerForm";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/banner.scss";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = sessionStorage.getItem("successMessage");

  useEffect(() => {
    if (location.state?.successMessage) {
      sessionStorage.setItem("successMessage", location.state.successMessage);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [location.state?.successMessage]);

  const handleRegister = async (formData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:8001/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem(
          "successMessage",
          "User registered successfully!"
        );
        navigate("/register", {
          state: { successMessage: "User registered successfully!" },
        });
      } else {
        setErrorMessage(
          result.message || "An error occurred during registration."
        );
      }
    } catch (error) {
      setErrorMessage("Failed to register. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      {successMessage && <div className="success-banner">{successMessage}</div>}
      <RegisterForm
        onSubmit={handleRegister}
        errorMessage={errorMessage}
        loading={loading}
        formData={formData}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default RegisterPage;
