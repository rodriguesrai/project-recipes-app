import styled from 'styled-components';

export const RecipeImg = styled.img`
  height: 170px;
  object-fit: cover;
  width: 100vw;
`;

export const RecipeTitle = styled.h2`
  color: white;
  font-size: 2.5rem;
  left: 50%;
  position: absolute;
  top: 13%;
  transform: translate(-50%, -50%);
`;

export const IngredientsContainer = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 0 15px 30px;
  padding: 10px;
  .done {
    text-decoration: line-through solid black;
}
`;
export const IngredientsInput = styled.input`
  all: unset;
  border: 1px solid orange;
  border-radius: 3px;
  display: inline-block;
  height: 15px;
  margin: 0 3px;
  width: 15px;
  &:checked {
    background-color: grey;
  }
`;

export const IngredientsSpan = styled.span`
  font-size: 1.1rem;
  margin: 5px;
`;

export const IsAlcoholic = styled.span`
  font-size: 0.9rem;
  margin-left: 25px;
`;
export const IngredientsTitle = styled.h3`
  margin: 15px 0 5px 25px;
`;

export const Instructions = styled.p`
  border: 1px solid grey;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 0 15px 30px;
  padding: 10px;
`;

export const SubmitBtn = styled.button`
  background-color: orange;
  border: 3px solid rgba(0, 0, 0, 0.057);
  border-radius: 3px;
  bottom: 0;
  color: white;
  display: block;
  font-size: 1.2rem;
  position: fixed;
  width: 100vw;
  &:disabled {
    background-color: gainsboro;
    border: 3px solid rgba(0, 0, 0, 0.057);
    border-radius: 3px;
    bottom: 0;
    display: block;
    position: fixed;
    width: 100vw;
  }
`;
export const BtnsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

export const FavAndShareBtn = styled.button`
  background: none;
  border: none;
`;
