import React from 'react';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
    PokemonListInterface,
    PokemonLinksInterface,
    PokemonMetaInterface,
    UrlParams,
    ApiPropsInterface,
    ApiDataInterface,
} from 'customTypes';
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
} from '@chakra-ui/react';
import { getPokemonInfo } from 'services/api';
import { POKEDEX_API } from 'ConstantVariables/ConstantVariables';

function PokemonListPage() {
    const history = useHistory();
    const params: UrlParams = useParams();
    const pokedexApi: any = POKEDEX_API;
    const [pokemonList, setPokemonList] = useState<PokemonListInterface[]>([]);
    const [pokemonData, setPokemonData] = useState<PokemonLinksInterface>();
    const [currentPage, setCurrentPage] = useState<PokemonMetaInterface>();
    const [lastPage, setLastPage] = useState<PokemonMetaInterface>();
    const [startPage, setStartPage] = useState('1');
    const [pokemonNameSearch, setPokemonNameSearch] = useState('');

    useEffect(() => {
        const response: ApiDataInterface = getPokemonInfo(params);
        console.log('component response', response);
        // setPokemonList(response);
        // setPokemonData(response.data.links);
        // setCurrentPage(response.data.meta.current_page);
    }, []);

    const nextPage = async () => {
        if (pokemonNameSearch) {
            try {
                const page = String(pokemonData?.next);
                const strIndex = page.indexOf('=');
                const pageNum = page.slice(strIndex + 1);

                const response = await axios.get(pokedexApi, {
                    params: { name: pokemonNameSearch, page: pageNum },
                });

                setPokemonList(response.data.data);
                setPokemonData(response.data.links);
                setCurrentPage(response.data.meta.current_page);
                history.push(`/page/${pageNum}`);
            } catch (error) {
                console.log('next page search error', error.response);
            }
        } else {
            try {
                const page = String(pokemonData?.next);
                const strIndex = page.indexOf('=');
                const pageNum = page.slice(strIndex + 1);

                const response = await axios.get(`${pokemonData?.next}`);
                setPokemonList(response.data.data);
                setPokemonData(response.data.links);
                setCurrentPage(response.data.meta.current_page);
                history.push(`/page/${pageNum}`);
            } catch (error) {
                console.log('next page error', error.response);
            }
        }
    };

    const prevPage = async () => {
        if (pokemonNameSearch) {
            try {
                const page = String(pokemonData?.prev);
                const strIndex = page.indexOf('=');
                const pageNum = page.slice(strIndex + 1);

                const response = await axios.get(pokedexApi, {
                    params: { name: pokemonNameSearch, page: pageNum },
                });

                setPokemonList(response.data.data);
                setPokemonData(response.data.links);
                setCurrentPage(response.data.meta.current_page);
                history.push(`/page/${pageNum}`);
            } catch (error) {
                console.log('previous page search error', error.response);
            }
        } else {
            try {
                const page = String(pokemonData?.prev);
                const strIndex = page.indexOf('=');
                const pageNum = page.slice(strIndex + 1);

                const response = await axios.get(`${pokemonData?.prev}`);
                setPokemonList(response.data.data);
                setPokemonData(response.data.links);
                setCurrentPage(response.data.meta.current_page);
                history.push(`/page/${pageNum}`);
            } catch (error) {
                console.log('previous page error', error.response);
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPokemonNameSearch(event.target.value);
    };

    const submitSearch = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const response = await axios.get(pokedexApi, {
                params: { name: pokemonNameSearch },
            });
            setPokemonList(response.data.data);
            setPokemonData(response.data.links);
        }
    };

    const onCloseSearch = () => {
        setPokemonNameSearch('');
        // getPokemonInfo(pokedexApi, params);
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
                        onClick={prevPage}
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
                        onClick={nextPage}
                    />
                )}
            </Flex>

            <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={4}>
                {pokemonList?.map((poke) => (
                    <Box
                        key={poke.id}
                        cursor="pointer"
                        _hover={{
                            // scale: '1.1',
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
                ))}
            </SimpleGrid>
        </Container>
    );
}

export default PokemonListPage;
