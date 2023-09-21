import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Meals from './components/Meals';
import Header from './components/Header';
import Drinks from './components/Drinks';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Header /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
      </Route>
    </Routes>
  );
}

export default App;
