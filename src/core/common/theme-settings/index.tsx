import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../data/redux/store";
import { fetchQuestions, saveBookmark } from "../../../api/practiceAPI";

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
  const itemsPerPage = 10; // Customize as needed

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

  const filterQuestions = () => {
    return questionData.filter((q) => {
      if (tab === "weekly" && !q.weekly) return false;
      if (tab === "bookmarked") return true;

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
      const res = await saveBookmark({ question_id: questionId });
      // Optional: refetch questions if status changes on backend
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
          <div className="d-flex align-items-center">
            <h4 className="mb-1">{questionData[0]?.Subtype[0]?.sub_name}</h4>
            <div className="mainFilter">
              <div className="myfilter  mb-3" style={{ width: "40em" }}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="difficulty" className="form-label fw-bold">
                      Difficulty
                    </label>
                    <select
                      id="difficulty"
                      className="form-select"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option value="">All</option>
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
                    <select
                      id="practiceStatus"
                      className="form-select"
                      value={practiceStatus}
                      onChange={(e) => setPracticeStatus(e.target.value)}
                    >
                      <option value="all">All</option>
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
                        {filterQuestions().map((item, index) => (
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
                                    className={`fa ${
                                      item.bookmarked
                                        ? "fa fa-bookmark"
                                        : "fa fa-bookmark"
                                    }`}
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
