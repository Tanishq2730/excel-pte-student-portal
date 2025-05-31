import { useEffect, useState } from "react";
import MockTestCard from "../component/common/mockTestCard";
import { fetchAllTypes } from "../../../api/commonAPI";
import { fetchMocktests } from "../../../api/mocktestAPI";
import { al } from "react-router/dist/development/fog-of-war-Cm1iXIp7";

interface Subtype {
  id: number;
  sub_name: string;
  ai_score: number;
  order: number;
}

interface PracticeType {
  id: number;
  name: string;
  Subtypes: Subtype[];
}


interface Type {
  id: number;
  name: string;
  approxTime: string;
}

interface MockTest {
  id:number;
  name: string;
  time: string;
  attempted: number;
  Type: Type;
}

const FullMocktest: React.FC = () => {
  const [practiceTypes, setPracticeTypes] = useState<PracticeType[]>([]);
  const [mockTests, setMockTests] = useState<MockTest[]>([]);

  useEffect(() => {
    const loadMockTests = async () => {
      try {
        const res = await fetchAllTypes();
        const types: PracticeType[] = res.data;
        setPracticeTypes(types);

        const allType = types.find((type) => type.name.toLowerCase() === "all");
        localStorage.setItem("mockSection",'All'); 

        if (allType) {
          const mockRes = await fetchMocktests(allType.id);

          setMockTests(mockRes.data); // adjust if the data structure is nested
        }
      } catch (err) {
        console.error("Error loading mock test data:", err);
      }
    };
    loadMockTests();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container my-4">
          <div className="mainHead pb-3">
            <h3>Full Mocktest</h3>
          </div>
          <div className="row">
            {mockTests.length > 0 ? (
              mockTests.map((test, index) => (
                <div className="col-md-4" key={index}>
                  <MockTestCard
                    id={test.id}
                    name={test.name}
                    time={test.Type.approxTime}
                    attempted={test.attempted}
                    onStart={() => alert(`Starting Test ${test.name}`)}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">Mocktest not available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMocktest;
