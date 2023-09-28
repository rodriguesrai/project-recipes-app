import styled from 'styled-components';

export const LoginContainer = styled.div`
  text-align: center;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #9335C4;
  border-radius: 10px;
  outline: none;
`;

export const Button = styled.button`
  background-color: #FCC436;
  color: #fff;
  border: none;
  border-radius: 38.69px;
  padding: 0;
  width: 217.44px;
  height: 38.69px;
  margin: 10px 0;
  cursor: pointer;
  opacity: 1;
  display: block;
  text-align: center;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
