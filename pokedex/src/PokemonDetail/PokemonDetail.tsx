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


    const history = useHistory();
    const { pokeID } = useParams<{ pokeID: string }>();
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
            <Button onClick={() => history.push('/')}>back</Button>
            <h2>
                {pokemonDetail?.name} #{pokeID}
            </h2>
            <img src={pokemonDetail?.image} alt={pokemonDetail?.name}/>

            </CardContent>

        </Card>

    );
}

export default PokemonDetail;