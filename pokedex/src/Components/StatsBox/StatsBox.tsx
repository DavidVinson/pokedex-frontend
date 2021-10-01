import React from 'react';
import { Box } from '@chakra-ui/react';
import { StatsDetail } from 'Types';

function StatsBox({ value }: StatsDetail) {
    return (
        <Box width="100%" bg="gray.300">
            {Math.ceil((Number(value) / 255) * 100) <= 10 ? (
                <Box width={String(Math.ceil((Number(value) / 255) * 100) + 8) + '%'} bg="teal.200">
                    {value}
                </Box>
            ) : (
                <Box width={String(Math.ceil((Number(value) / 255) * 100)) + '%'} bg="teal.200">
                    {value}
                </Box>
            )}
        </Box>
    );
}

export default StatsBox;
