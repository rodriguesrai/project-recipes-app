import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContextSearch from '../context/ContextSearch';
import SearchIcon from '../images/searchIcon.svg';
import { FormSearchBar, RadiosLabel,
  ButtonSearchBar, InputRadio,
  InputText } from '../style/SearchBar.styled';

function SearchBar() {
  const { handleChange, handleSubmit, apiValue, showForm, handleClickSearch,
  } = useContext(ContextSearch);

  const navigate = useNavigate();
  const location = useLocation();
  
  const path = location.pathname.substring(1);

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
      {showForm && (

        <FormSearchBar action="" onSubmit={ submitSearch }>

          <InputText
            type="text"
            data-testid="search-input"
            onChange={ handleChange }
            name="input"
            placeholder="Search"
          />

          <RadiosLabel htmlFor="">
            <InputRadio
              type="radio"
              name="parm"
              id=""
              data-testid="ingredient-search-radio"
              value="ingredient"
              onChange={ handleChange }
            />
            Ingredient
            <InputRadio
              type="radio"
              name="parm"
              id=""
              data-testid="name-search-radio"
              value="name"
              onChange={ handleChange }
            />
            Name
            <InputRadio
              type="radio"
              name="parm"
              id=""
              data-testid="first-letter-search-radio"
              value="first-letter"
              onChange={ handleChange }
            />
            First Letter
          </RadiosLabel>

          <ButtonSearchBar data-testid="exec-search-btn">Search</ButtonSearchBar>

        </FormSearchBar>

      )}
    </div>
  );
}
export default SearchBar;
