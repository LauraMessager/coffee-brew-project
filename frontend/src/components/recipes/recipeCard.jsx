import React from "react";
import PropTypes from "prop-types";
import RecipePropTypes from "../../types/RecipePropTypes";
import { Link } from "react-router-dom";
import "../../styles/recipeCard.scss";

const RecipeCard = ({ recipe, onDetailClick }) => {
  const { id, name, temperature, water_amt, coffee_amt, method_name } = recipe;

  return (
    <div className="card">
      <div className="card_content">
        <h2 className="card_title">{name}</h2>
        <div className="tag">{method_name ? `${method_name}` : "Any"}</div>
        <p className="card_text">
          <span className="data_item">
            <img src="/icons8-température-50.png" alt="temperature" />
            {temperature ? `${temperature}°C` : "N/A"}
          </span>
          <span className="data_item">
            <img src="/icons8-eau-50.png" alt="waterdrop" />
            {water_amt ? `${water_amt}ml` : "N/A"}
          </span>
          <span className="data_item">
            <img src="/icons8-coffee-bean.png" alt="coffeebean" />
            {coffee_amt ? `${coffee_amt}g` : "N/A"}
          </span>
        </p>
        <Link to={`/recipe/${id}`}>
          <button className="btn">Details</button>
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
