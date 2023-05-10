import PropTypes from 'prop-types';
import { ButtonLoad } from './Button.styled';
export const Button = ({ onClick }) => {
  return (
    <ButtonLoad onClick={onClick} type="button">
      Load more
    </ButtonLoad>
  );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};