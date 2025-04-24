import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

const StudyPlanProgress = () => {
  const [sline] = useState<any>({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    // title: {
    //   text: "Product Trends by Month",
    //   align: "left",
    // },
    series: [
      {
        name: "Speaking",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Writing",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: "Reading",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Listening",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00",
        "2018-09-19T01:30:00",
        "2018-09-19T02:30:00",
        "2018-09-19T03:30:00",
        "2018-09-19T04:30:00",
        "2018-09-19T05:30:00",
        "2018-09-19T06:30:00",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  });

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div id="s-line-area" />
            <ReactApexChart
              options={sline}
              series={sline.series}
              type="area"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanProgress;
