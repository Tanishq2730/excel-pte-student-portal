import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";

const ComparisonTool: React.FC = () => {
  return (
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
  );
};

export default ComparisonTool;
