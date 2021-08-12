import React from 'react';
import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {

  //get the list of pokemons
  //GET https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=Pikachu
  //this api gets one pokemon "Pikachu"
  //GET https://intern-pokedex.myriadapps.com/api/v1/pokemon
  //gets all the pokemons on a page.
  //display the pokemons

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

//  axios.get<PokemonInterface[]>('https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=Pikachu')
//       .then((response) => {
//           console.log(response.data);
//       });

// const [pokemon, setPokemon] = useState([]);

// useEffect(() => {
//   async function getPokemon() {
//     const response = await axios.get('https://intern-pokedex.myriadapps.com/api/v1/pokemon');
//     setPokemon(response.data.data);
//   }
//   getPokemon();
// }, []);

// console.log('pokemon', pokemon);

interface PokemonInterface {
  id: number;
  image: string;
  name: string;
  types: string[];
}

useEffect(() => {
  getPokemon();
}, []);

const [pokemon, setPokemon] = useState<PokemonInterface[]>([]);

const getPokemon = async () => {
  const response = await axios.get('https://intern-pokedex.myriadapps.com/api/v1/pokemon');
  setPokemon(response.data.data);
}


console.log('pokemon', pokemon);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokedex</h1>
        <ul>

          {pokemon?.map((poke) => <li key={poke.id}>{poke.name}</li>)}

        </ul>
      </header>
    </div>
  );
}

export default App;
