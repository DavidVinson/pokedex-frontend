import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';


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
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number
    }


    const history = useHistory();
    const [pokemonList, setPokemonList] = useState<PokemonListInterface[]>([]);
    const [pokemonData, setPokemonData] = useState<PokemonLinksInterface>();
    const [currentPage, setCurrentPage] = useState<PokemonMetaInterface>();


    useEffect(() => {
        getPokemonInfo();
    }, []);


    const getPokemonInfo = async () => {
        const response = await axios.get('https://intern-pokedex.myriadapps.com/api/v1/pokemon');
        console.log('response', response.data);
        setPokemonList(response.data.data);
        setPokemonData(response.data.links);
        setCurrentPage(response.data.meta.current_page);

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
        <main className='App-main'>
            
            <button onClick={nextPage}>next page</button>
            <button onClick={prevPage}>previous page</button>
            <p>{currentPage}</p>

            <ul>

                {pokemonList?.map((poke) => <li key={poke.id}><img src={poke.image} alt={poke.name} onClick={() => history.push(`/detail/${poke.id}`)}></img></li>)}

            </ul>
        </main>

    );
}

export default PokemonList;