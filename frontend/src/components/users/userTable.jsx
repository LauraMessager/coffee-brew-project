import React from "react";
import PropTypes from "prop-types";
import UserPropTypes from "../../types/UserPropTypes";
import "../../styles/table.scss";

const UserTable = ({ users }) => {
  return (
    <div className="user-table">
      <h4>List of registered coffee lovers (users)</h4>
      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  {user.roles && user.roles !== ""
                    ? JSON.parse(user.roles).join(", ")
                    : "No roles"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(UserPropTypes)).isRequired,
};

export default UserTable;
