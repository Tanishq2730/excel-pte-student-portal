import React, { useEffect, useState } from "react";
import { fetchCategoryQuiz } from "../../api/quizAPI";

interface Quiz {
  id: number;
  quiz_name: string;
  attemptedQuestions: number;
  totalQuestions: number;
}

interface QuizCategory {
  id: number;
  category_name: string;
  quiz: Quiz[];
}

interface Props {
  onStartQuiz: (quiz: Quiz) => void;
  onShowLesson: (categoryId: number) => void;
}

const AccordianQuestion: React.FC<Props> = ({ onStartQuiz, onShowLesson }) => {
  const [categoryQuizes, setCategoryQuiz] = useState<QuizCategory[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchCategoryQuiz();
      if (res?.success && res.data.length) {
        setCategoryQuiz(res.data);
      }
    };
    loadData();
  }, []);

  return (
    <div className="card-body">
      <div className="accordion accordion-solid-primary accordions-items-seperate" id="accordioninfoborderExample">
        {categoryQuizes.map((category, index) => (
          <div className="accordion-item" key={category.id}>
            <h2 className="accordion-header" id={`heading${category.id}`}>
              <button
                className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${category.id}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapse${category.id}`}
              >
                <div className="acBtn">
                  <div>{category.category_name}</div>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary py-1 mx-2"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowLesson(category.id);
                      }}
                    >
                      Lesson
                    </button>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id={`collapse${category.id}`}
              className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
              aria-labelledby={`heading${category.id}`}
              data-bs-parent="#accordioninfoborderExample"
            >
              <div className="accordion-body">
                {category.quiz.map((quiz) => (
                  <div
                    className="practiceCard"
                    key={quiz.id}
                    onClick={() => onStartQuiz(quiz)}
                  >
                    <p className="mb-0">{quiz.quiz_name}</p>
                    <div className="count">
                      <p>{quiz.attemptedQuestions} / {quiz.totalQuestions}</p>
                    </div>
                  </div>
                ))}
                {category.quiz.length === 0 && <p className="text-muted">No quizzes available.</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccordianQuestion;
