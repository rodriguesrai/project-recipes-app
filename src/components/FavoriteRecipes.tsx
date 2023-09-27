import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ContextSearch from '../context/ContextSearch';
import BlackHeart from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import { FavoriteType } from '../types';
import '../style/FavoriteRecipes.css';
import All from '../style/icons/All.svg';
import Drinks from '../style/icons/drinks.svg';
import Foods from '../style/icons/foods.svg';
import { ButtonFilter, ImgFilter,
  ContainerFilter, RecipeContainer,
  ImgRecipe, DetailsContainer, FavoriteAndShare,
  LinkStyle, TextDetails } from '../style/FavoriteRecipes.styled';

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
      <ContainerFilter>
        <ButtonFilter
          data-testid="filter-by-all-btn"
          onClick={ () => filterByBtn('all') }
        >
          <ImgFilter src={ All } alt="" />

        </ButtonFilter>
        <ButtonFilter
          data-testid="filter-by-meal-btn"
          onClick={ () => filterByBtn('meal') }
        >
          <ImgFilter src={ Drinks } alt="" />

        </ButtonFilter>
        <ButtonFilter
          data-testid="filter-by-drink-btn"
          onClick={ () => filterByBtn('drink') }
        >
          <ImgFilter src={ Foods } alt="" />

        </ButtonFilter>
      </ContainerFilter>
      <div>
        {favorites.length > 0 && (filtredResults.length > 0 ? filtredResults
          : favorites).map((favorite, index) => (
            <RecipeContainer key={ favorite.id }>
              <Link to={ `${window.location.origin}/${favorite.type}s/${favorite.id}` }>
                <ImgRecipe
                  className="imgFolder"
                  src={ favorite.image }
                  alt=""
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <DetailsContainer>
                <LinkStyle
                  to={ `${window.location.origin}/${favorite.type}s/${favorite.id}` }
                >
                  <p data-testid={ `${index}-horizontal-name` }>{favorite.name}</p>
                </LinkStyle>
                <TextDetails
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {favorite.category}

                </TextDetails>
                {favorite.type === 'meal'
                  ? (
                    <TextDetails data-testid={ `${index}-horizontal-top-text` }>
                      {`${favorite.nationality} - ${favorite.category}`}

                    </TextDetails>
                  )
                  : (
                    <TextDetails data-testid={ `${index}-horizontal-top-text` }>
                      {favorite.alcoholicOrNot}

                    </TextDetails>)}
                {copied === favorite.id && <p>Link copied!</p>}
                <FavoriteAndShare
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ ShareIcon }
                  onClick={ () => handleClickCopy(favorite.type, favorite.id) }
                >
                  <img src={ ShareIcon } alt="" />
                </FavoriteAndShare>
                <FavoriteAndShare
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ BlackHeart }
                  onClick={ () => handleClickFavorite(`${favorite.type}s`, favorite.id) }
                >
                  <img src={ BlackHeart } alt="" />
                </FavoriteAndShare>
              </DetailsContainer>
            </RecipeContainer>
        ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
