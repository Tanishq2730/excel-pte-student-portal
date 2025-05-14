import React, { useState, useEffect } from "react";
import { fetchQuestions, saveBookmark } from "../../../api/practiceAPI";
import PageHeading from "../../../feature-module/practice/component/pageHeading";
import { Link } from "react-router-dom";

interface Subtype {
  id: number;
  sub_name: string;
}

interface PracticeType {
  id: number;
  question_name: string;
  new_question: boolean;
  practiced: boolean;
  difficulties: string;
  weekly: boolean;
  Subtype: Subtype[];
  bookmarked: boolean;
}

const ThemeSettings = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [questionData, setQuestionData] = useState<PracticeType[]>([]);
  const [difficulty, setDifficulty] = useState<string>("");
  const [practiceStatus, setPracticeStatus] = useState<string>("all");
  const [tab, setTab] = useState<"all" | "weekly" | "bookmarked">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const itemsPerPage = 10;

  const subtypeId = localStorage.getItem("subtypeId");
  const subtypeIdNumber = subtypeId ? parseInt(subtypeId) : null;

  useEffect(() => {
    const getTypes = async () => {
      try {
        if (subtypeIdNumber != null) {
          const res = await fetchQuestions(subtypeIdNumber, {
            difficulties: "medium",
            bookmarked: true,
            search: "what",
            weekly: true,
          });
          setQuestionData(res.data);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    getTypes();
  }, [subtypeIdNumber]);

  useEffect(() => {
    if (questionData.length > 0) {
      setTab("all");
    }
  }, [questionData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [difficulty, practiceStatus, searchTerm, tab]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("offcanvas-open");
      const backdrop = document.createElement("div");
      backdrop.className = "offcanvas-backdrop fade show";
      backdrop.id = "custom-backdrop";
      document.body.appendChild(backdrop);
    } else {
      document.body.classList.remove("offcanvas-open");
      const backdrop = document.getElementById("custom-backdrop");
      if (backdrop) backdrop.remove();
    }

    return () => {
      document.body.classList.remove("offcanvas-open");
      const backdrop = document.getElementById("custom-backdrop");
      if (backdrop) backdrop.remove();
    };
  }, [sidebarOpen]);

  const filterQuestions = () => {
    return questionData.filter((q) => {
      if (tab === "weekly" && !q.weekly) return false;
      if (tab === "bookmarked") return q.bookmarked;

      if (difficulty && q.difficulties !== difficulty) return false;
      if (practiceStatus === "done" && !q.practiced) return false;
      if (practiceStatus === "pending" && q.practiced) return false;

      if (
        searchTerm &&
        !q.question_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;

      return true;
    });
  };

  const filteredQuestions = filterQuestions();
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleBookmarkToggle = async (questionId: number) => {
    try {
      await saveBookmark({ question_id: questionId });
      const updatedQuestions = questionData.map((q) =>
        q.id === questionId ? { ...q, bookmarked: !q.bookmarked } : q
      );
      setQuestionData(updatedQuestions);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <>
      <div className="sidebar-contact">
        <div
          className="toggle-theme questionBtn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <i className="fa fa-chevron-left" />
        </div>
      </div>

      <div
        className={`sidebar-themesettings offcanvas offcanvas-end ${
          sidebarOpen ? "show" : ""
        }`}
        id="theme-setting"
        style={{ visibility: sidebarOpen ? "visible" : "hidden" }}
      >
        <button
          className="btn btn-primary right-chevron-btn"
          onClick={() => setSidebarOpen(false)}
        >
          <i className="fa fa-chevron-right" />
        </button>

        <div className="offcanvas-header d-flex align-items-center justify-content-between bg-light-500">
          <PageHeading title="Read Aloud" />
          <div className="d-flex align-items-center">
            <h4 className="mb-1">{questionData[0]?.Subtype[0]?.sub_name}</h4>
            <div className="mainFilter">
              <div className="myfilter" style={{ width: "40em" }}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <select
                      id="difficulty"
                      className="form-select"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option value="">Difficulty</option>
                      {/* <option value="">All</option> */}
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    
                    <select
                      id="practiceStatus"
                      className="form-select"
                      value={practiceStatus}
                      onChange={(e) => setPracticeStatus(e.target.value)}
                    >
                      <option value="all">Practice Status</option>
                      {/* <option value="all">All</option> */}
                      <option value="done">Done</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="top-nav-search">
            <div className="searchinputs">
              <input
                type="text"
                className="questionSearch"
                placeholder="Question Content / Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="themesettings-inner offcanvas-body">
          <div className="accordion" id="settingtheme">
            <div className="questionList">
              <div className="card" style={{ marginLeft: "2em" }}>
                <div className="pendingQuestion">
                  <p>
                    <b>Continue From</b> | 1001635 : Parent Teacher Conferences{" "}
                    <Link to="#">
                      <span>Click to Continue to previous practice List</span>
                    </Link>
                  </p>
                </div>
                <div className="card-body">
                  <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded mb-3">
                    {["all", "weekly", "bookmarked"].map((t) => (
                      <li className="nav-item" key={t}>
                        <button
                          className={`nav-link ${tab === t ? "active" : ""}`}
                          onClick={() => setTab(t as any)}
                        >
                          {t === "all"
                            ? "All"
                            : t === "weekly"
                            ? "Weekly Prediction"
                            : "Bookmark"}
                        </button>
                      </li>
                    ))}
                    <div className="col-md-2">
                    <select
                      id="practiceStatus"
                      className="form-select"
                      value={practiceStatus}
                      onChange={(e) => setPracticeStatus(e.target.value)}
                    >
                      <option value="all">Type</option>
                      <option value="all">Bar</option>
                      <option value="done">Line</option>
                      <option value="pending">Pie</option>
                      <option value="pending">Flow</option>
                      <option value="pending">Table</option>
                      <option value="pending">Map</option>
                      <option value="pending">Pic</option>
                      <option value="pending">Comb</option>
                    </select>
                  </div>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane show active">
                      <div className="tabHead d-flex justify-content-between align-items-center mb-3">
                        <h5>
                          Done {questionData.filter((q) => q.practiced).length},
                          Found {filterQuestions().length} Questions
                        </h5>
                        <button className="btn btn-danger rounded-pill">
                          <i className="ion-refresh me-2" />
                          Reset Practice Status
                        </button>
                      </div>

                      <div className="questionCard">
                        {paginatedQuestions.map((item, index) => (
                          <div
                            key={item.id}
                            className={`card mb-3 p-3 d-flex justify-content-between onhovercard align-items-center ${
                              activeIndex === index ? "border border-1" : ""
                            }`}
                            style={{
                              borderColor:
                                activeIndex === index ? "#000" : "#ccc",
                              cursor: "pointer",
                              borderRadius: "15px",
                            }}
                            onClick={() => setActiveIndex(index)}
                          >
                            <div className="d-flex align-items-center w-100">
                              <div className="flex-grow-1">
                                <strong>
                                  {index + 1}. {item.question_name}
                                </strong>
                              </div>
                              <div className="d-flex gap-2 align-items-center flex-wrap">
                                {item.new_question && (
                                  <span
                                    className="btn btn-group py-1"
                                    style={{
                                      background: "#ff838333",
                                      color: "#000",
                                    }}
                                  >
                                    New
                                  </span>
                                )}
                                <span
                                  className="btn btn-group py-1"
                                  style={{
                                    background: "#ffbb8a47",
                                    color: "#000",
                                  }}
                                >
                                  {item.difficulties}
                                </span>
                                {item.weekly && (
                                  <span
                                    className="btn btn-group py-1"
                                    style={{
                                      background: "#8ad9ff4d",
                                      color: "#000",
                                    }}
                                  >
                                    Prediction
                                  </span>
                                )}
                                <span
                                  className="btn btn-group py-1"
                                  style={{
                                    backgroundColor: item.practiced
                                      ? "#6bff9133"
                                      : "#6bff9133",
                                    color: item.practiced ? "#0f5132" : "#000",
                                  }}
                                >
                                  {item.practiced ? "Practiced" : "Unattempted"}
                                </span>

                                <button
                                  className="btn btn-sm rounded-circle text-dark"
                                  style={{
                                    backgroundColor: item.bookmarked
                                      ? "#f8d7da"
                                      : "transparent",
                                    border: "1px solid",
                                    borderColor: "#dc3545",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleBookmarkToggle(item.id);
                                  }}
                                  title={
                                    item.bookmarked
                                      ? "Remove Bookmark"
                                      : "Add Bookmark"
                                  }
                                >
                                  <i
                                    className={`fa fa-bookmark`}
                                    style={{ color: "#dc3545" }}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <nav className="mt-3" aria-label="Page navigation">
                    <ul className="pagination mb-0">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                        >
                          <i className="fas fa-arrow-left-long me-2" />
                          Previous
                        </button>
                      </li>

                      {Array.from({
                        length: Math.ceil(
                          filteredQuestions.length / itemsPerPage
                        ),
                      }).map((_, i) => (
                        <li
                          key={i + 1}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${
                          currentPage ===
                          Math.ceil(filteredQuestions.length / itemsPerPage)
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(
                                prev + 1,
                                Math.ceil(
                                  filteredQuestions.length / itemsPerPage
                                )
                              )
                            )
                          }
                        >
                          Next
                          <i className="fas fa-arrow-right-long ms-2" />
                        </button>
                      </li>
                    </ul>
                  </nav>
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
