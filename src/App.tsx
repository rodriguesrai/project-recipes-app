import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Header from './components/Header';
import Recipes from './components/Recipes';
import Profile from './components/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipe from './components/Recipe';
import Footer from './components/Footer';
import RecipeDrinks from './components/RecipeDrinks';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Header /> }>
        <Route path="/" element={ <Footer /> }>
          <Route path=":category" element={ <Recipes /> } />
          <Route path=":category" element={ <Recipes /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
      {/* Os componentes das rotas restantes podem ser alteradas de acodo com os requisitos */}

      <Route path="/meals/:id-da-receita" element={ <Recipe /> } />
      <Route path="/drinks/:id-da-receita" element={ <RecipeDrinks /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <Recipe /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <Recipe /> } />

    </Routes>
  );
}

export default App;
