import { createContext } from 'react';
import { CategoryFiltersType, RecipesType } from '../types';

type ContextRecipesType = {
  fetchRecipes: (category: string | undefined) => void,
  recipeFilters: CategoryFiltersType[],
  handleClick: (event: React.MouseEvent<HTMLButtonElement>,
    category: string | undefined) => void,
  apiData:RecipesType[],
};
const ContextRecipes = createContext({} as ContextRecipesType);

export default ContextRecipes;
