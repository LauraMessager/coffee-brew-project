import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeDelete = ({ id, onDeleteSuccess }) => {
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
        `http://localhost:8001/api/recipe/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            "auth-token": apiToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      const data = await response.json();
      console.log(`Deleting recipe with ID: ${id}`);

      onDeleteSuccess(id);

      navigate("/recipes");
    } catch (error) {
      setError(error.message || "An error occurred while deleting the recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} className="btn" disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default RecipeDelete;
