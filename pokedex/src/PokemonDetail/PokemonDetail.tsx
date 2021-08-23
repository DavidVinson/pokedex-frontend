import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { IconButton, InputGroup, Center, Flex } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import Header from '../Header/Header';
import { PokemonDetailInterface } from 'myTypes';

function PokemonDetail() {
    const history = useHistory();
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailInterface>();
    const { currentPage, pokeID } = useParams<{ currentPage: string; pokeID: string }>();
    console.log('the current page from params', currentPage);
    console.log('the poke id from params', pokeID);

    const getPageDetail = async () => {
        const response = await axios.get(`https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokeID}`);
        setPokemonDetail(response.data.data);
    };

    useEffect(() => {
        getPageDetail();
    }, []);

    return (
        <Flex className="profile">
            <Flex>
                <IconButton
                    aria-label="left-arrow"
                    icon={<FaArrowLeft color="white" />}
                    isRound={true}
                    size="lg"
                    bgColor="teal.500"
                    onClick={() => history.push(`/page/${currentPage}`)}
                />
                <Header title={pokemonDetail?.name ? pokemonDetail.name : 'na'} />
            </Flex>

            <Flex>
                <h2>
                    {pokemonDetail?.name} #{pokeID}
                </h2>

                {pokemonDetail?.types.map((type) => (
                    <p key={type}>{type.toUpperCase()} </p>
                ))}

                <img src={pokemonDetail?.image} alt={pokemonDetail?.name} />

                <p>HP {pokemonDetail?.stats.hp}</p>
                <p>Attack {pokemonDetail?.stats.attack}</p>
                <p>Defense {pokemonDetail?.stats.defense}</p>
                <p>Speed {pokemonDetail?.stats.speed}</p>
                <p>Sp Atk {pokemonDetail?.stats['special-attack']}</p>
                <p>Sp Def {pokemonDetail?.stats['special-defense']}</p>

                <p>
                    <b>{pokemonDetail?.genus}</b>
                </p>
                <p>{pokemonDetail?.description}</p>

                <div className="profile">
                    <h4>
                        <b>Profile</b>
                    </h4>
                </div>
                <p>
                    <b>Height:</b> {pokemonDetail?.height} m
                </p>
                <p>
                    <b>Weight:</b> {pokemonDetail?.weight}
                </p>
                <p className="capitalize">
                    <b>Egg Groups:</b> {pokemonDetail?.egg_groups.map((group) => group).join(', ')}
                </p>
                <p className="capitalize">
                    <b>Abilities:</b> {pokemonDetail?.abilities.map((ability) => ability).join(', ')}
                </p>
            </Flex>
        </Flex>
    );
}

export default PokemonDetail;
