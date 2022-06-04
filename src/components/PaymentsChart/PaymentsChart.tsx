import { ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';

type Props = {
  amountSeries: number[];
  installmentsSeries: number[];
  labels: string[];
};

const PaymentsChart = ({ amountSeries, installmentsSeries, labels }: Props) => {
  const series = [
    {
      name: 'Installments',
      type: 'column',
      data: installmentsSeries,
    },
    {
      name: 'Amount',
      type: 'line',
      data: amountSeries,
    },
  ];
  const options: ApexOptions = {
    chart: {
      foreColor: '#fff',
      height: 150,
      toolbar: {
        show: false,
      },
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: [0, 4],
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels,
    xaxis: {
      type: 'category',
    },
    yaxis: [
      {
        title: {
          text: 'Installments',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Amount',
        },
      },
    ],
  };

  return (
    <div>
      <Chart height={400} width={'100%'} options={options} series={series} type='line' />
    </div>
  );
};

export default PaymentsChart;
