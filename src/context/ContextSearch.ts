import { createContext } from 'react';
import { ApiReturnDrinks, ApiReturnType,
  ApiReturnTypeMeals, RecipeMealsDetails } from '../types';

type ContextSearchType = {
  handleChange: (event:
  React
    .ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (path:string, location: string) => void,
  apiValue: ApiReturnType | undefined,
  showFilter: boolean,
  getSuggestions: (path: string) => void
  suggestions: ApiReturnDrinks[] | ApiReturnTypeMeals[],
  getLocalStorageCarrousel: (path:string) => any,
  doneRecipe: any[]
  progressRecipe: boolean,
  fetchRecipeDetailsAPI: (pathname: string, id: string | undefined) => Promise<void>,
  recipeDetailsAPI: RecipeMealsDetails | undefined,
  showForm: boolean,
  setShowForm: (arg: any) => void,
};
const ContextSearch = createContext({} as ContextSearchType);

export default ContextSearch;
