import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  text-align: center;
  margin: 20px;
`;

export const ProfileTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: rgba(65, 25, 127, 1);
`;

export const ProfileLabel = styled.label`
  font-weight: bold;
`;

export const ProfileSpan = styled.span`
  font-weight: 600;
  color: rgba(252, 196, 54, 1);
`;

export const ProfileButton = styled.button`
  background-color: #FCC436;
  color: #fff;
  border: none;
  border-radius: 38.69px;
  padding: 0;
  width: 217.44px;
  height: 38.69px;
  margin: 10px auto;
  cursor: pointer;
  opacity: 1;
  display: block;
  text-align: center;
  line-height: 38.69px;

  &:hover {
    background-color: #D3A22E;
    opacity: 0.8;
  }
`;
