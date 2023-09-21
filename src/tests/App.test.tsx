import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import ProviderLogin from '../context/ProviderLogin';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';
import ProviderRecipes from '../context/ProviderRecipes';

describe('Login', () => {
  test('Verificar o componente Login', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderLogin>
          <ProviderSearch>
            <App />
          </ProviderSearch>
        </ProviderLogin>
      </ProviderRecipes>,
    );

    const button = screen.getByTestId('login-submit-btn');
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
    await user.type(email, 'teste@teste.com');
    await user.type(password, '1234567');
    expect(button).not.toBeDisabled();
    await user.click(button);
  });
});
