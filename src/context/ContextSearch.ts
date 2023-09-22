import { createContext } from 'react';
import { ApiReturnType, RecipeMealsDetails } from '../types';

type ContextSearchType = {
  handleChange: (event:
  React
    .ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (path:string, location: string) => void,
  apiValue: ApiReturnType | undefined,
  showFilter: boolean,
  fetchRecipeDetailsAPI: (pathname: string, id: string | undefined) => Promise<void>,
  recipeDetailsAPI: RecipeMealsDetails[] | undefined,

};
const ContextSearch = createContext({} as ContextSearchType);

export default ContextSearch;
