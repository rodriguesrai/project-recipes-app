import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #EBE7DA};
  
`;
export const ButtonFilter = styled.button`
  border: none;
  background-color: transparent;
`;
export const ImgFilter = styled.img`
width: 70px;
`;
export const ContainerFilter = styled.div`
display: flex;
justify-content: space-evenly;
margin-bottom: 20px;
`;

export const RecipeContainer = styled.div`
display: flex;
border: solid red 2px;
`;

export const Img = styled.img`
width: 160px;
height: 100%;
border-radius: 10px 0 0 10px;
`;

export const LinkIMG = styled(Link)`
text-decoration: none;
margin: 0;
padding: 0;
margin-right: auto;
`;

export const DivRecipes = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 10px;
border-radius: 10px 10px 10px 10px;
margin: 10px 10px 10px 10px;
padding: 0;
width: 400px;

`;
export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #41197F;
  border-width: 1px 1px 1px 0; 
  border-radius: 0 10px 10px 0;
  padding: 10px 0 10px 0;
  margin: 0;
  width: 100%;
`;

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const FavoriteAndShare = styled.button`
  border: none;
  background-color: transparent;

`;
export const LinkText = styled(Link)`
text-decoration: none;
color: #1A1B1C;
font-weight: 700;
`;

export const TextDetails = styled.p`
color: #797D86;
font-weight: 300;
`;

export const Tags = styled.p`
color: white;
font-size: 8px;
border: solid 1px #B1B1B1;
border-radius: 10px;
padding: 4px;
margin: 2px;
background-color: #797D86;
`;

export const ContainerTags = styled.div`
display: flex;
`;
