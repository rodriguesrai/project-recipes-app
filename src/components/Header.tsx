import { Link, Outlet, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProfileIcon from '../images/profileIcon.svg';

function Header() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/meals':
        return 'Meals';
      case '/drinks':
        return 'Drinks';
      case '/profile':
        return 'Profile';
      case '/done-recipes':
        return 'Done Recipes';
      case '/favorite-recipes':
        return 'Favorite Recipes';
      default:
        return '';
    }
  };

  return (
    <>
      <header>
        <h1 data-testid="page-title">{getTitle()}</h1>
        <Link to="/profile">
          <img
            src={ ProfileIcon }
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </Link>
        <SearchBar />
      </header>
      <main>
        <Outlet />
      </main>

    </>
  );
}

export default Header;
