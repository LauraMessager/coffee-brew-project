import React, { useState, useEffect } from "react";
import "../../styles/brewGuideForm.scss";

const BrewGuideUpdateForm = ({
  onSubmit,
  errorMessage,
  successMessage,
  loading,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBrewGuide = {
      title,
      description,
    };
    onSubmit(updatedBrewGuide);
  };

  return (
    <form onSubmit={handleSubmit} className="brew-guide-form">
      <h2>Update Brew Guide</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="form-group">
        <label htmlFor="title">Brew Guide Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Brew Guide Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Update Brew Guide"}
      </button>
    </form>
  );
};

export default BrewGuideUpdateForm;
