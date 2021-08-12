import React from 'react';
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import PokemonList from './PokemonList/PokemonList';

function App() {


  return (
    <div className="App">
      <Header />
      <PokemonList />
      <Footer />
    </div>
  );
}

export default App;
