import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';
import ProviderRecipes from '../context/ProviderRecipes';
import localStorageMock from './mock/localStorageMock';
import { mockedMeal, mockedDoneRecipes } from './mock/inProgressMockData';
import RecipeInProgress from '../components/RecipeInProgress';

beforeEach(() => {
  localStorageMock.setItem('doneRecipes', JSON.stringify(mockedDoneRecipes));
});
afterEach(() => {
  localStorageMock.removeItem('doneRecipes');
});

describe('Verifica funcionalidades na tela RecipeProgress com bebidas', () => {
  test('Na pagina RecipeProgress, clicar no botao compartilhar, favoritar e checkbox chamam as respectivas funcoes', async () => {
    const mockedDrink = [{
      id: '15997',
      nationality: '',
      name: 'GG',
      category: 'Ordinary Drink',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      tags: [],
      alcoholicOrNot: 'Optional alcohol',
      type: 'drink',
      doneDate: '2023-09-26T14:59:46.226Z',
    }];

    renderWithRouter(
      <ProviderRecipes>
        <ProviderSearch>
          <RecipeInProgress />
        </ProviderSearch>
      </ProviderRecipes>,
      { route: '/drinks/15997/in-progress' },
    );

    const checkbox = await screen.findByRole('checkbox', {
      name: /galliano - 2 1\/2 shots/i,
    });
    const finalizarBtn = screen.getByRole('button', {
      name: /finalizar/i,
    });
    await userEvent.click(checkbox);
    await userEvent.click(finalizarBtn);
    expect(mockedDoneRecipes).toEqual(mockedDrink);
    screen.debug();
  });

  test('Testa se o localstorage esta correto', async () => {
    const mockedmealRecipes = [{
      id: '52771',
      nationality: 'Italian',
      name: 'Spicy Arrabiata Penne',
      category: 'Vegetarian',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      tags: [
        'Pasta',
        'Curry',
      ],
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: '2023-09-26T14:59:46.226Z',
    }];

    renderWithRouter(
      <ProviderRecipes>
        <ProviderSearch>
          <RecipeInProgress />
        </ProviderSearch>
      </ProviderRecipes>,
      { route: '/meals/52978/in-progress' },
    );

    const finalizarBtn = screen.getByRole('button', {
      name: /finalizar/i,
    });
    await userEvent.click(finalizarBtn);
    expect(mockedmealRecipes).toEqual(mockedMeal);

    screen.debug();
  });
});
