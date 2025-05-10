import React, { useState } from "react";
import parse, { DOMNode, Element } from "html-react-parser";

const ReadingFillintheBlank: React.FC<{ question: any }> = ({ question }) => {

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const dragDropOptions = question?.drag_drop
    ? question.drag_drop.split(",").map((text: any) => text.trim())
    : [];

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLSpanElement>,
    word: string
  ) => {
    e.dataTransfer.setData("text/plain", word);
  };

  const handleDrop = (e: React.DragEvent, index: number | null = null) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain");

    if (index !== null) {
      setAnswers((prevAnswers) => {
        const existingWord = prevAnswers[index];

        if (existingWord === word) return prevAnswers; // if same word, do nothing

        const updatedAnswers = { ...prevAnswers, [index]: word };

        // Remove old word from usedWords if present
        if (existingWord) {
          setUsedWords((prevUsed) =>
            prevUsed.filter((w) => w !== existingWord)
          );
        }

        // Add new word to usedWords if not already present
        setUsedWords((prevUsed) =>
          prevUsed.includes(word) ? prevUsed : [...prevUsed, word]
        );

        return updatedAnswers;
      });
    } else {
      // Dropping back into word bank
      const indexToRemove = Object.keys(answers).find(
        (key) => answers[parseInt(key, 10)] === word
      );
      if (indexToRemove !== undefined) {
        setAnswers((prev) => {
          const newAnswers = { ...prev };
          delete newAnswers[parseInt(indexToRemove)];
          return newAnswers;
        });
        setUsedWords((prev) => prev.filter((w) => w !== word));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  let blankCounter = 0;
  
    const correctAnswers = question?.answer_american
      ? question.answer_american.split(",").map((ans:any) => ans.trim())
      : [];
  
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
              onDrop={(e) => handleDrop(e, currentIndex)}
              onDragOver={handleDragOver}
              style={{
                borderBottom: "2px dashed #aaa",
                padding: "2px 10px",
                minWidth: "60px",
                marginRight: "4px",
                textAlign: "center",
                backgroundColor: isCorrect
                  ? "#d4edda" // ✅ Green for correct answer
                  : isFilled && showAnswer
                  ? "#f8d7da" // ❌ Light red for incorrect (optional)
                  : "#fff",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              {userAnswer || "___"}
            </span>
          );
        }
      },
    };

  const availableWords = dragDropOptions.filter(
    (word: any) => !usedWords.includes(word)
  );

  return (
    <div className="container mt-3">      
      <div className="card p-3">
        <p>
          In the text below some words are missing. Drag words from the box
          below to the appropriate place in the text. To undo an answer choice,
          drag the word back to the box below the text.
        </p>
      </div>
      <div
        className="p-4 space-y-4 bottomborder"
        style={{ fontSize: "1.25rem" }}
      >
        {parse(question?.question || "", customParseOptions)}

        <div
          className="innercontent mt-4"
          onDrop={(e) => handleDrop(e, null)} // Enable dropping *into* the word bank
          onDragOver={handleDragOver} // Allow drop
        >
          <div className="selectableBtn d-flex flex-wrap gap-2">
            {availableWords.map((word:any, idx:any) => (
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
      );
};

      export default ReadingFillintheBlank;
