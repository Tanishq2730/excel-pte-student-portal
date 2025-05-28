import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const SpeechListenCard: React.FC = () => {
  const routes = all_routes;
  
  return (
    <div className="row">
      <div className="col-xxl-6 col-xl-6 col-md-12 d-flex">
        <Link
          to="#"
          className="d-block bg-success-transparent ronded p-3 text-center mb-3 class-hover w-100"
        >
          <div
            className="avatar avatar-lg border p-1 border-success rounded-circle mb-2"
            title="Click the Mic Button to Speak"
          >
            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-success rounded-circle">
              <i className="ion-mic-c"></i>
            </span>
          </div>
          <p className="text-dark mb-2">Speech Test</p>
          <button className="btn btn-soft-success rounded-pill mt-2 w-100">
            Refresh
          </button>
        </Link>
      </div>

      <div className="col-xxl-6 col-xl-6 col-md-12 d-flex">
        <Link
          to={routes.feesGroup}
          className="d-block bg-secondary-transparent ronded p-3 text-center mb-3 class-hover w-100"
        >
          <div
            className="avatar avatar-lg border p-1 border-secondary rounded-circle mb-2"
            title="Click the Headphone Button to Listen"
          >
            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-secondary rounded-circle">
              <i className="ion-headphone" />
            </span>
          </div>
          <p className="text-dark mb-2">Listening Test</p>
          <button className="btn btn-soft-secondary rounded-pill mt-2 w-100">
            Click to listen
          </button>
        </Link>
      </div>
      {/* <div className="col-xxl-4 col-xl-6 col-md-12 d-flex">
        <Link
          to={routes.classHomeWork}
          className="d-block bg-danger-transparent ronded p-3 w-100 text-center mb-3 class-hover"
        >
          <div
            className="avatar avatar-lg border p-1 border-danger rounded-circle mb-2"
            title="To identify and develop your reading skills we've put together some information."
          >
            <span className="d-inline-flex align-items-center justify-content-center w-100 h-100 bg-danger rounded-circle">
              <i className="ion-edit" />
            </span>
          </div>
          <p className="text-dark mb-2">Grammar</p>

          <button className="btn btn-soft-danger rounded-pill mt-2 w-100">
            Click here to Learn
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default SpeechListenCard;
