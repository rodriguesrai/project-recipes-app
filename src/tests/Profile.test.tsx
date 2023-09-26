import React from 'react';
import { screen } from '@testing-library/react';
import Profile from '../components/Profile';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderLogin from '../context/ProviderLogin';

const emailExample = 'profile-email';
const route = '/profile';

describe('Profile', () => {
  test('Verifica se o email é renderizado corretamente', () => {
    const { user } = renderWithRouter(
      <ProviderLogin>
        <Profile />
      </ProviderLogin>,
      { route },
    );

    const emailElement = screen.getByTestId(emailExample);
    expect(emailElement).toBeInTheDocument();
  });

  test('Verifica se, quando não tem email disponível, tem mensagem de erro', () => {
    const { user } = renderWithRouter(
      <ProviderLogin>
        <Profile />
      </ProviderLogin>,
      { route },
    );

    const emailElement = screen.getByTestId(emailExample);
    expect(emailElement).toHaveTextContent('Nenhum email disponível');
  });

  test('Verifica se a função handleDoneClick está chamando a rota correta', async () => {
    const { user } = renderWithRouter(
      <ProviderLogin>
        <Profile />
      </ProviderLogin>,
      { route },
    );

    const logoutButton = screen.getByTestId('profile-logout-btn');
    await user.click(logoutButton);
    expect(window.location.pathname).toBe('/');
  });

  test('Verifica se a função handleFavoriteClick está chamando a rota correta', async () => {
    const { user } = renderWithRouter(
      <ProviderLogin>
        <Profile />
      </ProviderLogin>,
      { route },
    );

    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    await user.click(favoriteButton);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  test('Verifica se a função handleDoneClick está chamando a rota correta', async () => {
    const { user } = renderWithRouter(
      <ProviderLogin>
        <Profile />
      </ProviderLogin>,
      { route },
    );

    const doneButton = screen.getByTestId('profile-done-btn');
    await user.click(doneButton);
    expect(window.location.pathname).toBe('/done-recipes');
  });

  test('Verifica se a função checkAndUpdateEmail é chamada corretamente', () => {
    const storedEmail = '{"email": "test@test.com"}';
    localStorage.setItem('user', storedEmail);
    renderWithRouter(
      <ProviderLogin>
        <Profile />
      </ProviderLogin>,
    );

    const emailElement = screen.getByTestId(emailExample);
    expect(emailElement).toHaveTextContent('test@test.com');
  });
});
