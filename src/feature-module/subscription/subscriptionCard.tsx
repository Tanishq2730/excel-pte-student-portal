import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { fetchPlans } from "../../api/subscriptionAPI";

interface PlanRow {
  id: number;
  planId: number;
  details: string;
}

interface Plan {
  id: number;
  name: string;
  price: number;
  duration_type: string;
  offer: number;
  free_trial: boolean;
  image_url: string | null;
  PlanRows: PlanRow[];
}

interface Props {
  courseTypeId: number;
}

const SubscriptionCard: React.FC<Props> = ({ courseTypeId }) => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetchPlans(courseTypeId);
      if (res.success && res.data?.length > 0) {
        setPlans(res.data);
      }
    }
    fetchData();
  }, [courseTypeId]);

  const formatPrice = (price: number) =>
    `USD ${price.toFixed(2)}${price > 0 ? " /month" : ""}`;

  return (
  <div className="row">
    {plans.length > 0 ? (
      plans.map((plan) => (
        <div className="col-lg-4 col-md-6 d-flex" key={plan.id}>
          <div className="card flex-fill">
            <div className="card-body">
              <div className="border-bottom mb-3">
                {plan.free_trial && (
                  <span className="badge badge-soft-warning mb-3">Free Trial</span>
                )}
                <h3 className="mb-3">{plan.name}</h3>
              </div>
              <div>
                <div className="bg-light-300 p-3 rounded-1 text-center mb-3">
                  <h2>
                    {formatPrice(plan.price)}
                    {plan.offer > 0 && (
                      <span className="text-success fs-14 fw-normal">
                        {" "}
                        ({plan.offer}% Off)
                      </span>
                    )}
                  </h2>
                </div>
                <ul className="list-unstyled gap-3">
                  {plan.PlanRows.map((row) => (
                    <li className="mb-3" key={row.id}>
                      <div className="d-flex align-items-center">
                        <span className="flex-shrink-0 text-success me-2">
                          <i className="ti ti-circle-check-filled fs-15 align-middle" />
                        </span>
                        <div className="flex-grow-1">{row.details}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link to="#" className="btn btn-primary w-100">
                  {plan.free_trial ? "Start Your Free Trial" : "Subscribe Now"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-12">
        <div className="alert alert-warning text-center">
          No Plans Available
        </div>
      </div>
    )}
  </div>
);

};

export default SubscriptionCard;
