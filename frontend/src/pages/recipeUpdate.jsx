import React, { useState, useEffect } from "react";
import RecipeForm from "../components/recipes/recipeForm";
import { useNavigate, useParams } from "react-router-dom";

const RecipeUpdate = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableMethods, setAvailableMethods] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser || !loggedInUser.apiToken) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    setUser(loggedInUser);
    const apiToken = loggedInUser.apiToken;

    const fetchRecipe = async () => {
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
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();

        if (data.datas.length > 0) {
          setRecipe(data.datas[0]);
        } else {
          setError("Recipe not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

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
        setAvailableMethods(data.datas);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMethods();
    fetchRecipe();
  }, [id]);

  const handleUpdateRecipe = async (updatedRecipe) => {
    if (!user || !user.apiToken) {
      setError("User is not authenticated");
      return;
    }

    const apiToken = user.apiToken;
    const methodId = updatedRecipe.method.id;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8001/api/recipe/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": apiToken,
          },
          body: JSON.stringify({
            ...updatedRecipe,
            method: methodId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      const data = await response.json();
      if (data.message === "Recipe updated successfully!") {
        navigate(`/recipe/${data.recipe.id}`);
      }
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
    <div>
      <h1>Update Recipe</h1>
      {recipe && (
        <RecipeForm
          onSubmit={handleUpdateRecipe}
          initialData={recipe}
          availableMethods={availableMethods}
          user={user}
          errorMessage={error}
          loading={loading}
        />
      )}
    </div>
  );
};

export default RecipeUpdate;
