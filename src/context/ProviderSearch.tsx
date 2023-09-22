import { useState } from 'react';
import ContextSearch from './ContextSearch';
import { SearchParmType, RecipeMealsDetails } from '../types';
import useFetch from '../hooks/useFetch';

type ProviderSearchProps = {
  children: React.ReactNode
};
const INITIAL_VALUE = {
  input: '',
  parm: '',
};
// const INITIAL_VALUE_API = {
//   meals: [
//     {
//       idMeal: '',
//       strMeal: '',
//       strDrinkAlternate: '',
//       strCategory: '',
//       strArea: '',
//       strInstructions: '',
//       strMealThumb: '',
//       strTags: '',
//       strYoutube: '',
//       strIngredient1: '',
//       strIngredient2: '',
//       strIngredient3: '',
//       strIngredient4: '',
//       strIngredient5: '',
//       strIngredient6: '',
//       strIngredient7: '',
//       strIngredient8: '',
//       strIngredient9: '',
//       strIngredient10: '',
//       strIngredient11: '',
//       strIngredient12: '',
//       strIngredient13: '',
//       strIngredient14: '',
//       strIngredient15: '',
//       strIngredient16: '',
//       strIngredient17: '',
//       strIngredient18: '',
//       strIngredient19: '',
//       strIngredient20: '',
//       strMeasure1: '',
//       strMeasure2: '',
//       strMeasure3: '',
//       strMeasure4: '',
//       strMeasure5: '',
//       strMeasure6: '',
//       strMeasure7: '',
//       strMeasure8: '',
//       strMeasure9: '',
//       strMeasure10: '',
//       strMeasure11: '',
//       strMeasure12: '',
//       strMeasure13: '',
//       strMeasure14: '',
//       strMeasure15: '',
//       strMeasure16: '',
//       strMeasure17: '',
//       strMeasure18: '',
//       strMeasure19: '',
//       strMeasure20: '',
//       strSource: 'string',
//       strImageSource: 'string',
//       strCreativeCommonsConfirmed: 'string',
//       dateModified: 'string',
//     },
//   ],
// };
function ProviderSearch({ children }: ProviderSearchProps) {
  const [searchParm, setSearchParm] = useState<SearchParmType>(INITIAL_VALUE);
  const [recipeDetailsAPI, setRecipeDetailsAPI] = useState<RecipeMealsDetails[]>();
  const [apiValue, setApiValue] = useState<any>();
  const [showFilter, setShowFilter] = useState(false);
  const { getApi } = useFetch();

  const handleChange = (event:
  React
    .ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSearchParm({
      ...searchParm,
      [name]: value,
    });
  };
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

  const fetchRecipeDetailsAPI = (pathname: string, id: string | undefined) => {
    const fetchRecipe = async () => {
      const URL_API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await getApi(URL_API);
      setRecipeDetailsAPI(data.meals);
    };
    const fetchDrinkAPI = async () => {
      const URL_API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await getApi(URL_API);
      setRecipeDetailsAPI(data.drinks);
    };
    return pathname.includes('meals') ? fetchRecipe() : fetchDrinkAPI();
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
    fetchRecipeDetailsAPI,
    recipeDetailsAPI,

  };
  return (
    <ContextSearch.Provider value={ values }>
      {children}
    </ContextSearch.Provider>
  );
}

export default ProviderSearch;
