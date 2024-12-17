import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrewGuideForm from "../components/brewGuides/brewGuideForm";

const NewBrewGuidePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.apiToken) {
      setError("User is not authenticated");
      return;
    }

    const apiToken = user.apiToken;
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8001/api/brew_guide/add", {
        method: "POST",
        headers: {
          "auth-token": apiToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add brew guide");
      }

      const responseData = await response.json();
      setSuccessMessage("Brew Guide successfully added!");
      navigate(`/admin`);
    } catch (error) {
      setError(
        error.message || "An error occurred while adding the brew guide."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add New Brew Guide</h1>
      <BrewGuideForm
        onSubmit={handleFormSubmit}
        errorMessage={error}
        successMessage={successMessage}
        loading={loading}
      />
    </div>
  );
};

export default NewBrewGuidePage;
