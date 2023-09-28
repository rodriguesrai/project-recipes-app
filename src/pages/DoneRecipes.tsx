import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import shareIcon from '../images/shareIcon.svg';
import { ContainerFilter,
  ButtonFilter,
  ImgFilter,
  TextDetails,
  Tags,
  FavoriteAndShare,
  DetailsContainer,
  ContainerTags,
  LinkText,
  LinkIMG,
  DivRecipes,
  MainContainer, Img } from '../style/DoneRecipes.styled';
import All from '../style/icons/All1.svg';
import Drinks from '../style/icons/drinks.svg';
import Foods from '../style/icons/foods.svg';

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
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };
  return (
    <>
      <ContainerFilter>
        <ButtonFilter
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          <ImgFilter src={ All } alt="" />
        </ButtonFilter>
        <ButtonFilter
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        >
          <ImgFilter src={ Foods } alt="" />
        </ButtonFilter>
        <ButtonFilter
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          <ImgFilter src={ Drinks } alt="" />
        </ButtonFilter>
      </ContainerFilter>
      <MainContainer>
        {filteredRecipes.length > 0 && filteredRecipes.map((recipe, index) => (
          <DivRecipes key={ index }>
            <LinkIMG to={ `/${recipe.type}s/${recipe.id}` }>
              <Img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </LinkIMG>
            <DetailsContainer>
              <LinkText to={ `/${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              </LinkText>
              { filteredRecipes[index].type === 'meal' ? (
                <TextDetails
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}

                </TextDetails>
              ) : (
                <TextDetails
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.alcoholicOrNot}
                </TextDetails>
              )}
              <TextDetails
                data-testid={ `${index}-horizontal-done-date` }
              >
                {formatDate(recipe.doneDate)}

              </TextDetails>
              <ContainerTags>
                {recipe.tags.length > 0 && recipe.tags.map((tagName, tagIndex) => (

                  <Tags
                    key={ tagIndex }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    {tagName}
                  </Tags>

                ))}
              </ContainerTags>
              <FavoriteAndShare
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ () => handleShareClick(recipe.id, recipe.type, index) }
              >
                <img
                  src={ shareIcon }
                  alt="share"
                />
              </FavoriteAndShare>
              {copiedIndex === index && <p>Link copied!</p>}
            </DetailsContainer>
          </DivRecipes>
        ))}
      </MainContainer>
    </>
  );
}

export default DoneRecipes;
