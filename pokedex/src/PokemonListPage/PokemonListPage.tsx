import React from 'react';
import { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PokemonListInterface, PokemonLinksInterface, UrlParams } from 'customTypes';
import { getPokemonInfo, findPokemon, getPage } from 'services/api';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
    SimpleGrid,
    Box,
    Center,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Flex,
    Spacer,
    Container,
    Divider,
    Image,
    CloseButton,
    FormControl,
    Text,
} from '@chakra-ui/react';

function PokemonListPage() {
    const history = useHistory();
    const params: UrlParams = useParams();
    const [pokemonList, setPokemonList] = useState<PokemonListInterface[]>();
    const [pokemonData, setPokemonData] = useState<PokemonLinksInterface>();
    const [currentPage, setCurrentPage] = useState();
    const [lastPage, setLastPage] = useState();
    const [startPage, setStartPage] = useState('1');
    const [pokemonNameSearch, setPokemonNameSearch] = useState('');

    useEffect(() => {
        getPokemonInfo(params).then((response) => {
            setPokemonList(response.data.data);
            setPokemonData(response.data.links);
            setCurrentPage(response.data.meta.current_page);
            setLastPage(response.data.meta.last_page);
        });
    }, []);

    const pageNav = (pagination: string | null | undefined) => {
        const page = String(pagination);
        const strIndex = page.indexOf('=');
        const pageNum = page.slice(strIndex + 1);
        getPage(page, pageNum, pokemonNameSearch).then((response) => {
            setPokemonList(response.data.data);
            setPokemonData(response.data.links);
            setCurrentPage(response.data.meta.current_page);
            history.push(`/page/${pageNum}`);
        });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPokemonNameSearch(event.target.value);
    };

    const submitSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            findPokemon(pokemonNameSearch).then((response) => {
                setPokemonList(response.data.data);
                setPokemonData(response.data.links);
                setLastPage(response.data.meta.last_page);
                history.push(`/page/${startPage}`);
            });
        }
    };

    const onCloseSearch = () => {
        setPokemonNameSearch('');
        getPokemonInfo(params).then((response) => {
            setPokemonList(response.data.data);
            setPokemonData(response.data.links);
            setCurrentPage(response.data.meta.current_page);
            setLastPage(response.data.meta.last_page);
        });
    };

    return (
        <Container height="100%">
            <Flex paddingTop="15px" paddingBottom="15px">
                {startPage !== params.pageNum && (
                    <IconButton
                        aria-label="left-arrow"
                        icon={<FaArrowLeft color="white" />}
                        isRound={true}
                        size="lg"
                        bgColor="teal.500"
                        onClick={() => pageNav(pokemonData?.prev)}
                    />
                )}
                <Spacer />
                <FormControl id="text">
                    <InputGroup paddingLeft="10px" paddingRight="10px">
                        <InputLeftElement pointerEvents="none" paddingLeft="10px" paddingTop="5px">
                            <FaSearch color="white" />
                        </InputLeftElement>
                        <Input
                            color="teal.800"
                            type="text"
                            size="lg"
                            value={pokemonNameSearch}
                            placeholder="Pokédex"
                            _placeholder={{ color: 'white', textAlign: 'center' }}
                            onChange={(event) => handleChange(event)}
                            onKeyPress={(event) => submitSearch(event)}
                        />

                        <InputRightElement paddingRight="10px" paddingTop="5px" marginRight="5px">
                            {pokemonNameSearch && <CloseButton color="white" size="sm" onClick={onCloseSearch} />}
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Spacer />

                {currentPage !== lastPage && (
                    <IconButton
                        aria-label="right-arrow"
                        icon={<FaArrowRight color="white" />}
                        isRound={true}
                        size="lg"
                        bgColor="teal.500"
                        onClick={() => pageNav(pokemonData?.next)}
                    />
                )}
            </Flex>

            <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={4}>
                {pokemonList?.length === 0 ? (
                    <Box columns={2} justifyContent="center" cursor="pointer" bg="white" borderRadius="sm">
                        Oops...No pokemon found
                    </Box>
                ) : (
                    pokemonList?.map((poke) => (
                        <Box
                            key={poke.id}
                            cursor="pointer"
                            _hover={{
                                scrollSnapMarginLeft: '3',
                                backgroundColor: 'lightgray',
                            }}
                            bg="white"
                            borderRadius="sm"
                            onClick={() => history.push(`/detail/${currentPage}/${poke.id}`)}
                        >
                            <Box textAlign="left" padding="5px">
                                <b>{poke.name}</b>
                            </Box>
                            <Divider />

                            <Center>
                                <Image src={poke.image} alt={poke.name} />
                            </Center>
                            <Box textAlign="right" paddingBottom="10px" paddingRight="10px">
                                {poke.types.map((type) => (
                                    <Box
                                        key={type}
                                        borderRadius="md"
                                        color={`types.${type}.font`}
                                        bgColor={`types.${type}.bg`}
                                        borderColor={`types.${type}.border`}
                                        border="1px solid"
                                        width="fit-content"
                                        textAlign="center"
                                        minW="50px"
                                        padding="5px"
                                        lineHeight="8px"
                                        fontSize="8px"
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

export default PokemonListPage;
