import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import PokemonList from './PokemonList/PokemonList';
import PokemonDetail from './PokemonDetail/PokemonDetail';

function App() {

  return (

    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <PokemonList />
          </Route>

          <Route path="/detail/:pokeID">
            <PokemonDetail />
          </Route>

        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
