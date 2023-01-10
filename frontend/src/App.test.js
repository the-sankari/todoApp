import { render, screen } from '@testing-library/react';
import App from './App';

test('renders  footer text', () => {
  render(<App />);
  const footer = screen.getByText
  ('@projectteam1-2022');
  expect(footer).toBeInTheDocument();
});
