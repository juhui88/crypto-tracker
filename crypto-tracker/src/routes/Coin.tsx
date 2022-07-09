import axios from "axios";
import React, {useEffect, useState, } from "react";
import { useParams, useLocation } from "react-router";
import styled from "styled-components";

const Container = styled.div`
    
`
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

interface RouteParams {
  coinId: string;
 }
 interface RouteState {
  state :{
    name: string;
  }
 }
 interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  parent: object;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: object;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
 }
 interface PriceData {

 }

function Coin() {
  const { coinId } = useParams()as unknown as RouteParams; 
  /* react-router-dom 버전 6부터는 useParams에 String|undefined가 default 값으로 지정되어
  interface로 string 지정 시 'String ,String | undefined ' 로 타입이 지정되어 오류가 나는 것은 인지*/
  const [loading, setLoading] = useState(true);
  const {state} = useLocation() as RouteState;
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  const getCoinInfo = () => {
    axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        .then(response => {
          setInfo(response.data)
          console.log(response.data)
        })

    
    axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        .then(response =>  {
          setPriceInfo(response.data)
          console.log(response.data)
        })
    setLoading(false);
  };
  useEffect(() => {getCoinInfo()}, []);
  return (
    <Container>
      <Header>
          <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader>: (
        null
      )}
    </Container>
  );
}
export default Coin;