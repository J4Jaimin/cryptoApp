import { VStack } from '@chakra-ui/react';
import React from 'react'
import { Bars } from 'react-loader-spinner';

const Loader = () => {
    return (
        <VStack h={'90vh'} justifyContent={'center'}>
            <Bars
                height="150"
                width="150"
                color="black"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </VStack>
    );
}

export default Loader;