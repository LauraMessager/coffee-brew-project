import PropTypes from "prop-types";

const BrewGuidePropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  created_by: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
  }).isRequired,
  created_at: PropTypes.string,
};

export default BrewGuidePropTypes;
