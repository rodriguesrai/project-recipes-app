import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipes(localStorageData);
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    if (filter === 'all') {
      return true;
    }
    return recipe.type === filter;
  });

  const handleShareClick = (
    id: string,
    type: string,
    index: number,
  ) => {
    const recipeUrl = `${window.location.origin}/${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 3000);
      });
  };

  return (
    <>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilter('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>

      {filteredRecipes.map((recipe, index) => (

        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              style={ { maxWidth: '150px', maxHeight: '150px' } } // necessário para cypress
            />
          </Link>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          { filteredRecipes[index].type === 'meal' ? (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}

            </p>
          ) : (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.alcoholicOrNot}
            </p>
          )}
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {recipe.doneDate}

          </p>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => handleShareClick(recipe.id, recipe.type, index) }
          >
            <img
              src={ shareIcon }
              alt="share"

            />
          </button>
          {copiedIndex === index && <p>Link copied!</p>}

          {recipe.tags.map((tagName, tagIndex) => (
            <p
              key={ tagIndex }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              {tagName}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

export default DoneRecipes;
