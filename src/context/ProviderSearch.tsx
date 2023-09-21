import { useState } from 'react';
import ContextSearch from './ContextSearch';
import { SearchParmType, ApiReturnType } from '../types';
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
  const [apiValue, setApiValue] = useState<ApiReturnType>();
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
  const filterParm = async (path:string) => {
    const { parm, input } = searchParm;
    if (parm === 'ingredient') {
      setApiValue(await getApi(`https://www.${path}.com/api/json/v1/1/filter.php?i=${input}`));
    }
    if (parm === 'name') {
      setApiValue(await getApi(`https://www.${path}.com/api/json/v1/1/search.php?s=${input}`));
    }
    if (parm === 'first-letter' && input.length === 1) {
      setApiValue(await getApi(`https://www.${path}.com/api/json/v1/1/search.php?f=${input}`));
    }
    if (parm === 'first-letter' && input.length > 1) {
      return window.alert('Your search must have only 1 (one) character');
    }
  };
  const values = {
    handleChange,
    filterParm,
    apiValue,

  };
  return (
    <ContextSearch.Provider value={ values }>
      {children}
    </ContextSearch.Provider>
  );
}

export default ProviderSearch;
