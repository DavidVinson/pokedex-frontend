import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PokemonList from './PokemonList/PokemonList';
import PokemonDetail from './PokemonDetail/PokemonDetail';
import { Box } from '@chakra-ui/react';
import { POKEDEX_API_V1 } from 'ConstantVariables/ConstantVariables';

function App() {
    return (
        <Box className="App-main">
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/page/1" />

                    <Route path="/page/:pageNum">
                        <PokemonList pokedexApiV1={POKEDEX_API_V1} />
                    </Route>

                    <Route path="/detail/:currentPage/:pokeID">
                        <PokemonDetail />
                    </Route>
                </Switch>
            </Router>
        </Box>
    );
}

export default App;
