import React, { useEffect, useState } from "react";
import { fetchReviews } from "../../api/quizAPI";

interface ReviewProps {
  quizId: number;
}

interface ReviewData {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  userSelected: string;
}

const ReviewCard: React.FC<ReviewProps> = ({ quizId }) => {
  const [answers, setAnswers] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async (quizId: number) => {
      setLoading(true);
      const res = await fetchReviews(quizId);
      if (res?.success && Array.isArray(res.data)) {
        setAnswers(res.data);
      }
      setLoading(false);
    };
    loadData(quizId);
  }, [quizId]);

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="p-3 bg-light rounded">
      {answers.length === 0 && <div>No review data available.</div>}
      {answers.map((ans, i) => {
        const isCorrect = ans.userSelected === ans.correctAnswer;

        return (
          <div key={ans.id} className="mb-4 p-4 bg-white rounded shadow-sm border">
            <h5 className="mb-3">Q{i + 1}. {ans.question}</h5>

            <div>
              {ans.options.map((option, idx) => {
                const selected = option === ans.userSelected;
                const correct = option == ans.correctAnswer;
                const wrongSelection = selected && !correct;
console.log(selected,'selected');
console.log(correct,'correct');
console.log(option,'option');
console.log(ans.userSelected,'userSelected');
console.log(ans.correctAnswer,'correctAnswer');

                return (
                  <div key={idx} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      disabled
                      checked={selected}
                    />
                    <label
                      className={`form-check-label ${
                        wrongSelection
                          ? "text-danger fw-bold"
                          : selected && correct
                          ? "text-success fw-bold"
                          : ""
                      }`}
                    >
                      {option}
                      {wrongSelection && <span className="ms-2">❌</span>}
                      {selected && correct && <span className="ms-2">✅</span>}
                    </label>
                  </div>
                );
              })}
            </div>

            {!isCorrect && (
              <p className="mt-3">
                <strong>Correct Answer:</strong>{" "}
                <span className="text-success">{ans.correctAnswer}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewCard;
