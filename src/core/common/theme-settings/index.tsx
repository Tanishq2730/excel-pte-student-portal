import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAllMode,
  setDataColor,
  setDataLayout,
  setDataSidebar,
  setDataSidebarBg,
  setDataTheme,
  setTopBarColor,
} from "../../data/redux/themeSettingSlice";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../imageWithBasePath";
import { Badge } from "react-bootstrap";

const ThemeSettings = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const buyNow = () => {
    window.open("https://1.envato.market/52Ndo", "_blank");
  };
  const dispatch = useDispatch();
  const dataLayout = useSelector((state: any) => state.themeSetting.dataLayout);
  const dataTopBar = useSelector((state: any) => state.themeSetting.dataTopBar);
  const dataTheme = useSelector((state: any) => state.themeSetting.dataTheme);
  const dataSidebar = useSelector(
    (state: any) => state.themeSetting.dataSidebar
  );
  const dataSidebarBg = useSelector(
    (state: any) => state.themeSetting.dataSidebarBg
  );
  const dataColor = useSelector((state: any) => state.themeSetting.dataColor);

  const handleLayoutChange = (layout: string) => {
    dispatch(setDataLayout(layout));
  };
  const handleTopBarColorChange = (color: string) => {
    dispatch(setTopBarColor(color));
  };
  const handleDataThemeChange = (theme: string) => {
    dispatch(setDataTheme(theme));
  };
  const handleDataSidebarChange = (theme: string) => {
    dispatch(setDataSidebar(theme));
  };
  const handleDataSidebarBgChange = (bg: string) => {
    dispatch(setDataSidebarBg(bg));
  };
  const handleDataColorChange = (bg: string) => {
    dispatch(setDataColor(bg));
  };

  const handleReset = () => {
    dispatch(resetAllMode());
  };

  const questionData = [
    {
      title: "Kashmiri",
      difficulty: "Hard",
      status: "Attempted",
      prediction: true,
      isNew: true,
      attempts: 1,
    },
    {
      title: "Financial Markets",
      difficulty: "Medium",
      status: "Unattempted",
      prediction: true,
    },
    {
      title: "Palm Oil",
      difficulty: "Easy",
      status: "Attempted",
      prediction: true,
      attempts: 1,
    },
    {
      title: "Dr. Google",
      difficulty: "Medium",
      status: "Unattempted",
      prediction: true,
    },
    {
      title: "Political Parties",
      difficulty: "Medium",
      status: "Unattempted",
      prediction: false,
    },
    {
      title: "counterpoint",
      difficulty: "Easy",
      status: "Unattempted",
      prediction: false,
    },
    {
      title: "Livelihood",
      difficulty: "Medium",
      status: "Unattempted",
      prediction: false,
    },
  ];

  return (
    <>
      <div className="sidebar-contact ">
        <div
          className="toggle-theme questionBtn"
          data-bs-toggle="offcanvas"
          data-bs-target="#theme-setting"
        >
          <i className="fa fa-chevron-left" />
        </div>
      </div>
      <div
        className="sidebar-themesettings offcanvas offcanvas-end"
        id="theme-setting"
      >
        <button
          className="btn btn-primary right-chevron-btn"
          data-bs-dismiss="offcanvas"
        >
          <i className="fa fa-chevron-right" />
        </button>
        <div className="offcanvas-header d-flex align-items-center justify-content-between bg-light-500">
          <div>
            <h4 className="mb-1">Fill In the Blanks</h4>
          </div>
          <Link
            to="#"
            className=" d-flex align-items-center justify-content-center text-white questionSearch"
          >
            <div className="nav-item nav-search-inputs">
              <div className="top-nav-search">
                <Link to="#" className="responsive-search">
                  <i className="fa fa-search" />
                </Link>
                <form action="#" className="dropdown">
                  <div className="searchinputs" id="dropdownMenuClickable">
                    <input
                      type="text"
                      placeholder="Question Content / Number"
                    />
                  </div>
                </form>
              </div>
            </div>
          </Link>
        </div>
        <div className="themesettings-inner offcanvas-body">
          <div
            className="accordion accordion-customicon1 accordions-items-seperate"
            id="settingtheme"
          >
            <div className="myfilter">
              <div className="my-3">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="difficulty" className="form-label fw-bold">
                      Difficulty
                    </label>
                    <select className="form-select" id="difficulty">
                      <option value="">Select Difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="practiceStatus"
                      className="form-label fw-bold"
                    >
                      Practice Status
                    </label>
                    <select className="form-select" id="practiceStatus">
                      <option value="all">All</option>
                      <option value="done">Done</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="questionList">
              <div className="card">
                <div className="card-body">
                  <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded mb-3">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        to="#solid-rounded-tab1"
                        data-bs-toggle="tab"
                      >
                        All
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="#solid-rounded-tab2"
                        data-bs-toggle="tab"
                      >
                        Weekly Prediction
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="#solid-rounded-tab3"
                        data-bs-toggle="tab"
                      >
                        Bookmark
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane show active"
                      id="solid-rounded-tab1"
                    >
                      <div className="tabHead d-flex justify-content-between align-items-center mb-3">
                        <h5>Done 3, Found 227 Questions</h5>
                        <button className="btn btn-danger rounded-pill">
                          <i
                            className="ion-refresh"
                            style={{ marginRight: "10px" }}
                          ></i>
                          Reset Practice Status
                        </button>
                      </div>
                      <div className="questionCard">
                        {questionData.map((item, index) => (
                          <div
                            key={index}
                            className={`card mb-3 p-3 rounded-pill d-flex justify-content-between align-items-center ${
                              activeIndex === index ? "border border-3" : ""
                            }`}
                            style={{
                              borderColor:
                                activeIndex === index ? "red" : "#ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => setActiveIndex(index)}
                          >
                            <div className="d-flex align-items-center w-100">
                              <div className="flex-grow-1">
                                <strong>
                                  {index + 1}. {item.title}
                                </strong>
                              </div>
                              <div className="d-flex gap-2 align-items-center flex-wrap">
                                {item.isNew && (
                                  <span className="btn btn-outline-danger py-1 rounded-pill">
                                    New
                                  </span>
                                )}
                                <span className="btn btn-outline-secondary py-1 rounded-pill">
                                  {item.difficulty}
                                </span>
                                {item.prediction && (
                                  <span className="btn btn-outline-info py-1 rounded-pill">
                                    Prediction
                                  </span>
                                )}
                                <span
                                  className={
                                    item.status === "Unattempted"
                                      ? "btn btn-soft-light py-1  rounded-pill"
                                      : "btn btn-outline-success py-1 rounded-pill"
                                  }
                                >
                                  {item.status}
                                  {item.attempts ? ` * ${item.attempts}` : ""}
                                </span>
                                <button className="btn btn-outline-danger btn-sm rounded-circle">
                                  <i className="fa fa-bookmark" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="tab-pane" id="solid-rounded-tab2">
                    <div className="questionCard">
                        {questionData.map((item, index) => (
                          <div
                            key={index}
                            className={`card mb-3 p-3 rounded-pill d-flex justify-content-between align-items-center ${
                              activeIndex === index ? "border border-3" : ""
                            }`}
                            style={{
                              borderColor:
                                activeIndex === index ? "red" : "#ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => setActiveIndex(index)}
                          >
                            <div className="d-flex align-items-center w-100">
                              <div className="flex-grow-1">
                                <strong>
                                  {index + 1}. {item.title}
                                </strong>
                              </div>
                              <div className="d-flex gap-2 align-items-center flex-wrap">
                                {item.isNew && (
                                  <span className="btn btn-outline-danger py-1 rounded-pill">
                                    New
                                  </span>
                                )}
                                <span className="btn btn-outline-secondary py-1 rounded-pill">
                                  {item.difficulty}
                                </span>
                                {item.prediction && (
                                  <span className="btn btn-outline-info py-1 rounded-pill">
                                    Prediction
                                  </span>
                                )}
                                <span
                                  className={
                                    item.status === "Unattempted"
                                      ? "btn btn-soft-light py-1  rounded-pill"
                                      : "btn btn-outline-success py-1 rounded-pill"
                                  }
                                >
                                  {item.status}
                                  {item.attempts ? ` * ${item.attempts}` : ""}
                                </span>
                                <button className="btn btn-outline-danger btn-sm rounded-circle">
                                  <i className="fa fa-bookmark" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="tab-pane" id="solid-rounded-tab3">
                    <div className="questionCard">
                        {questionData.map((item, index) => (
                          <div
                            key={index}
                            className={`card mb-3 p-3 rounded-pill d-flex justify-content-between align-items-center ${
                              activeIndex === index ? "border border-3" : ""
                            }`}
                            style={{
                              borderColor:
                                activeIndex === index ? "red" : "#ccc",
                              cursor: "pointer",
                            }}
                            onClick={() => setActiveIndex(index)}
                          >
                            <div className="d-flex align-items-center w-100">
                              <div className="flex-grow-1">
                                <strong>
                                  {index + 1}. {item.title}
                                </strong>
                              </div>
                              <div className="d-flex gap-2 align-items-center flex-wrap">
                                {item.isNew && (
                                  <span className="btn btn-outline-danger py-1 rounded-pill">
                                    New
                                  </span>
                                )}
                                <span className="btn btn-outline-secondary py-1 rounded-pill">
                                  {item.difficulty}
                                </span>
                                {item.prediction && (
                                  <span className="btn btn-outline-info py-1 rounded-pill">
                                    Prediction
                                  </span>
                                )}
                                <span
                                  className={
                                    item.status === "Unattempted"
                                      ? "btn btn-soft-light py-1  rounded-pill"
                                      : "btn btn-outline-success py-1 rounded-pill"
                                  }
                                >
                                  {item.status}
                                  {item.attempts ? ` * ${item.attempts}` : ""}
                                </span>
                                <button className="btn btn-outline-danger btn-sm rounded-circle">
                                  <i className="fa fa-bookmark" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card-bodys">
                    <nav aria-label="Page navigation">
                      <ul className="pagination mb-0">
                        <li className="page-item disabled">
                          <Link className="page-link" to="#">
                            <i className="fas fa-arrow-left-long me-2" />
                            Previous
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            1
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            2
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            Next
                            <i className="fas fa-arrow-right-long ms-2" />
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSettings;
