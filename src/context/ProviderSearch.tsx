import { useState } from 'react';
import ContextSearch from './ContextSearch';
import { SearchParmType } from '../types';
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
  const { apiData, getApi } = useFetch();
  const handleChange = (event:
  React
    .ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSearchParm({
      ...searchParm,
      [name]: value,
    });
  };
  const filterParm = (path:string) => {
    const { parm, input } = searchParm;
    if (parm === 'ingredient') {
      getApi(`https://www.${path}.com/api/json/v1/1/filter.php?i=${input}`);
    }
    if (parm === 'name') {
      getApi(`https://www.${path}.com/api/json/v1/1/search.php?s=${input}`);
    }
    if (parm === 'first-letter' && input.length === 1) {
      console.log('entrou');
      getApi(`https://www.${path}.com/api/json/v1/1/search.php?f=${input}`);
    }
    if (parm === 'first-letter' && input.length > 1) {
      return window.alert('Your search must have only 1 (one) character');
    }
  };
  const values = {
    handleChange,
    filterParm,
  };
  return (
    <ContextSearch.Provider value={ values }>
      {children}
    </ContextSearch.Provider>
  );
}

export default ProviderSearch;
