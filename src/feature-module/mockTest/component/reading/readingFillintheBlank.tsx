import React, { useState, useEffect,useMemo } from "react";
import parse, { DOMNode, Element } from "html-react-parser";
import { useParams } from "react-router-dom";

interface getProps {
  question: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => any) => void;
}
const ReadingFillintheBlank: React.FC<getProps> = ({
  question,
  setAnswer,
  registerSubmit,
}) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { id, session_id } = useParams<{ id: string; session_id: any }>();

  const handleSubmit = () => {
    const userAnswerArray = Object.values(answers);
    const correctAnswerArray = correctAnswers;
    let user_answer = userAnswerArray.join(",").trim();
    let score = 0;
    const resultDetails = [];

    for (let i = 0; i < correctAnswerArray.length; i++) {
      const userAns = userAnswerArray[i]?.trim() || "";
      const correctAns = correctAnswerArray[i]?.trim();

      const isCorrect = userAns === correctAns;

      resultDetails.push({
        userAnswer: userAns,
        correctAnswer: correctAns,
        isCorrect,
      });

      score += isCorrect ? 1 : 0;
    }

    const payload = {
      questionId: question.id,
      totalscore: correctAnswerArray.length,
      mocktest_id: id,
      sessionId: session_id,
      score,
      answer: user_answer,
      score_data: JSON.stringify({
        user_question: question.question,
        user_answer: user_answer,
        answer: correctAnswers,
      }),
    };

    return payload;
  };

  useEffect(() => {
    registerSubmit(handleSubmit);
  }, [answers]);

   const dragDropOptions = useMemo(() => {
    return question?.drag_drop
      ? question.drag_drop.split(",").map((text:any) => text.trim())
      : [];
  }, [question]);
  
  const handleDragStart = (e: React.DragEvent, word: string, sourceIndex?: number) => {
    e.dataTransfer.setData("text/plain", word);
    if (sourceIndex !== undefined) {
      e.dataTransfer.setData("sourceIndex", sourceIndex.toString());
    }
  };
  
    const handleDrop = (e: React.DragEvent, targetIndex: number | null) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain");
    const sourceIndexRaw = e.dataTransfer.getData("sourceIndex");
    const sourceIndex = sourceIndexRaw ? parseInt(sourceIndexRaw, 10) : null;
  
    if (!word) return;
  
    if (targetIndex !== null) {
      setAnswers((prev) => {
        const updated = { ...prev };
  
        // Remove word from source blank if exists
        if (sourceIndex !== null && updated[sourceIndex] === word) {
          delete updated[sourceIndex];
        }
  
        // Remove any word already in target
        if (updated[targetIndex]) {
          const wordInTarget = updated[targetIndex];
          setUsedWords((prevWords) =>
            prevWords.filter((w) => w !== wordInTarget)
          );
        }
  
        // Assign new word to target
        updated[targetIndex] = word;
        return updated;
      });
  
      setUsedWords((prev) => {
        const withoutWord = prev.filter((w) => w !== word);
        return [...withoutWord, word];
      });
    } else {
      // Drop back to word bank
      const indexToRemove = Object.keys(answers).find(
        (key) => answers[parseInt(key, 10)] === word
      );
      if (indexToRemove !== undefined) {
        setAnswers((prev) => {
          const updated = { ...prev };
          delete updated[parseInt(indexToRemove)];
          return updated;
        });
        setUsedWords((prev) => prev.filter((w) => w !== word));
      }
    }
  };
  
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };
  
    let blankCounter = 0;
  
    const correctAnswers = useMemo(() => {
    return question?.answer_american
      ? question.answer_american.split(",").map((ans:any) => ans.trim())
      : [];
  }, [question]);
  
    const customParseOptions = {
      replace: (domNode: DOMNode) => {
        if (
          (domNode as Element).name === "span" &&
          (domNode as Element).attribs?.class === "blank"
        ) {
          const currentIndex = blankCounter++;
  
          const userAnswer = answers[currentIndex];
          const correctAnswer = correctAnswers[currentIndex];
  
          const isCorrect = showAnswer && userAnswer === correctAnswer;
          const isFilled = !!userAnswer;
  
          return (
            <span
    key={currentIndex}
    draggable={!!userAnswer}
    onDragStart={(e) => handleDragStart(e, userAnswer, currentIndex)}
    onDrop={(e) => handleDrop(e, currentIndex)}
    onDragOver={handleDragOver}
    style={{
      borderBottom: "2px dashed #aaa",
      padding: "2px 10px",
      minWidth: "60px",
      marginRight: "4px",
      textAlign: "center",
      backgroundColor: isCorrect
        ? "#d4edda"
        : isFilled && showAnswer
        ? "#f8d7da"
        : "#fff",
      display: "inline-block",
      cursor: !!userAnswer ? "grab" : "pointer",
    }}
  >
    {userAnswer || ""}
  </span>
          );
        }
      },
    };
  
    const availableWords = dragDropOptions.filter(
      (word:any) => !usedWords.includes(word)
    );

  return (
    <div className="container mt-3">
      <p className="mockHead mb-3">
        In the text below some words are missing. Drag words from the box below
        to the appropriate place in the text. To undo an answer choice, drag the
        word back to the box below the text.
      </p>
      <div className="card readFib p-3">
        <div
          className="p-4 space-y-4 bottomborder"
          style={{ fontSize: "1.25rem" ,lineHeight:"36px"}}
        >
          <div>
          {parse(question?.question || "", customParseOptions)}
          </div>

          <div
            className="innercontent mt-4"
            onDrop={(e) => handleDrop(e, null)} // Enable dropping *into* the word bank
            onDragOver={handleDragOver} // Allow drop
          >
            <div className="selectableBtn d-flex flex-wrap gap-2">
              {availableWords.map((word: any, idx: any) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, word)}
                  className="btn btn-outline-dark rounded-pill"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingFillintheBlank;
