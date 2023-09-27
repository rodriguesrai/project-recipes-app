import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ButtonFilter = styled.button`
  border: none;
  background-color: white;
`;
export const ImgFilter = styled.img`
width: 70px;
`;
export const ContainerFilter = styled.div`
display: flex;
justify-content: space-evenly;
`;

export const RecipeContainer = styled.div`
display: flex;
border-radius: 10px;
margin: 3px;
border: 1px solid #B1B1B1;
margin-bottom: 20px;
`;

export const ImgRecipe = styled.img`
width: 160px;
border-top-left-radius: 10px;
border-bottom-left-radius: 10px;
`;

export const DetailsContainer = styled.div`
margin-left: 30px;
`;

export const FavoriteAndShare = styled.button`
  border: none;
  background-color: white;

`;
export const LinkStyle = styled(Link)`
text-decoration: none;
color: #1A1B1C;
font-weight: 700;
`;

export const TextDetails = styled.p`
color: #797D86;
font-weight: 300;
`;
