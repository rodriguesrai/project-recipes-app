import { createContext } from 'react';
import { ApiReturnType } from '../types';

type ContextSearchType = {
  handleChange: (event:
  React
    .ChangeEvent<HTMLInputElement>) => void,
  filterParm: (path:string) => void,
  apiValue: ApiReturnType | undefined,

};
const ContextSearch = createContext({} as ContextSearchType);

export default ContextSearch;