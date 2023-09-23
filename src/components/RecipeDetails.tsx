import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ContextSearch from '../context/ContextSearch';
import '../style/Carrousel.css';

function RecipeDetails() {
  const [thumbnail, setThumbnail] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();
  const { pathname } = useLocation();
  const { getSuggestions, suggestions, getLocalStorageCarrousel,
    doneRecipe, progressRecipe,
    fetchRecipeDetailsAPI, recipeDetailsAPI } = useContext(ContextSearch);

  const path: string = pathname.split('/')[1];

  const verifyPath = () => {
    if (path === 'meals') {
      setThumbnail('strDrinkThumb');
      setRecipeName('strDrink');
    }
    if (path === 'drinks') {
      setThumbnail('strMealThumb');
      setRecipeName('strMeal');
    }
  };

  const handleClickStart = () => {
    navigate(`/${path}/${id}/in-progress`);
  };

  useEffect(() => {
    verifyPath();
    getSuggestions(path);
    getLocalStorageCarrousel(path);
    fetchRecipeDetailsAPI(pathname, id);
  }, [id]);

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
  return (
    <>
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
                  src={ recipeDetailsAPI.strYoutube
                    && recipeDetailsAPI.strYoutube.replace('watch?v=', 'embed/') }
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

      <div className="carrouselContainer">
        {suggestions.length > 0 && suggestions.map((suggestion, index) => (
          <div data-testid={ `${index}-recommendation-card` } key={ index }>
            <img src={ suggestion[thumbnail] } alt="" className="imgCarrousel" />
            <p data-testid={ `${index}-recommendation-title` }>
              {suggestion[recipeName]}

            </p>
          </div>
        ))}
      </div>
      <button data-testid="share-btn">Compartilhar Receita</button>
      <button data-testid="favorite-btn">Favoritar Receita</button>
      {!doneRecipe.some((recipe) => recipe.id === id)
      && (
        <button
          data-testid="start-recipe-btn"
          className="btnStart"
          onClick={ handleClickStart }
        >
          {!progressRecipe[id]
            ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      )}
    </>
  );
}

export default RecipeDetails;
