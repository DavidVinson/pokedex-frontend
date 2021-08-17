import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonList from './PokemonList/PokemonList';
import PokemonDetail from './PokemonDetail/PokemonDetail';

function App() {


  return (

    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/">
            <PokemonList />
          </Route>


          <Route path="/detail/:currentPage/:pokeID">
            <PokemonDetail />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
