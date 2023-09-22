import { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RecipeMealsDetails } from '../types';
import ContextSearch from '../context/ContextSearch';

function RecipeDetails() {
  const recipeDetailsContext = useContext(ContextSearch);
  const { fetchRecipeDetailsAPI, recipeDetailsAPI } = recipeDetailsContext;
  const { pathname } = useLocation();

  const param = useParams();

  useEffect(() => {
    fetchRecipeDetailsAPI(pathname, param.id);
  }, [param.id]);

  return (
    <div>
      { pathname.includes('meals') ? (
        <div>
          {' '}
          { recipeDetailsAPI && recipeDetailsAPI
            .map((recipe: RecipeMealsDetails, index) => (
              <div key={ recipe.idMeal }>
                <img
                  data-testid="recipe-photo"
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
                <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
                <p data-testid="recipe-category">{recipe.strCategory}</p>
                <ul data-testid={ `${index}-ingredient-name-and-measure` }>
                  <li>{`${recipe.strIngredient1} - ${recipe.strMeasure1}`}</li>
                  <li>{`${recipe.strIngredient2} - ${recipe.strMeasure2}`}</li>
                  <li>{`${recipe.strIngredient3} - ${recipe.strMeasure3}`}</li>
                  {recipe.strIngredient4 !== ''
                  && <li>{`${recipe.strIngredient4} - ${recipe.strMeasure4}`}</li>}
                  {recipe.strIngredient5 !== ''
                  && <li>{`${recipe.strIngredient5} - ${recipe.strMeasure5}`}</li>}
                  {recipe.strIngredient6 !== ''
                  && <li>{`${recipe.strIngredient6} - ${recipe.strMeasure6}`}</li>}
                  {recipe.strIngredient7 !== ''
                  && <li>{`${recipe.strIngredient7} - ${recipe.strMeasure7}`}</li>}
                  {recipe.strIngredient8 !== ''
                  && <li>{`${recipe.strIngredient8} - ${recipe.strMeasure8}`}</li>}
                  {recipe.strIngredient9 !== ''
                  && <li>{`${recipe.strIngredient9} - ${recipe.strMeasure9}`}</li>}
                  {recipe.strIngredient10 !== ''
                  && <li>{`${recipe.strIngredient10} - ${recipe.strMeasure10}`}</li>}
                  {recipe.strIngredient11 !== ''
                  && <li>{`${recipe.strIngredient11} - ${recipe.strMeasure11}`}</li>}
                  {recipe.strIngredient12 !== ''
                  && <li>{`${recipe.strIngredient12} - ${recipe.strMeasure12}`}</li>}
                  {recipe.strIngredient13 !== ''
                  && <li>{`${recipe.strIngredient13} - ${recipe.strMeasure13}`}</li>}
                  {recipe.strIngredient14 !== ''
                  && <li>{`${recipe.strIngredient14} - ${recipe.strMeasure14}`}</li>}
                  {recipe.strIngredient15 !== ''
                  && <li>{`${recipe.strIngredient15} - ${recipe.strMeasure15}`}</li>}
                  {recipe.strIngredient16 !== ''
                  && <li>{`${recipe.strIngredient16} - ${recipe.strMeasure16}`}</li>}
                  {recipe.strIngredient17 !== ''
                  && <li>{`${recipe.strIngredient17} - ${recipe.strMeasure17}`}</li>}
                  {recipe.strIngredient18 !== ''
                  && <li>{`${recipe.strIngredient18} - ${recipe.strMeasure18}`}</li>}
                  {recipe.strIngredient19 !== ''
                  && <li>{`${recipe.strIngredient19} - ${recipe.strMeasure19}`}</li>}
                  {recipe.strIngredient20 !== ''
                  && <li>{`${recipe.strIngredient20} - ${recipe.strMeasure20}`}</li>}
                </ul>
                <p data-testid="instructions">{recipe.strInstructions}</p>
                <iframe
                  width="560"
                  height="315"
                  src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                  title={ recipe.strMeal }
                  // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                />
              </div>
            ))}

        </div>

      )
        : (
          <div>
            {recipeDetailsAPI && recipeDetailsAPI.map((recipe) => (
              <p>{recipe.strDrink}</p>
            ))}
          </div>
        )}
    </div>
  );
}
export default RecipeDetails;
