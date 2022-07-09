import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

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
`
const Coin = styled.li`
    margin:0 auto 20px;
    background: white;
    border-radius: 15px;
    width: 700px;
    height: 9vh;
    font-size: 20px;
    font-weight: bold;
    a {
        transition: color 0.2s ease-in;
        color: ${(props) => props.theme.bgColor};
        display: flex;
        align-items: center;
        height: 9vh;
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

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
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
    }, []);
    
    return (
        <Container>
            <Header>
                <Title>COIN</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                {coins.map((coin) => (
                    <Coin key={coin.id}>
                        <Link to = {`/${coin.id}`} state = {{name: coin.name}}>
                            <Img src = {`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                            {coin.name} ➜
                        </Link>
                    </Coin>
                ))}
                </CoinsList>
            )}
        </Container>
    )
}

export default Coins;