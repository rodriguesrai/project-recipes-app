import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';
import ProviderRecipes from '../context/ProviderRecipes';

describe('Verifica funcionalidades na tela Meals', () => {
  test('Na pagina meals, ao clicar num card ele redireciona a uma nova pagina', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderSearch>
          <App />
        </ProviderSearch>
      </ProviderRecipes>,
      { route: '/meals' },
    );
    const firstCard = await screen.findByTestId('0-recipe-card');
    const lastCard = await screen.findByTestId('11-recipe-card');
    await user.click(lastCard);
    expect(firstCard).not.toBeInTheDocument();
  });

  test('Na pagina meals, testa as trocas de categoria e o reset delas', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderSearch>
          <App />
        </ProviderSearch>
      </ProviderRecipes>,
      { route: '/meals' },
    );
    const chickenCategory = await screen.findByTestId('Chicken-category-filter');
    await user.click(chickenCategory);
    expect(await screen.findByText(/ayam percik/i)).toBeInTheDocument();
    const resetFilter = await screen.findByTestId('All-category-filter');
    await user.click(resetFilter);
  });

  test('Na pagina drinks, ao clicar num card ele redireciona a uma nova pagina', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderSearch>
          <App />
        </ProviderSearch>
      </ProviderRecipes>,
      { route: '/drinks' },
    );
    const firstCard = await screen.findByTestId('0-recipe-card');
    const lastCard = await screen.findByTestId('11-recipe-card');
    await user.click(lastCard);
    expect(firstCard).not.toBeInTheDocument();
  });

  test('Na pagina drinks, testa as trocas de categoria e o reset delas', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderSearch>
          <App />
        </ProviderSearch>
      </ProviderRecipes>,
      { route: '/drinks' },
    );
    const cocoaCategory = await screen.queryByTestId('Cocoa-category-filter');
    await user.click(cocoaCategory);
    expect(await screen.queryByText(/castillian hot chocolate/i)).toBeInTheDocument();
    const resetFilter = await screen.queryByTestId('All-category-filter');
    await user.click(resetFilter);
  });
});
