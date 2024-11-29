import React from "react";
import MethodPropTypes from "../../types/MethodPropTypes";

const MethodComponent = ({ id, name, icon }) => {
  return (
    <div>
      <h2>{name}</h2>
      {icon && <img src={icon} alt={`${name} icon`} />}
    </div>
  );
};

MethodComponent.propTypes = MethodPropTypes;

export default MethodComponent;
