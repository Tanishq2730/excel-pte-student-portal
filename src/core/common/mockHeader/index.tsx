import { all_routes } from "../../../feature-module/router/all_routes";

const MockHeader = () => {
  const routes = all_routes;

  return (
    <>
      <div className="mockHeader">
        <div className="navbar">
          <h5>Excel PTE Mock Test - Full Mock Test 40</h5>
        </div>
      </div>
    </>
  );
};

export default MockHeader;
