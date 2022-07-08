import { useParams } from "react-router";


function Coin() {
  const { coinId } = useParams();
  // const { coinId } = useParams<RouteParams>(); 
  /* react-router-dom 버전 6부터는 useParams에 String|undefined가 default 값으로 지정되어
  interface로 string 지정 시 'String , String | undefined ' 로 타입이 지정되어 오류가 나는 것은 인지*/
  return <h1>Coin: {coinId}</h1>;
}
export default Coin;