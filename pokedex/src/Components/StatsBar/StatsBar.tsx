import React from 'react';
import { Stack } from '@chakra-ui/react';
import { StatsProps } from 'Types';
import StatsBox from 'Components/StatsBox/StatsBox';

function StatsBar({ props }: StatsProps) {
    return (
        <Stack>
            <StatsBox value={props?.stats.hp}></StatsBox>
            <StatsBox value={props?.stats.attack}></StatsBox>
            <StatsBox value={props?.stats.defense}></StatsBox>
            <StatsBox value={props?.stats.speed}></StatsBox>
            <StatsBox value={props?.stats['special-attack']}></StatsBox>
            <StatsBox value={props?.stats['special-defense']}></StatsBox>
        </Stack>
    );
}

export default StatsBar;
