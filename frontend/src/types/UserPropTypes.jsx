import PropTypes from "prop-types";

const UserPropTypes = {
  id: PropTypes.number.isRequired,
  mail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  created_at: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  apiToken: PropTypes.string,
};

export default UserPropTypes;
