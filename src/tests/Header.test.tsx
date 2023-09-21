import { screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderWithRouter } from '../helpers/renderWithRouter';

describe('Header', () => {
  const testID = 'page-title';
  test('Verifica o h1 caso a rota seja /drinks', () => {
    renderWithRouter(<Header />, { route: '/drinks' });
    const h1 = screen.getByTestId(testID);
    expect(h1.textContent).toBe('Drinks');
  });
  test('Verifica o h1 caso a rota seja /profile', () => {
    renderWithRouter(<Header />, { route: '/profile' });
    const h1 = screen.getByTestId(testID);
    expect(h1.textContent).toBe('Profile');
  });
  test('Verifica o h1 caso a rota seja /done-recipes', () => {
    renderWithRouter(<Header />, { route: '/done-recipes' });
    const h1 = screen.getByTestId(testID);
    expect(h1.textContent).toBe('Done Recipes');
  });
  test('Verifica o h1 caso a rota seja /favorite-recipes', () => {
    renderWithRouter(<Header />, { route: '/favorite-recipes' });
    const h1 = screen.getByTestId(testID);
    expect(h1.textContent).toBe('Favorite Recipes');
  });
  test('Verifica o h1 para uma rota não reconhecida', () => {
    renderWithRouter(<Header />, { route: '/rota-nao-reconhecida' });
    const h1 = screen.getByTestId(testID);
    expect(h1.textContent).toBe('');
  });
});
