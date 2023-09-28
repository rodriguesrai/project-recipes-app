import { createContext } from 'react';
import { ApiReturnDrinks, ApiReturnType,
  ApiReturnTypeMeals, FavoriteType, RecipeMealsDetails } from '../types';

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
  handleClickFavorite: (path: string, id: string) => void,
  favorites: FavoriteType[],
  setFavorites: (arg: any) => void,
  ingredientsAndMeasureList: string[],
  locationURL: {
    hash: string,
    key: string,
    pathname: string,
    search: string,
    state: string | null
  }
  handleClickSearch: () => void,
};
const ContextSearch = createContext({} as ContextSearchType);

export default ContextSearch;
