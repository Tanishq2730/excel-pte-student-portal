import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";

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
      <div className="card-body">
        <ul
          className="nav nav-tabs tab-style-1 d-sm-flex d-block"
          role="tablist"
        >
          <li className="nav-item">
            <Link
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#orders"
              aria-current="page"
              to="#orders"
            >
              Speaking
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#accepted"
              to="#accepted"
            >
              Writing
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#declined"
              to="#declined"
            >
              Reading
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#declined"
              to="#declined"
            >
              Listening
            </Link>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="orders" role="tabpanel">
            <div className="text-muted">
              <b>Lorem Ipsum is simply dummy text of the printing</b> and
              typesetting industry. Lorem Ipsum has been the industry&apos;s
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled.
            </div>
          </div>
          <div className="tab-pane" id="accepted" role="tabpanel">
            <div className="text-muted">
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for{" "}
              <b>&apos;lorem ipsum&apos;</b> will uncover many web sites still
              in their infancy. Various versions have evolved over the years.
            </div>
          </div>
          <div className="tab-pane" id="declined" role="tabpanel">
            <div className="text-muted">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form,
              <b>by injected humour</b>, or randomised words which don&apos;t
              look even slightly believable
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
