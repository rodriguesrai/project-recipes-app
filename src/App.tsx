import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Header from './components/Header';
import Recipes from './components/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipe from './components/Recipe';
import RecipeDrinks from './components/RecipeDrinks';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Header /> }>
        <Route path=":category" element={ <Recipes /> } />
        <Route path=":category" element={ <Recipes /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
      <Route path="/meals/:id" element={ <Recipe /> } />
      <Route path="/drinks/:id" element={ <RecipeDrinks /> } />
    </Routes>
  );
}

export default App;
