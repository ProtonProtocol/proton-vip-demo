import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders artist name on landing page', () => {
  const { getByText } = render(<App />);
  const artistName = getByText(/Montgomery/i);
  expect(artistName).toBeInTheDocument();
});
