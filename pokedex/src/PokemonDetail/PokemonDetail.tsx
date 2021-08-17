import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
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

    interface PokemonLinksInterface {
        first: string;
        last: string;
        prev: null | string;
        next: string
    }


    const history = useHistory();
    const { pokeID } = useParams<{ pokeID: string }>();
    const { currentPage } = useParams<{ currentPage: string }>();
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailInterface>();


    const getPageDetail = async () => {
        const response = await axios.get(`https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokeID}`);
        console.log('pokeDetail', response.data.data);
        setPokemonDetail(response.data.data);
    }

    useEffect(() => {
        getPageDetail();
    }, []);


    console.log(`pokeDatail Page`, pokemonDetail);

    return (

        <Card variant="outlined">
            <CardContent>
                
                <Button onClick={() => history.push(`/`)}>back</Button>
                <h2>
                    {pokemonDetail?.name} #{pokeID}
                </h2>

                {pokemonDetail?.types.map((type) => <p>{type}</p>)}
                <img src={pokemonDetail?.image} alt={pokemonDetail?.name} />


                <p>HP {pokemonDetail?.stats.hp}</p>
                <p>Attack {pokemonDetail?.stats.attack}</p>
                <p>Defense {pokemonDetail?.stats.defense}</p>
                <p>Speed {pokemonDetail?.stats.speed}</p>
                <p>Sp Atk {pokemonDetail?.stats["special-attack"]}</p>
                <p>Sp Def {pokemonDetail?.stats["special-defense"]}</p>

                <p>{pokemonDetail?.description}</p>

                <h4><b>Profile</b></h4>
                <p><b>Height:</b> {pokemonDetail?.height} m</p>
                <p><b>Weight:</b> {pokemonDetail?.weight}</p>
                <p><b>Egg Groups:</b> {pokemonDetail?.egg_groups.map((group) => <span>{group}, </span>)}</p>
                <p><b>Abilities:</b> {pokemonDetail?.abilities.map((ability) => <span>{ability}, </span>)}</p>


            </CardContent>

        </Card>

    );
}

export default PokemonDetail;