import React from 'react';
import './App.css';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import PokemonList2 from './PokemonList/PokemonList2';
import PokemonDetail from './PokemonDetail/PokemonDetail';

function App() {

  return (

    <div className="App">
      <Header />
      <Router>
        <Route exact path="/">
          <PokemonList2 />
        </Route>

        <Route exact path="/detail:id">
          <PokemonDetail />
        </Route>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
