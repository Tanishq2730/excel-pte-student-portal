import React, { useEffect, useState } from "react";
import { UpcommingClasses } from "../../../api/dashboardAPI";

interface UpcomingClassesType {
  id: number;
  title: string;
  description: string;
  image: string;
}

const UpcomingClass: React.FC = () => {
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClassesType[]>(
    []
  );

  useEffect(() => {
    getUpcomingClasses();
  }, []);

  const getUpcomingClasses = async () => {
    const res = await UpcommingClasses();
    // console.log(upcomingClasses, "upcomingClasses");
    if (res?.success) {
      // console.log("Data being set to state:tanishq", res.data);
      setUpcomingClasses(res.data);
    }
  };

  return (
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
                <button className="btn btn-primary">Class Link</button>
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
                <button className="btn btn-primary">Class Link</button>
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
                <button className="btn btn-primary">Class Link</button>
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
                <button className="btn btn-primary">Class Link</button>
              </div>
            </div>
          </div>
          {/* /Event Item */}
        </div>
      </div>
    </div>
  );
};

export default UpcomingClass;
