import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.apiToken) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    const apiToken = user.apiToken;

    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/api/recipe/recipe/${id}`,
          {
            method: "GET",
            headers: {
              "auth-token": apiToken,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch recipe details: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.datas && data.datas.length > 0) {
          setRecipe(data.datas[0]);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading) {
    return <div>Loading recipe details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>No recipe found</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>
        <strong>Method:</strong> {recipe.method_name}
      </p>
      <p>
        <strong>Icon:</strong>
        {recipe.method_icon ? (
          <img
            src={`http://localhost:8001/${recipe.method_icon}`}
            alt={recipe.method_name}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        ) : (
          <span>No icon available</span>
        )}
      </p>
      <p>
        <strong>Temperature:</strong> {recipe.temperature}°C
      </p>
      <p>
        <strong>Water Amount:</strong> {recipe.water_amt}ml
      </p>
      <p>
        <strong>Coffee Amount:</strong> {recipe.coffee_amt}g
      </p>
      <p>
        <strong>Description:</strong> {recipe.description}
      </p>
    </div>
  );
};

export default RecipeDetailPage;
