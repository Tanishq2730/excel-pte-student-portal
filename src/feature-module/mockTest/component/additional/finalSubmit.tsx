import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Type definitions for props and state
interface FinalSubmitProps {
  // No props for this component
}

const FinalSubmit: React.FC<FinalSubmitProps> = () => {
  const { id, session_id } = useParams<{ id: string; session_id: string }>();
  const navigate = useNavigate();

  const [seereults, setSeeResults] = useState<boolean>(true); // Static value set to true
  const [mockName, setMockName] = useState<string>("");

  const logout = (): void => {
    window.location.href = "https://excelpte.com/admin/logout";
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      logout();
    }
  }, []);

  // Static logic for setting mockName
  useEffect(() => {
    const allMockTests = localStorage.getItem("allMockTests");
    if (allMockTests) {
      const mockTests = JSON.parse(allMockTests);
      const mock = mockTests.find((v: { id: string }) => v.id === id);
      if (mock) {
        setMockName(mock.mock_name);
      }
    }
  }, [id]);

  const gotoResults = (): void => {
    if (seereults) {
      navigate(`/mocktest/result/${id}/${session_id}`);
    } else {
      alert("Something went wrong. Please try again");
    }
  };

  return (
    <div>
      <nav className="question-nav">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="mock-title">
                Excel PTE Mock Test {mockName && <span>{mockName}</span>}
              </h1>
            </div>
          </div>
        </div>
      </nav>
      <div className="container text-center mt-25px">
        <br />
        {seereults ? (
          <div>
            <h2 className="font-weight-bold">Submitted Successfully</h2>
            <br />
            <p className="font-weight-bold">Your Mock Test is completed.</p>
            <br />
            <button onClick={gotoResults} className="btn-theme-v3" id="FinalSubmit">
              Finish
            </button>
          </div>
        ) : (
          <div>
            <h2 className="font-weight-bold">Submitting answers...</h2>
            <br />
            <p className="font-weight-bold">Your Mock Test is completed.</p>
            <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalSubmit;
