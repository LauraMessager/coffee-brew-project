import React from "react";
import PropTypes from "prop-types";

const BrewGuideTable = ({ brewGuides }) => {
  return (
    <div className="brew-guide-table">
      <h2>Brew Guides</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {brewGuides.map((guide) => (
            <tr key={guide.id}>
              <td>{guide.title}</td>
              <td>{guide.description}</td>
              <td>{guide.created_by}</td>
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
