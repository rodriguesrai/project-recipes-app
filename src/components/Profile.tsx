import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProfileWrapper,
  ProfileTitle,
  ProfileLabel,
  ProfileSpan,
  ProfileButton,
} from '../style/Profile';
import ContextLogin from '../context/ContextLogin';

function Profile() {
  const navigate = useNavigate();
  const { login } = useContext(ContextLogin);
  const [currentEmail, setCurrentEmail] = useState<string | null>(login.email);

  const checkAndUpdateEmail = () => {
    const storedEmail = localStorage.getItem('user');
    if (storedEmail) {
      const parsedEmail = JSON.parse(storedEmail).email;
      setCurrentEmail(parsedEmail);
    }
  };

  useEffect(() => {
    checkAndUpdateEmail();
  }, []);

  const handleDoneClick = () => {
    navigate('/done-recipes');
  };

  const handleFavoriteClick = () => {
    navigate('/favorite-recipes');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('user');
    localStorage.clear();
    navigate('/');
  };

  return (
    <ProfileWrapper>
      <ProfileTitle>Perfil do usuário</ProfileTitle>
      <div>
        <ProfileLabel htmlFor="email">E-mail:</ProfileLabel>
        <ProfileSpan data-testid="profile-email">
          {currentEmail || 'Nenhum email disponível'}
        </ProfileSpan>
      </div>
      <ProfileButton onClick={ handleDoneClick } data-testid="profile-done-btn">
        Done Recipes
      </ProfileButton>
      <ProfileButton onClick={ handleFavoriteClick } data-testid="profile-favorite-btn">
        Favorite Recipes
      </ProfileButton>
      <ProfileButton onClick={ handleLogoutClick } data-testid="profile-logout-btn">
        Logout
      </ProfileButton>
    </ProfileWrapper>
  );
}

export default Profile;
