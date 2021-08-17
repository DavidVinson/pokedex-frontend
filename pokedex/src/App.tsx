import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
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

          <Route path="/detail/:pageNum/:pokeID">
            <PokemonDetail />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
