import { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ContextSearch from '../context/ContextSearch';

function RecipeDetails() {
  const recipeDetailsContext = useContext(ContextSearch);
  const { fetchRecipeDetailsAPI, recipeDetailsAPI } = recipeDetailsContext;
  const { pathname } = useLocation();

  const param = useParams();

  const renderIngredientMeasuresMeals = (recipeDetails) => {
    const listIngredientsMeasures = [];

    for (let index = 1; index <= 20; index += 1) {
      const currentIngredient = recipeDetails[`strIngredient${index}`];
      const currentMeasure = recipeDetails[`strMeasure${index}`];

      if (currentIngredient !== '' && currentMeasure !== ' ') {
        listIngredientsMeasures.push(
          <ul
            data-testid={ `${index - 1}-ingredient-name-and-measure` }
            key={ index }
          >
            <li>{`${currentIngredient} - ${currentMeasure}`}</li>
          </ul>,
        );
      }
    }
    return listIngredientsMeasures;
  };

  const renderIngredientMeasuresDrinks = (recipeDetails) => {
    const listIngredientsMeasures = [];

    for (let index = 1; index <= 15; index += 1) {
      const currentIngredient = recipeDetails[`strIngredient${index}`];
      const currentMeasure = recipeDetails[`strMeasure${index}`];

      if (currentIngredient !== null && currentMeasure !== null) {
        listIngredientsMeasures.push(
          <ul
            data-testid={ `${index - 1}-ingredient-name-and-measure` }
            key={ index }
          >
            <li>{`${currentIngredient} - ${currentMeasure}`}</li>
          </ul>,
        );
      }
    }
    return listIngredientsMeasures;
  };

  useEffect(() => {
    fetchRecipeDetailsAPI(pathname, param.id);
  }, [param.id]);

  return (
    <div>
      { pathname.includes('meals') ? (
        <div>
          {' '}
          { recipeDetailsAPI && (
            <div key={ recipeDetailsAPI.idMeal }>
              <img
                data-testid="recipe-photo"
                src={ recipeDetailsAPI.strMealThumb }
                alt={ recipeDetailsAPI.strMeal }
              />
              <h1 data-testid="recipe-title">{recipeDetailsAPI.strMeal}</h1>
              <p data-testid="recipe-category">{recipeDetailsAPI.strCategory}</p>
              {renderIngredientMeasuresMeals(recipeDetailsAPI)}
              <p data-testid="instructions">{recipeDetailsAPI.strInstructions}</p>
              <iframe
                data-testid="video"
                width="560"
                height="315"
                src={ recipeDetailsAPI.strYoutube.replace('watch?v=', 'embed/') }
                title={ recipeDetailsAPI.strMeal }
              />
            </div>
          )}

        </div>

      )
        : (
          <div>
            { recipeDetailsAPI && (
              <div key={ recipeDetailsAPI.idDrink }>
                <img
                  data-testid="recipe-photo"
                  src={ recipeDetailsAPI.strDrinkThumb }
                  alt={ recipeDetailsAPI.strDrink }
                />
                <h1 data-testid="recipe-title">{recipeDetailsAPI.strDrink}</h1>
                <p data-testid="recipe-category">{recipeDetailsAPI.strCategory}</p>
                {recipeDetailsAPI.strAlcoholic === 'Alcoholic' && (
                  <p data-testid="recipe-category">
                    {recipeDetailsAPI.strAlcoholic}

                  </p>
                )}
                {renderIngredientMeasuresDrinks(recipeDetailsAPI)}
                <p data-testid="instructions">{recipeDetailsAPI.strInstructions}</p>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
export default RecipeDetails;
