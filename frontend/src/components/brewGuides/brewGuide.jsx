import React from "react";
import PropTypes from "prop-types";
import "../../styles/brewGuide.scss";

const BrewGuide = ({ title, description, created_by }) => {
  return (
    <div className="brew-guide-card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p>{description}</p>
      </div>
      <div className="card-footer">
        <p>
          <strong>Created by:</strong> {created_by}
        </p>
      </div>
    </div>
  );
};

BrewGuide.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  created_by: PropTypes.string.isRequired,
};

export default BrewGuide;
