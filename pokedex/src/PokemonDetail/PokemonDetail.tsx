import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


function PokemonDetail() {

    interface PokemonDetailInterface {
        id: string,
        name: string,
        image: string,
        types: string[],
        height: string,
        weight: string,
        abilities: string[],
        egg_groups: string[],
        stats: {
            hp: string,
            speed: string,
            attack: string,
            defense: string,
            "special-attack": string,
            "special-defense": string,
        },
        genus: string,
        description: string
    }

    // interface PokemonLinksInterface {
    //     first: string;
    //     last: string;
    //     prev: null | string;
    //     next: string
    // }


    const history = useHistory();
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailInterface>();
    const { currentPage, pokeID } = useParams<{ currentPage: string, pokeID: string }>();
    console.log('the current page from params', currentPage);
    console.log('the poke id from params', pokeID);


    const getPageDetail = async () => {
        const response = await axios.get(`https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokeID}`);
        console.log('pokeDetail', response.data.data);
        setPokemonDetail(response.data.data);
    }

    useEffect(() => {
        getPageDetail();
    }, []);


    return (

        <main>

            {/* <Button onClick={() => history.push(`/page/${currentPage}`)}>back</Button> */}
            <Button onClick={() => history.push('/')}>back</Button>
            <h2>
                {pokemonDetail?.name} #{pokeID}
            </h2>

            {pokemonDetail?.types.map((type) => <p>{type.toUpperCase()} </p>)}
            <img src={pokemonDetail?.image} alt={pokemonDetail?.name} />


            <p>HP {pokemonDetail?.stats.hp}</p>
            <p>Attack {pokemonDetail?.stats.attack}</p>
            <p>Defense {pokemonDetail?.stats.defense}</p>
            <p>Speed {pokemonDetail?.stats.speed}</p>
            <p>Sp Atk {pokemonDetail?.stats["special-attack"]}</p>
            <p>Sp Def {pokemonDetail?.stats["special-defense"]}</p>

            <p><b>{pokemonDetail?.genus}</b></p>
            <p>{pokemonDetail?.description}</p>

            <div className="profile">
                <h4><b>Profile</b></h4>
            </div>
            <p><b>Height:</b> {pokemonDetail?.height} m</p>
            <p><b>Weight:</b> {pokemonDetail?.weight}</p>
            <p className="capitalize"><b>Egg Groups:</b> {pokemonDetail?.egg_groups.map((group) => group).join(', ')}</p>
            <p className="capitalize"><b>Abilities:</b> {pokemonDetail?.abilities.map((ability) => ability).join(', ')}</p>

        </main>

    );
}

export default PokemonDetail;