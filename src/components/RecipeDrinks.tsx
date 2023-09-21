import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ContextSearch from '../context/ContextSearch';

function RecipeDrinks() {
  const { apiValue } = useContext(ContextSearch);
  return (
    <p>{apiValue?.drinks[0].strDrink}</p>
  );
}
export default RecipeDrinks;
