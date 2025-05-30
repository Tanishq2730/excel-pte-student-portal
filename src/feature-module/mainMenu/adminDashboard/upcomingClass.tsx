import React, { useEffect, useState } from "react";
import { UpcommingClasses } from "../../../api/dashboardAPI";

interface UpcomingClassesType {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  link: string;
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
    
    if (res?.success) {
      setUpcomingClasses(res.data);
    }
  };

  return (
    <div className="card flex-fill upcomingClasses">
      <div className="card-body ">
        <h5 className="mb-3">Upcoming Classes</h5>
        <div className="event-wrapper event-scroll">
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="border-start border-skyblue border-3 shadow-sm p-3 mb-3">
                <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <span className="avatar p-1 me-2 bg-teal-transparent flex-shrink-0">
                    <i className="ti ti-user-edit text-info fs-20" />
                  </span>
                  <div className="flex-fill">
                    <h6 className="mb-1">{classItem.title}</h6>
                    <p className="d-flex align-items-center">
                      <i className="ti ti-calendar me-1" />
                      {classItem.date}
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    <i className="ti ti-clock me-1" />
                    {classItem.time}
                  </p>
                  <div className="avatar-list-stacked avatar-group-sm">
                    <a target="_blank" href={classItem.link} className="btn btn-primary">Class Link</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No upcoming classes available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingClass;
