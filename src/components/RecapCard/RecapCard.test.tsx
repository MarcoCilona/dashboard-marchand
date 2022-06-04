import React from 'react';
import { render, screen } from '@testing-library/react';
import RecapCard from './RecapCard';

// Helpers
import { capitalizeFirstLetter } from '../../utils/helpers';

describe('BaseCard tests', () => {
  test('Renders component BaseCard', () => {
    render(<RecapCard />);
  });

  test('The component show the prop status', () => {
    const READY = 'ready';
    render(<RecapCard status={READY} />);
    expect(screen.getByTestId('status')).toHaveTextContent(capitalizeFirstLetter(READY));
  });

  test('The component show the prop amount', () => {
    const AMOUNT = '1000';
    render(<RecapCard amount={AMOUNT} />);
    expect(screen.getByTestId('amount')).toHaveTextContent(`${AMOUNT}`);
  });
});
