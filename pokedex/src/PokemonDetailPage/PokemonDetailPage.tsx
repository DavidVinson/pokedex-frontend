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
import { PokemonDetailInterface } from 'Types';
import { getPageDetail } from 'services/api';
import { ProfileHeading } from 'styleComps';

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
        <Container minH="100vh" bg="lightseagreen">
            <Flex paddingBottom="5%">
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
                    <Box paddingTop="3%">
                        <b>{pokemonDetail?.name}</b> #{pokeID}
                    </Box>
                    <Spacer />
                    <Box paddingTop="2%">
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
                                lineHeight="10px"
                                fontSize="10px"
                                textTransform="uppercase"
                            >
                                {type}
                            </Box>
                        ))}
                    </Box>
                </Flex>
                <Divider paddingTop="3%" />
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
                <Flex textAlign="left" marginTop="5%" marginBottom="3%" paddingLeft="1%">
                    <Box>
                        <b>{pokemonDetail?.genus}</b>
                    </Box>
                </Flex>

                <Flex textAlign="left" paddingLeft="1%">
                    <Box>{pokemonDetail?.description}</Box>
                </Flex>
                <Flex marginTop="5%">
                    <ProfileHeading>
                        <h4>Profile</h4>
                    </ProfileHeading>
                </Flex>

                <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(1, 1fr)" padding="3%" flexGrow={1}>
                    <GridItem>
                        <Stack>
                            <Box fontWeight="bold">Height:</Box>
                            <Box fontWeight="bold">Weight:</Box>
                            <Box fontWeight="bold">Egg Groups:</Box>
                            <Box fontWeight="bold">Abilities:</Box>
                        </Stack>
                    </GridItem>
                    <GridItem>
                        <Stack>
                            <Box justifyContent="right"> {pokemonDetail?.height} m</Box>
                            <Box justifyContent="right"> {pokemonDetail?.weight} m</Box>
                            <Box textTransform="capitalize">
                                {pokemonDetail?.egg_groups.map((group) => group).join(', ')}
                            </Box>
                            <Box textTransform="capitalize">
                                {pokemonDetail?.abilities.map((ability) => ability).join(', ')}
                            </Box>
                        </Stack>
                    </GridItem>
                </Grid>
            </Container>
        </Container>
    );
}

export default PokemonDetailPage;
