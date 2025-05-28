import React, { useEffect, useState } from "react";
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
import { DashboardCounts, ExamCountdown } from "../../../api/dashboardAPI";
import MocktestProgress from "./mocktestProgress";
import StudyTools from "./studyTools";
import RecentMocktestScore from "./recentMocktestScore";
import PteVideoSlider from "./pteVideoSlider";
import Testimonial from "./testimonial";
import UpcomingClass from "./upcomingClass";
import ActivityHistory from "./activityHistory";
import ComparisonTool from "./comparisonTool";
import SpeechListenCard from "./speechListenCard";
import DashboardCard from "./dashboardCard";

interface QuestionCount {
  id: number;
  heading: string;
  total_questions: number;
  attempted_questions: number;
  type_name: string;
}

interface DashboardCountsType {
  [key: number]: QuestionCount;
}

interface ExamCountdownType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const AdminDashboard = () => {
  const routes = all_routes;
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [target, setTarget] = useState(79);
  const [modalSource, setModalSource] = useState("left");
  const [counts, setCounts] = useState<DashboardCountsType>({});
  const [examCountdown, setExamCountdown] = useState<ExamCountdownType>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const cardIcons = {
    0: { icon: "fa fa-microphone", bgClass: "bg-danger-transparent" },
    1: { icon: "ion-edit", bgClass: "bg-secondary-transparent" },
    2: { icon: "ion-ios7-bookmarks", bgClass: "bg-warning-transparent" },
    3: { icon: "ion-headphone", bgClass: "bg-success-transparent" },
  };

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
    slidesToShow: 3,
    margin: 24,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
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
    arrows: false,
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

  useEffect(() => {
    count();
    getexamCountdown();
  }, []);
  const count = async () => {
    const res = await DashboardCounts();
    // console.log(res);
    if (res?.success) {
      setCounts(res.data);
    }
  };
  const getexamCountdown = async () => {
    const res = await ExamCountdown();
    // console.log(res);
    if (res?.success) {
      setCounts(res.data);
    }
  };
  // console.log(examCountdown)

  const renderDashCards = () => {
    return Object.keys(counts).map((key) => {
      const index = parseInt(key);
      const iconData = cardIcons[index as keyof typeof cardIcons];

      return (
        <div key={index} className="col-md-3 d-flex dashcardMain">
          <div className="card flex-fill animate-card border-1">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div
                  className={`avatar avatar-xl ${iconData.bgClass} me-2 p-1`}
                >
                  <i className={iconData.icon} style={{ fontSize: "2em" }}></i>
                </div>
                <div className="overflow-hidden flex-fill">
                  <p className="mb-0">{counts[index]?.type_name}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <h2 className="counter">
                      <CountUp end={counts[index]?.attempted_questions || 0} />
                      <span className="attempt">Attempted</span>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                <p className="mb-0">
                  Total Quest :{" "}
                  <span className="text-dark fw-semibold">
                    {counts[index]?.total_questions || 0}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

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
                                {examCountdown?.days || 0}
                              </div>
                              <div className="small text-white">Days</div>
                            </div>
                            <div className="countdown">
                              <div className="h5 fw-semibold text-white">
                                {examCountdown?.hours || 0}
                              </div>
                              <div className="small text-white">Hours</div>
                            </div>
                            <div className="countdown">
                              <div className="h5 fw-semibold text-white">
                                {examCountdown?.minutes || 0}
                              </div>
                              <div className="small text-white">Minutes</div>
                            </div>
                            <div className="countdown">
                              <div className="h5 fw-semibold text-white">
                                {examCountdown?.seconds || 0}
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
                <DashboardCard counts={counts} />
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Study Plan</div>
                  </div>
                  <div className="card-body dashboardstudy">
                    <div className="studyPlan">
                      <div className="calendar">
                        <StudyPlaner />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Mock Test Progress Overview</h4>
                  </div>
                  <MocktestProgress />
                </div>
              </div>
              <div className="col-md-4 d-flex flex-column">
                {/* Quick Links */}
                <div className="card flex-fill">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Study Tools</h4>
                  </div>
                  <StudyTools />
                </div>
                {/* /Quick Links */}
                {/* Class Routine */}
                <RecentMocktestScore />
                {/* /Class Routine */}
                {/* Class Wise Performance */}

                {/* /Class Wise Performance */}
              </div>
              <div className="col-md-8">
                <PteVideoSlider />
              </div>
              <div className="col-md-4 d-flex flex-column">
                <Testimonial/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <UpcomingClass/>
              </div>
              <div className="col-md-6">
                <ActivityHistory/>
              </div>
            </div>
            <div className="row">
              <ComparisonTool/>
            </div>
            <div className="row">
              <SpeechListenCard/>
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
