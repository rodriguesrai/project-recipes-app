import { Outlet, useNavigate } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  const navigate = useNavigate();
  const handleNavigatorDrinks = () => {
    navigate('/drinks');
  };
  const handleNavigatorMeals = () => {
    navigate('/meals');
  };

  return (

    <>
      <footer
        data-testid="footer"
        className="fixedFooter"
      >

        <button
          type="button"
          data-testid="drinks-bottom-btn"
          src={ DrinkIcon }
          onClick={ handleNavigatorDrinks }
        >
          <img src={ DrinkIcon } alt="Drinks" />

        </button>
        <button
          type="button"
          data-testid="meals-bottom-btn"
          src={ MealIcon }
          onClick={ handleNavigatorMeals }
        >
          <img src={ MealIcon } alt="Meals" />
        </button>

      </footer>
      <main>
        <Outlet />
      </main>
    </>

  );
}

export default Footer;
