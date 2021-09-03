import React from 'react';
import { Heading } from '@chakra-ui/react';
import { HeaderPropsInterface } from 'customTypes';

function Header({ title }: HeaderPropsInterface) {
    return (
        <Heading as="h1" alignItems="center">
            {title}
        </Heading>
    );
}

export default Header;
