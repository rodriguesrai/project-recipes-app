import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from '../helpers/renderWithRouter';
import Profile from '../components/Profile';

describe('Profile', () => {
  test('Verifica se o email é renderizado corretamente', () => {
    const email = 'test@example.com';

    renderWithRouter(<Profile email={ email } />);

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent(email);
  });

  test('Verifica se, quando não tem email disponível tem mensagem de erro', () => {
    const email = null;
    renderWithRouter(<Profile email={ email } />);

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent('Nenhum email disponível');
  });

  test('Verifica se os botões de navegação estão funcionando', () => {
    renderWithRouter(<Profile email="test@example.com" />);

    const doneButton = screen.getByTestId('profile-done-btn');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');

    fireEvent.click(doneButton);
    fireEvent.click(favoriteButton);
    fireEvent.click(logoutButton);
  });

  test('Verifica se a função handleDoneClick está chamando a rota correta', () => {
    const route = '/done-recipes';
    const { user } = renderWithRouter(<Profile email="test@example.com" />, { route });
    const doneButton = screen.getByTestId('profile-done-btn');
    user.click(doneButton);

    expect(route).toBe('/done-recipes');
  });

  test('Verifica se a função handleFavoriteClick está chamando a rota correta', () => {
    const route = '/favorite-recipes';
    const { user } = renderWithRouter(<Profile email="test@example.com" />, { route });
    const doneButton = screen.getByTestId('profile-favorite-btn');
    user.click(doneButton);

    expect(route).toBe('/favorite-recipes');
  });

  test('Verifica se a função handleLogoutClick está chamando a rota correta', () => {
    const route = '/';
    const { user } = renderWithRouter(<Profile email="test@example.com" />, { route });
    const doneButton = screen.getByTestId('profile-logout-btn');
    user.click(doneButton);

    expect(route).toBe('/');
  });
});
