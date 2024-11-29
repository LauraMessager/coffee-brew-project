import React from "react";
import PropTypes from "prop-types";

const MethodTable = ({ methods }) => {
  return (
    <div className="method-table">
      <h2>Methods</h2>
      {methods.length === 0 ? (
        <p>No methods available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Icon</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((method) => (
              <tr key={method.id}>
                <td>{method.name}</td>
                <td>
                  {method.icon && (
                    <img
                      src={method.icon}
                      alt={`${method.name} icon`}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                  )}
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
