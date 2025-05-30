import React, { useEffect, useState, useRef } from "react";
import { ExamCountdown, SetExamCountdown } from "../../../api/dashboardAPI";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";

interface ExamCountdownType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

declare global {
  interface Window {
    bootstrap: any;
  }
}

const WelcomeCard = () => {
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [examCountdown, setExamCountdown] = useState<ExamCountdownType>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [examDate, setExamDate] = useState<string | null>(null); // Store exam date string for interval

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch the initial exam countdown date
    getExamCountdown();
  }, []);

  useEffect(() => {
    // Set interval to update countdown every second if examDate exists
    if (!examDate) return;

    const intervalId = setInterval(() => {
      updateCountdownFromDate(examDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [examDate]);

  const getExamCountdown = async () => {
    const res = await ExamCountdown();
    if (res?.success) {
      setDate(new Date(res.data.date)); // Set date picker date
      setExamDate(res.data.date);       // Set exam date string for interval updates
      updateCountdownFromDate(res.data.date);
    }
  };

  const updateCountdownFromDate = (dateStr: string) => {
    const examDateObj = new Date(dateStr);
    const now = new Date();
    const diff = examDateObj.getTime() - now.getTime();

    if (diff <= 0) {
      setExamCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    setExamCountdown({ days, hours, minutes, seconds });
  };

  // Format date to YYYY-MM-DD
  const formatDate = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const updateExamCountdown = async () => {
    if (!date) return alert("Please select a date first.");

    const payload = { date: formatDate(date) };
    const res = await SetExamCountdown(payload);

    if (res?.success) {
      setDate(new Date(res.data.date));
      setExamDate(res.data.date); // Update examDate to reset interval countdown

      // Close modal programmatically using Bootstrap API
      const modalEl = document.getElementById("standard-modal");
      if (modalEl && window.bootstrap) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
      }
    } else {
      alert("Failed to update countdown.");
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
                {["days", "hours", "minutes", "seconds"].map((unit) => (
                  <div className="countdown" key={unit}>
                    <div className="h5 fw-semibold text-white">{examCountdown[unit as keyof ExamCountdownType]}</div>
                    <div className="small text-white">{unit.charAt(0).toUpperCase() + unit.slice(1)}</div>
                  </div>
                ))}
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
            ref={modalRef}
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={updateExamCountdown}
                  >
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
