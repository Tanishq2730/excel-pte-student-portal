import { all_routes } from "../../../feature-module/router/all_routes";

const MockHeader = () => {
  const routes = all_routes;

  return (
    <>
      <div className="mockHeader">
        <div className="navbar">
          <h5>Excel PTE Mock Test - Full Mock Test 40</h5>
          <div className="timer">
            <div className="time">
              <i className="ion-clock"></i> 00:00
            </div>
            <div className="qusetionCount">
               / <span>2 of 27</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MockHeader;
