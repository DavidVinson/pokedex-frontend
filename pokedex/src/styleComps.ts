import styled from '@emotion/styled';
import { Box, BoxProps } from '@chakra-ui/layout';
import { motion } from 'framer-motion';

export const ProfileHeading = styled.div`
    background-color: lightseagreen;
    color: white;
    padding-top: 5px;
    padding-right: 5px;
    padding-left: 5px;
    padding-bottom: 5px;
    text-align: left;
    width: 100%;
`;

export const ProfileStat = styled.div`
    text-transform: capitalize;
    padding: 5px;
`;

export const Page = styled.div`
    background-color: lightseagreen;
    padding: 20px;
`;

export const MessageBox = styled.div`
    color: white;
    justifycontent: center;
    cursor: pointer;
    bg: white;
    borderradius: sm;
`;

export const MotionBox = motion<BoxProps>(Box);
