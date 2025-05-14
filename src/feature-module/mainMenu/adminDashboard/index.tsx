import React, { useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
// import "bootstrap-daterangepicker/daterangepicker.css";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { all_routes } from "../../router/all_routes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminDashboardModal from "./adminDashboardModal";
import StudyPlaner from "./studyPlaner";
import ReactApexChart from "react-apexcharts";

const AdminDashboard = () => {
  const routes = all_routes;
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [target, setTarget] = useState(79);
  const [modalSource, setModalSource] = useState("left");
  function SampleNextArrow(props: any) {
    const { style, onClick } = props;

    return (
      <div
        className="slick-nav slick-nav-next class-slides"
        style={{ ...style, display: "flex", top: "-36%", left: "20%" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-right" style={{ fontSize: "12px" }}></i>
      </div>
    );
  }
  function SamplePrevArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-prev class-slides"
        style={{ ...style, display: "flex", top: "-36%", left: "17%" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-left" style={{ fontSize: "12px" }}></i>
      </div>
    );
  }

  const [countdown, setCountdown] = useState({
    days: 22,
    hours: 48,
    minutes: 54,
    seconds: 33,
  });

  const today = 0;
  const total = 153;
  const days = 27;

  const settings = {
    dots: false,
    autoplay: false,
    slidesToShow: 4,
    margin: 24,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const bannerslides = {
    dots: false,
    autoplay: true,
    slidesToShow: 1,
    margin: 24,
    speed: 500,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const student = {
    dots: false,
    autoplay: false,
    slidesToShow: 1,
    speed: 500,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };
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
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="card bg-dark">
                  <div className="overlay-img">
                    <ImageWithBasePath
                      src="assets/img/bg/shape-04.png"
                      alt="img"
                      className="img-fluid shape-01"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-01.png"
                      alt="img"
                      className="img-fluid shape-02"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-02.png"
                      alt="img"
                      className="img-fluid shape-03"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-03.png"
                      alt="img"
                      className="img-fluid shape-04"
                    />
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-xl-center justify-content-xl-between flex-xl-row flex-column">
                      <div className="mb-3 mb-xl-0">
                        <div className="d-flex align-items-center flex-wrap mb-2">
                          <h1 className="text-white me-2">
                            Welcome, Mr. Herald
                          </h1>
                        </div>
                        <div className="examCount">
                          <div className="text-left fw-semibold h5 mb-1 mt-2 text-white">
                            Exam Countdown
                          </div>
                          <div className="d-flex justify-content-start text-center mt-3">
                            <div className="countdown">
                              <div className="h5 fw-semibold text-white">
                                {countdown.days}
                              </div>
                              <div className="small text-white">Days</div>
                            </div>
                            <div className="countdown">
                              <div className="h5 fw-semibold text-white">
                                {countdown.hours}
                              </div>
                              <div className="small text-white">Hours</div>
                            </div>
                            <div className="countdown">
                              <div className="h5 fw-semibold text-white">
                                {countdown.minutes}
                              </div>
                              <div className="small text-white">Minutes</div>
                            </div>
                            <div className="countdown">
                              <div className="h5 fw-semibold text-white">
                                {countdown.seconds}
                              </div>
                              <div className="small text-white">Seconds</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Dashboard Content */}
              </div>
              <div className="col-md-6">
                <div className="bannerSlider">
                  <Slider
                    {...bannerslides}
                    className="owl-carousel owl-theme task-slider"
                  >
                    <div className="item">
                      <div className="bg-light-400 rounded">
                        <img
                          className="classImg"
                          src="assets/img/banner1.png"
                        />
                      </div>
                    </div>
                    <div className="item">
                      <div className="bg-light-400 rounded">
                        <img
                          className="classImg"
                          src="assets/img/banner2.png"
                        />
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3 d-flex">
                    <div className="card flex-fill bg-danger-transparent animate-card border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xl bg-danger-transparent me-2 p-1">
                            <i
                              className="fa fa-microphone"
                              style={{ fontSize: "2em" }}
                            ></i>
                          </div>
                          <div className="overflow-hidden flex-fill">
                            <p className="mb-0">Speaking</p>
                            <div className="d-flex align-items-center justify-content-between">
                              <h2 className="counter">
                                <CountUp end={39} />
                                <span className="attempt">Attempted</span>
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                          <p className="mb-0">
                            Total Quest :{" "}
                            <span className="text-dark fw-semibold">2706</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Total Students */}
                  {/* Total Teachers */}
                  <div className="col-md-3 d-flex">
                    <div className="card flex-fill bg-secondary-transparent animate-card border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xl me-2 bg-secondary-transparent p-1">
                            <i
                              className="ion-edit"
                              style={{ fontSize: "2em" }}
                            ></i>
                          </div>
                          <div className="overflow-hidden flex-fill">
                            <p className="mb-0">Writing</p>
                            <div className="d-flex align-items-center justify-content-between">
                              <h2 className="counter">
                                <CountUp end={284} />
                                <span className="attempt">Attempted</span>
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                          <p className="mb-0">
                            Total Quest :{" "}
                            <span className="text-dark fw-semibold">2706</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Total Teachers */}
                  {/* Total Staff */}
                  <div className="col-md-3 d-flex">
                    <div className="card flex-fill bg-warning-transparent animate-card border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xl me-2 bg-warning-transparent p-1">
                            <i
                              className="ion-ios7-bookmarks"
                              style={{ fontSize: "2em" }}
                            ></i>
                          </div>
                          <div className="overflow-hidden flex-fill">
                            <p className="mb-0">Reading</p>
                            <div className="d-flex align-items-center justify-content-between">
                              <h2 className="counter">
                                <CountUp end={96} />
                                <span className="attempt">Attempted</span>
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                          <p className="mb-0">
                            Total Quest :{" "}
                            <span className="text-dark fw-semibold">2706</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Total Staff */}
                  {/* Total Subjects */}
                  <div className="col-md-3 d-flex">
                    <div className="card flex-fill bg-success-transparent animate-card border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xl me-2 bg-success-transparent p-1">
                            <i
                              className="ion-headphone"
                              style={{ fontSize: "2em" }}
                            ></i>
                          </div>
                          <div className="overflow-hidden flex-fill">
                            <p className="mb-0">Listening</p>
                            <div className="d-flex align-items-center justify-content-between">
                              <h2 className="counter">
                                <CountUp end={2} />
                                <span className="attempt">Attempted</span>
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                          <p className="mb-0">
                            Total Quest :{" "}
                            <span className="text-dark fw-semibold">2706</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Total Subjects */}
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Study Plan</div>
                  </div>
                  <div className="card-body dashboardstudy">
                    <div className="studyPlan">
                      <div className="calendar">
                        <Calendar
                          className="datepickers mb-1"
                          value={date}
                          onChange={(e) => setDate(e.value)}
                          inline
                          style={{ width: "100% !important" }}
                        />
                        <div className="attemptedicon">
                          <div className="innerattempt">
                            <span style={{fontSize:"12px"}}>Attempted</span>{" "}
                            <p
                              className=""
                              style={{
                                width: "1em",
                                height: "1em",
                                marginLeft: "10px",
                                borderRadius: "100px",
                                background:"#00b2a9"
                              }}
                            ></p>
                          </div>
                          <div className="innerattempt">
                          <span style={{fontSize:"12px"}}>Not Attempted</span>{" "}
                            <p
                              className="bg-danger"
                              style={{
                                width: "1em",
                                height: "1em",
                                marginLeft: "10px",
                                borderRadius: "100px",
                              }}
                            ></p>
                          </div>
                        </div>
                        <StudyPlaner />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Mock Test Progress</h4>
                  </div>
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
                  </div>
                </div>
                {/* <div className="row flex-fill">
                  <div className="col-sm-6 d-flex flex-column">
                    <div className="bg-success-800 p-3 br-5 text-center flex-fill mb-4 pb-0  owl-height bg-01">
                      <Slider
                        {...student}
                        className="owl-carousel student-slider h-100"
                      >
                        <div className="item h-100">
                          <div className="d-flex justify-content-between flex-column h-100">
                            <div>
                              <h5 className="mb-3 text-white">
                                Best Performer
                              </h5>
                              <h4 className="mb-1 text-white">Rubell</h4>
                              <p className="text-light">Physics Teacher</p>
                            </div>
                            <ImageWithBasePath
                              src="assets/img/performer/performer-01.png"
                              alt="img"
                            />
                          </div>
                        </div>
                        <div className="item h-100">
                          <div className="d-flex justify-content-between flex-column h-100">
                            <div>
                              <h5 className="mb-3 text-white">
                                Best Performer
                              </h5>
                              <h4 className="mb-1 text-white">George Odell</h4>
                              <p className="text-light">English Teacher</p>
                            </div>
                            <ImageWithBasePath
                              src="assets/img/performer/performer-02.png"
                              alt="img"
                            />
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div> */}
                <div className="card flex-fill">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Progress Overview</h4>
                  </div>
                  <div className="card-body">
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
                      {/* <div id="class-chart" className="text-center text-md-left" /> */}
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
              <div className="col-md-4 d-flex flex-column">
                {/* Quick Links */}
                <div className="card flex-fill">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Study Tools</h4>
                  </div>
                  <div className="card-body p-3 studyStyle">
                    <div className="row">
                      <div className="col-md-4">
                        <Link
                          to={routes.template}
                          className="d-block bg-success-transparent ronded p-2 text-center mb-3 class-hover"
                        >
                          <div className="avatar avatar-lg border p-1 border-success rounded-circle mb-2">
                            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-success rounded-circle">
                              <i className="ti ti-calendar" />
                            </span>
                          </div>
                          <p className="text-dark">Temp</p>
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          to={routes.classLink}
                          className="d-block bg-secondary-transparent ronded p-2 text-center mb-3 class-hover"
                        >
                          <div className="avatar avatar-lg border p-1 border-secondary rounded-circle mb-2">
                            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-secondary rounded-circle">
                              <i className="ti ti-license" />
                            </span>
                          </div>
                          <p className="text-dark">Class</p>
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          to={routes.predictionFile}
                          className="d-block bg-primary-transparent ronded p-2 text-center mb-3 class-hover"
                        >
                          <div className="avatar avatar-lg border p-1 border-primary rounded-circle mb-2">
                            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-primary rounded-circle">
                              <i className="ti ti-hexagonal-prism" />
                            </span>
                          </div>
                          <p className="text-dark">Predt</p>
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          to={routes.classHomeWork}
                          className="d-block bg-danger-transparent ronded p-2 text-center mb-0 class-hover"
                        >
                          <div className="avatar avatar-lg border p-1 border-danger rounded-circle mb-2">
                            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-danger rounded-circle">
                              <i className="ti ti-report-money" />
                            </span>
                          </div>
                          <p className="text-dark">Gram</p>
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          to={routes.practiceHistory}
                          className="d-block bg-warning-transparent ronded p-2 text-center class-hover"
                        >
                          <div className="avatar avatar-lg border p-1 border-warning rounded-circle mb-2">
                            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-warning rounded-circle">
                              <i className="ti ti-calendar-share" />
                            </span>
                          </div>
                          <p className="text-dark">Pract</p>
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          to={routes.timeTable}
                          className="d-block bg-skyblue-transparent ronded p-2 text-center mb-0 class-hover"
                        >
                          <div className="avatar avatar-lg border p-1 border-skyblue rounded-circle mb-2">
                            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-pending rounded-circle">
                              <i className="ti ti-file-pencil" />
                            </span>
                          </div>
                          <p className="text-dark">TT</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Quick Links */}
                {/* Class Routine */}
                <div className="card flex-fill">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Recent Mock Score</h4>
                    <h5 className="text-danger">Total Score: 63</h5>
                  </div>
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center rounded border p-2 mb-3">
                      <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
                        <i className="fa fa-microphone text-danger"></i>
                      </span>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <p className="mb-1">Speaking</p>
                          <span>23/90</span>
                        </div>
                        <div className="progress progress-xs  flex-grow-1 mb-1">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-primary rounded"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center rounded border p-2 mb-3">
                      <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
                        <i className="ion-edit text-primary"></i>
                      </span>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <p className="mb-1">Writng</p>
                          <span>45/90</span>
                        </div>
                        <div className="progress progress-xs  flex-grow-1 mb-1">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-warning rounded"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center rounded border p-2 mb-3">
                      <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
                        <i className="ion-ios7-bookmarks text-green"></i>
                      </span>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <p className="mb-1">Reading</p>
                          <span>74/90</span>
                        </div>
                        <div className="progress progress-xs  flex-grow-1 mb-1">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-success rounded"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center rounded border p-2 mb-0">
                      <span className="avatar avatar-md flex-shrink-0 border rounded me-2">
                        <i className="ion-headphone text-warning"></i>
                      </span>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <p className="mb-1">Listening</p>
                          <span>68/90</span>
                        </div>
                        <div className="progress progress-xs  flex-grow-1 mb-1">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-info rounded"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Class Routine */}
                {/* Class Wise Performance */}

                {/* /Class Wise Performance */}
              </div>
              <div className="col-md-9">
                <div className="card flex-fill">
                  <div className="card-header  d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Study Plan Progress</h4>
                  </div>
                  <div className="card-body pb-0">
                    <ReactApexChart
                      options={sline}
                      series={sline.series}
                      type="area"
                      height={350}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex flex-column">
                <div className="row flex-fill">
                  <div className="bg-info p-3 br-5 text-center flex-fill mb-4 pb-0 owl-height bg-02">
                    <h2 className="text-white mb-5">Testimonial</h2>
                    <Slider
                      {...student}
                      className="owl-carousel student-slider h-100"
                    >
                      <div className="item h-100">
                        <div className="d-flex justify-content-between flex-column h-100">
                          <div>
                            <h4 className="mb-3 text-white">Mujtaba Sayed</h4>{" "}
                            <p className="text-light">
                              The training program and teaching methods by the
                              instructor (Yasmeen) are exceptional. Yasmeen as a
                              person is so humble and patient that you would
                              simply enjoy all the sessions. She understands
                              each person's pain points and work accordingly to
                              fix them with rigours training and feedback. I
                              haven't attempted PTE prior, but the scores I
                              achieved are mere hard work of my humble trainer
                              (Yasmeen S).
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item h-100">
                        <div className="d-flex justify-content-between flex-column h-100">
                          <div>
                            <h4 className="mb-3 text-white">Mujtaba Sayed</h4>{" "}
                            <p className="text-light">
                              The training program and teaching methods by the
                              instructor (Yasmeen) are exceptional. Yasmeen as a
                              person is so humble and patient that you would
                              simply enjoy all the sessions. She understands
                              each person's pain points and work accordingly to
                              fix them with rigours training and feedback. I
                              haven't attempted PTE prior, but the scores I
                              achieved are mere hard work of my humble trainer
                              (Yasmeen S).
                            </p>
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card flex-fill upcomingClasses">
                  <div className="card-body ">
                    <h5 className="mb-3">Upcoming Classes</h5>
                    <div className="event-wrapper event-scroll">
                      {/* Event Item */}
                      <div className="border-start border-skyblue border-3 shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                          <span className="avatar p-1 me-2 bg-teal-transparent flex-shrink-0">
                            <i className="ti ti-user-edit text-info fs-20" />
                          </span>
                          <div className="flex-fill">
                            <h6 className="mb-1">Essay Writing</h6>
                            <p className="d-flex align-items-center">
                              <i className="ti ti-calendar me-1" />
                              15 July 2024
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="mb-0">
                            <i className="ti ti-clock me-1" />
                            Friday 09:00 pm to 10:30 pm
                          </p>
                          <div className="avatar-list-stacked avatar-group-sm">
                            <button className="btn btn-primary">
                              Class Link
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* /Event Item */}
                      {/* Event Item */}
                      <div className="border-start border-skyblue border-3 shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                          <span className="avatar p-1 me-2 bg-teal-transparent flex-shrink-0">
                            <i className="ti ti-user-edit text-info fs-20" />
                          </span>
                          <div className="flex-fill">
                            <h6 className="mb-1">Essay Writing</h6>
                            <p className="d-flex align-items-center">
                              <i className="ti ti-calendar me-1" />
                              15 July 2024
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="mb-0">
                            <i className="ti ti-clock me-1" />
                            Friday 09:00 pm to 10:30 pm
                          </p>
                          <div className="avatar-list-stacked avatar-group-sm">
                            <button className="btn btn-primary">
                              Class Link
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* /Event Item */}
                      {/* Event Item */}
                      <div className="border-start border-skyblue border-3 shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                          <span className="avatar p-1 me-2 bg-teal-transparent flex-shrink-0">
                            <i className="ti ti-user-edit text-info fs-20" />
                          </span>
                          <div className="flex-fill">
                            <h6 className="mb-1">Essay Writing</h6>
                            <p className="d-flex align-items-center">
                              <i className="ti ti-calendar me-1" />
                              15 July 2024
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="mb-0">
                            <i className="ti ti-clock me-1" />
                            Friday 09:00 pm to 10:30 pm
                          </p>
                          <div className="avatar-list-stacked avatar-group-sm">
                            <button className="btn btn-primary">
                              Class Link
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="border-start border-skyblue border-3 shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                          <span className="avatar p-1 me-2 bg-teal-transparent flex-shrink-0">
                            <i className="ti ti-user-edit text-info fs-20" />
                          </span>
                          <div className="flex-fill">
                            <h6 className="mb-1">Essay Writing</h6>
                            <p className="d-flex align-items-center">
                              <i className="ti ti-calendar me-1" />
                              15 July 2024
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="mb-0">
                            <i className="ti ti-clock me-1" />
                            Friday 09:00 pm to 10:30 pm
                          </p>
                          <div className="avatar-list-stacked avatar-group-sm">
                            <button className="btn btn-primary">
                              Class Link
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* /Event Item */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card flex-fill">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-titile">Activity History</h4>
                  </div>
                  <div
                    className="card-body py-1 "
                    style={{ height: "21.4em", overflowY: "scroll" }}
                  >
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item py-3 px-0 pb-0">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="d-flex align-items-center overflow-hidden mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-xl flex-shrink-0 me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/home-work/home-work-01.jpg"
                                alt="img"
                              />
                            </Link>
                            <div className="overflow-hidden">
                              <p className="d-flex align-items-center text-info mb-1">
                                Mock Test
                              </p>
                              <h6 className="text-truncate mb-1">
                                {/* <Link to={routes.classHomeWork}> */}
                                Speaking Mock Test 40. #812
                                {/* </Link> */}
                              </h6>
                              <div className="d-flex align-items-center flex-wrap">
                                <p>16 Jun 2024</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item py-3 px-0 pb-0">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="d-flex align-items-center overflow-hidden mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-xl flex-shrink-0 me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/home-work/home-work-01.jpg"
                                alt="img"
                              />
                            </Link>
                            <div className="overflow-hidden">
                              <p className="d-flex align-items-center text-info mb-1">
                                Mock Test
                              </p>
                              <h6 className="text-truncate mb-1">
                                {/* <Link to={routes.classHomeWork}> */}
                                Speaking Mock Test 40. #812
                                {/* </Link> */}
                              </h6>
                              <div className="d-flex align-items-center flex-wrap">
                                <p>16 Jun 2024</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item py-3 px-0 pb-0">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="d-flex align-items-center overflow-hidden mb-3">
                            <Link
                              to="#"
                              className="avatar avatar-xl flex-shrink-0 me-2"
                            >
                              <ImageWithBasePath
                                src="assets/img/home-work/home-work-01.jpg"
                                alt="img"
                              />
                            </Link>
                            <div className="overflow-hidden">
                              <p className="d-flex align-items-center text-info mb-1">
                                Mock Test
                              </p>
                              <h6 className="text-truncate mb-1">
                                {/* <Link to={routes.classHomeWork}> */}
                                Speaking Mock Test 40. #812
                                {/* </Link> */}
                              </h6>
                              <div className="d-flex align-items-center flex-wrap">
                                <p>16 Jun 2024</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-md-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <h4 className="me-2">PTE Video Guide</h4>
                      <div className="owl-nav slide-nav2 text-end nav-control" />
                    </div>
                    <div className="d-inline-flex align-items-center class-datepick">
                      <button className="btn btn-primary">View All</button>
                    </div>
                  </div>
                  <div className="card-body videoSlider">
                    <Slider
                      {...settings}
                      className="owl-carousel owl-theme task-slider"
                    >
                      <div className="item">
                        <div className="bg-light-400 rounded p-2">
                          <img
                            className="classImg"
                            src="assets/img/slider1.png"
                          />
                          <p className="text-dark mt-1">Speaking</p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="bg-light-400 rounded p-2">
                          <img
                            className="classImg"
                            src="assets/img/slider2.png"
                          />
                          <p className="text-dark mt-1">Writing</p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="bg-light-400 rounded p-2">
                          <img
                            className="classImg"
                            src="assets/img/slider1.png"
                          />
                          <p className="text-dark mt-1">Reading</p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="bg-light-400 rounded p-2">
                          <img
                            className="classImg"
                            src="assets/img/slider1.png"
                          />
                          <p className="text-dark mt-1">Listening</p>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-md-12">
                <div
                  className="card p-4 shadow-sm"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "rgb(239 241 249)",
                    maxWidth: "100%",
                  }}
                >
                  <div className="row">
                    {/* Left Section - Heading and Image */}
                    <div className="col-md-4">
                      <h4 className="fw-normal mb-4">Score Comparison Tool</h4>
                      <img
                        src="assets/img/scoretool.png"
                        alt="Balance Scale"
                        style={{ width: "120px", height: "auto" }}
                      />
                    </div>

                    {/* Right Section - Form */}
                    <div className="col-md-8">
                      <form className="w-100">
                        <div className="mb-3 row align-items-center">
                          <label className="col-sm-4 col-form-label fw-semibold">
                            PTE Academic
                          </label>
                          <div className="col-sm-8">
                            <select className="form-select">
                              <option>Select Your Score</option>
                              <option>65</option>
                              <option>79</option>
                              <option>90</option>
                            </select>
                          </div>
                        </div>

                        <div className="mb-3 row align-items-center">
                          <label className="col-sm-4 col-form-label fw-semibold">
                            IELTS
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="mb-2 row align-items-center">
                          <label className="col-sm-4 col-form-label fw-semibold">
                            TOEFL iBT
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              readOnly
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-4 col-xl-6 col-md-12 d-flex">
                <Link
                  to="#"
                  className="d-block bg-success-transparent ronded p-3 text-center mb-3 class-hover w-100"
                >
                  <div
                    className="avatar avatar-lg border p-1 border-success rounded-circle mb-2"
                    title="Click the Mic Button to Speak"
                  >
                    <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-success rounded-circle">
                      <i className="ion-mic-c"></i>
                    </span>
                  </div>
                  <p className="text-dark mb-2">Speech Test</p>
                  <button className="btn btn-soft-success rounded-pill mt-2 w-100">
                    Refresh
                  </button>
                </Link>
              </div>

              <div className="col-xxl-4 col-xl-6 col-md-12 d-flex">
                <Link
                  to={routes.feesGroup}
                  className="d-block bg-secondary-transparent ronded p-3 text-center mb-3 class-hover w-100"
                >
                  <div
                    className="avatar avatar-lg border p-1 border-secondary rounded-circle mb-2"
                    title="Click the Headphone Button to Listen"
                  >
                    <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-secondary rounded-circle">
                      <i className="ion-headphone" />
                    </span>
                  </div>
                  <p className="text-dark mb-2">Listening Test</p>
                  <button className="btn btn-soft-secondary rounded-pill mt-2 w-100">
                    Click to listen
                  </button>
                </Link>
              </div>
              <div className="col-xxl-4 col-xl-6 col-md-12 d-flex">
                <Link
                  to={routes.classHomeWork}
                  className="d-block bg-danger-transparent ronded p-3 w-100 text-center mb-3 class-hover"
                >
                  <div
                    className="avatar avatar-lg border p-1 border-danger rounded-circle mb-2"
                    title="To identify and develop your reading skills we’ve put together some information."
                  >
                    <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-danger rounded-circle">
                      <i className="ion-edit" />
                    </span>
                  </div>
                  <p className="text-dark mb-2">Grammar</p>

                  <button className="btn btn-soft-danger rounded-pill mt-2 w-100">
                    Click here to Learn
                  </button>
                </Link>
              </div>
            </div>
          </>
        </div>
      </div>
      {/* /Page Wrapper */}
      <AdminDashboardModal />
    </>
  );
};

export default AdminDashboard;
