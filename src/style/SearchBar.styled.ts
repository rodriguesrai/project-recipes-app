import styled from 'styled-components';

export const FormSearchBar = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin: 0;
background-color: #41197F;
padding-bottom: 15px;
margin-bottom: 20px;
`;

export const RadiosLabel = styled.label`
display: flex;
justify-content: center;
color: white;
margin-top: 10px;
`;

export const ButtonSearchBar = styled.button`
  margin-top: 5px;
  width: 50%;
  border: none;
  border-radius: 4px;
  background-color: #FCC436;
  color: whitesmoke;
`;

export const InputRadio = styled.input`
margin-left: 8px;
margin-right: 2px;
&:checked{
  background-color: red;
}
`;

export const InputText = styled.input`
  border: 1px solid grey;
  border-radius: 4px;
  width: 100%;
 `;
