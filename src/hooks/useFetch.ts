import { useState } from 'react';

function useFetch() {
  const [apiData, setApiData] = useState();
  const getApi = async (url:string) => {
    const data = await fetch(url);
    const response = await data.json();
    setApiData(response);
  };

  return {
    getApi,
    apiData,
  };
}

export default useFetch;
