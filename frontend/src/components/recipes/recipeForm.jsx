import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/recipeForm.scss";

const RecipeForm = ({
  onSubmit,
  initialData = {},
  errorMessage,
  loading,
  availableMethods = [],
  user,
}) => {
  const [formData, setFormData] = useState({
    id: initialData.id || null,
    name: initialData.name || "",
    temperature: initialData.temperature || "",
    water_amt: initialData.water_amt || "",
    coffee_amt: initialData.coffee_amt || "",
    description: initialData.description || "",
    method: { id: initialData.method?.id || "", name: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("method.")) {
      setFormData((prev) => ({
        ...prev,
        method: { ...prev.method, [name.split(".")[1]]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMethodChange = (e) => {
    const selectedMethodId = e.target.value;
    const selectedMethod = availableMethods.find(
      (method) => method.id === Number(selectedMethodId)
    );

    setFormData((prev) => ({
      ...prev,
      method: {
        id: selectedMethod?.id || "",
        name: selectedMethod?.name || "",
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalFormData = {
      ...formData,
      created_by: {
        id: user?.id,
        name: user?.name,
        mail: user?.mail,
      },
    };

    onSubmit(finalFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <div className="form-group">
        <label htmlFor="name">Recipe Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group no-border">
        <label htmlFor="method">Choice of Method</label>
        <select
          id="method"
          name="method"
          value={formData.method.id}
          onChange={handleMethodChange}
        >
          <option value="">Select a method</option>
          {availableMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group-row">
        <div className="form-group small">
          <label htmlFor="temperature">Temp (°C)</label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
          />
        </div>

        <div className="form-group small">
          <label htmlFor="coffee_amt">Coffee (g)</label>
          <input
            type="number"
            id="coffee_amt"
            name="coffee_amt"
            value={formData.coffee_amt}
            onChange={handleChange}
          />
        </div>

        <div className="form-group small">
          <label htmlFor="water_amt">Water (ml)</label>
          <input
            type="number"
            id="water_amt"
            name="water_amt"
            value={formData.water_amt}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Recipe"}
      </button>
    </form>
  );
};

RecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    temperature: PropTypes.number,
    water_amt: PropTypes.number,
    coffee_amt: PropTypes.number,
    description: PropTypes.string,
    method: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  availableMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeForm;
