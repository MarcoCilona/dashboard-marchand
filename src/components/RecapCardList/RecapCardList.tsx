import React from 'react';
import PropTypes from 'prop-types';

// Components
import RecapCard from '../RecapCard/RecapCard';

/**
 * Component used to render the list of recap cards and handle their view and positioning
 */
const RecapCardList = ({ recaps = [] }) => {
  return (
    <div>
      {recaps.map((recap, index) => {
        return <RecapCard data-testid='recap-card' key={index} />;
      })}
    </div>
  );
};

RecapCardList.propTypes = {
  recaps: PropTypes.array,
};

export default RecapCardList;
