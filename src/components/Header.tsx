import { Link, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import drinkHeader from '../style/icons/drinkHeader.svg';
// import mealHeader from '../style/icons/mealsHeader.svg';
import iconDone from '../images/iconDone.svg';
import SearchBar from './SearchBar';
import ProfileIcon from '../images/profileIcon.svg';
import { DivButtons,
  DivTitle,
  HeaderContainer,
  HeaderTitle,
  ImgFood,
  ImgLogo } from '../style/Header.styled';
import heartHeader from '../images/heartHeader.svg';
import mealHeader from '../images/mealHeader2.svg';
import iconAPP from '../images/iconAPP.svg';
import iconLogoAPP from '../images/iconLogoAPP.svg';
import ContextSearch from '../context/ContextSearch';
import SearchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const { handleClickSearch,
  } = useContext(ContextSearch);

  const getTitle = () => {
    switch (location.pathname) {
      case '/meals':
        return { title: 'Meals', imageSrc: mealHeader };
      case '/drinks':
        return { title: 'Drinks', imageSrc: drinkHeader };
      case '/profile':
        return { title: 'Profile', imgSrc: null };
      case '/done-recipes':
        return { title: 'Done Recipes', imageSrc: iconDone };
      case '/favorite-recipes':
        return { title: 'Favorite Recipes', imageSrc: heartHeader };
      default:
        return { title: '', imageSrc: '' };
    }
  };
  const showSearchIcon = !['/profile', '/done-recipes', '/favorite-recipes']
    .includes(location.pathname);

  const titleData = getTitle();

  return (
    <>
      <HeaderContainer>
        <Link to="/meals">
          <DivButtons>
            <ImgLogo src={ iconAPP } alt="" />
            <img src={ iconLogoAPP } alt="" />
          </DivButtons>
        </Link>
        <DivButtons>
          <Link to="/profile">
            <ImgLogo
              src={ ProfileIcon }
              alt="Profile"
              data-testid="profile-top-btn"
            />
          </Link>
          {showSearchIcon && (
            <button
              data-testid="search-top-btn"
              onClick={ handleClickSearch }
              style={ { border: 'none', background: 'none', cursor: 'pointer' } }
              src={ SearchIcon }
            >
              <ImgLogo src={ SearchIcon } alt="Search" />
            </button>
          )}
        </DivButtons>
      </HeaderContainer>
      <DivTitle>
        {titleData.imageSrc && <ImgFood src={ titleData.imageSrc } alt="" />}
        <HeaderTitle data-testid="page-title">{titleData.title}</HeaderTitle>
        <SearchBar />
      </DivTitle>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Header;
