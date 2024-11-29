import React, { useState } from "react";
import MethodForm from "../components/methods/methodForm";
import { useNavigate } from "react-router-dom";

const MethodPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleMethodSubmit = async ({ name, icon }) => {
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("icon", icon);

    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).apiToken
      : null;

    try {
      const response = await fetch("http://localhost:8001/api/method/add", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create method.");
      } else {
        const data = await response.json();
        setSuccess(data.message);
        navigate("/methods");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred while creating the method.");
    }

    setLoading(false);
  };

  return (
    <div className="method-page">
      <h2>Create a New Method</h2>
      <MethodForm
        onSubmit={handleMethodSubmit}
        errorMessage={error}
        successMessage={success}
        loading={loading}
      />
    </div>
  );
};

export default MethodPage;
