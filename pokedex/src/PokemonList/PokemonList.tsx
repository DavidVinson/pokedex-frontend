import axios from 'axios';
import { useEffect, useState, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SimpleGrid, Box, Center, IconButton, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { PokemonListInterface, PokemonLinksInterface, PokemonMetaInterface, UrlParams} from 'myTypes';

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
        const response = await axios.get('https://intern-pokedex.myriadapps.com/api/v1/pokemon', { params: { page: params.pageNum } });
        setPokemonList(response.data.data);
        setPokemonData(response.data.links);
        setCurrentPage(response.data.meta.current_page);

    }


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

    }


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

    }


    async function searchPokedex(event: ChangeEvent<HTMLInputElement>) {
        const pokemonName = event.target.value;
        const response = await axios.get('https://intern-pokedex.myriadapps.com/api/v1/pokemon', { params: { name: pokemonName } });
        setPokemonList(response.data.data);

    }


    return (
        <main className="main">
            <InputGroup>
                <IconButton aria-label="left-arrow" icon={<FaArrowLeft color="white" />} isRound={true} size='lg' bgColor="teal.500" onClick={prevPage} />

                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FaSearch color="white"/>} />
                    <Input type="text" size='lg' placeholder="Pokédex" onChange={(event) => searchPokedex(event)} />
                </InputGroup>
                
                <IconButton aria-label="right-arrow" icon={<FaArrowRight color="white" />} isRound={true} size='lg' bgColor="teal.500" onClick={nextPage} />

            </InputGroup>

            <p>Page: {currentPage}</p>

            <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={4}>
                {pokemonList?.map((poke) =>
                    <Box bg="white" key={poke.id} onClick={() => history.push(`/detail/${currentPage}/${poke.id}`)}>
                        <h4><b>{poke.name}</b></h4>
                        <Center><img src={poke.image} alt={poke.name}></img></Center>
                        {poke.types.map((type) => <p key={type}>{type.toUpperCase()}</p>)}

                    </Box>)}

            </SimpleGrid>


        </main>

    );
}


export default PokemonList;

