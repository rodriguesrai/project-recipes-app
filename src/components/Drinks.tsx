import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ApiReturnDrinks } from '../types';
import ContextSearch from '../context/ContextSearch';
import { CardsContainer, RecipesCard, RecipesImgs } from '../style/Drinks-Meals.styled';

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
    <CardsContainer>
      {newResults?.drinks && newResults.drinks
        .map(({ idDrink, strDrinkThumb, strDrink }, index) => (

          <RecipesCard data-testid={ `${index}-recipe-card` } key={ idDrink }>
            <Link to={ `/drinks/${idDrink}` }>
              <RecipesImgs
                src={ strDrinkThumb }
                alt=""
                data-testid={ `${index}-card-img` }
              />
            </Link>
            <p data-testid={ `${index}-card-name` }>{strDrink}</p>
          </RecipesCard>
        ))}
    </CardsContainer>
  );
}
export default Drinks;
