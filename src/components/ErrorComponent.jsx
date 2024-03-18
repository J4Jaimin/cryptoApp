import { Alert, AlertIcon, AlertTitle, AlertDescription, VStack } from '@chakra-ui/react';
import React from 'react'

const Error = ({ msg }) => {
    return (
        <VStack h={'100vh'} alignItems={'center'}>
            <Alert status='error' top={'4'} w={'50vh'}>
                <AlertIcon />
                <AlertTitle>Something Went Wrong!!</AlertTitle>
                <AlertDescription>{msg}</AlertDescription>
            </Alert>
        </VStack>
    )
}

export default Error;