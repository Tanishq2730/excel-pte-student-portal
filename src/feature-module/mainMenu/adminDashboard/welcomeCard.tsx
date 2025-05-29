import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewsData, ExamCountdown } from "../../../api/dashboardAPI";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";

interface ExamCountdownType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WelcomeCard = () => {
    const [date, setDate] = useState<Nullable<Date>>(null);
  const [examCountdown, setExamCountdown] = useState<ExamCountdownType>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    getExamCountdown();
  }, []);

  const getExamCountdown = async () => {
    const res = await ExamCountdown();
    if (res?.success) {
      setExamCountdown(res.data);
    }
  };

  return (
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
              <h1 className="text-white me-2">Welcome, Mr. Herald</h1>
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
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#standard-modal"
              >
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
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
                  <h4 className="modal-title" id="standard-modalLabel">
                    Select Exam Date
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <Calendar
                    className="datepickers mb-1"
                    value={date}
                    onChange={(e) => setDate(e.value)}
                    inline
                    style={{ width: "100% !important" }}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-cancel"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
