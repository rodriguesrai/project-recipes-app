import React from 'react';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import ProviderLogin from '../context/ProviderLogin';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';
import { mockFetch, mockFetchOne } from './mock/mockFetch';

import ProviderRecipes from '../context/ProviderRecipes';

const searchBtnTop = 'search-top-btn';
describe('Barra de buscas', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetch as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('Verifica se barra está na página /meals', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderLogin>
          <ProviderSearch>
            <App />
          </ProviderSearch>
        </ProviderLogin>
      </ProviderRecipes>,
      { route: '/meals' },
    );
    const showForm = screen.getByTestId(searchBtnTop);
    await user.click(showForm);
    const btnSearchHearder = screen.getByText('Search');

    const inputSearch = screen.getByRole('textbox');
    const ingredientFilter = screen.getByTestId('ingredient-search-radio');
    await user.type(inputSearch, 'chicken');
    await user.click(ingredientFilter);
    await user.click(btnSearchHearder);
    expect(global.fetch).toHaveBeenCalled();
    const chiken = screen.getByText(/brown stew chicken/i);
    expect(chiken).toBeInTheDocument();
    const firstLetterInput = screen.getByTestId('first-letter-search-radio');
    await user.type(inputSearch, 'aa');
    await user.click(firstLetterInput);
    await user.click(btnSearchHearder);
  });
});

describe('Barra de buscas com somente um resultado', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetchOne as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('Verifica se a rota é redirecionada corretamente', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderLogin>
          <ProviderSearch>
            <App />
          </ProviderSearch>
        </ProviderLogin>
      </ProviderRecipes>,
      { route: '/meals' },
    );
    const showForm = screen.getByTestId(searchBtnTop);
    await user.click(showForm);
    const btnSearchHearder = screen.getByText('Search');

    const inputSearch = screen.getByRole('textbox');
    const ingredientFilter = screen.getByTestId('ingredient-search-radio');
    await user.type(inputSearch, 'chicken');
    await user.click(ingredientFilter);
    await user.click(btnSearchHearder);
    /* expect(screen.getByText('Brown Stew Chicken')).toBeInTheDocument(); */
    screen.debug();
  });
});
