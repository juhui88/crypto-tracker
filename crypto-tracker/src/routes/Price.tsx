import ApexChart from 'react-apexcharts'
import {useQuery} from 'react-query';
import styled from 'styled-components';
import { axiosCoinTickers } from '../api';

const PriceWrap = styled.div`
    
`
const PriceItem = styled.div`
    background-color: ${(props) => props.theme.itemBgColor};
    border-radius: 10px;
    margin: 12px;
    font-size: 17px;
    padding:15px;
    display:grid;
    grid-template-columns: 1fr 1fr;
`
const AthPriceItem = styled(PriceItem)`
    background-color : ${(props) => props.theme.bgColor};
    font-size: 20px;
    display:block;
    text-align: center;
`
const Text = styled.p`
    flex-grow: 1;
    font-size: 13px;
`
const DataText = styled.p`
    flex-grow: 1;
    border-left: solid 1px ${(props) => props.theme.textColor};
    padding-left:10px;
`


interface PriceProps {
    coinId: string;
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
      USD: {
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
      }
    }
  }

function Price({coinId} : PriceProps) {
    const {isLoading, data} = useQuery<PriceData>(["tickers", coinId], () => axiosCoinTickers(coinId), {refetchInterval:5000,})    
    
    return (
        <div>
            {isLoading ? "Loading..." : 
                <PriceWrap>
                    <AthPriceItem>
                        ATH Price : {data?.quotes.USD.ath_price}
                    </AthPriceItem>
                    <PriceItem>
                        <Text>
                            Change rate (last 24 hours) 
                        </Text>
                        <DataText>

                        {data?.quotes.USD.percent_change_24h} 
                        </DataText>
                        
                    </PriceItem>
                    <PriceItem>
                        <Text>
                            Change rate (last 7 days) 
                        </Text>
                        <DataText>
                        {data?.quotes.USD.percent_change_7d}
                        </DataText>
                        
                    </PriceItem>
                    <PriceItem>
                        <Text>
                            Change rate (last 30 days) 
                        </Text>
                        <DataText>
                        {data?.quotes.USD.percent_change_30d}
                        </DataText>
                        
                    </PriceItem>
                    <PriceItem>
                        <Text>
                            Change rate (last 1 year) 
                        </Text>
                        <DataText>
                        {data?.quotes.USD.percent_change_1y}
                        </DataText>
                        
                    </PriceItem>
                </PriceWrap>
            }
        </div>
    )
}

export default Price;