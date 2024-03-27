import React, { useEffect, useState } from 'react'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState('inr');

    const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';
    const btns = new Array(132).fill(1);

    const changePage = (page) => {
        setPage(page + 1);
        setLoading(true);
    }

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);

                setCoins(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }

        fetchCoins();
    }, [currency, page]);

    if (error) return <ErrorComponent msg={'Error while fetching Coins..'} />

    return (
        <Container maxW={'container.xl'}>
            {
                loading ? <Loader /> : <>

                    <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
                        <HStack spacing={'4'} m={'4'} w={'120vh'} justifyContent={'center'} alignItems={'center'}>
                            <Radio value={"inr"}>INR</Radio>
                            <Radio value={"usd"}>USD</Radio>
                            <Radio value={"eur"}>EUR</Radio>
                        </HStack>
                    </RadioGroup>

                    <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                        {
                            coins.map((coin) => (
                                <CoinCard
                                    id={coin.id}
                                    name={coin.name}
                                    price={coin.current_price}
                                    symbol={coin.symbol}
                                    currencySymbol={currencySymbol}
                                    img={coin.image}
                                    key={coin.id}
                                />
                            ))
                        }
                    </HStack>

                    <HStack w={'full'} overflowX={'auto'} p={'8'}>
                        {
                            btns.map((item, index) => (
                                <Button bgColor={'blackAlpha.900'} color={'white'} onClick={() => changePage(index + 1)}>{index + 1}</Button>
                            ))
                        }
                    </HStack>
                </>
            }
        </Container>
    )
}

export default Coins;