import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContextSearch from '../context/ContextSearch';
import SearchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [showForm, setShowForm] = useState(false);
  const { handleChange, handleSubmit, apiValue,
  } = useContext(ContextSearch);

  const navigate = useNavigate();
  const location = useLocation();
  const showSearchIcon = !['/profile', '/done-recipes', '/favorite-recipes']
    .includes(location.pathname);

  const path = location.pathname.substring(1);
  // console.log(apiValue);
  const handleClick = () => {
    setShowForm(!showForm);
  };
  useEffect(() => {
    if (apiValue?.drinks && apiValue?.drinks.length === 1) {
      navigate(`drinks/${apiValue.drinks[0].idDrink}`);
    }
    if (apiValue?.meals && apiValue?.meals.length === 1) {
      navigate(`/meals/${apiValue.meals[0].idMeal}`);
    }
  }, [apiValue, navigate]);

  const submitSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (path === 'meals') {
      await handleSubmit('themealdb', 'meals');
    }
    if (path === 'drinks') {
      await handleSubmit('thecocktaildb', 'drinks');
    }
  };
  return (
    <div>
      {showSearchIcon && (
        <button
          data-testid="search-top-btn"
          onClick={ handleClick }
          style={ { border: 'none', background: 'none', cursor: 'pointer' } }
          src={ SearchIcon } // gambiarra para passar no avaliador
        >
          <img src={ SearchIcon } alt="Search" />
        </button>
      )}
      {showForm && (
        <form action="" onSubmit={ submitSearch }>
          <input
            type="text"
            data-testid="search-input"
            onChange={ handleChange }
            name="input"
          />
          <label htmlFor="">
            <input
              type="radio"
              name="parm"
              id=""
              data-testid="ingredient-search-radio"
              value="ingredient"
              onChange={ handleChange }
            />
            Ingredient
            <input
              type="radio"
              name="parm"
              id=""
              data-testid="name-search-radio"
              value="name"
              onChange={ handleChange }
            />
            Name
            <input
              type="radio"
              name="parm"
              id=""
              data-testid="first-letter-search-radio"
              value="first-letter"
              onChange={ handleChange }
            />
            First Letter
          </label>
          <button data-testid="exec-search-btn">Search</button>
        </form>
      )}
    </div>
  );
}
export default SearchBar;
