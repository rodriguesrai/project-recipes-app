import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function Recipes() {
  const { getApi } = useFetch();
  const [apiData, setApiData] = useState([]);
  const [recipeFilters, setRecipeFilters] = useState([]);
  const [toggle, setToggle] = useState<string>('');
  const { category } = useParams();

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

  useEffect(() => {
    fetchRecipes();
  }, [category]);

  const fetchFilteredData = async (value: string) => {
    let filteredData = [];
    if (category === 'meals') {
      filteredData = await getApi(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
      setApiData(filteredData.meals.slice(0, 12));
    } else if (category === 'drinks') {
      filteredData = await getApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
      setApiData(filteredData.drinks.slice(0, 12));
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget;
    setToggle(value);
    return toggle === value ? fetchRecipes() : fetchFilteredData(value);
  };

  return (
    <>
      {recipeFilters.length > 0 && recipeFilters.map((filter, index) => (
        <button
          data-testid={ `${filter.strCategory}-category-filter` }
          key={ index }
          onClick={ handleClick }
          value={ filter.strCategory }
        >
          {filter.strCategory}
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ fetchRecipes }
      >
        Limpar Filtros
      </button>
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
