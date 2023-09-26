import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';
import ProviderRecipes from '../context/ProviderRecipes';
import localStorageMock from './mock/localStorageMock';
import { favoriteRecipes } from './mock/mockData';
import { inProgressMock } from './mock/inProgressMockData';

beforeEach(() => {
  localStorageMock.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  localStorageMock.setItem('inProgressRecipes', JSON.stringify(inProgressMock));
});
afterEach(() => {
  localStorageMock.removeItem('favoriteRecipes');
  localStorageMock.removeItem('inProgressRecipes');
});

describe('Verifica funcionalidades na RecipeProgress', () => {
  test('Na pagina RecipeProgress, clicar no botao compartilhar, favoritar e checkbox chamam as respectivas funcoes', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderSearch>
          <App />
        </ProviderSearch>
      </ProviderRecipes>,
      { route: '/meals/52977/in-progress' },
    );
    const shareBtn = screen.getByRole('button', {
      name: /compartilhar/i,
    });
    const favoriteBtn = screen.getByRole('img', {
      name: /white heart/i,
    });
    const firstCheckbox = await screen.findByRole('checkbox', {
      name: /lentils - 1 cup/i,
    });
    const finalizarBtn = screen.getByRole('button', {
      name: /finalizar/i,
    });
    await user.click(shareBtn);
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

    await user.click(favoriteBtn);
    await user.click(firstCheckbox);
    expect(finalizarBtn).toBeDisabled();
  });
  test('Se houver algum recipe favoritado, o botao de favoritos deve ser diferente', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderSearch>
          <App />
        </ProviderSearch>
      </ProviderRecipes>,
      { route: '/meals/52771/in-progress' },
    );

    const favoriteBtn = screen.getByRole('img', {
      name: /black heart/i,
    });
    await user.click(favoriteBtn);
  });
});
