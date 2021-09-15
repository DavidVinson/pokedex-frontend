import React from 'react';
import { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UrlParams, ApiDataInterface } from 'Types';
import { getPokemonInfo, findPokemon, getPage } from 'services/api';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
    SimpleGrid,
    Box,
    Center,
    IconButton,
    Input,
    InputLeftElement,
    InputRightElement,
    Flex,
    Container,
    Divider,
    Image,
    CloseButton,
    FormControl,
    Spacer,
} from '@chakra-ui/react';
import { MessageBox } from 'styleComps';

function PokemonListPageSmall() {
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
                <FormControl id="text" w="100%">
                    {pokemonNameSearch ? null : (
                        <InputLeftElement pointerEvents="none" paddingTop="1.25rem" paddingLeft="1rem">
                            <FaSearch color="white" />
                        </InputLeftElement>
                    )}
                    <Input
                        color="white"
                        type="text"
                        inputMode="search"
                        fontWeight="bold"
                        w="100%"
                        h="60px"
                        justifyContent="center"
                        value={pokemonNameSearch}
                        placeholder="Search Pokédex"
                        _placeholder={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}
                        onChange={(event) => handleChange(event)}
                        onKeyPress={(event) => submitSearch(event)}
                    />

                    <InputRightElement paddingRight="10px" paddingTop="1.25rem" paddingLeft="1rem">
                        {pokemonNameSearch && <CloseButton color="white" size="sm" onClick={onCloseSearch} />}
                    </InputRightElement>
                </FormControl>
            </Flex>
            <Flex bg="lightseagreen" position="fixed" bottom="0" left="0" right="0" w="100%" justifyContent="center">
                <Box paddingLeft="10%">
                    {startPage !== params.pageNum ? (
                        <IconButton
                            aria-label="left-arrow"
                            icon={<FaArrowLeft color="white" />}
                            size="lg"
                            bgColor="lightseagreen"
                            onClick={() => pageNav(pokemonInfo?.links.prev ?? 'null')}
                        />
                    ) : (
                        <IconButton aria-label="left-arrow" size="lg" disabled={true} visibility="hidden" />
                    )}
                </Box>
                <Spacer />
                <Box paddingRight="10%">
                    {pokemonInfo?.meta.current_page !== pokemonInfo?.meta.last_page ? (
                        <IconButton
                            aria-label="right-arrow"
                            icon={<FaArrowRight color="white" />}
                            size="lg"
                            bgColor="lightseagreen"
                            onClick={() => pageNav(pokemonInfo?.links.next ?? 'null')}
                        />
                    ) : (
                        <IconButton aria-label="left-arrow" size="lg" disabled={true} visibility="hidden" />
                    )}
                </Box>
            </Flex>

            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                {pokemonInfo?.data.length === 0 ? (
                    <MessageBox>Oops! No Pokemon Found</MessageBox>
                ) : (
                    pokemonInfo?.data.map((poke) => (
                        <Box
                            key={poke.id}
                            bg="white"
                            borderRadius="sm"
                            onClick={() => history.push(`/detail/${pokemonInfo?.meta.current_page}/${poke.id}`)}
                        >
                            <Box textAlign="left" padding="5px" fontWeight="bold">
                                {poke.name}
                            </Box>
                            <Divider />

                            <Center>
                                <Image src={poke.image} alt={poke.name} w="75%" />
                            </Center>
                            <Box textAlign="right" paddingBottom="15px" paddingRight="15px">
                                {poke.types.map((type) => (
                                    <Box
                                        key={type}
                                        border="1px solid"
                                        borderColor={`types.${type}.border`}
                                        borderRadius="md"
                                        color={`types.${type}.font`}
                                        bgColor={`types.${type}.bg`}
                                        width="fit-content"
                                        justifyContent="center"
                                        minW="50px"
                                        padding="5px"
                                        lineHeight="10px"
                                        fontSize="10px"
                                        display="inline-flex"
                                        marginLeft="5px"
                                        textTransform="uppercase"
                                    >
                                        {type}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))
                )}
            </SimpleGrid>
        </Container>
    );
}
export default PokemonListPageSmall;
