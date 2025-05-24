import React from "react";
import { Progress, Card, Row, Col, Divider } from 'antd';

interface dataProps {
  data: any;
}

const Writing: React.FC<dataProps> = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center p-5">
        <div className="text-muted">
          <i className="fas fa-file-alt fa-3x mb-3"></i>
          <p className="h5">No writing data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {data.map((writingData: any, index: number) => {
        let scores: Record<string, number> = {};

        try {
          scores = JSON.parse(writingData.score_data);
        } catch (e) {
          console.error("Invalid score_data format", e);
        }
        scores = {
          content: scores.content ?? 0,
          form: scores.form ?? 0,
          grammar: scores.grammar ?? scores.grammer ?? 0,
          spelling: scores.spelling ?? 0,
          vocabulary: scores.vocabulary ?? 0,
          wordCount: scores.wordCount ?? 0,
        };

        const totalScore = writingData.score;
        const maxScore = writingData.total_score;
        const scorePercentage = (totalScore / maxScore) * 100;

        return (
          <div key={writingData.id} className="card mb-4 shadow-lg rounded-lg overflow-hidden">
            <div className="card-header bg-primary bg-gradient text-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h4 mb-0 text-white">
                  Question {writingData.id}:{" "}
                  {writingData.mocktest_row?.Question?.question_name || "No Question"}
                </h2>
                <span className="badge bg-light text-primary">
                  {writingData.subtype?.sub_name || "No Subtype"}
                </span>
              </div>
            </div>

            <div className="card-body">
              <div className="answer-section bg-light p-4 rounded-3 mb-4">
                <h5 className="text-primary mb-3">Your Answer</h5>
                <p className="card-text" style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
                  {writingData.answer}
                </p>
              </div>

              <div className="scores-section">
                <Card className="border-0 shadow-sm">
                  <div className="text-center mb-4">
                    <h5 className="text-primary mb-3">Overall Score</h5>
                    <Progress
                      type="circle"
                      percent={scorePercentage}
                      format={() => `${totalScore}/${maxScore}`}
                      size={120}
                      strokeWidth={8}
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                    />
                  </div>
                  
                  <Divider>Detailed Breakdown</Divider>
                  
                  <Row gutter={[24, 24]} className="mt-4">
                    {Object.entries(scores).map(([key, value]) => {
                      if (key === 'wordCount') return null;
                      
                      const scoreColor = value >= 1.5 ? '#87d068' : value >= 1 ? '#108ee9' : '#ff4d4f';
                      
                      return (
                        <div className="col-md m-2">
                          <Card 
                            className="score-card text-center h-100" 
                            bordered={false}
                            style={{ backgroundColor: '#f8f9fa' }}
                          >
                            <h6 className="text-capitalize mb-3">{key}</h6>
                            <Progress
                              type="dashboard"
                              percent={Math.round((value / 2) * 100)}
                              format={() => (
                                <div>
                                  <div style={{ fontSize: '20px', color: scoreColor }}>{value}</div>
                                  <div style={{ fontSize: '12px', color: '#666' }}>/2</div>
                                </div>
                              )}
                              size={90}
                              strokeColor={scoreColor}
                            />
                          </Card>
                        </div>
                      );
                    })}
                  </Row>

                  <div className="mt-4 p-3 bg-light rounded-3">
                    <Row justify="space-between" align="middle">
                      <Col>
                        <div className="d-flex align-items-center">
                          <i className="fas fa-pencil-alt me-2 text-primary"></i>
                          <span className="text-muted">Word Count:</span>
                          <span className="ms-2 fw-bold">{scores.wordCount}</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </div>

              <div className="remark-section mt-4">
                <div className="card border-primary">
                  <div className="card-header bg-primary bg-opacity-10">
                    <h5 className="mb-0 text-primary">Feedback & Remarks</h5>
                  </div>
                  <div className="card-body">
                    <p className="mb-0">
                      It is a long established fact that a reader will be distracted
                      by the readable content of a page when looking at its layout.
                      The point of using Lorem Ipsum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Writing;
