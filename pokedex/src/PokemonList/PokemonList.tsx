import React from 'react';
import axios from 'axios';
import { useEffect, useState, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { PokemonListInterface, PokemonLinksInterface, PokemonMetaInterface, UrlParams } from 'myTypes';
import {
    SimpleGrid,
    Box,
    Center,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Flex,
    Spacer,
    Container,
    Divider,
    Badge,
    Image,
} from '@chakra-ui/react';

function PokemonList() {
    const history = useHistory();
    const params: UrlParams = useParams();

    const [pokemonList, setPokemonList] = useState<PokemonListInterface[]>([]);
    const [pokemonData, setPokemonData] = useState<PokemonLinksInterface>();
    const [currentPage, setCurrentPage] = useState<PokemonMetaInterface>();

    useEffect(() => {
        getPokemonInfo();
    }, []);

    const getPokemonInfo = async () => {
        const response = await axios.get('https://intern-pokedex.myriadapps.com/api/v1/pokemon', {
            params: { page: params.pageNum },
        });
        setPokemonList(response.data.data);
        setPokemonData(response.data.links);
        setCurrentPage(response.data.meta.current_page);
    };

    const nextPage = async () => {
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
    };

    const prevPage = async () => {
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
    };

    const searchPokedex = async (event: ChangeEvent<HTMLInputElement>) => {
        const pokemonName = event.target.value;
        const response = await axios.get('https://intern-pokedex.myriadapps.com/api/v1/pokemon', {
            params: { name: pokemonName },
        });
        setPokemonList(response.data.data);
    };

    return (
        <Container className="main">
            <Flex padding="15px">
                <IconButton
                    aria-label="left-arrow"
                    icon={<FaArrowLeft color="white" />}
                    isRound={true}
                    size="lg"
                    bgColor="teal.500"
                    onClick={prevPage}
                />
                <Spacer />

                <InputGroup paddingLeft="10px" paddingRight="10px">
                    <InputLeftElement pointerEvents="none" paddingLeft="10px" paddingTop="5px">
                        <FaSearch color="white" />
                    </InputLeftElement>
                    <Input type="text" size="lg" placeholder="Pokédex" onChange={(event) => searchPokedex(event)} />
                </InputGroup>

                <Spacer />

                <IconButton
                    aria-label="right-arrow"
                    icon={<FaArrowRight color="white" />}
                    isRound={true}
                    size="lg"
                    bgColor="teal.500"
                    onClick={nextPage}
                />
            </Flex>

            <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={4}>
                {pokemonList?.map((poke) => (
                    <Box
                        bg="white"
                        borderRadius="sm"
                        key={poke.id}
                        onClick={() => history.push(`/detail/${currentPage}/${poke.id}`)}
                    >
                        <Box textAlign="left" padding="5px">
                            <b>{poke.name}</b>
                        </Box>
                        <Divider />

                        <Center>
                            <Image src={poke.image} alt={poke.name} />
                        </Center>
                        {poke.types.map((type) => (
                            <Badge borderRadius="md" key={type} margin="5px">
                                {type.toUpperCase()}
                            </Badge>
                        ))}
                    </Box>
                ))}
            </SimpleGrid>
        </Container>
    );
}

export default PokemonList;
