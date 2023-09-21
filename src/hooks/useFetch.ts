import { useState } from 'react';
import { ApiReturnType } from '../types';

function useFetch() {
  const [apiData, setApiData] = useState<ApiReturnType>();
  // const getApi = async (url:string) => {
  //   const data = await fetch(url);
  //   const response = await data.json();
  //   setApiData(response);
  //   return response;
  // };
  const getApi = async (url: string, location:string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${response.statusText}`);
      }
      const data = await response.json();
      setApiData(data);
      return data;
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
      return { [location]: null }; // Retorna nulo em caso de erro.
    }
  };

  return {
    getApi,
    apiData,
  };
}

export default useFetch;
