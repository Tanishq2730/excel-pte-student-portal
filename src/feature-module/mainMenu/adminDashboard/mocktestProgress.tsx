import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ProgressBar } from "../../../api/dashboardAPI";

interface ProgressBarType {
  speaking: number;
  writing: number;
  reading: number;
  listening: number;
}

interface APIResponse {
  success: boolean;
  data: {
    progressOverview: ProgressBarType;
    fullMocktestCount: number;
  };
}

interface ChartConfig extends ApexOptions {
  series: number[];
}

const MocktestProgress: React.FC = () => {
  const [progressBar, setProgressBar] = useState<ProgressBarType>({
    speaking: 0,
    writing: 0,
    reading: 0,
    listening: 0,
  });

  const [studentDonutChart, setStudentDonutChart] = useState<ChartConfig>({
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
    series: [0, 100],
    labels: ["Completed", "Remaining"],
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

  const [classDonutChart, setClassDonutChart] = useState<ChartConfig>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: ["Speaking", "Writing", "Reading", "Listening"],
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
    colors: ["#1b507a", "#EAB300", "#E82646", "#6FCCD8"],
    series: [0, 0, 0, 0],
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

  useEffect(() => {
    fetchProgressBar();
  }, []);

  const fetchProgressBar = async () => {
    try {
      const res = (await ProgressBar()) as APIResponse;
      if (res?.success && res.data?.progressOverview) {
        
        setProgressBar(res.data.progressOverview);
        
        // Update the first chart with fullMocktestCount
        const fullMocktestCount = res.data.fullMocktestCount || 0;
        setStudentDonutChart(prev => ({
          ...prev,
          series: [fullMocktestCount, 100 - fullMocktestCount]
        }));

        // Update the second chart with progress overview
        setClassDonutChart(prev => ({
          ...prev,
          series: [
            res.data.progressOverview.speaking || 0,
            res.data.progressOverview.writing || 0,
            res.data.progressOverview.reading || 0,
            res.data.progressOverview.listening || 0
          ]
        }));
      }
    } catch (error) {
      console.error("Error fetching progress bar data:", error);
    }
  };

  return (
    <div className="mocktestProgress">
      <div className="card-body">
        <div className="head">
          <h4>Full Mock Test</h4>
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
        </div>
        <div className="row justify-content-between">
          <div className="head mb-3">
            <h4>Mock Test Progress</h4>
          </div>
          <div className="col-md-12">
            <div className="row ">
              <div className="col-md-6 border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-1">
                <p className="mb-0 me-2">
                  <i className="ti ti-arrow-badge-down-filled me-2 text-primary" />
                  Speaking
                </p>
                <h5>{progressBar.speaking || 0}%</h5>
              </div>
              <div className="col-md-6 border border-dashed p-3 rounde d-flex align-items-center justify-content-between mb-1">
                <p className="mb-0 me-2">
                  <i className="ti ti-arrow-badge-down-filled me-2 text-warning" />
                  Writing
                </p>
                <h5>{progressBar.writing || 0}%</h5>
              </div>
              <div className="col-md-6 border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-0">
                <p className="mb-0 me-2">
                  <i className="ti ti-arrow-badge-down-filled me-2 text-danger" />
                  Reading
                </p>
                <h5>{progressBar.reading || 0}%</h5>
              </div>
              <div className="col-md-6 border border-dashed p-3 rounded d-flex align-items-center justify-content-between mb-0">
                <p className="mb-0 me-2">
                  <i className="ti ti-arrow-badge-down-filled me-2 text-danger" />
                  Listening
                </p>
                <h5>{progressBar.listening || 0}%</h5>
              </div>
            </div>
          </div>
          <div className="col-md-10 m-auto">
            <div className="mt-2">
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
      </div>
    </div>
  );
};

export default MocktestProgress;
