import React from 'react';
import { screen } from '@testing-library/react';

import { vi } from 'vitest';
import App from '../App';
import ProviderLogin from '../context/ProviderLogin';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';
import { mockFetchDrinks } from './mock/mockFetchDrinks';
import ProviderRecipes from '../context/ProviderRecipes';

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
      <ProviderRecipes>
        <ProviderLogin>
          <ProviderSearch>
            <App />
          </ProviderSearch>
        </ProviderLogin>
      </ProviderRecipes>,
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
