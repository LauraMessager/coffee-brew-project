import React, { useState, useEffect } from "react";
import RecipeSampleCard from "../components/recipes/recipeSampleCard";
import "../styles/recipesPage.scss";
import "../styles/recipeCard.scss";
import { Link } from "react-router-dom";

const RecipeSamplePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/recipe/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }

        const data = await response.json();

        const filteredRecipes = data.datas.filter((recipe) => {
          return recipe.created_by === 5;
        });

        setRecipes(filteredRecipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recipes-page">
      <h1>Recipes</h1>
      <p>See below a sample of the recipes available on our platform.</p>
      <p>Login and start creating your own recipes.</p>

      <Link to="/login">
        <button>Create your own</button>
      </Link>
      <div className="cards">
        {recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          recipes.map((recipe) => (
            <RecipeSampleCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeSamplePage;
