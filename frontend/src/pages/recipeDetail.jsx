import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RecipeDelete from "../components/recipes/recipeDelete";
import "../styles/recipeDetail.scss";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.apiToken) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    setUser(storedUser);

    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/api/recipe/recipe/${id}`,
          {
            method: "GET",
            headers: {
              "auth-token": storedUser.apiToken,
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

  const handleDeleteSuccess = () => {
    window.location.href = "/recipes";
  };

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
        {recipe.method_icon ? (
          <img
            src={`http://localhost:8001/${recipe.method_icon}`}
            alt={recipe.method_name}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        ) : (
          <img src="icons8-coffee-bean-64.png" alt="coffee bean" />
        )}
      </p>
      <div className="data-container">
        <p>
          <span className="data_item tag">{recipe.method_name}</span>
          <span className="data_item">
            <img src="/icons8-température-50.png" alt="temperature" />
            {recipe.temperature ? `${recipe.temperature}°C` : "N/A"}
          </span>
          <span className="data_item">
            <img src="/icons8-eau-50.png" alt="waterdrop" />
            {recipe.water_amt ? `${recipe.water_amt}ml` : "N/A"}
          </span>
          <span className="data_item">
            <img src="/icons8-coffee-bean.png" alt="coffeebean" />
            {recipe.coffee_amt ? `${recipe.coffee_amt}g` : "N/A"}
          </span>
        </p>
      </div>
      <div className="description-container">
        <p>
          <strong>Description:</strong> {recipe.description}
        </p>
      </div>

      {user && recipe.created_by === user.id && (
        <div className="button-container">
          <Link to={`/recipe/update/${recipe.id}`}>
            <button className="btn modify">Modify</button>
          </Link>
          <RecipeDelete
            id={recipe.id}
            onDeleteSuccess={handleDeleteSuccess}
            render={(handleDelete) => (
              <button className="btn delete" onClick={handleDelete}>
                Delete
              </button>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;
