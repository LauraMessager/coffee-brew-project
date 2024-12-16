import React, { useState } from "react";
import PropTypes from "prop-types";
import BrewGuideDelete from "./brewGuideDelete";
import { Link } from "react-router-dom";

const BrewGuideTable = ({ brewGuides }) => {
  const [successMessage, setSuccessMessage] = useState(null);

  const handleDeleteSuccess = (message) => {
    setSuccessMessage(message);
  };

  return (
    <div className="brew-guide-table">
      <h4>List of existing Brew Guides</h4>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Delete</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {brewGuides.map((guide) => (
            <tr key={guide.id}>
              <td>{guide.title}</td>
              <td>{guide.description}</td>
              <td>{guide.created_by}</td>
              <td>
                <BrewGuideDelete
                  id={guide.id}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              </td>
              <td>
                <Link to={`/brew-guide/update/${guide.id}`}>
                  <button className="edit-button">Modify</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

BrewGuideTable.propTypes = {
  brewGuides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      created_by: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default BrewGuideTable;
