import { useState, useContext, useEffect } from 'react';
import { ApiReturnDrinks } from '../types';
import ContextSearch from '../context/ContextSearch';

function Drinks() {
  const [newResults, setNewResults] = useState<ApiReturnDrinks>();
  const { apiValue } = useContext(ContextSearch);
  useEffect(() => {
    if (apiValue?.drinks && apiValue.drinks.length > 12) {
      const newObject = { ...apiValue };
      setNewResults({ drinks: newObject.drinks.slice(0, 12) });
    } else {
      setNewResults(apiValue);
    }
  }, [apiValue]);
  return (
    <div>
      {newResults?.drinks && newResults.drinks
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
