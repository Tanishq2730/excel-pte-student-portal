import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SummarizeWritingTextScoring from "../../../practice/component/scoring/SummarizeWritingTextScoring";

interface getProps {
  questionData: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => void) => void;
}

const SummarizeWritinText: React.FC<getProps> = ({
  questionData,
  setAnswer,
  registerSubmit,
}) => {
  const { id, session_id } = useParams<{ id: string; session_id: any }>();
  const [selectedLanguage, setSelectedLanguage] = useState("American");
  const [wordCount, setWordCount] = useState(0);
  const [summaryText, setSummaryText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSummaryText(text);
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  };

  useEffect(() => {
    setSummaryText(""); // Reset selection on question change
  }, [questionData]);

  useEffect(() => {
    registerSubmit(handleSubmit); // Register new submit function on change
  }, [questionData, summaryText]);

  const handleSubmit = async () => {
    console.log(questionData, "question");
    if (!summaryText) {
      return false;
    }

    const question_id = questionData.id;
    const question = questionData.question;
    const answerText = summaryText;
    const wordCounts = wordCount;
    const scoringData = {
      question_id,
      session_id,
      question,
      answerText,
      wordCount,
    };

    const result = await SummarizeWritingTextScoring(
      scoringData,
      questionData,
      selectedLanguage
    );
    console.log(result);

    if (result) {
      const { score, totalscore, user_answer, score_data } = result;

      // Now you can safely use score, totalScore, userAnswerText, scoredText
      const payload = {
        questionId: questionData.id,
        mocktest_id: id,
        sessionId: session_id,
        totalscore: totalscore, // You can adjust this if you calculate it
        lateSpeak: 1,
        score: score,
        score_data: JSON.stringify(score_data),
        answer: user_answer,
      };
      return payload;
    }
    return false;
  };

  return (
    <div className="container mt-3">
      <p className="mockHead">
        Read the passage below and summarize it using one sentence. Type your
        response in the box at the bottom of the screen. You have 10 minutes to
        finish this task. Your response will be judged on the quality of your
        writing and on how well your response presents the key points in the
        passage.
      </p>
      <div className="card p-3">
        <div
          dangerouslySetInnerHTML={{
            __html: questionData.question,
          }}
        />
      </div>
      <h5>Total Word Count: {wordCount}</h5>
      <div className="card p-3 mt-3">
        <textarea
          className="form-control"
          rows={16}
          placeholder="Write a Summary..."
          value={summaryText}
          onChange={handleTextChange}
        ></textarea>
      </div>
    </div>
  );
};

export default SummarizeWritinText;
