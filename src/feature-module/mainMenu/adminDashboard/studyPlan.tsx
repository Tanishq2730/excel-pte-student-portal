import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudyPlan: React.FC = () => {
  return (
    <div className="studyplantab">
      {/* <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded mb-3" style={{justifyContent:'space-between'}}>
          <li className="nav-item">
            <Link
              className="nav-link active one"
              to="#solid-rounded-tab1"
              data-bs-toggle="tab"
            >
              <i className="ion-mic-c"></i>
              Speaking
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link two"
              to="#solid-rounded-tab2"
              data-bs-toggle="tab"
            >
              <i className="ion-ios7-bookmarks"></i>
              Reading
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link three"
              to="#solid-rounded-tab3"
              data-bs-toggle="tab"
            >
              <i className="ion-edit"></i>
              Writing
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link four"
              to="#solid-rounded-tab4"
              data-bs-toggle="tab"
            >
              <i className="ion-headphone"></i>
              Listening
            </Link>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane show active" id="solid-rounded-tab1">
            <div className="card-body bg-gray rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon">
                    <i className="ion-mic-c one"></i>
                  </div>
                  <h3>Speaking</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-secondary rounded"
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
          <div className="tab-pane" id="solid-rounded-tab2">
            <div className="card-body bg-gray rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon">
                    <i className="ion-mic-c two"></i>
                  </div>
                  <h3>Reading</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-secondary rounded"
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
          <div className="tab-pane" id="solid-rounded-tab3">
            <div className="card-body bg-gray rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon">
                    <i className="ion-mic-c three"></i>
                  </div>
                  <h3>Writing</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-secondary rounded"
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
          <div className="tab-pane" id="solid-rounded-tab4">
            <div className="card-body bg-gray rounded-3">
              <div className="studycontent">
                <div className="head">
                  <div className="icon">
                    <i className="ion-mic-c four"></i>
                  </div>
                  <h3>Listening</h3>
                </div>
                <div className="bar">
                  <div className="bardetail">
                    <h5>Repeat Sentence</h5>
                    <span>0/23</span>
                  </div>
                  <div className="progress progress-xs flex-grow-1">
                    <div
                      className="progress-bar bg-secondary rounded"
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
      </div> */}
      <div className="card-body px-sm-4 px-2">
        <ul
          className="nav nav-tabs justify-content-center mb-5 tab-style-3"
          id="myTab2"
          role="tablist"
        >
          <li className="nav-item me-0" role="presentation">
            <button
              className="nav-link active home py-1"
              id="home-tab-1"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane" 
              aria-selected="true"
            >
              Speaking
            </button>
          </li>
          <li className="nav-item me-0" role="presentation">
            <button
              className="nav-link about py-1"
              id="profile-tab-2"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              Writing
            </button>
          </li>
          <li className="nav-item me-0" role="presentation">
            <button
              className="nav-link services py-1"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
            >
              Reading
            </button>
          </li>
          <li className="nav-item me-0" role="presentation">
            <button
              className="nav-link services py-1"
              id="last-tab"
              data-bs-toggle="tab"
              data-bs-target="#last-tab-pane"
              type="button"
              role="tab"
              aria-controls="last-tab-pane"
              aria-selected="false"
            >
              Listening
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent1">
          <div
            className="tab-pane fade show active text-muted"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab-1"
            tabIndex={0}
          >
            <b>Lorem Ipsum is simply dummy text of the printing</b> and
            typesetting industry. Lorem Ipsum has been the industry&apos;s.
          </div>
          <div
            className="tab-pane fade text-muted"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab-2"
            tabIndex={0}
          >
            Many desktop publishing packages as their default model text, and a
            search for <b>&apos;lorem ipsum&apos;</b> will over the years.
          </div>
          <div
            className="tab-pane fade text-muted"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
            tabIndex={0}
          >
            There, <b>by injected humour</b>, or randomised words which
            don&apos;t look even slightly believable.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
