import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
    IconButton,
    Flex,
    Spacer,
    Container,
    Divider,
    Box,
    Heading,
    Image,
    Stack,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { PokemonDetailInterface } from 'customTypes';
import { getPageDetail } from 'services/api';
import { ProfileHeading, ProfileStat } from 'styleComps';

function PokemonDetailPage() {
    const history = useHistory();
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailInterface>();
    const { currentPage, pokeID } = useParams<{ currentPage: string; pokeID: string }>();

    useEffect(() => {
        getPageDetail(pokeID).then((response) => {
            setPokemonDetail(response.data.data);
        });
    }, []);

    return (
        <Container data-testid="detail container" minH="100vh">
            <Flex paddingBottom="15px">
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
                                justifyContent="center"
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
                <Divider paddingTop="5px" />
                <Grid templateColumns="repeat(6, 1fr)" templateRows="repeat(1, 1fr)" marginTop="5%">
                    <GridItem rowSpan={1} colSpan={2}>
                        <Flex justifyContent="center" data-testid="poke image" w="100%">
                            <Image src={pokemonDetail?.image} alt={pokemonDetail?.name} w="100%" />
                        </Flex>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <Stack>
                            <Box>HP</Box>
                            <Box>Attack</Box>
                            <Box>Defense</Box>
                            <Box>Speed</Box>
                            <Box>Sp Atk</Box>
                            <Box>Sp Def</Box>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Stack>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetail?.stats.hp) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetail?.stats.hp) / 255) * 100) + 8) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats.hp}
                                    </Box>
                                ) : (
                                    <Box
                                        width={String(Math.ceil((Number(pokemonDetail?.stats.hp) / 255) * 100)) + '%'}
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats.hp}
                                    </Box>
                                )}
                            </Box>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetail?.stats.attack) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetail?.stats.attack) / 255) * 100) + 8) +
                                            '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats.attack}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetail?.stats.attack) / 255) * 100)) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats.attack}
                                    </Box>
                                )}
                            </Box>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetail?.stats.defense) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetail?.stats.defense) / 255) * 100) + 8) +
                                            '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats.defense}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetail?.stats.defense) / 255) * 100)) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats.defense}
                                    </Box>
                                )}
                            </Box>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetail?.stats.speed) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetail?.stats.speed) / 255) * 100) + 8) +
                                            '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats.speed}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetail?.stats.speed) / 255) * 100)) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats.speed}
                                    </Box>
                                )}
                            </Box>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetail?.stats['special-attack']) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil(
                                                    (Number(pokemonDetail?.stats['special-attack']) / 255) * 100,
                                                ) + 8,
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats['special-attack']}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil((Number(pokemonDetail?.stats['special-attack']) / 255) * 100),
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats['special-attack']}
                                    </Box>
                                )}
                            </Box>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetail?.stats['special-defense']) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil(
                                                    (Number(pokemonDetail?.stats['special-defense']) / 255) * 100,
                                                ) + 8,
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats['special-defense']}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil(
                                                    (Number(pokemonDetail?.stats['special-defense']) / 255) * 100,
                                                ),
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetail?.stats['special-defense']}
                                    </Box>
                                )}
                            </Box>
                        </Stack>
                    </GridItem>
                </Grid>
                <Flex textAlign="left" marginTop="15px" marginBottom="15px">
                    <Box>
                        <b>{pokemonDetail?.genus}</b>
                    </Box>
                </Flex>

                <Flex textAlign="left">
                    <Box>{pokemonDetail?.description}</Box>
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

export default PokemonDetailPage;
