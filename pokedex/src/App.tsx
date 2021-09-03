import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PokemonList from './PokemonList/PokemonList';
import PokemonDetail from './PokemonDetail/PokemonDetail';
import { Box } from '@chakra-ui/react';
import { POKEDEX_API } from 'ConstantVariables/ConstantVariables';

function App() {
    return (
        <Box bg="lightseagreen" padding="20px">
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/page/1" />

                    <Route path="/page/:pageNum">
                        <PokemonList pokedexApi={POKEDEX_API} />
                    </Route>

                    <Route path="/detail/:currentPage/:pokeID">
                        <PokemonDetail pokedexApi={POKEDEX_API} />
                    </Route>
                </Switch>
            </Router>
        </Box>
    );
}

export default App;
