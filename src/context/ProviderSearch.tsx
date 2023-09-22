import { useState } from 'react';
import ContextSearch from './ContextSearch';
import { SearchParmType, ApiReturnDrinks,
  ApiReturnTypeMeals, CarrouselIndexType } from '../types';
import useFetch from '../hooks/useFetch';

type ProviderSearchProps = {
  children: React.ReactNode
};
const INITIAL_VALUE = {
  input: '',
  parm: '',
};
function ProviderSearch({ children }: ProviderSearchProps) {
  const [searchParm, setSearchParm] = useState<SearchParmType>(INITIAL_VALUE);
  const [apiValue, setApiValue] = useState<any>();
  const [showFilter, setShowFilter] = useState(false);
  // const [suggestions, setSuggestions] = useState<ApiReturnDrinks[] |
  // ApiReturnTypeMeals[]>([]);
  const { getApi } = useFetch();
  // const recepiSuggestion = useFetch();

  const handleChange = (event:
  React
    .ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSearchParm({
      ...searchParm,
      [name]: value,
    });
  };

  // const getSuggestions = async (path:string) => {
  //   if (path === 'meals') {
  //     const drinks = await recepiSuggestion.getApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  //     setSuggestions(drinks.drinks.slice(0, 6));
  //   }
  //   if (path === 'drinks') {
  //     const food = await recepiSuggestion.getApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  //     setSuggestions(food.meals.slice(0, 6));
  //   }
  // };

  const filterParm = async (path:string, location:string) => {
    const { parm, input } = searchParm;
    try {
      if (parm === 'ingredient') {
        const ingredientResult = await getApi(`https://www.${path}.com/api/json/v1/1/filter.php?i=${input}`);
        setApiValue(ingredientResult);
        return ingredientResult;
      }
      if (parm === 'name') {
        const nameResult = await getApi(`https://www.${path}.com/api/json/v1/1/search.php?s=${input}`);
        setApiValue(nameResult);
        return nameResult;
      }
      if (parm === 'first-letter' && input.length === 1) {
        const firstLetterResult = await getApi(`https://www.${path}.com/api/json/v1/1/search.php?f=${input}`);
        setApiValue(firstLetterResult);
        return firstLetterResult;
      }
      if (parm === 'first-letter' && input.length > 1) {
        window.alert('Your search must have only 1 (one) character');
        return { [location]: null };
      }
    } catch (error) {
      console.error('Erro na resposta da api', error);
      return { [location]: null };
    }
  };

  const handleSubmit = async (path:string, location: string) => {
    const data = await filterParm(path, location);
    if (!data[location]) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
    }
    setShowFilter(true);
  };

  const values = {
    handleChange,
    handleSubmit,
    apiValue,
    showFilter,
    // getSuggestions,
    // suggestions,
  };
  return (
    <ContextSearch.Provider value={ values }>
      {children}
    </ContextSearch.Provider>
  );
}

export default ProviderSearch;
