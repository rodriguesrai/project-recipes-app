import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';
import ProviderLogin from '../context/ProviderLogin';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';
import { mockFetch, mockFetchOne } from './mock/mockFetch';
import { mockDataDrinks, mockDataDrinksOne } from './mock/mockData';

describe('Login', () => {
  test('Verificar o componente Login', async () => {
    render(
      <ProviderLogin>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProviderLogin>,
    );

    const button = screen.getByTestId('login-submit-btn');
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
    await userEvent.type(email, 'teste@teste.com');
    await userEvent.type(password, '1234567');
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
  });
});
