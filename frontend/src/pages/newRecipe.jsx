import React, { useState, useEffect } from "react";
import RecipeForm from "../components/recipes/recipeForm";

const NewRecipePage = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser || !loggedInUser.apiToken) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    setUser(loggedInUser);
    const apiToken = loggedInUser.apiToken;

    const fetchMethods = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/method/", {
          method: "GET",
          headers: {
            "auth-token": apiToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch methods");
        }
        const data = await response.json();
        setMethods(data.datas);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
  }, []);

  const handleRecipeSubmit = async (formData) => {
    if (!user || !user.apiToken) {
      setError("User is not authenticated");
      return;
    }

    const apiToken = user.apiToken;

    try {
      setLoading(true);
      setError(null);

      const methodId = formData.method.id;
      const response = await fetch("http://localhost:8001/api/recipe/add", {
        method: "POST",
        headers: {
          "auth-token": apiToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          method: methodId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }

      alert("Recipe created successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="new-recipe-page">
      <h1>Create New Recipe</h1>
      <RecipeForm
        onSubmit={handleRecipeSubmit}
        loading={loading}
        errorMessage={error}
        availableMethods={methods}
        user={user}
      />
    </div>
  );
};

export default NewRecipePage;
