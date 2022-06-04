import React from 'react';
import PropTypes from 'prop-types';

// Components
import RecapCard from '../RecapCard/RecapCard';

// Style
import './RecapCardList.css';

/**
 * Component used to render the list of recap cards and handle their view and positioning
 */
const RecapCardList = ({ recaps = [] }) => {
  return (
    <div className='RecapCardList'>
      {recaps.map((recap, index) => {
        return (
          <RecapCard
            data-testid='recap-card'
            key={index}
            amount={recap.amount}
            status={recap.status}
          />
        );
      })}
    </div>
  );
};

RecapCardList.propTypes = {
  recaps: PropTypes.array,
};

export default RecapCardList;
