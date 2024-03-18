import React, { useEffect, useState } from 'react'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {

    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`)
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }

        fetchExchanges();
    }, []);

    if (error) return <ErrorComponent msg={'Error while fetching Exchanges..'} />

    return (
        <Container maxW={'container.xl'}>
            {
                loading ? <Loader /> : <>

                    <HStack wrap={'wrap'}>
                        {
                            exchanges.map((exchange) => (
                                <ExchangeCard
                                    name={exchange.name}
                                    img={exchange.image}
                                    rank={exchange.trust_score_rank}
                                    url={exchange.url}
                                    key={exchange.id}
                                />
                            ))
                        }
                    </HStack>
                </>
            }
        </Container>
    )
}

const ExchangeCard = ({ name, img, rank, url }) => (
    <a href={url} target={'blank'}>
        <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'}
            css={{
                '&:hover': {
                    transform: 'scale(1.1)'
                }
            }}
        >
            <Image
                src={img}
                w={'10'}
                h={'10'}
                objectFit={'contain'}
                alt={'Exchange'}
            />

            <Heading size={'md'} noOfLines={1}>
                {rank}
            </Heading>

            <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>
);

export default Exchanges;