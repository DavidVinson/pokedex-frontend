import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import SearchInput from '../SearchInput/SearchInput';


function PokemonList() {


    /*
    const verifyUser = async function(username, password){
     try {
         const userInfo = await dataBase.verifyUser(username, password);
         const rolesInfo = await dataBase.getRoles(userInfo);
         const logStatus = await dataBase.logAccess(userInfo);
         return userInfo;
     }catch (e){
         //handle errors as needed
     }
  };
  
  another example:
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
        next: string
    }

    interface PokemonMetaInterface {
        current_page: string;
        from: string;
        last_page: string;
        path: string;
        per_page: string;
        to: string;
        total: string
    }


    const history = useHistory();
    const params = useParams();
    console.log('list page params', params);

    const [pokemonList, setPokemonList] = useState<PokemonListInterface[]>([]);
    const [pokemonData, setPokemonData] = useState<PokemonLinksInterface>();
    const [currentPage, setCurrentPage] = useState<PokemonMetaInterface>();
    const [searchPath, setSearchPath] = useState<PokemonMetaInterface>();


    useEffect(() => {
        getPokemonInfo();
    }, []);


    const getPokemonInfo = async () => {

        // if (myCurrentPage) {
        //     const response = await axios.get(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${myCurrentPage}`);
        //     console.log('response', response.data);
        //     setPokemonList(response.data.data);
        //     setPokemonData(response.data.links);
        //     setCurrentPage(response.data.meta.current_page);

        // } else {
        //     const response = await axios.get('https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=1');
        //     console.log('response', response.data);
        //     setPokemonList(response.data.data);
        //     setPokemonData(response.data.links);
        //     setCurrentPage(response.data.meta.current_page);
        // }

        const response = await axios.get('https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=1');
        console.log('response', response.data);
        setPokemonList(response.data.data);
        setPokemonData(response.data.links);
        setCurrentPage(response.data.meta.current_page);
        setSearchPath(response.data.meta.path);

    }


    console.log('pokemonList', pokemonList);
    console.log('pokemonData', pokemonData);


    const nextPage = async () => {
        console.log('next page', pokemonData?.next);
        const response = await axios.get(`${pokemonData?.next}`);
        setPokemonList(response.data.data);
        setPokemonData(response.data.links);
        setCurrentPage(response.data.meta.current_page);

    }

    const prevPage = async () => {
        console.log('previous page', pokemonData?.prev);
        const response = await axios.get(`${pokemonData?.prev}`);
        setPokemonList(response.data.data);
        setPokemonData(response.data.links);
        setCurrentPage(response.data.meta.current_page);

    }


    return (
        <main>

            <button onClick={prevPage}>previous page</button>
            {/* <input type="text"placeholder="Pok&eacute;dex"></input> */}
            <SearchInput />
            <button onClick={nextPage}>next page</button>
            <p>Page: {currentPage}</p>

            <Grid container spacing={2}>
                {pokemonList?.map((poke) =>
                    <Card className="poke-card" variant="outlined" key={poke.id} onClick={() => history.push(`/detail/${currentPage}/${poke.id}`)}>
                        <CardHeader title={poke.name}></CardHeader>
                        <CardContent>
                            <img src={poke.image} alt={poke.name}></img>
                            {poke.types.map((type) => <p>{type.toUpperCase()}</p>)}
                        </CardContent>
                    </Card>)}
            </Grid>

        </main>

    );
}

export default PokemonList;