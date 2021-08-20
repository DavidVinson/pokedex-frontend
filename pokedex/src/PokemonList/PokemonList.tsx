import axios from 'axios';
import { useEffect, useState, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SimpleGrid, Box, Center, IconButton, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function PokemonList() {


    /*  
  let user: User = null;
  try {
    const { data } = await axios.get('/user?ID=12345');
    user = data.userDetails;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      handleUnexpectedError(error);
    }
  }
    */

    interface PokemonListInterface {
        id: string;
        image: string;
        name: string;
        types: string[];
    }

    interface PokemonLinksInterface {
        first: string;
        last: string;
        prev: null | string;
        next: string;
    }

    interface PokemonMetaInterface {
        current_page: string;
        from: string;
        last_page: string;
        path: string;
        per_page: string;
        to: string;
        total: string;
    }

    interface UrlParams {
        name: string | undefined;
        pageNum: string;
    }


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
        // console.log('response', response.data);
        setPokemonList(response.data.data);
        setPokemonData(response.data.links);
        setCurrentPage(response.data.meta.current_page);

    }


    const nextPage = async () => {
        // console.log('page', pokemonData?.next);
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
        // console.log('page', pokemonData?.prev);
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


            {/* <button onClick={prevPage}>previous page</button> */}
            {/* <input type="text" placeholder="Pok&eacute;dex" onChange={(event) => searchPokedex(event)}></input> */}
            {/* <button onClick={nextPage}>next page</button> */}

            <p>Page: {currentPage}</p>

            {/* <Grid container spacing={2}>
                {pokemonList?.map((poke) =>
                    <Card className="poke-card" variant="outlined" key={poke.id} onClick={() => history.push(`/detail/${currentPage}/${poke.id}`)}>
                        <h4>{poke.name}</h4>
                        <CardContent>
                            <img src={poke.image} alt={poke.name}></img>
                            {poke.types.map((type) => <p key={type}>{type.toUpperCase()}</p>)}
                        </CardContent>
                    </Card>)}
            </Grid> */}

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

