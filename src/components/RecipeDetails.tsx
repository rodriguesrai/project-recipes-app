import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  const { getApi, apiData } = useFetch();
  useEffect(() => {
    const getData = async () => {
      if (path === 'meals') {
        await getApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      }
      if (path === 'drinks') {
        await getApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      }
    };
    getData();
  }, []);
  console.log(apiData);
  return (
    <p>Teste</p>
  );
}

export default RecipeDetails;
