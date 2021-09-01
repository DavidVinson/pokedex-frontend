import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { IconButton, Flex, Spacer, Container, Divider, Box, Heading, Image } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { PokemonDetailInterface } from 'myTypes';
import styled from '@emotion/styled';

const ProfileHeading = styled.div`
    background-color: lightseagreen;
    color: white;
    padding-top: 5px;
    padding-right: 5px;
    padding-left: 5px;
    padding-bottom: 5px;
    text-align: left;
    width: 100%;
`;

const ProfileStat = styled.div`
    text-transform: capitalize;
    padding: 5px;
`;

function PokemonDetail() {
    const history = useHistory();
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailInterface>();
    const { currentPage, pokeID } = useParams<{ currentPage: string; pokeID: string }>();

    const getPageDetail = async () => {
        const response = await axios.get(`https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokeID}`);
        setPokemonDetail(response.data.data);
    };

    useEffect(() => {
        getPageDetail();
    }, []);

    return (
        <Container>
            <Flex paddingBottom="25px" color="red.700">
                <IconButton
                    aria-label="left-arrow"
                    icon={<FaArrowLeft color="lightseagreen" />}
                    isRound={true}
                    size="lg"
                    bgColor="white"
                    onClick={() => history.push(`/page/${currentPage}`)}
                />
                <Spacer />
                <Heading color="white" as="h1" textAlign="center">
                    {pokemonDetail?.name}
                </Heading>
                <Spacer />
            </Flex>

            <Container bg="white">
                <Flex>
                    <Box paddingTop="5px">
                        <b>{pokemonDetail?.name}</b> #{pokeID}
                    </Box>
                    <Spacer />
                    <Box>
                        {pokemonDetail?.types.map((type) => (
                            <Box
                                key={type}
                                padding="5px"
                                marginTop="5px"
                                marginLeft="5px"
                                borderRadius="md"
                                color={`types.${type}.font`}
                                bgColor={`types.${type}.bg`}
                                borderColor={`types.${type}.border`}
                                border="1px solid"
                                width="fit-content"
                                textAlign="center"
                                minW="50px"
                                display="inline-flex"
                                lineHeight="8px"
                                fontSize="8px"
                                textTransform="uppercase"
                            >
                                {type}
                            </Box>
                        ))}
                    </Box>
                </Flex>
                <Divider paddingTop="10px" />

                <Flex>
                    <Flex>
                        <Image src={pokemonDetail?.image} alt={pokemonDetail?.name} />
                    </Flex>
                    <Spacer />
                    <Box>
                        <p>HP {pokemonDetail?.stats.hp}</p>
                        <p>Attack {pokemonDetail?.stats.attack}</p>
                        <p>Defense {pokemonDetail?.stats.defense}</p>
                        <p>Speed {pokemonDetail?.stats.speed}</p>
                        <p>Sp Atk {pokemonDetail?.stats['special-attack']}</p>
                        <p>Sp Def {pokemonDetail?.stats['special-defense']}</p>
                    </Box>
                </Flex>
                <Flex textAlign="left">
                    <p>
                        <b>{pokemonDetail?.genus}</b>
                    </p>
                </Flex>

                <Flex textAlign="left">
                    <p>{pokemonDetail?.description}</p>
                </Flex>

                <Flex marginTop="15px" marginBottom="15px">
                    <ProfileHeading>
                        <h4>
                            <b>Profile</b>
                        </h4>
                    </ProfileHeading>
                </Flex>
                <Flex textAlign="left" paddingBottom="15px">
                    <Box padding="5px">
                        <b>Height:</b> {pokemonDetail?.height} m
                    </Box>
                    <Box padding="5px">
                        <b>Weight:</b> {pokemonDetail?.weight} kg
                    </Box>
                    <Box>
                        <ProfileStat>
                            <b>Egg Groups:</b> {pokemonDetail?.egg_groups.map((group) => group).join(', ')}
                        </ProfileStat>
                    </Box>
                </Flex>
                <Flex paddingBottom="15px">
                    <Box>
                        <ProfileStat>
                            <b>Abilities:</b> {pokemonDetail?.abilities.map((ability) => ability).join(', ')}
                        </ProfileStat>
                    </Box>
                </Flex>
            </Container>
        </Container>
    );
}

export default PokemonDetail;
