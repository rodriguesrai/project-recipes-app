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
    doneRecipe, progressRecipe } = useContext(ContextSearch);
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
  }, []);

  return (
    <>

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
