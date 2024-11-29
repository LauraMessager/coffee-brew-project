import React from "react";
import PropTypes from "prop-types";
import RecipePropTypes from "../../types/RecipePropTypes";
import "../../styles/recipeCard.scss";

const RecipeCard = ({ recipe, onDetailClick }) => {
  const { name, temperature, water_amt, coffee_amt, method } = recipe;

  return (
    <div className="card">
      <div className="card_content">
        <h2 className="card_title">{name}</h2>
        {method && <div className="tag">{method.name}</div>}
        <p className="card_text">
          Temperature: {temperature ? `${temperature}°C` : "N/A"} <br />
          Water Amount: {water_amt ? `${water_amt}ml` : "N/A"} <br />
          Coffee Amount: {coffee_amt ? `${coffee_amt}g` : "N/A"}
        </p>
        <button className="btn" onClick={onDetailClick}>
          Details
        </button>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: RecipePropTypes.isRequired,
  onDetailClick: PropTypes.func.isRequired,
};

export default RecipeCard;
