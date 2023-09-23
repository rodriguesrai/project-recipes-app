import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import { renderWithRouter } from '../helpers/renderWithRouter';
import ProviderRecipes from '../context/ProviderRecipes';
import ProviderLogin from '../context/ProviderLogin';
import ProviderSearch from '../context/ProviderSearch';
import App from '../App';
import Drinks from '../components/Drinks';
import Meals from '../components/Meals';

const receiveIds = {
  drinks: 'drinks-bottom-btn',
  meals: 'meals-bottom-btn',
  login: 'login-submit-btn',
};
describe('Testes de cobertura para o Footer', () => {
  test('Verifica se o Footer possui a imagem drinkIcon.svg', () => {
    renderWithRouter(<Footer />);

    screen.getByRole('img', { name: /drinks/i });
  });
  test('Verifica se o Footer possui a imagem mealIcon.svg ', () => {
    renderWithRouter(<Footer />);
    screen.getByRole('img', { name: /meals/i });
  });
  test('Verifica se o Footer possui o botão drinks', () => {
    renderWithRouter(<Footer />);
    screen.getByTestId(receiveIds.drinks);
  });
  test('Verifica se o Footer possui o botão meals ', () => {
    renderWithRouter(<Footer />);
    screen.findByTestId(receiveIds.meals);
  });
  test('Verifica se o Footer está presente na rota /drinks ', async () => {
    renderWithRouter(<Footer />);
    screen.findByTestId('drinks-bottom-btn');
  });

  test('Verifica se ao clicr no botão com a imagem mealIcon.svg direciona para rota meals', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderLogin>
          <ProviderSearch>
            <App />
          </ProviderSearch>
        </ProviderLogin>
      </ProviderRecipes>,
    );
    const button = screen.getByTestId(receiveIds.login);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    expect(screen.getByTestId(receiveIds.login)).toBeDisabled();
    await user.type(email, 'teste@teste.com');
    await user.type(password, '1234567');
    expect(button).not.toBeDisabled();
    await user.click(button);
    const mealsClick = screen.getByTestId(receiveIds.meals);
    expect(mealsClick).toBeInTheDocument();
    await userEvent.click(mealsClick);
    expect(window.location.pathname).toBe('/meals');
  });

  test('Verifica se ao clicr no botão com a imagem drinkIcon.svg direciona para rota /drinks', async () => {
    const { user } = renderWithRouter(
      <ProviderRecipes>
        <ProviderLogin>
          <ProviderSearch>
            <App />
          </ProviderSearch>
        </ProviderLogin>
      </ProviderRecipes>,
    );
    const button = screen.getByTestId(receiveIds.login);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    expect(screen.getByTestId(receiveIds.login)).toBeDisabled();
    await user.type(email, 'teste@teste.com');
    await user.type(password, '1234567');
    expect(button).not.toBeDisabled();
    await user.click(button);
    const drinksClick = screen.getByTestId(receiveIds.drinks);
    expect(drinksClick).toBeInTheDocument();
    await userEvent.click(drinksClick);
    expect(window.location.pathname).toBe('/drinks');
  });
});
