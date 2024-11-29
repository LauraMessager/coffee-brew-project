import React, { useState } from "react";
import "../../styles/methodForm.scss";

const MethodForm = ({ onSubmit, errorMessage, successMessage, loading }) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);

  const handleFileChange = (e) => {
    setIcon(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, icon });
  };

  return (
    <form onSubmit={handleSubmit} className="method-form">
      <h2>Add New Method</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="form-group">
        <label htmlFor="name">Method Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="icon">Icon</label>
        <input
          type="file"
          id="icon"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Add Method"}
      </button>
    </form>
  );
};

export default MethodForm;
