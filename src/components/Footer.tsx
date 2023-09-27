import { Outlet, Link } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
/*   const navigate = useNavigate();
  const handleNavigatorDrinks = () => {
    navigate('/drinks');
  };
  const handleNavigatorMeals = () => {
    navigate('/meals');
  };
 */
  return (
    <>
      <footer
        data-testid="footer"
        className="fixedFooter"
      >

        <Link
          to="/drinks"
          className="imgButton"

        >
          <img
            src={ DrinkIcon }
            alt="Drinks"
            className="imgDrinks"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link
          to="/meals"
          className="imgButton"

        >
          <img
            src={ MealIcon }
            alt="Meals"
            className="imgMeals"
            data-testid="meals-bottom-btn"
          />
        </Link>

      </footer>
      <main>
        <Outlet />
      </main>
    </>

  );
}

export default Footer;
