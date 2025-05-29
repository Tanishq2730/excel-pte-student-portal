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
