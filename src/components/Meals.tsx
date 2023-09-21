import { useContext, useEffect, useState } from 'react';
import ContextSearch from '../context/ContextSearch';
import { ApiReturnType } from '../types';

function Meals() {
  const [newResults, setNewResults] = useState<ApiReturnType>();
  // const [showAlert, setShowAlert] = useState(false);
  const { apiValue } = useContext(ContextSearch);
  useEffect(() => {
    if (apiValue?.meals && apiValue?.meals.length > 12) {
      const newObject = { ...apiValue };
      setNewResults({ meals: newObject.meals.slice(0, 12) });
    } else {
      setNewResults(apiValue);
    }
  }, [apiValue]);
  return (
    <div>
      {newResults?.meals
      && newResults.meals.map(({ idMeal, strMealThumb, strMeal }, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
          <img src={ strMealThumb } alt="" data-testid={ `${index}-card-img` } />
          <p data-testid={ `${index}-card-name` }>{strMeal}</p>
        </div>
      ))}
    </div>
  );
}

export default Meals;
