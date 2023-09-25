import { useContext, useEffect, useState } from 'react';
import '../style/RecipeInProgress.css';
import { useNavigate, useParams } from 'react-router-dom';
import ContextSearch from '../context/ContextSearch';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { fetchRecipeDetailsAPI, recipeDetailsAPI,
    ingredientsAndMeasureList, locationURL,
    handleClickFavorite, favorites, setFavorites } = useContext(ContextSearch);

  const filteredList = ingredientsAndMeasureList
    .filter((ingredient: string) => !ingredient.includes('null - null'));

  const initialCheckedIngredients = filteredList.reduce((acc, ingredient) => {
    acc[ingredient] = false;
    return acc;
  }, {});

  const [checkedIngredients, setCheckedIngredients] = useState(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    return inProgressRecipes || initialCheckedIngredients;
  });

  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const category = locationURL.pathname.split('/')[1];
  console.log(category);

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

  useEffect(() => {
    fetchRecipeDetailsAPI(category, locationURL.pathname.split('/')[2]);

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!inProgressRecipes) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(initialCheckedIngredients),
      );
    }

    if (localStorage.getItem('favoriteRecipes')) {
      setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, [checkedIngredients]);

  const handleSubmit = () => {
    const existingDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    const dateNow = new Date();

    let tags: string[] = [];
    if (recipeDetailsAPI?.strTags) {
      tags = recipeDetailsAPI.strTags.split(',').map((tag) => tag.trim());
    }

    const newDoneRecipe = {
      id: category === 'meals' ? recipeDetailsAPI?.idMeal : recipeDetailsAPI?.idDrink,
      nationality: category === 'meals' ? recipeDetailsAPI?.strArea : '',
      name: category === 'meals' ? recipeDetailsAPI?.strMeal : recipeDetailsAPI?.strDrink,
      category: recipeDetailsAPI?.strCategory,
      image: category === 'meals'
        ? recipeDetailsAPI?.strMealThumb
        : recipeDetailsAPI?.strDrinkThumb,
      tags,
      alcoholicOrNot: category === 'meals' ? '' : recipeDetailsAPI?.strAlcoholic,
      type: category === 'meals' ? 'meal' : 'drink',
      doneDate: dateNow.toISOString(),
    };

    const updatedDoneRecipes = [...existingDoneRecipes, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));
    navigate('/done-recipes');
  };

  const handleClickCopy = async () => {
    const url = window.location.href.split('/').splice(0, 5).join('/');
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <div>
      <img
        src={ category === 'meals'
          ? recipeDetailsAPI?.strMealThumb : recipeDetailsAPI?.strDrinkThumb }
        alt={ category === 'meals'
          ? recipeDetailsAPI?.strMeal : recipeDetailsAPI?.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">
        {category === 'meals'
          ? recipeDetailsAPI?.strMeal : recipeDetailsAPI?.strDrink}
      </h2>
      <button data-testid="share-btn" onClick={ handleClickCopy }>Compartilhar</button>
      {copied && (<p>Link copied!</p>)}
      {
       favorites.some((favorite) => favorite.id.includes(id))
         ? (
           <button
             src={ BlackHeart }
             data-testid="favorite-btn"
             onClick={ () => handleClickFavorite(category, id) }
           >
             <img src={ BlackHeart } alt="Black Heart" />

           </button>)
         : (
           <button
             src={ WhiteHeart }
             data-testid="favorite-btn"
             onClick={ () => handleClickFavorite(category, id) }
           >
             <img src={ WhiteHeart } alt="White Heart" />

           </button>)

      }
      <h3 data-testid="recipe-category">
        {category === 'meals'
          ? recipeDetailsAPI?.strCategory : recipeDetailsAPI?.strAlcoholic}
      </h3>
      <div data-testid="instructions" className="ingredients-container">
        {filteredList.map((ingredient, index) => (
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
