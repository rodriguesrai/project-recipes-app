import { useState, useContext, useEffect } from 'react';
import { ApiReturnType } from '../types';
import ContextSearch from '../context/ContextSearch';

function Drinks() {
  const [newResults, setNewResults] = useState<ApiReturnType>();
  const { apiValue } = useContext(ContextSearch);
  useEffect(() => {
    if (apiValue && apiValue.drinks.length > 12) {
      const newObject = { ...apiValue };
      setNewResults({ ...newObject, drinks: apiValue.drinks.slice(0, 12) });
    } else {
      setNewResults(apiValue);
    }
  }, [apiValue]);
  return (
    <div>
      {newResults && newResults.drinks
        .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
            <img src={ strDrinkThumb } alt="" data-testid={ `${index}-card-img` } />
            <p data-testid={ `${index}-card-name` }>{strDrink}</p>
          </div>
        ))}
    </div>
  );
}
export default Drinks;
