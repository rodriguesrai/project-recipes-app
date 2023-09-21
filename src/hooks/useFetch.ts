import { useState } from 'react';
import { ApiReturnType } from '../types';

function useFetch() {
  const [apiData, setApiData] = useState<ApiReturnType[]>([]);
  const getApi = async (url:string) => {
    const data = await fetch(url);
    const response = await data.json();
    setApiData(response);
    return response;
  };

  return {
    getApi,
    apiData,
  };
}

export default useFetch;
