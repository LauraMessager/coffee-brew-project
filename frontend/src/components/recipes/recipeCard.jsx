import React from "react";
import PropTypes from "prop-types";
import RecipePropTypes from "../../types/RecipePropTypes";
import { Link } from "react-router-dom";
import "../../styles/recipeCard.scss";

const RecipeCard = ({ recipe, onDetailClick }) => {
  const { id, name, temperature, water_amt, coffee_amt, method } = recipe;

  return (
    <div className="card">
      <div className="card_content">
        <h2 className="card_title">{name}</h2>
        {method && (
          <div className="tag">{method.name ? `${method_name}` : "Coffee"}</div>
        )}
        <p className="card_text">
          <strong>Temperature:</strong>{" "}
          {temperature ? `${temperature}°C` : "N/A"} <br />
          <strong> Water Amount:</strong> {water_amt ? `${water_amt}ml` : "N/A"}{" "}
          <br />
          <strong>Coffee Amount:</strong>{" "}
          {coffee_amt ? `${coffee_amt}g` : "N/A"}
        </p>
        <Link to={`/recipe/${id}`}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  );
};
RecipeCard.propTypes = {
  recipe: RecipePropTypes.isRequired,
  onDetailClick: PropTypes.func.isRequired,
};

export default RecipeCard;
