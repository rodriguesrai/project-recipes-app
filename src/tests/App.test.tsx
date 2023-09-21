import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import App from '../App';
import ProviderLogin from '../context/ProviderLogin';

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
