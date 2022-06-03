import React from 'react';
import { render, screen } from '@testing-library/react';
import RecapCard from './RecapCard';

describe('BaseCard tests', () => {
  test('Renders component BaseCard', () => {
    render(<RecapCard />);
  });

  test('The component show the prop status', () => {
    const READY = 'ready';
    render(<RecapCard status={READY} />);
    expect(screen.getByTestId('status')).toHaveTextContent(READY);
  });

  test('The component show the prop amount', () => {
    const AMOUNT = 1000;
    render(<RecapCard amount={AMOUNT} />);
    expect(screen.getByTestId('amount')).toHaveTextContent(`${AMOUNT}`);
  });

  test('The component show the prop counter', () => {
    const COUNTER = 10;
    render(<RecapCard counter={COUNTER} />);
    expect(screen.getByTestId('counter')).toHaveTextContent(`${COUNTER}`);
  });
});
