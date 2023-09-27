import styled from 'styled-components';

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 5px 0 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  font-size: 1.1rem;
  margin-right: 10px;
`;

export const RecipesCard = styled.div`
  font-size: 0.65rem;
  border: 1px solid grey;
  border-radius: 8px;
  height: 180px;
  margin: 8px 0;
`;

export const RecipesImgs = styled.img`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 140px;
`;
