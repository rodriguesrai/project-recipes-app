import { createContext } from 'react';
import { ApiReturnType } from '../types';

type ContextSearchType = {
  handleChange: (event:
  React
    .ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (path:string, location: string) => void,
  apiValue: ApiReturnType | undefined,

};
const ContextSearch = createContext({} as ContextSearchType);

export default ContextSearch;
