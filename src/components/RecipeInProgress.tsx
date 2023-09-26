import { useContext, useEffect, useState } from 'react';
import '../style/RecipeInProgress.css';
import { useNavigate, useParams } from 'react-router-dom';
import ContextSearch from '../context/ContextSearch';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeInProgress() {
  const { fetchRecipeDetailsAPI, recipeDetailsAPI,
    ingredientsAndMeasureList, locationURL,
    handleClickFavorite, favorites, setFavorites } = useContext(ContextSearch);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const category = locationURL.pathname.split('/')[1];
  const areAllChecked = () => {
    return Object.values(checkedIngredients).every((isChecked) => isChecked);
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientName = event.target.name;
    const isChecked = event.target.checked;
    const updatedIngredients = {
      ...checkedIngredients,
      [ingredientName]: isChecked,
    };
    setCheckedIngredients(updatedIngredients);
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedIngredients));
  };
  console.log(recipeDetailsAPI);

  const filteredList = ingredientsAndMeasureList
    .filter((ingredient: string) => !ingredient.includes('null - null'));
  useEffect(() => {
    const initialCheckedIngredients = filteredList.reduce((acc, ingredient) => {
      acc[ingredient] = false;
      return acc;
    }, {});
    setCheckedIngredients(initialCheckedIngredients);
    const responseLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (responseLocalStorage) {
      setCheckedIngredients(responseLocalStorage);
    }
    if (ingredientsAndMeasureList.length > 0 && !responseLocalStorage) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(initialCheckedIngredients),
      );
    }
  }, [ingredientsAndMeasureList]);
  useEffect(() => {
    fetchRecipeDetailsAPI(category, locationURL.pathname.split('/')[2]);
    if (localStorage.getItem('favoriteRecipes')) {
      setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  const handleSubmit = () => {
    const newDoneRecipe = {
      id: category === 'meals' ? recipeDetailsAPI?.idMeal : recipeDetailsAPI?.idDrink,
      nationality: category === 'meals' ? recipeDetailsAPI?.strArea : '',
      name: category === 'meals' ? recipeDetailsAPI?.strMeal : recipeDetailsAPI?.strDrink,
      category: recipeDetailsAPI?.strCategory,
      image: category === 'meals'
        ? recipeDetailsAPI?.strMealThumb : recipeDetailsAPI?.strDrinkThumb,
      tags: recipeDetailsAPI?.strTags
        ? recipeDetailsAPI.strTags.split(',').map((tag) => tag.trim()) : [],
      alcoholicOrNot: category === 'meals' ? '' : recipeDetailsAPI?.strAlcoholic,
      type: category === 'meals' ? 'meal' : 'drink',
      doneDate: new Date().toISOString(),
    };

    const existingDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const updatedDoneRecipes = [...existingDoneRecipes, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));
    navigate('/done-recipes');
  };

  const handleClickCopy = async () => {
    const url = window.location.href.split('/').splice(0, 5).join('/');
    await navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <div>
      <img
        className="recipe-img"
        src={ category === 'meals'
          ? recipeDetailsAPI?.strMealThumb : recipeDetailsAPI?.strDrinkThumb }
        alt={ category === 'meals'
          ? recipeDetailsAPI?.strMeal : recipeDetailsAPI?.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title" className="recipe-title">
        {category === 'meals'
          ? recipeDetailsAPI?.strMeal : recipeDetailsAPI?.strDrink}
      </h2>
      <div className="btns-container">
        <button
          data-testid="share-btn"
          className="favAndShare"
          onClick={ handleClickCopy }
        >
          <img src={ shareIcon } alt="Compartilhar" />
        </button>
        {copied && (<p>Link copied!</p>)}
        {
       favorites.some((favorite) => favorite.id.includes(id))
         ? (
           <button
             className="favAndShare"
             src={ BlackHeart }
             data-testid="favorite-btn"
             onClick={ () => handleClickFavorite(category, id) }
           >
             <img src={ BlackHeart } alt="Black Heart" />
           </button>)
         : (
           <button
             className="favAndShare"
             src={ WhiteHeart }
             data-testid="favorite-btn"
             onClick={ () => handleClickFavorite(category, id) }
           >
             <img src={ WhiteHeart } alt="White Heart" />
           </button>)
      }
      </div>
      <h3>Ingredients</h3>
      <span data-testid="recipe-category" className="alcoholic">
        {category === 'meals'
          ? recipeDetailsAPI?.strCategory : recipeDetailsAPI?.strAlcoholic}
      </span>
      <div data-testid="instructions" className="ingredients-container">
        {filteredList.length > 0 && filteredList.map((ingredient, index) => (
          <label
            data-testid={ `${index}-ingredient-step` }
            key={ index }
            className={ checkedIngredients[ingredient]
              ? 'done ingredients' : 'ingredients' }
          >
            <input
              type="checkbox"
              name={ ingredient }
              id={ ingredient }
              onChange={ handleCheck }
              checked={ checkedIngredients[ingredient] }
            />
            <span>
              {ingredient}
            </span>
          </label>
        ))}
      </div>
      <h3>Instructions</h3>
      <p className="instructions">{recipeDetailsAPI?.strInstructions}</p>
      <button
        className="btnFinalizar"
        data-testid="finish-recipe-btn"
        onClick={ handleSubmit }
        disabled={ !areAllChecked() }
      >
        Finalizar
      </button>
    </div>
  );
}
export default RecipeInProgress;
