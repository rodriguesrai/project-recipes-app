import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Meals from './components/Meals';
import Header from './components/Header';
import Drinks from './components/Drinks';
import Recipe from './components/Recipe';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Footer from './components/Footer';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Header /> }>
        <Route path="/" element={ <Footer /> }>
          <Route path="/meals" element={ <Meals /> } />
          <Route path="/drinks" element={ <Drinks /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
      {/* Os componentes das rotas restantes podem ser alteradas de acodo com os requisitos */}

      <Route path="/meals/:id-da-receita" element={ <Recipe /> } />
      <Route path="/drinks/:id-da-receita" element={ <Recipe /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <Recipe /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <Recipe /> } />

    </Routes>
  );
}

export default App;
