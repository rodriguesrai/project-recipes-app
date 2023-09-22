import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ContextSearch from '../context/ContextSearch';
import '../style/Carrousel.css';
import useFetch from '../hooks/useFetch';
import { ApiReturnDrinks, ApiReturnTypeMeals } from '../types';

function RecipeDetails() {
  const [thumbnail, setThumbnail] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const { pathname } = useLocation();
  const { getApi } = useFetch();
  // const { getSuggestions, suggestions } = useContext(ContextSearch);
  const [suggestions, setSuggestions] = useState<ApiReturnDrinks[] |
  ApiReturnTypeMeals[]>([]);
  const path: string = pathname.split('/')[1];

  const verifyPath = () => {
    if (path === 'meals') {
      setThumbnail('strDrinkThumb');
      setRecipeName('strDrink');
    }
    if (path === 'drinks') {
      setThumbnail('strMealThumb');
      setRecipeName('strMeal');
    }
  };
  useEffect(() => {
    verifyPath();
    const getSuggestions = async () => {
      if (path === 'meals') {
        const drinks = await getApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setSuggestions(drinks.drinks.slice(0, 6));
      }
      if (path === 'drinks') {
        const food = await getApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setSuggestions(food.meals.slice(0, 6));
      }
    };
    getSuggestions();
  }, []);
  return (
    <>

      <div className="carrouselContainer">
        {suggestions.length > 0 && suggestions.map((suggestion, index) => (
          <div data-testid={ `${index}-recommendation-card` } key={ index }>
            <img src={ suggestion[thumbnail] } alt="" className="imgCarrousel" />
            <p data-testid={ `${index}-recommendation-title` }>
              {suggestion[recipeName]}

            </p>
          </div>
        ))}
      </div>
      <button data-testid="start-recipe-btn" className="btnStart">Start Recipe</button>
    </>
  );
}

export default RecipeDetails;
