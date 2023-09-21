import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';
import ProviderLogin from '../context/ProviderLogin';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';
import { mockFetchDrinks, mockFetchDrinksOne } from './mock/mockFetchDrinks';

const searchBtnTop = 'search-top-btn';
describe('Barra de buscas para bebidas', async () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchDrinks as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('Verifica se renderiza as bebidas corratament', async () => {
    const { user } = renderWithRouter(
      <ProviderLogin>
        <ProviderSearch>
          <App />
        </ProviderSearch>
      </ProviderLogin>,
      { route: '/drinks' },
    );
    const showForm = screen.getByTestId(searchBtnTop);
    await user.click(showForm);
    const btnSearchHearder = screen.getByText('Search');
    const inputSearch = screen.getByRole('textbox');
    await user.type(inputSearch, 'gin');
    const btnIngrdient = screen.getByTestId('name-search-radio');
    await user.click(btnIngrdient);
    await user.click(btnSearchHearder);
    screen.debug();
  });
});
