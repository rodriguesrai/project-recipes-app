import { useState } from 'react';
import ContextRecipes from './ContextRecipes';
import { RecipesType, CategoryFiltersType } from '../types';
import useFetch from '../hooks/useFetch';

type ProviderRecipesProps = {
  children: React.ReactNode
};

function ProviderRecipes({ children }: ProviderRecipesProps) {
  const { getApi } = useFetch();
  const [apiData, setApiData] = useState<RecipesType[]>([]);
  const [recipeFilters, setRecipeFilters] = useState<CategoryFiltersType[]>([]);
  const [toggle, setToggle] = useState<string>('');

  const fetchRecipes = async (category: string | undefined) => {
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
  const fetchFilteredData = async (value: string, category: string | undefined) => {
    let filteredData = [];
    if (category === 'meals') {
      filteredData = await getApi(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
      setApiData(filteredData.meals.slice(0, 12));
    } else if (category === 'drinks') {
      filteredData = await getApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
      setApiData(filteredData.drinks.slice(0, 12));
    }
  };

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    category: string | undefined,
  ) => {
    event.preventDefault();
    const { value } = event.currentTarget;
    setToggle(value);
    return toggle === value ? fetchRecipes(category) : fetchFilteredData(value, category);
  };

  const values = {
    fetchRecipes,
    recipeFilters,
    handleClick,
    apiData,
  };
  return (
    <ContextRecipes.Provider value={ values }>
      {children}
    </ContextRecipes.Provider>
  );
}

export default ProviderRecipes;
