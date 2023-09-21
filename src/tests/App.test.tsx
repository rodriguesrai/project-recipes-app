import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';
import ProviderLogin from '../context/ProviderLogin';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';

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
describe('Barra de buscas', () => {
  vi.spyOn(window, 'alert');
  test('Verifica se barra está na página /meals', async () => {
    const { user } = renderWithRouter(
      <ProviderLogin>
        <ProviderSearch>
          <App />
        </ProviderSearch>
      </ProviderLogin>,
      { route: '/meals' },
    );
    const showForm = screen.getByTestId('search-top-btn');
    await user.click(showForm);
    const btnSearchHearder = screen.getByText('Search');
    await user.click(btnSearchHearder);
    // const btnSearchForm = screen.getByRole('button', {
    //   name: /search/i,
    // });
    await user.click(btnSearchHearder);
    // expect(btnSearchForm).not.toBeInTheDocument();
    await user.click(btnSearchHearder);
    const inputSearch = screen.getByRole('textbox');
    const firtLetter = screen.getByText(/ingredientnamefirst letter/i);
    await user.type(inputSearch, 'aa');
    await userEvent.click(firtLetter);
  });
  test('Verifica se barra está na página /drinks', async () => {
    const { user } = renderWithRouter(
      <ProviderLogin>
        <ProviderSearch>
          <App />
        </ProviderSearch>
      </ProviderLogin>,
      { route: '/meals' },
    );
    const showForm = screen.getByTestId('search-top-btn');
    await user.click(showForm);
    const btnSearchHearder = screen.getByText('Search');
    await user.click(btnSearchHearder);
    // expect(btnSearchForm).not.toBeInTheDocument();
  });
});
