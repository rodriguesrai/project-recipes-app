import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ContextSearch from '../context/ContextSearch';
import BlackHeart from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import { FavoriteType } from '../types';

function FavoriteRecipes() {
  const { setFavorites, favorites, handleClickFavorite } = useContext(ContextSearch);
  useEffect(() => {
    // if alterado
    if (JSON.parse(localStorage.getItem('favoriteRecipes') as string)) {
      const favoriteRecipes = JSON
        .parse(localStorage.getItem('favoriteRecipes') as string);
      setFavorites(favoriteRecipes);
    }
  }, []);

  return (
    <>
      <button
        data-testid="filter-by-all-btn"

      >
        All

      </button>
      <button
        data-testid="filter-by-meal-btn"

      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"

      >
        Drinks

      </button>
      <div>
        {favorites.length > 0 && (favorites.length > 0 ? favorites
          : favorites).map((favorite, index) => (
            <div key={ favorite.id }>

              <img
                id="imgFolder"
                src={ favorite.image }
                alt=""
                data-testid={ `${index}-horizontal-image` }
              />

              <p data-testid={ `${index}-horizontal-name` }>{favorite.name}</p>

              <p data-testid={ `${index}-horizontal-top-text` }>{favorite.category}</p>
              {favorite.type === 'meal'
                ? (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${favorite.nationality} - ${favorite.category}`}

                  </p>
                )
                : (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {favorite.alcoholicOrNot}

                  </p>)}
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ ShareIcon }
              >
                <img src={ ShareIcon } alt="" />
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ BlackHeart }
              >
                <img src={ BlackHeart } alt="" />
              </button>
            </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
