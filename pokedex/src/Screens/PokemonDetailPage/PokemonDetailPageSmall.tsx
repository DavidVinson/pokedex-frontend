import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IconButton, Flex, Container, Divider, Box, Image, Stack, Grid, GridItem } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { PokemonDetailInterface } from 'Types';
import { ProfileHeading } from 'styleComps';
import { getPageDetail } from 'Services/api';
import StatsBar from 'Components/StatsBar/StatsBar';

function PokemonDetailPageSmall() {
    const history = useHistory();
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailInterface>();
    const { currentPage, pokeID } = useParams<{ currentPage: string; pokeID: string }>();

    useEffect(() => {
        getPageDetail(pokeID).then((response) => {
            setPokemonDetail(response.data.data);
        });
    }, []);

    return (
        <Container height="100vh" w="100%" bg="lightseagreen" paddingLeft="2%" paddingRight="2%">
            <Flex>
                <IconButton
                    aria-label="left-arrow"
                    icon={<FaArrowLeft color="white" />}
                    bg="lightseagreen"
                    size="lg"
                    onClick={() => history.push(`/page/${currentPage}`)}
                />
                <Box paddingTop="3%" color="white">
                    <Flex>
                        <Box fontWeight="bold" paddingRight="10px">
                            {pokemonDetail?.name}
                        </Box>
                        <Box>#{pokemonDetail?.id}</Box>
                    </Flex>
                </Box>
            </Flex>
            <Box justifyContent="center">
                <Image
                    src={pokemonDetail?.image}
                    alt={pokemonDetail?.name}
                    position="absolute"
                    top="5px"
                    right="10%"
                    overflow="visible"
                    w="30%"
                />
            </Box>

            <Container bg="white">
                <Flex padding="2%">
                    <Box w="50%">
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
                        <StatsBar props={pokemonDetail} />
                    </GridItem>
                </Grid>
                <Flex textAlign="left" marginTop="5%" marginBottom="2%">
                    <Box fontWeight="bold">{pokemonDetail?.genus}</Box>
                </Flex>
                <Flex textAlign="left">
                    <Box>{pokemonDetail?.description}</Box>
                </Flex>
                <Flex marginTop="5%" marginBottom="5%">
                    <ProfileHeading>
                        <h4>Profile</h4>
                    </ProfileHeading>
                </Flex>
                <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(1, 1fr)" padding="2%" flexGrow={1}>
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
                            <Box justifyContent="right"> {pokemonDetail?.weight} kg</Box>
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

export default PokemonDetailPageSmall;
