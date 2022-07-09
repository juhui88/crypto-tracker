import axios from "axios";
import React, {useEffect, useState, } from "react";
import { useParams, useLocation, Routes, Route, useMatch} from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  width: 55vw;
  margin: 0 auto;
`
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
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
const Overview = styled.div `
  background: #1b1f20;
  border-radius: 10px;
  
  margin: auto;
  font-size: 17px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22vw;
  span {
    margin: 10px;
    font-weight: 600;
  }
`
const Description = styled.p`
  margin: 20px 0 20px 0;
  font-size: 20px;
  line-height:30px;
`;
const Tabs = styled.div`
  
  margin: 20px auto;
  display:grid;
  grid-template-columns: 1fr 1fr;

  p:first-child { 
    margin-right: 5px;
  }
  p:last-child { 
    margin-left: 5px;
  }
`
const Tab = styled.p<{isActive:boolean}>`
  background: #1b1f20;
  border-radius: 10px;
  font-size: 20px;
  padding: 15px;
  text-align: center;
  a {
    color: ${(props) =>props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
  
`

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
  description: string;
  message: string;
  open_source: boolean;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
 interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    ath_date: string;
    ath_price:number;
    market_cap:number;
    market_cap_change_24h:number;
    percent_change_1h:number;
    percent_change_1y:number;
    percent_change_6h:number;
    percent_change_7d:number;
    percent_change_12h:number;
    percent_change_15m:number;
    percent_change_24h:number;
    percent_change_30d:number;
    percent_change_30m:number;
    percent_from_price_ath:number;
    price:number;
    volume_24h:number;
    volume_24h_change_24h:number;
  };
}

function Coin() {
  const { coinId } = useParams()as unknown as RouteParams; 
  /* react-router-dom 버전 6부터는 useParams에 String|undefined가 default 값으로 지정되어
  interface로 string 지정 시 'String ,String | undefined ' 로 타입이 지정되어 오류가 나는 것은 인지*/
  const [loading, setLoading] = useState(true);
  const {state} = useLocation() as RouteState;
  
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();


  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");


  const getCoinInfo = () => {
    axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        .then(response => {
          setInfo(response.data)
        })

    
    axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        .then(response =>  {
          setPriceInfo(response.data)
        })
    setLoading(false);
  };
  useEffect(() => {getCoinInfo()}, []);
  return (
    <Container>
      <Header>
          <Title>{coinId}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader>: (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{info?.rank}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Symbol:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>

            <OverviewItem>
              <span>OPEN SOURCE:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>

          <Description>
            {info?.description}
          </Description>

          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          
          

          <Routes>
            <Route path = "price"element={<Price/>}/>
            <Route path = "chart" element= {<Chart/>}/>
          </Routes>
        </>
      )}
    </Container>
  );
}
export default Coin;