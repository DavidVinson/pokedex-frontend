import React from 'react';
import { useHistory } from 'react-router-dom';
import { ApiDataInterface, PokemonListInterface, Props } from 'Types';
import { SimpleGrid, Box, Center, Divider, Image } from '@chakra-ui/react';
import { MessageBox } from 'styleComps';

function PokeGrid({ props }: Props) {
    const history = useHistory();

    return (
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
            {props?.data.length === 0 ? (
                <MessageBox>Oops! No Pokemon Found</MessageBox>
            ) : (
                props?.data.map((poke: PokemonListInterface) => (
                    <Box
                        key={poke.id}
                        cursor="pointer"
                        _hover={{
                            scrollSnapMarginLeft: '3',
                            backgroundColor: 'lightgray',
                        }}
                        bg="white"
                        borderRadius="sm"
                        onClick={() => history.push(`/detail/${props?.meta.current_page}/${poke.id}`)}
                    >
                        <Box textAlign="left" padding="5px" fontWeight="bold">
                            {poke.name}
                        </Box>
                        <Divider />

                        <Center>
                            <Image src={poke.image} alt={poke.name} w="75%" />
                        </Center>
                        <Box textAlign="right" paddingBottom="15px" paddingRight="15px">
                            {poke.types.map((type) => (
                                <Box
                                    key={type}
                                    border="1px solid"
                                    borderColor={`types.${type}.border`}
                                    borderRadius="md"
                                    color={`types.${type}.font`}
                                    bgColor={`types.${type}.bg`}
                                    width="fit-content"
                                    justifyContent="center"
                                    minW="50px"
                                    padding="5px"
                                    lineHeight="10px"
                                    fontSize="10px"
                                    display="inline-flex"
                                    marginLeft="5px"
                                    textTransform="uppercase"
                                >
                                    {type}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))
            )}
        </SimpleGrid>
    );
}

export default PokeGrid;
