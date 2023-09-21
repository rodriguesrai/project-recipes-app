import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';
import ProviderLogin from '../context/ProviderLogin';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';
import mockFetch from './mock/mockFetch';

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
  // const alert = vi.spyOn(window, 'alert');
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetch as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
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

    const inputSearch = screen.getByRole('textbox');
    const ingredientFilter = screen.getByTestId('ingredient-search-radio');
    await user.type(inputSearch, 'chicken');
    await user.click(ingredientFilter);
    await user.click(btnSearchHearder);
    expect(global.fetch).toHaveBeenCalled();
    waitFor(() => {
      const teste = screen.getByText(/brown stew chicken/i);
      expect(teste).not.toBeInTheDocument();
    });
    const firstLetterInput = screen.getByTestId('first-letter-search-radio');
    // await user.type(inputSearch, 'aa');
    // await user.click(firstLetterInput);
    // await user.click(btnSearchHearder);
    screen.debug();
  });
  // test('Verifica se barra está na página /drinks', async () => {
  //   const { user } = renderWithRouter(
  //     <ProviderLogin>
  //       <ProviderSearch>
  //         <App />
  //       </ProviderSearch>
  //     </ProviderLogin>,
  //     { route: '/drinks' },
  //   );
  //   const showForm = screen.getByTestId('search-top-btn');
  //   // expect(btnSearchForm).not.toBeInTheDocument();
  // });
});
