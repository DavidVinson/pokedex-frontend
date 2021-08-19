import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PokemonList from './PokemonList/PokemonList';
import PokemonDetail from './PokemonDetail/PokemonDetail';

function App() {


  return (

    <div className="App">
      <Router>
        <Switch>

          <Redirect exact from="/" to="/page/1" />

          <Route path="/page/:pageNum">
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
