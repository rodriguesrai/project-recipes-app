import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import ContextSearch from '../context/ContextSearch';
import Meals from './Meals';
import Drinks from './Drinks';
import Beef from '../style/icons/beef.png';
import breakfast from '../style/icons/breakfast.png';
import chicken from '../style/icons/chicken.png';
import dessert from '../style/icons/dessert.png';
import goat from '../style/icons/goat.png';
import All from '../style/icons/All.png';
import '../style/recipes.css';
import Alldrinks from '../style/icons/Alldrinks.png';
import cocktail from '../style/icons/cocktail.png';
import cocoa from '../style/icons/cocoa.png';
import drink from '../style/icons/drink.png';
import other from '../style/icons/other.png';
import shake from '../style/icons/shake.png';

function Recipes() {
  const { fetchRecipes, recipeFilters, handleClick, apiData,
  } = useContext(ContextRecipes);
  const navigate = useNavigate();
  const { category } = useParams();
  const { showFilter } = useContext(ContextSearch);
  useEffect(() => {
    fetchRecipes(category);
  }, [category]);
  if (showFilter && category === 'meals') {
    return (
      <Meals />
    );
  }
  if (showFilter && category === 'drinks') {
    return (
      <Drinks />
    );
  }

  const getIcon = (category) => {
    switch (category) {
      case 'Beef':
        return Beef;
      case 'Breakfast':
        return breakfast;
      case 'Chicken':
        return chicken;
      case 'Dessert':
        return dessert;
      case 'Goat':
        return goat;
      case 'Cocoa':
        return cocoa;
      case 'Other / Unknown':
        return other;
      case 'Shake':
        return shake;
      case 'Cocktail':
        return cocktail;
      case 'Ordinary Drink':
        return drink;
      default:
        return '';
    }
  };
  return (
    <div className="recipes-container">
      <div className="categories-container">
        {recipeFilters.length > 0 && recipeFilters.map((filter, index) => (
          <button
            className="categories-btns"
            data-testid={ `${filter.strCategory}-category-filter` }
            key={ index }
            onClick={ (event) => handleClick(event, category) }
            value={ filter.strCategory }
          >
            <img src={ getIcon(filter.strCategory) } alt={ filter.strCategory } />

          </button>
        ))}
        <button
          className="categories-btns"
          data-testid="All-category-filter"
          onClick={ () => fetchRecipes(category) }
        >
          <img
            src={ category === 'meals' ? All : Alldrinks }
            alt={ category === 'meals' ? All : Alldrinks }
          />
        </button>
      </div>
      <div className="cards-container">
        {apiData.length > 0 && apiData.map((recipe, index: number) => (
          <div
            className="recipe-cards"
            data-testid={ `${index}-recipe-card` }
            key={ index }
            onClick={ () => navigate(`/${category}/${category === 'meals'
              ? recipe.idMeal : recipe.idDrink}`) }
            aria-hidden="true"
          >
            <img
              className="recipe-imgs"
              src={ category === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt={ `${index}-card-img` }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {category === 'meals' ? recipe.strMeal : recipe.strDrink}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Recipes;
