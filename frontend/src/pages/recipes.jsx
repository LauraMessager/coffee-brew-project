import React, { useState, useEffect } from "react";
import RecipeCard from "../components/recipes/RecipeCard";
import { Link } from "react-router-dom";
import "../styles/recipesPage.scss";
//import "../styles/recipeCard.scss";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser || !loggedUser.apiToken) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }
    setUser(loggedUser);
    const apiToken = loggedUser.apiToken;

    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/recipe", {
          method: "GET",
          headers: {
            "auth-token": apiToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }

        const data = await response.json();

        const filteredRecipes = data.datas.filter((recipe) => {
          if (loggedUser.id === 5) {
            return true;
          }
          return recipe.created_by === loggedUser.id || recipe.created_by === 5;
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
      <Link to="/new-recipe">
        <button>+ Recipe</button>
      </Link>

      <div className="cards">
        {recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
