import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IconButton, Flex, Spacer, Container, Divider, Box, Image, Stack, Grid, GridItem } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { PokemonDetailInterface } from 'customTypes';
import { ProfileHeading, ProfileStat } from 'styleComps';

function PokemonDetailPageSmall(pokemonDetailSmall: PokemonDetailInterface, currentPage: string, pokeID: string) {
    const history = useHistory();

    return (
        <Container data-testid="detail container">
            <Flex paddingBottom="15px">
                <IconButton
                    aria-label="left-arrow"
                    icon={<FaArrowLeft color="white" />}
                    bg="lightseagreen"
                    size="lg"
                    onClick={() => history.push(`/page/${currentPage}`)}
                />
                <Box paddingTop="5px" color="white">
                    <b>{pokemonDetailSmall?.name}</b> #{pokeID}
                </Box>
                <Flex justifyContent="center" data-testid="poke image" w="50%">
                    <Image src={pokemonDetailSmall?.image} alt={pokemonDetailSmall?.name} />
                </Flex>
            </Flex>

            <Container bg="white">
                <Flex>
                    <Box paddingTop="5px">
                        <b>{pokemonDetailSmall?.name}</b> #{pokeID}
                    </Box>
                    <Spacer />
                    <Box>
                        {pokemonDetailSmall?.types.map((type) => (
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
                <Divider paddingTop="5px" />(
                <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(1, 1fr)" marginTop="5%">
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
                                {Math.ceil((Number(pokemonDetailSmall?.stats.hp) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetailSmall?.stats.hp) / 255) * 100) + 8) +
                                            '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats.hp}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetailSmall?.stats.hp) / 255) * 100)) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats.hp}
                                    </Box>
                                )}
                            </Box>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetailSmall?.stats.attack) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil((Number(pokemonDetailSmall?.stats.attack) / 255) * 100) + 8,
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats.attack}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetailSmall?.stats.attack) / 255) * 100)) +
                                            '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats.attack}
                                    </Box>
                                )}
                            </Box>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetailSmall?.stats.defense) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil((Number(pokemonDetailSmall?.stats.defense) / 255) * 100) + 8,
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats.defense}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetailSmall?.stats.defense) / 255) * 100)) +
                                            '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats.defense}
                                    </Box>
                                )}
                            </Box>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetailSmall?.stats.speed) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil((Number(pokemonDetailSmall?.stats.speed) / 255) * 100) + 8,
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats.speed}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(Math.ceil((Number(pokemonDetailSmall?.stats.speed) / 255) * 100)) +
                                            '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats.speed}
                                    </Box>
                                )}
                            </Box>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetailSmall?.stats['special-attack']) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil(
                                                    (Number(pokemonDetailSmall?.stats['special-attack']) / 255) * 100,
                                                ) + 8,
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats['special-attack']}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil(
                                                    (Number(pokemonDetailSmall?.stats['special-attack']) / 255) * 100,
                                                ),
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats['special-attack']}
                                    </Box>
                                )}
                            </Box>
                            <Box width="100%" bg="gray.300">
                                {Math.ceil((Number(pokemonDetailSmall?.stats['special-defense']) / 255) * 100) <= 10 ? (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil(
                                                    (Number(pokemonDetailSmall?.stats['special-defense']) / 255) * 100,
                                                ) + 8,
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats['special-defense']}
                                    </Box>
                                ) : (
                                    <Box
                                        width={
                                            String(
                                                Math.ceil(
                                                    (Number(pokemonDetailSmall?.stats['special-defense']) / 255) * 100,
                                                ),
                                            ) + '%'
                                        }
                                        bg="teal.200"
                                    >
                                        {pokemonDetailSmall?.stats['special-defense']}
                                    </Box>
                                )}
                            </Box>
                        </Stack>
                    </GridItem>
                </Grid>
                <Flex textAlign="left" marginTop="15px" marginBottom="15px">
                    <Box>
                        <b>{pokemonDetailSmall?.genus}</b>
                    </Box>
                </Flex>
                <Flex textAlign="left">
                    <Box>{pokemonDetailSmall?.description}</Box>
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
                        <b>Height:</b> {pokemonDetailSmall?.height} m
                    </Box>
                    <Box padding="5px">
                        <b>Weight:</b> {pokemonDetailSmall?.weight} kg
                    </Box>
                    <Box>
                        <ProfileStat>
                            <b>Egg Groups:</b> {pokemonDetailSmall?.egg_groups.map((group) => group).join(', ')}
                        </ProfileStat>
                    </Box>
                </Flex>
                <Flex paddingBottom="15px">
                    <Box>
                        <ProfileStat>
                            <b>Abilities:</b> {pokemonDetailSmall?.abilities.map((ability) => ability).join(', ')}
                        </ProfileStat>
                    </Box>
                </Flex>
            </Container>
        </Container>
    );
}

export default PokemonDetailPageSmall;
