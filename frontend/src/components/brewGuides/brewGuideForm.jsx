import React, { useState } from "react";
import "../../styles/brewGuideForm.scss";

const BrewGuideForm = ({ onSubmit, errorMessage, successMessage, loading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="brew-guide-form">
      <h2>Add New Brew Guide</h2>

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

      <div className="form-group">
        <label htmlFor="image">Upload Image (Optional)</label>
        <input
          type="file"
          id="image"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Add Brew Guide"}
      </button>
    </form>
  );
};

export default BrewGuideForm;
