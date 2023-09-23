import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ContextSearch from '../context/ContextSearch';
import { FavoriteType } from '../types';
import '../style/Carrousel.css';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

function RecipeDetails() {
  const [thumbnail, setThumbnail] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteType[]>([]);
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

  const handleClickCopy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      setCopied(false);
    }
  };

  const handleClickFavorite = () => {
    if (recipeDetailsAPI && !favorites.some((favorite) => favorite.id === id)) {
      const newFavorite = [...favorites, {
        id,
        type: path === 'meals' ? 'meal' : 'drink',
        nationality: path === 'meals' ? recipeDetailsAPI.strArea : '',
        category: recipeDetailsAPI?.strCategory ? recipeDetailsAPI.strCategory : '',
        alcoholicOrNot: path === 'meals' ? '' : recipeDetailsAPI.strAlcoholic,
        name: path === 'meals' ? recipeDetailsAPI.strMeal : recipeDetailsAPI.strDrink,
        image: path === 'meals' ? recipeDetailsAPI.strMealThumb
          : recipeDetailsAPI.strDrinkThumb,
      }];
      setFavorites(newFavorite);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    }
    const removeFavorite = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(removeFavorite);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
  };

  useEffect(() => {
    verifyPath();
    getSuggestions(path);
    getLocalStorageCarrousel(path);
    fetchRecipeDetailsAPI(pathname, id);
    if (localStorage.getItem('favoriteRecipes')) {
      setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

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
      {copied && (<p>Link copied!</p>)}
      <button
        data-testid="share-btn"
        onClick={ handleClickCopy }
      >
        <img src={ ShareIcon } alt="" />

      </button>
      {
       favorites.some((favorite) => favorite.id.includes(id))
         ? (
           <button
             src={ BlackHeart }
             data-testid="favorite-btn"
             onClick={ handleClickFavorite }
           >
             <img src={ BlackHeart } alt="Black Heart" />

           </button>)
         : (
           <button
             src={ WhiteHeart }
             data-testid="favorite-btn"
             onClick={ handleClickFavorite }
           >
             <img src={ WhiteHeart } alt="White Heart" />

           </button>)

      }
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
