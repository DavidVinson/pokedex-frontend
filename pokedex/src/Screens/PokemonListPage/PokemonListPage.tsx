import React from 'react';
import { useEffect, useState, KeyboardEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UrlParams, ApiDataInterface } from 'Types';
import { getPokemonInfo, findPokemon, getPage } from 'Services/api';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import PokeGrid from 'Components/PokeGrid/PokeGrid';
import {
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Flex,
    Container,
    CloseButton,
    FormControl,
} from '@chakra-ui/react';

function PokemonListPage() {
    const history = useHistory();
    const params: UrlParams = useParams();
    const [startPage] = useState('1');
    const [pokemonNameSearch, setPokemonNameSearch] = useState('');
    const [pokemonInfo, setPokemonInfo] = useState<ApiDataInterface>();

    useEffect(() => {
        getPokemonInfo(params).then((response) => {
            setPokemonInfo(response.data);
        });
    }, []);

    const pageNav = (page: string) => {
        if (page) {
            const pageNum = page?.slice(page?.indexOf('=') + 1);
            getPage(page, pageNum, pokemonNameSearch).then((response) => {
                setPokemonInfo(response.data);
                history.push(`/page/${pageNum}`);
            });
        }
    };

    const submitSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            findPokemon(pokemonNameSearch).then((response) => {
                setPokemonInfo(response.data);
                history.push(`/page/${startPage}`);
            });
        }
    };

    const onCloseSearch = () => {
        setPokemonNameSearch('');
        getPokemonInfo(params).then((response) => {
            setPokemonInfo(response.data);
        });
    };

    return (
        <Container height="100%" minH="100vh" bg="lightseagreen" padding="20px">
            <Flex justifyContent="center" paddingBottom="5%">
                <IconButton
                    aria-label="left-arrow"
                    icon={<FaArrowLeft color="white" />}
                    isRound={true}
                    size="lg"
                    bgColor="teal.500"
                    onClick={() => pageNav(pokemonInfo?.links.prev ?? 'null')}
                    disabled={startPage === params.pageNum}
                    visibility={startPage === params.pageNum ? 'hidden' : 'visible'}
                />
                <FormControl id="text" marginLeft="10%" marginRight="10%">
                    <InputGroup>
                        {pokemonNameSearch ? null : (
                            <InputLeftElement pointerEvents="none" paddingTop="1.25rem" paddingLeft="1rem">
                                <FaSearch color="white" />
                            </InputLeftElement>
                        )}
                        <Input
                            color="white"
                            bg="teal.400"
                            type="text"
                            fontWeight="bold"
                            fontSize="2rem"
                            w="100%"
                            h="60px"
                            justifyContent="center"
                            value={pokemonNameSearch}
                            placeholder="Pokédex"
                            _placeholder={{ color: 'teal', textAlign: 'center', fontWeight: 'bold' }}
                            onChange={(event) => setPokemonNameSearch(event.target.value)}
                            onKeyPress={(event) => submitSearch(event)}
                        />

                        <InputRightElement paddingRight="10px" paddingTop="1.25rem" paddingLeft="1rem">
                            {pokemonNameSearch && <CloseButton color="white" size="sm" onClick={onCloseSearch} />}
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <IconButton
                    aria-label="right-arrow"
                    icon={<FaArrowRight color="white" />}
                    isRound={true}
                    size="lg"
                    bgColor="teal.500"
                    onClick={() => pageNav(pokemonInfo?.links.next ?? 'null')}
                    disabled={pokemonInfo?.meta.current_page === pokemonInfo?.meta.last_page}
                    visibility={pokemonInfo?.meta.current_page === pokemonInfo?.meta.last_page ? 'hidden' : 'visible'}
                />
            </Flex>
            <PokeGrid props={pokemonInfo} />
        </Container>
    );
}

export default PokemonListPage;
