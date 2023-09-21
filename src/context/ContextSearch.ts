import { createContext } from 'react';

type ContextSearchType = {
  handleChange: (event:
  React
    .ChangeEvent<HTMLInputElement>) => void,
  filterParm: (path:string) => void,
};
const ContextSearch = createContext({} as ContextSearchType);

export default ContextSearch;
