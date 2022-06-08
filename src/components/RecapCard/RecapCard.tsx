import React from 'react';
import PropTypes from 'prop-types';

import './RecapCard.css';

// Helpers
import { capitalizeFirstLetter, currencyPrefix } from '../../utils/helpers';

/**
 * Component used to render a card with information about:
 * - payment status that is being analyzed
 * - amount related to all the payment in that status
 * - number of payment in that status
 */
const RecapCard = ({ amount, status = '' }) => {
  return (
    <div className='RecapCard'>
      <div data-testid='status' className='RecapCard__status'>
        {capitalizeFirstLetter(status)}
      </div>
      <div data-testid='amount' className='RecapCard__amount'>
        {currencyPrefix({ value: amount })}
      </div>
    </div>
  );
};

RecapCard.propTypes = {
  amount: PropTypes.string,
  counter: PropTypes.number,
  status: PropTypes.string,
};

export default RecapCard;
