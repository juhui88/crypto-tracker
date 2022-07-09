import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`

export function fetchCoins(){
    return axios.get(`${BASE_URL}/coins`).then(res => res.data.slice(0,100));
}

export function fetchCoinInfo(coinId: string){
    return axios.get(`${BASE_URL}/coins/${coinId}`).then(res => res.data);
}

export function fetchCoinTickers (coinId: string){
    return axios.get(`${BASE_URL}/tickers/${coinId}`).then(res => res.data);
}