import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ContextSearch from '../context/ContextSearch';

function SearchBar() {
  const [showForm, setShowForm] = useState(false);
  const { handleChange, filterParm } = useContext(ContextSearch);

  const location = useLocation();
  const path = location.pathname.substring(1);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (path === 'meals') {
      filterParm('themealdb');
    }
    if (path === 'drinks') {
      filterParm('thecocktaildb');
    }
  };
  return (
    <div>
      <button data-testid="search-top-btn" onClick={ handleClick }>Buscar</button>
      { showForm
      && (
        <form action="" onSubmit={ handleSubmit }>
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
