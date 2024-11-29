import PropTypes from "prop-types";

const RecipePropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  temperature: PropTypes.number,
  water_amt: PropTypes.number,
  coffee_amt: PropTypes.number,
  description: PropTypes.string,
  created_at: PropTypes.string,
  modified_at: PropTypes.string,
  created_by: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
  }).isRequired,
  method: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
  }),
};

export default RecipePropTypes;
