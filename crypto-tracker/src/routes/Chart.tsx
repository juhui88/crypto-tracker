import {useQuery} from 'react-query';
import { axiosCoinHistory } from '../api';
import ApexChart from 'react-apexcharts'

interface ChartProps{
    coinId: string;
}
interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
  }
interface IData {

}
function Chart({coinId} : ChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => axiosCoinHistory(coinId));    
    return (
        <div>
            {isLoading? "Loading chart..." : 
                ( <ApexChart 
                    type = "line" 
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) => price.close)??[],
                        },
                    ]}
                    options = {{
                        theme : {
                            mode: "dark",
                        },
                        chart: {
                            height: 300,
                            width: 1000,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: {
                            show:false
                        },
                        stroke: {
                            curve: "smooth",
                            width: 5,
                        },
                        yaxis: {
                            show:false
                        },
                        xaxis: {
                            axisTicks: { show: false },
                            labels: { 
                                show: false
                            },
                            categories: data?.map(date => date.time_close),
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#00271f"],
                                stops: [0,100],
                            },
                        },
                        colors: ["#71ffe3"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    )
}

export default Chart;