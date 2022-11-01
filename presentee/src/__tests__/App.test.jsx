import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from '../App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />, {wrapper: BrowserRouter});
    screen.debug();
  });
});