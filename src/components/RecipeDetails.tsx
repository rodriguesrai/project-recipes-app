import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ContextSearch from '../context/ContextSearch';
import '../style/Carrousel.css';
import useFetch from '../hooks/useFetch';
import { ApiReturnDrinks, ApiReturnTypeMeals } from '../types';

function RecipeDetails() {
  const [thumbnail, setThumbnail] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [doneRecipe, setDoneRecipe] = useState([]);
  const [progressRecipe, setProgressRecipe] = useState(false);
  const { id } = useParams();
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
  // setDoneRecipe(JSON.parse(localStorage.getItem('doneRecipes') as string));
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
    const responseLocalStorage = JSON
      .parse(localStorage.getItem('doneRecipes') as string);

    const responseProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes') as string);

    if (responseLocalStorage) {
      setDoneRecipe(responseLocalStorage);
    }
    if (responseProgress && responseProgress[path]) setProgressRecipe(responseProgress[path]);
  }, []);
  // const verify = () => {
  //   if (progressRecipe[path]) {
  //     return
  //   }
  // };
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
      {!doneRecipe.some((recipe) => recipe.id === id)
      && (
        <button data-testid="start-recipe-btn" className="btnStart">
          {!progressRecipe[id]
            ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      )}
    </>
  );
}

export default RecipeDetails;
