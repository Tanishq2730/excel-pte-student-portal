import React, { useEffect, useState } from "react";
import MockTestCard from "../component/common/mockTestCard";
import { fetchAllTypes } from "../../../api/commonAPI";
import { fetchMocktests } from "../../../api/mocktestAPI";

interface Type {
  id: number;
  name: string;
  approxTime: string;
}

interface MockTest {
  id: number;
  name: string;
  time: string;
  attempted: number;
  Type: Type;
}

const SectionalMocktest: React.FC = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [mockTestsByType, setMockTestsByType] = useState<{ [key: number]: MockTest[] }>({});
  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const typeRes = await fetchAllTypes();
        const typeList: Type[] = typeRes.data;
        setTypes(typeList);

        const mockTestsMap: { [key: number]: MockTest[] } = {};

        for (const type of typeList) {
          const mockRes = await fetchMocktests(type.id);
          mockTestsMap[type.id] = mockRes.data;
        }

        setMockTestsByType(mockTestsMap);
        if (typeList.length > 0) setActiveTab(typeList[0].id); // set first type as active tab
      } catch (err) {
        console.error("Error loading sectional mock tests:", err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container my-4">
          <div className="mainHead pb-3">
            <h3>Sectional Mocktest</h3>
          </div>
          <div className="card-body">
            <ul className="nav nav-pills justify-content-start nav-style-2 mb-3" role="tablist">
              {types.map((type) => (
                <li className="nav-item" key={type.id}>
                  <button
                    className={`nav-link ${activeTab === type.id ? "active" : ""}`}
                    onClick={() => setActiveTab(type.id)}
                  >
                    {type.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="tab-content">
              {types.map((type) => (
                <div
                  key={type.id}
                  className={`tab-pane text-muted ${activeTab === type.id ? "show active" : ""}`}
                  role="tabpanel"
                >
                  <div className="row">
                    {mockTestsByType[type.id]?.length ? (
                      mockTestsByType[type.id].map((test, index) => (
                        <div className="col-md-3" key={test.id || index}>
                          <MockTestCard
                            id={test.id}
                            name={test.name}
                            time={test.Type?.approxTime || test.time}
                            attempted={test.attempted}
                            onStart={() => alert(`Starting Test ${test.name}`)}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center">
                        <p className="text-muted">No mock tests available</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionalMocktest;
