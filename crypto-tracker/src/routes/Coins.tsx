import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import {axiosCoins} from "../api"
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {MdDarkMode, MdOutlineDarkMode} from "react-icons/md"

const Container = styled.div`
    
`
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
`
const CoinsList = styled.ul`
    margin: 0 auto;
    width: 800px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`
const Coin = styled.li`
    margin:0 auto 20px;
    background: ${(props) => props.theme.itemBgColor};
    border-radius: 15px;
    width: 180px;
    height: 7vh;
    font-size: 20px;
    font-weight: bold;
    a {
        transition: color 0.2s ease-in;
        color: ${(props) => props.theme.textColor};
        display: flex;
        align-items: center;
        height: 7vh;
    }
    &:hover {
        a{
            color: ${(props) => props.theme.accentColor};
        }
        
    }
`
const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
    
`;
const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 20px;
`;
const Img = styled.img`
    height: 30px;
    margin: 0 10px 0 10px;
`

interface Icoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}


function Coins() {
    /*const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    const getCoins = () => {
        axios.get("https://api.coinpaprika.com/v1/coins")
            .then(response => {
                setCoins(response.data.slice(0,100));
                setLoading(false);
            })
    };

    useEffect(() => {
        getCoins()
    }, []);*/
    
    const {isLoading, data} = useQuery<Icoin[]>("allCoins", axiosCoins)
    
    return (
        <Container>
            <Helmet>
                <title>COIN</title>
            </Helmet>
            <Header>
                <Title>COIN</Title>
            </Header>
            
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                {data?.map((coin) => (
                    <Coin key={coin.id}>
                        <Link to = {`/${coin.id}`} state = {{name: coin.name}}>
                            <Img src = {`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                            {coin.symbol}
                        </Link>
                    </Coin>
                ))}
                </CoinsList>
            )}
        </Container>
    )
}

export default Coins;