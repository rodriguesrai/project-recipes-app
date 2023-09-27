import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import App from '../App';
import ProviderLogin from '../context/ProviderLogin';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderSearch from '../context/ProviderSearch';
import ProviderRecipes from '../context/ProviderRecipes';
import localStorageMock from './mock/localStorageMock';

const spicy = 'Spicy Arrabiata Penne';
const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
beforeEach(() => {
  localStorageMock.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
});
afterEach(() => {
  localStorageMock.removeItem('favoriteRecipes');
});
describe('Testes página de receitas favoritas', () => {
  test('Verifica se os botões "All", "Meals", "Drinks" estão na pagina', async () => {
    vi.spyOn(Storage.prototype, 'getItem');
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderLogin>
          <ProviderSearch>
            <App />
          </ProviderSearch>
        </ProviderLogin>
      </ProviderRecipes>,
      { route: '/favorite-recipes' },
    );
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    // expect(localStorage.getItem).toHaveBeenCalled();

    const btnShare = screen.getByTestId('0-horizontal-share-btn');
    await user.click(btnShare);
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    const drink = screen.getByText('Aquamarine');
    const food = screen.getByText(spicy);
    await user.click(btnMeals);
    expect(screen.getByText(spicy));
    expect(drink).not.toBeInTheDocument();
    await user.click(btnAll);

    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
    await user.click(btnDrinks);
    expect(food).not.toBeInTheDocument();
    await user.click(btnAll);
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    await user.click(favoriteBtn);
  });
});
