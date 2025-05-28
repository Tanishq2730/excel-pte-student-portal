import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

const MocktestProgress: React.FC = () => {
  const [studentDonutChart] = useState<any>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#1b507a", "#6FCCD8"],
    series: [3610, 44],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
          },
        },
      },
    ],
  });

  const [classDonutChart] = useState<any>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: ["Good", "Average", "Below Average"],
    legend: { show: false },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        offsetX: -15,
      },
    },
    grid: {
      padding: {
        left: -8,
      },
    },
    colors: ["#1b507a", "#EAB300", "#E82646"],
    series: [45, 11, 2],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
          },
        },
      },
    ],
  });

  return (
    <div className="mocktestProgress">
      <div className="card-body">
        <div className="list-tab mb-4">
          <ul className="nav">
            <li>
              <Link
                to="#"
                className="active"
                data-bs-toggle="tab"
                data-bs-target="#students"
              >
                Full Mock Test
              </Link>
            </li>
            <li>
              <Link
                to="#"
                data-bs-toggle="tab"
                data-bs-target="#teachers"
              >
                Sectional Mock Test
              </Link>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade active show" id="students">
            <div className="text-center">
              <ReactApexChart
                id="student-chart"
                className="mb-4"
                options={studentDonutChart}
                series={studentDonutChart.series}
                type="donut"
                height={210}
              />
            </div>
          </div>
          <div className="tab-pane fade" id="teachers">
            <div className="text-center">
              <ReactApexChart
                id="student-chart"
                className="mb-4"
                options={studentDonutChart}
                series={studentDonutChart.series}
                type="donut"
                height={210}
              />
            </div>
          </div>
        </div>
        <div className="d-md-flex align-items-center justify-content-between">
          <div className="me-md-3 mb-3 mb-md-0 w-100">
            <div className="border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-1">
              <p className="mb-0 me-2">
                <i className="ti ti-arrow-badge-down-filled me-2 text-primary" />
                Speaking
              </p>
              <h5>45%</h5>
            </div>
            <div className="border border-dashed p-3 rounde d-flex align-items-center justify-content-between mb-1">
              <p className="mb-0 me-2">
                <i className="ti ti-arrow-badge-down-filled me-2 text-warning" />
                Writing
              </p>
              <h5>11%</h5>
            </div>
            <div className="border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-0">
              <p className="mb-0 me-2">
                <i className="ti ti-arrow-badge-down-filled me-2 text-danger" />
                Reading
              </p>
              <h5>42%</h5>
            </div>
            <div className="border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-0">
              <p className="mb-0 me-2">
                <i className="ti ti-arrow-badge-down-filled me-2 text-danger" />
                Listening
              </p>
              <h5>20%</h5>
            </div>
          </div>
          <ReactApexChart
            id="class-chart"
            className="text-center text-md-left"
            options={classDonutChart}
            series={classDonutChart.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default MocktestProgress;
