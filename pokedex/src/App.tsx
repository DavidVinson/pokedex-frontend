import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PokemonListPage from './PokemonListPage/PokemonListPage';
import PokemonListPageSmall from 'PokemonListPage/PokemonListPageSmall';
import PokemonDetailPage from './PokemonDetailPage/PokemonDetailPage';
import PokemonDetailPageSmall from 'PokemonDetailPage/PokemonDetailPageSmall';
import { Box, useMediaQuery } from '@chakra-ui/react';

function App() {
    const [isSmallerThan480] = useMediaQuery('(max-width: 480px)');

    return (
        <Box bg="lightseagreen" padding="20px">
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/page/1" />

                    <Route path="/page/:pageNum">
                        {isSmallerThan480 ? <PokemonListPageSmall /> : <PokemonListPage />}
                    </Route>

                    <Route path="/detail/:currentPage/:pokeID">
                        {isSmallerThan480 ? <PokemonDetailPageSmall /> : <PokemonDetailPage />}
                    </Route>
                </Switch>
            </Router>
        </Box>
    );
}

export default App;
