import React, { useState } from "react";
import PropTypes from "prop-types";
import MethodDelete from "./methodDelete";

const MethodTable = ({ methods }) => {
  const [successMessage, setSuccessMessage] = useState(null);

  const handleDeleteSuccess = (message) => {
    setSuccessMessage(message);
  };
  return (
    <div className="method-table">
      <h4>List of existing methods of extraction</h4>
      {methods.length === 0 ? (
        <p>No methods available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Icon</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((method) => (
              <tr key={method.id}>
                <td>{method.name}</td>
                <td>
                  {method.icon && (
                    <img
                      src={`http://localhost:8001/${method.icon}`}
                      alt={`${method.name} icon`}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td>
                  <MethodDelete
                    id={method.id}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

MethodTable.propTypes = {
  methods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ).isRequired,
};

export default MethodTable;
