import React from 'react';
import { render } from '@testing-library/react';
import BaseCard from './BaseCard';

describe('BaseCard tests', () => {
  test('Renders component BaseCard', () => {
    render(<BaseCard />);
  });
});
