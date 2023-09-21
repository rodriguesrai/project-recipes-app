import { useContext } from 'react';
import ContextSearch from '../context/ContextSearch';

function Recipe() {
  const { apiValue } = useContext(ContextSearch);
  return (
    <p>{apiValue?.meals[0].strMeal}</p>
  );
}
export default Recipe;
