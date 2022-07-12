import {useQuery} from 'react-query';
import { axiosCoinHistory } from '../api';
import ReactApexChart from 'react-apexcharts';
import { title } from 'process';

interface ChartProps{
    coinId: string;
}
interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
interface ICandleChartItem {
  x: Date;
  y: number[];
}
function Chart({coinId} : ChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => axiosCoinHistory(coinId), {refetchInterval:5000},);    
    
    return (
        <div>
            {isLoading? "Loading chart..." : (
                <ReactApexChart
                type="candlestick"
                series={[
                    {
                        name:"Price",
                        data: data?.map((props) => {
                          return {
                            x: new Date(props.time_open * 1000),
                            y: [
                              parseFloat(props.open),
                              parseFloat(props.high),
                              parseFloat(props.low),
                              parseFloat(props.close),
                            ],
                          };
                        }) as ICandleChartItem[],
                      },
                ]}
                options={{
                  theme: {
                    mode: "dark",
                  },
                  chart: {
                    type: "candlestick",
                    height: 350,
                    width: 500,
                    toolbar: {
                      show:false,
                    },
                    background: "transparent",
                  },
                  stroke: {
                    curve: "smooth",
                    width: 2,
                  },
                  yaxis: {
                    show: false,
                  },
                  xaxis: {
                    type: "datetime",
                    categories: data?.map((price) => price.time_close),
                    labels: {
                      style: {
                        colors: '#9c88ff'
                      }
                    }
                  },
                  plotOptions: {
                    candlestick: {
                      colors: {
                        upward: '#3C90EB',
                        downward: '#DF7D46'
                      }
                    }
                  }
                }}
              />
                    
            )}
        </div>
    )
}

export default Chart;

            /* type = "line" 
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
                    }} */