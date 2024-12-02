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

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.apiToken) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    const apiToken = user.apiToken;

    const formData = new FormData();
    formData.append("name", name);
    if (icon) formData.append("icon", icon);

    try {
      const response = await fetch("http://localhost:8001/api/method/add", {
        method: "POST",
        headers: {
          "auth-token": apiToken,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create method.");
      } else {
        const responseData = await response.json();
        setSuccess(responseData.message || "Method created successfully.");
        setTimeout(() => {
          navigate("/methods");
        }, 2000);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred while creating the method.");
    } finally {
      setLoading(false);
    }
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
