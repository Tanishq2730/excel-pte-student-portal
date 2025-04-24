import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface MockTestChartProps {
  title: string;
  data1?: number[];
  data2?: number[];
  labels?: string[];
}

const MockTestProgress: React.FC<MockTestChartProps> = ({
  title,
  data1 = [80, 20],
  data2 = [60, 40],
  labels = ['Not Attempted', 'Attempted'],
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut' as const,
    },
    labels: labels,
    colors: ['#ff7979', '#f5b041'],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
  };

  return (
    <div className="row">
      {/* First Card */}
      <div className="col-md-6 p-3">
        <div className="card p-3" style={{ backgroundColor: '#ffffff' }}>
          <div
            className="text-white text-center py-2 mb-3"
            style={{ backgroundColor: '#33c0c9', borderRadius: '5px'}}
          >
            <h5 className="m-0 text-white">Full Mock Test</h5>
          </div>
          <div className="text-center">
            <Chart options={chartOptions} series={data1} type="donut" width="200" />
            <div className="mt-3 d-flex justify-content-center align-items-center gap-4 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: '12px', height: '12px', backgroundColor: '#ff7979', borderRadius: '4px' }}></div>
                <span className="text-danger fw-medium">Not</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: '12px', height: '12px', backgroundColor: '#f5b041', borderRadius: '4px' }}></div>
                <span className="text-warning fw-medium">Attempted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Card */}
      <div className="col-md-6 p-3">
        <div className="card p-3" style={{ backgroundColor: '#ffffff' }}>
          <div
            className="text-white text-center py-2 mb-3"
            style={{ backgroundColor: '#33c0c9', borderRadius: '5px'}}
          >
            <h5 className="m-0 text-white">Sectional Mock Test</h5>
          </div>
          <div className="text-center">
            <Chart options={chartOptions} series={data2} type="donut" width="200" />
            <div className="mt-3 d-flex justify-content-center align-items-center gap-4 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: '12px', height: '12px', backgroundColor: '#ff7979', borderRadius: '4px' }}></div>
                <span className="text-danger fw-medium">Not</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: '12px', height: '12px', backgroundColor: '#f5b041', borderRadius: '4px' }}></div>
                <span className="text-warning fw-medium">Attempted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestProgress;
