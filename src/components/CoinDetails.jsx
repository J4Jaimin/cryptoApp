import { Container, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';

const CoinDetails = () => {

    const [coin, setCoin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState('inr');

    const params = useParams();

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/${params.id}`);

                console.log(data);
                setCoin(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }

        fetchCoins();
    }, [params.id]);

    if (error) return <ErrorComponent msg={'Error while fetching Coin..'} />

    return (
        <Container maxW={'container.xl'}>
            {
                loading ? <Loader /> : (
                    <>
                        <Box borderWidth={1} width={'full'}>
                            asfio
                        </Box>
                    </>
                )
            }
        </Container>
    )
}

export default CoinDetails;