import React from 'react';
import { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UrlParams, ApiDataInterface } from 'Types';
import { getPokemonInfo, findPokemon, getPage } from 'services/api';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
    IconButton,
    Input,
    InputLeftElement,
    InputRightElement,
    Flex,
    Container,
    CloseButton,
    FormControl,
} from '@chakra-ui/react';
import PokeGrid from 'PokeGrid/PokeGrid';

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
        const pageNum = page?.slice(page?.indexOf('=') + 1);
        getPage(page, pageNum, pokemonNameSearch).then((response) => {
            setPokemonInfo(response.data);
            history.push(`/page/${pageNum}`);
        });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPokemonNameSearch(event.target.value);
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
                {startPage !== params.pageNum ? (
                    <IconButton
                        aria-label="left-arrow"
                        icon={<FaArrowLeft color="white" />}
                        isRound={true}
                        size="lg"
                        bgColor="teal.500"
                        onClick={() => pageNav(pokemonInfo?.links.prev ?? 'null')}
                    />
                ) : (
                    <IconButton aria-label="left-arrow" size="lg" disabled={true} visibility="hidden" />
                )}
                <FormControl id="text" marginLeft="10%" marginRight="10%">
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
                        onChange={(event) => handleChange(event)}
                        onKeyPress={(event) => submitSearch(event)}
                    />

                    <InputRightElement paddingRight="10px" paddingTop="1.25rem" paddingLeft="1rem">
                        {pokemonNameSearch && <CloseButton color="white" size="sm" onClick={onCloseSearch} />}
                    </InputRightElement>
                </FormControl>

                {pokemonInfo?.meta.current_page !== pokemonInfo?.meta.last_page ? (
                    <IconButton
                        aria-label="right-arrow"
                        icon={<FaArrowRight color="white" />}
                        isRound={true}
                        size="lg"
                        bgColor="teal.500"
                        onClick={() => pageNav(pokemonInfo?.links.next ?? 'null')}
                    />
                ) : (
                    <IconButton aria-label="left-arrow" size="lg" disabled={true} visibility="hidden" />
                )}
            </Flex>
            <PokeGrid props={pokemonInfo} />
        </Container>
    );
}

export default PokemonListPage;
