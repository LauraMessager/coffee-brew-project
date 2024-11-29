import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/brewGuideForm.scss";

const MethodDelete = ({ id, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.apiToken) {
      setError("User is not authenticated");
      return;
    }

    const apiToken = user.apiToken;

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8001/api/method/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": apiToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete method");
      }

      const data = await response.json();
      console.log(`Deleting method with ID: ${id}`);

      onDeleteSuccess(data.message);
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      setError(error.message || "An error occurred while deleting the method.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="btn delete-x"
        disabled={loading}
      >
        {loading ? "Deleting..." : "X"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default MethodDelete;
