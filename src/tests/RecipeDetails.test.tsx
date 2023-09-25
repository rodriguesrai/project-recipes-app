import React from 'react';
import { findByTestId, screen } from '@testing-library/react';
import ProviderLogin from '../context/ProviderLogin';
import ProviderSearch from '../context/ProviderSearch';
import ProviderRecipes from '../context/ProviderRecipes';
import { renderWithRouter } from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando a pagina de detalhes de uma receita', () => {
  const firstRecipeTestId = '0-card-img';
  const recipeTitle = 'recipe-title';
  test('Testa de renderiza as informações da receita de comidas', async () => {
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
    const firstRecipe = await screen.findByTestId(firstRecipeTestId);
    expect(firstRecipe).toBeInTheDocument();

    await user.click(firstRecipe);

    const titleRecipe = await screen.findByTestId(recipeTitle);
    expect(titleRecipe).toBeInTheDocument();

    const imgRecipe = await screen.findByTestId('recipe-photo');
    expect(imgRecipe).toBeInTheDocument();

    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const ulIngredients = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ulIngredients).toBeInTheDocument();

    const recipeInstructions = await screen.findByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();

    const videoRecipe = await screen.findByTestId('video');
    expect(videoRecipe).toBeInTheDocument();
  });
  test('Testa de renderiza as informações da receita de bebidas', async () => {
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
    const firstRecipe = await screen.findByTestId(firstRecipeTestId);
    expect(firstRecipe).toBeInTheDocument();

    await user.click(firstRecipe);

    const titleRecipe = await screen.findByTestId(recipeTitle);
    expect(titleRecipe).toBeInTheDocument();

    const imgRecipe = await screen.findByTestId('recipe-photo');
    expect(imgRecipe).toBeInTheDocument();

    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const ulIngredients = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ulIngredients).toBeInTheDocument();

    const recipeInstructions = await screen.findByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();
  });
  test('Testa se a tela está sendo direcionada ao clicar no botão de começar receita', async () => {
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
    const firstRecipe = await screen.findByTestId(firstRecipeTestId);
    expect(firstRecipe).toBeInTheDocument();

    await user.click(firstRecipe);

    const titleRecipe = await screen.findByTestId(recipeTitle);
    expect(titleRecipe).toBeInTheDocument();

    const buttonStartRecipe = await screen.findByTestId('start-recipe-btn');
    expect(buttonStartRecipe).toBeInTheDocument();

    await user.click(buttonStartRecipe);

    // expect(buttonStartRecipe).not.toBeInTheDocument();
  });
  test('Testa se na tela aparece o texto de link copiado após o clique do botão', async () => {
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
    const firstRecipe = await screen.findByTestId(firstRecipeTestId);
    expect(firstRecipe).toBeInTheDocument();

    await user.click(firstRecipe);

    const titleRecipe = await screen.findByTestId(recipeTitle);
    expect(titleRecipe).toBeInTheDocument();

    const buttonCopy = await screen.findByTestId('share-btn');
    expect(buttonCopy).toBeInTheDocument();

    await user.click(buttonCopy);

    const linkCopy = await screen.findByText(/link copied!/i);
    expect(linkCopy).toBeInTheDocument();
  });
  test('Testa o botão de favoritar', async () => {
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
    const firstRecipe = await screen.findByTestId(firstRecipeTestId);
    expect(firstRecipe).toBeInTheDocument();

    await user.click(firstRecipe);

    const titleRecipe = await screen.findByTestId(recipeTitle);
    expect(titleRecipe).toBeInTheDocument();

    const buttonFavorite = await screen.findByAltText(/white heart/i);
    expect(buttonFavorite).toBeInTheDocument();

    await user.click(buttonFavorite);

    const blackHeart = await screen.findByAltText(/black heart/i);
    expect(blackHeart).toBeInTheDocument();

    await user.click(blackHeart);

    expect(buttonFavorite).toBeInTheDocument();
  });
});
