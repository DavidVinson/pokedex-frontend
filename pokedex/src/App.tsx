import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PokemonListPage from './Screens/PokemonListPage/PokemonListPage';
import PokemonListPageSmall from './Screens/PokemonListPage/PokemonListPageSmall';
import PokemonDetailPage from './Screens/PokemonDetailPage/PokemonDetailPage';
import PokemonDetailPageSmall from './Screens/PokemonDetailPage/PokemonDetailPageSmall';
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
