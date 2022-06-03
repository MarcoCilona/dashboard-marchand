import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component used to render a card with information about:
 * - payment status that is being analyzed
 * - amount related to all the payment in that status
 * - number of payment in that status
 */
const RecapCard = ({ amount, counter, status = '' }) => {
  return (
    <div>
      <div data-testid='status'>{status}</div>
      <div data-testid='amount'>{amount}</div>
      <div data-testid='counter'>{counter}</div>
    </div>
  );
};

RecapCard.propTypes = {
  amount: PropTypes.number,
  counter: PropTypes.number,
  status: PropTypes.string,
};

export default RecapCard;
