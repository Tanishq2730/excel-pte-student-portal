import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import "bootstrap-daterangepicker/daterangepicker.css";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { all_routes } from "../../router/all_routes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminDashboardModal from "./adminDashboardModal";
import StudyPlan from "./studyPlan";

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
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <>
            <div className="row">
              <div className="col-md-12">
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
                            Welcome Back, Mr. Herald
                          </h1>
                          <Link
                            to="profile"
                            className="avatar avatar-sm img-rounded bg-gray-800 dark-hover"
                          >
                            <i className="ti ti-edit text-white" />
                          </Link>
                        </div>
                        <p className="text-white">Have a Good day at work</p>
                      </div>
                      <p className="text-white custom-text-white">
                        <i className="ti ti-refresh me-1" />
                        Updated Recently on 15 Jun 2024
                      </p>
                    </div>
                  </div>
                </div>
                {/* /Dashboard Content */}
              </div>
            </div>

            <div className="row">
              <div className="col-md-7">
                <div className="row">
                  {/* Total Students */}
                  <div className="col-xxl-6 col-sm-6 d-flex">
                    <div className="card flex-fill animate-card border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xl bg-danger-transparent me-2 p-1">
                            <i className="ion-mic-c"></i>
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
                  <div className="col-xxl-6 col-sm-6 d-flex">
                    <div className="card flex-fill animate-card border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xl me-2 bg-secondary-transparent p-1">
                            <i className="ion-edit"></i>
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
                  <div className="col-xxl-6 col-sm-6 d-flex">
                    <div className="card flex-fill animate-card border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xl me-2 bg-warning-transparent p-1">
                            <i className="ion-ios7-bookmarks"></i>
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
                  <div className="col-xxl-6 col-sm-6 d-flex">
                    <div className="card flex-fill animate-card border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xl me-2 bg-success-transparent p-1">
                            <i className="ion-headphone"></i>
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
                  <div className="col-xxl-12 col-xl-12 col-md-12">
                    <div className="d-flex rounded overflow-hidden shadow w-100 max-w-xl">
                      {/* Left Box */}
                      <div
                        className="bg-primary text-white d-flex flex-column align-items-center justify-content-center px-4 py-3 position-relative"
                        style={{ minWidth: "120px" }}
                      >
                        <button
                          type="button"
                          className="btn btn-link position-absolute top-0 end-0 text-white p-2"
                          data-bs-toggle="modal"
                          data-bs-target="#standard-modal"
                          onClick={() => setModalSource("left")}
                        >
                          <i className="ion-gear-b" />
                        </button>
                        <div className="h3 fw-bold text-white">{target}+</div>
                        <div className="small">Your Target</div>
                      </div>

                      {/* Right Box */}
                      <div className="bg-light flex-grow-1 p-3 position-relative">
                        <button
                          type="button"
                          className="btn btn-link position-absolute top-0 end-0 text-secondary p-2"
                          data-bs-toggle="modal"
                          data-bs-target="#standard-modal"
                          onClick={() => setModalSource("right")}
                        >
                          <i className="ion-gear-b" />
                        </button>
                        <div className="text-center fw-semibold h5 mb-3">
                          Exam Countdown
                        </div>
                        <div className="d-flex justify-content-around text-center">
                          <div>
                            <div className="h5 fw-semibold">
                              {countdown.days}
                            </div>
                            <div className="small">Days</div>
                          </div>
                          <div>
                            <div className="h5 fw-semibold">
                              {countdown.hours}
                            </div>
                            <div className="small">Hours</div>
                          </div>
                          <div>
                            <div className="h5 fw-semibold">
                              {countdown.minutes}
                            </div>
                            <div className="small">Minutes</div>
                          </div>
                          <div>
                            <div className="h5 fw-semibold">
                              {countdown.seconds}
                            </div>
                            <div className="small">Seconds</div>
                          </div>
                        </div>
                      </div>

                      {/* Modal */}
                      <div
                        id="standard-modal"
                        className="modal fade"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="standard-modalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title"
                                id="standard-modalLabel"
                              >
                                {modalSource === "left"
                                  ? "Select Target"
                                  : "Select Exam Date"}
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">
                              {modalSource === "left" ? (
                                <div className="tagetbutton">
                                  <button
                                    className="btn btn-soft-primary rounded-pill"
                                    onClick={() => setTarget(50)}
                                  >
                                    50
                                  </button>
                                  <button
                                    className="btn btn-soft-primary rounded-pill mx-4"
                                    onClick={() => setTarget(65)}
                                  >
                                    65
                                  </button>
                                  <button
                                    className="btn btn-soft-primary rounded-pill"
                                    onClick={() => setTarget(79)}
                                  >
                                    79
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <Calendar
                                    className="datepickers mb-4"
                                    value={date}
                                    onChange={(e) => setDate(e.value)}
                                    inline
                                  />
                                  {/* You can add a date picker or input here too */}
                                </div>
                              )}
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-cancel"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Modal End */}
                    </div>
                  </div>
                  <div className="col-xxl-12 col-xl-12 xol-md-12">
                    <div
                      className="card shadow-sm p-3 my-4"
                      style={{
                        backgroundColor: "rgb(255 226 226) !important",
                        borderRadius: "5px",
                        background: "rgb(255 226 226)",
                        border:'none'
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="mb-0 fw-semibold">Practice History</h5>
                      </div>  

                      {/* Progress bars */}
                      <div className="d-flex gap-3">
                        <div className="progBar flex-grow-1">
                          <div className="head">
                            <h5>{today} Today</h5>
                          </div>
                          <div className="progress progress-xs ">
                            <div
                              className="progress-bar bg-success rounded"
                              role="progressbar"
                              style={{ width: "80%" }}
                              aria-valuenow={30}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                        <div className="progBar flex-grow-1">
                          <div className="head">
                            <h5>{total} Today</h5>
                          </div>
                          <div className="progress progress-xs ">
                            <div
                              className="progress-bar bg-success rounded"
                              role="progressbar"
                              style={{ width: "80%" }}
                              aria-valuenow={30}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                        <div className="progBar flex-grow-1">
                          <div className="head">
                            <h5>{days} Today</h5>
                          </div>
                          <div className="progress progress-xs ">
                            <div
                              className="progress-bar bg-success rounded"
                              role="progressbar"
                              style={{ width: "80%" }}
                              aria-valuenow={30}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card">
                  <div className="card-body">
                    <div className="studyPlan">
                      <div className="calendar">
                        <Calendar
                          className="datepickers mb-4"
                          value={date}
                          onChange={(e) => setDate(e.value)}
                          inline
                          style={{ width: "100% !important" }}
                        />
                        <StudyPlan />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-md-12 d-flex">
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
              <div className="col-xxl-6">
                <div className="card flex-fill">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-titile">Activity History</h4>
                  </div>
                  <div className="card-body py-1">
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
                            src="/assets/img/media/slider1.png"
                          />
                          <p className="text-dark mt-1">Speaking</p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="bg-light-400 rounded p-2">
                          <img
                            className="classImg"
                            src="/assets/img/media/slider2.png"
                          />
                          <p className="text-dark mt-1">Writing</p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="bg-light-400 rounded p-2">
                          <img
                            className="classImg"
                            src="/assets/img/media/slider1.png"
                          />
                          <p className="text-dark mt-1">Reading</p>
                        </div>
                      </div>
                      <div className="item">
                        <div className="bg-light-400 rounded p-2">
                          <img
                            className="classImg"
                            src="/assets/img/media/slider2.png"
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
                    backgroundColor: "#f0f9ef",
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
                  <div className="avatar avatar-lg border p-1 border-success rounded-circle mb-2">
                    <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-success rounded-circle">
                      <i className="ion-mic-c"></i>
                    </span>
                  </div>
                  <p className="text-dark mb-2">Speech Test</p>
                  <p>Click the Mic Button to Speak</p>
                  <input
                    className="form-control"
                    type="text"
                    name="Your response"
                    placeholder="Your Response"
                  ></input>
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
                  <div className="avatar avatar-lg border p-1 border-secondary rounded-circle mb-2">
                    <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-secondary rounded-circle">
                      <i className="ion-headphone" />
                    </span>
                  </div>
                  <p className="text-dark mb-2">Listening Test</p>
                  <p>Click the Headphone Button to Listen</p>
                  <input
                    className="form-control"
                    type="text"
                    name="Your response"
                    placeholder="Your Response"
                    style={{ visibility: "hidden" }}
                  ></input>
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
                  <div className="avatar avatar-lg border p-1 border-danger rounded-circle mb-2">
                    <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-danger rounded-circle">
                      <i className="ion-edit" />
                    </span>
                  </div>
                  <p className="text-dark mb-2">Vocab Bank</p>
                  <p>
                    To identify and develop your reading skills we’ve put
                    together some information.
                  </p>

                  <button className="btn btn-soft-danger rounded-pill mt-4 w-100">
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
