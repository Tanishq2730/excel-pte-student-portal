import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import ReactApexChart from "react-apexcharts";
import "chart.js/auto";

const Progress: React.FC = () => {
  const [donutChart] = useState<any>({
    chart: {
      height: 350,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    series: [44, 55, 41, 17],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [stackedChart, setStackedChart] = useState({});
  const [stackedOptions, setStackedOptions] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [lineChartOptions, setLineChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const stackedData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          type: "bar",
          label: "Dataset 1",
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          data: [50, 25, 12, 48, 90, 76, 42],
        },
        {
          type: "bar",
          label: "Dataset 2",
          backgroundColor: documentStyle.getPropertyValue("--green-500"),
          data: [21, 84, 24, 75, 37, 65, 34],
        },
        {
          type: "bar",
          label: "Dataset 3",
          backgroundColor: documentStyle.getPropertyValue("--yellow-500"),
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    };

    const stackedOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setStackedChart(stackedData);
    setStackedOptions(stackedOptions);
  }, []);
  useEffect(() => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
      const lineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Dataset 1",
            fill: false,
            borderColor: documentStyle.getPropertyValue("--blue-500"),
            yAxisID: "y",
            tension: 0.4,
            data: [65, 59, 80, 81, 56, 55, 10],
          },
          {
            label: "Dataset 2",
            fill: false,
            borderColor: documentStyle.getPropertyValue("--green-500"),
            yAxisID: "y1",
            tension: 0.4,
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      };
      const lineOptions = {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              drawOnChartArea: false,
              color: surfaceBorder,
            },
          },
        },
      };
  
      setLineChartData(lineData);
      setLineChartOptions(lineOptions);
    }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Progress Overview</div>
            </div>
            <div className="card-body">
              <ReactApexChart
                options={donutChart}
                series={donutChart.series}
                type="donut"
                height={350}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Speaking Progress Report</div>
            </div>
            <div className="card-body">
              <Chart
                type="bar"
                data={stackedChart}
                options={stackedOptions}
                style={{ height: "300px" }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <Chart
                                    type="line"
                                    data={lineChartData}
                                    options={lineChartOptions}
                                    style={{ height: "300px" }}
                                  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
