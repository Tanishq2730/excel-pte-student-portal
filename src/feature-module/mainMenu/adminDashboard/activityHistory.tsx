import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { RecentActivity } from "../../../api/dashboardAPI";

interface RecentActivityType {
  id: number;
  title: string;
  description: string;
  image: string;
  badge: string;
  created_at: string;
}

const ActivityHistory: React.FC = () => {
  const [recentActivity, setRecentActivity] = useState<RecentActivityType[]>([]);

  useEffect(() => {
    getRecentActivity();
  }, []);

  const getRecentActivity = async () => {
    const res = await RecentActivity();
    // console.log(res,"recentActivity");
    if (res?.success) {
      // console.log("Data being set to state:", res.data);
      setRecentActivity(res.data);
    }
  };

    return (
    <div className="card flex-fill">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h4 className="card-titile">Activity History</h4>
      </div>
      <div
        className="card-body py-1 "
        style={{ height: "21.4em", overflowY: "scroll" }}
      >
        <ul className="list-group list-group-flush">
          {recentActivity.map((activity, index) => (
            <li key={activity.id} className="list-group-item py-3 px-0 pb-0">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center overflow-hidden mb-3">
                  <Link to="#" className="avatar activity-avatar avatar-xl flex-shrink-0 me-2">
                    <i className="ion-person"></i>
                  </Link>
                  <div className="overflow-hidden">
                    <p className="d-flex align-items-center text-info mb-1">
                      {activity.badge}
                    </p>
                    <h6 className="text-truncate mb-1">
                      {activity.title}
                    </h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <p>{activity.created_at || "No description"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityHistory;
