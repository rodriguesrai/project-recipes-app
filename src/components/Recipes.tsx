import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function Recipes() {
  const { getApi } = useFetch();
  const [apiData, setApiData] = useState([]);
  const [recipeFilters, setRecipeFilters] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (category === 'meals') {
        const cards = await getApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setApiData(cards.meals.slice(0, 12));
        const filters = await getApi('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        setRecipeFilters(filters.meals.slice(0, 5));
      } else if (category === 'drinks') {
        const cards = await getApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setApiData(cards.drinks.slice(0, 12));
        const filters = await getApi('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        setRecipeFilters(filters.drinks.slice(0, 5));
      }
    };

    fetchRecipes();
  }, [category]);

  return (
    <>
      {recipeFilters.length > 0 && recipeFilters.map((filter, index) => (
        <button
          data-testid={ `${filter.strCategory}-category-filter` }
          key={ index }
        >
          {filter.strCategory}
        </button>
      ))}

      {apiData.length > 0 && apiData.map((recipe, index: number) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            src={ category === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ `${index}-card-img` }
            data-testid={ `${index}-card-img` }
            width="200"
          />
          <p data-testid={ `${index}-card-name` }>
            {category === 'meals' ? recipe.strMeal : recipe.strDrink}
          </p>
        </div>
      ))}

    </>
  );
}
export default Recipes;
