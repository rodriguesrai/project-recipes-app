import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ContextSearch from '../context/ContextSearch';
import BlackHeart from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import { FavoriteType } from '../types';

function FavoriteRecipes() {
  const { setFavorites, favorites, handleClickFavorite } = useContext(ContextSearch);
  const [copied, setCopied] = useState<string | null>(null);
  const [filtredResults, setFiltredResults] = useState<FavoriteType[]>([]);
  useEffect(() => {
    // if alterado
    if (JSON.parse(localStorage.getItem('favoriteRecipes') as string)) {
      const favoriteRecipes = JSON
        .parse(localStorage.getItem('favoriteRecipes') as string);
      setFavorites(favoriteRecipes);
    }
  }, []);

  const handleClickCopy = async (path: string, id: string) => {
    const url = `${window.location.origin}/${path}s/${id}`;
    console.log(url);
    await navigator.clipboard.writeText(url);
    setCopied(id);
  };

  const filterByBtn = (type: string) => {
    if (type === 'all') {
      return setFiltredResults([...favorites]);
    }
    return setFiltredResults(favorites.filter((favorite) => favorite.type === type));
  };
  return (
    <>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => filterByBtn('all') }
      >
        All

      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filterByBtn('meal') }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filterByBtn('drink') }
      >
        Drinks

      </button>
      <div>
        {favorites.length > 0 && (filtredResults.length > 0 ? filtredResults
          : favorites).map((favorite, index) => (
            <div key={ favorite.id }>
              <Link to={ `${window.location.origin}/${favorite.type}s/${favorite.id}` }>
                <img
                  id="imgFolder"
                  alt=""
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <Link to={ `${window.location.origin}/${favorite.type}s/${favorite.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{favorite.name}</p>
              </Link>
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
              {copied === favorite.id && <p>Link copied!</p>}
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ ShareIcon }
                onClick={ () => handleClickCopy(favorite.type, favorite.id) }
              >
                <img src={ ShareIcon } alt="" />
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ BlackHeart }
                onClick={ () => handleClickFavorite(`${favorite.type}s`, favorite.id) }
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
