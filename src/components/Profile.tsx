import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <h1>Perfil do usuário</h1>
      <div>
        <label htmlFor="email">E-mail:</label>
        <span
          data-testid="profile-email"
        >
          {currentEmail || 'Nenhum email disponível'}
        </span>
      </div>
      <button onClick={ handleDoneClick } data-testid="profile-done-btn">
        Done Recipes
      </button>
      <button onClick={ handleFavoriteClick } data-testid="profile-favorite-btn">
        Favorite Recipes
      </button>
      <button onClick={ handleLogoutClick } data-testid="profile-logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Profile;
