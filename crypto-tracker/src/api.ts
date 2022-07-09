import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`

export function axiosCoins(){
    return axios.get(`${BASE_URL}/coins`).then(res => res.data.slice(0,100));
}

export function axiosCoinInfo(coinId: string){
    return axios.get(`${BASE_URL}/coins/${coinId}`).then(res => res.data);
}

export function axiosCoinTickers (coinId: string){
    return axios.get(`${BASE_URL}/tickers/${coinId}`).then(res => res.data);
}

export function axiosCoinHistory (coinId:string) {
    /*const endDate = Math.floor(Date.now() / 1000); // 현재 시간을 초로 나타냄
    const startDate = endDate - 60 * 60 * 24 * 7;*/
    return axios.get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then(res => res.data)
}