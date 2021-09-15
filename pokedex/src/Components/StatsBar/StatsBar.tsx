import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { StatsProps } from 'Types';

function StatsBar({ props }: StatsProps) {
    return (
        <Stack>
            <Box width="100%" bg="gray.300">
                {Math.ceil((Number(props?.stats.hp) / 255) * 100) <= 10 ? (
                    <Box width={String(Math.ceil((Number(props?.stats.hp) / 255) * 100) + 8) + '%'} bg="teal.200">
                        {props?.stats.hp}
                    </Box>
                ) : (
                    <Box width={String(Math.ceil((Number(props?.stats.hp) / 255) * 100)) + '%'} bg="teal.200">
                        {props?.stats.hp}
                    </Box>
                )}
            </Box>
            <Box width="100%" bg="gray.300">
                {Math.ceil((Number(props?.stats.attack) / 255) * 100) <= 10 ? (
                    <Box width={String(Math.ceil((Number(props?.stats.attack) / 255) * 100) + 8) + '%'} bg="teal.200">
                        {props?.stats.attack}
                    </Box>
                ) : (
                    <Box width={String(Math.ceil((Number(props?.stats.attack) / 255) * 100)) + '%'} bg="teal.200">
                        {props?.stats.attack}
                    </Box>
                )}
            </Box>
            <Box width="100%" bg="gray.300">
                {Math.ceil((Number(props?.stats.defense) / 255) * 100) <= 10 ? (
                    <Box width={String(Math.ceil((Number(props?.stats.defense) / 255) * 100) + 8) + '%'} bg="teal.200">
                        {props?.stats.defense}
                    </Box>
                ) : (
                    <Box width={String(Math.ceil((Number(props?.stats.defense) / 255) * 100)) + '%'} bg="teal.200">
                        {props?.stats.defense}
                    </Box>
                )}
            </Box>
            <Box width="100%" bg="gray.300">
                {Math.ceil((Number(props?.stats.speed) / 255) * 100) <= 10 ? (
                    <Box width={String(Math.ceil((Number(props?.stats.speed) / 255) * 100) + 8) + '%'} bg="teal.200">
                        {props?.stats.speed}
                    </Box>
                ) : (
                    <Box width={String(Math.ceil((Number(props?.stats.speed) / 255) * 100)) + '%'} bg="teal.200">
                        {props?.stats.speed}
                    </Box>
                )}
            </Box>
            <Box width="100%" bg="gray.300">
                {Math.ceil((Number(props?.stats['special-attack']) / 255) * 100) <= 10 ? (
                    <Box
                        width={String(Math.ceil((Number(props?.stats['special-attack']) / 255) * 100) + 8) + '%'}
                        bg="teal.200"
                    >
                        {props?.stats['special-attack']}
                    </Box>
                ) : (
                    <Box
                        width={String(Math.ceil((Number(props?.stats['special-attack']) / 255) * 100)) + '%'}
                        bg="teal.200"
                    >
                        {props?.stats['special-attack']}
                    </Box>
                )}
            </Box>
            <Box width="100%" bg="gray.300">
                {Math.ceil((Number(props?.stats['special-defense']) / 255) * 100) <= 10 ? (
                    <Box
                        width={String(Math.ceil((Number(props?.stats['special-defense']) / 255) * 100) + 8) + '%'}
                        bg="teal.200"
                    >
                        {props?.stats['special-defense']}
                    </Box>
                ) : (
                    <Box
                        width={String(Math.ceil((Number(props?.stats['special-defense']) / 255) * 100)) + '%'}
                        bg="teal.200"
                    >
                        {props?.stats['special-defense']}
                    </Box>
                )}
            </Box>
        </Stack>
    );
}

export default StatsBar;
