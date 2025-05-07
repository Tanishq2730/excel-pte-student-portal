import React, { useState } from "react";

interface Question {
  button_type: string;
  button_type_name: string;
  [key: string]: any;
}

interface MockQuestions {
  speaking: Question[];
  writing: Question[];
  reading: Question[];
  listening: Question[];
}

interface ReadingIntroProps {
  queno?: number;
  mockquestions?: MockQuestions;
  setSectionPart?: (component: React.ReactNode) => void;
  continuest?: boolean;
}

const ReadingIntro: React.FC<ReadingIntroProps> = ({
  queno = 0,
  mockquestions = { reading: [], writing: [], speaking: [], listening: [] },
  setSectionPart = () => {},
  continuest = false,
}) => {
  const [time] = useState<number>(120);

  return (
    <div>
      <div className="container mt-5">
        <p className="font-weight-bold">
          You are about to begin part 2 of the exam: Reading
        </p>
        <p className="font-weight-bold">Time allowed: 29-30 minutes</p>
      </div>
      <div className="footer-v3">
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col text-right">
              <button className="btn btn-primary mockmainbtn">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingIntro;
