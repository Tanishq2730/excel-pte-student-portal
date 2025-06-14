import React, { useEffect, useState } from "react";

type QuestionData = {
  option_one: string;
  option_two: string;
  option_three: string;
  option_four: string;
  answer_american: string; // e.g., "1,2,3"
};

type ButtonItem = {
  id: number;
  text: string;
};

interface Props {
  questionData: QuestionData | null;
  onAnswerChange: (answer: string[]) => void;
}

const AmericanOrdering: React.FC<Props> = ({ questionData, onAnswerChange }) => {
  const [leftButtons, setLeftButtons] = useState<ButtonItem[]>([]);
  const [rightButtons, setRightButtons] = useState<ButtonItem[]>([]);
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [dragSource, setDragSource] = useState<"left" | "right" | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<number | null>(null);
  const [initialLeftButtons, setInitialLeftButtons] = useState<ButtonItem[]>([]);

  useEffect(() => {
    if (!questionData) {
      setLeftButtons([]);
      setRightButtons([]);
      setInitialLeftButtons([]);
      return;
    }
    initializeButtons(questionData);
  }, [questionData]);

  useEffect(() => {
    // Update parent with the answer (IDs or text as needed)
    onAnswerChange(rightButtons.map((btn) => String(btn.id)));
  }, [rightButtons]);

  const initializeButtons = (data: QuestionData) => {
    const options = [
      { id: 1, text: data.option_one },
      { id: 2, text: data.option_two },
      { id: 3, text: data.option_three },
      { id: 4, text: data.option_four },
    ];

    const order = data.answer_american.split(",").map((str) => parseInt(str, 10));
    const reorderedButtons = order
      .map((id) => options.find((option) => option.id === id))
      .filter(Boolean) as ButtonItem[];

    setLeftButtons(reorderedButtons);
    setInitialLeftButtons(options);
    setRightButtons([]);
  };

  const handleDragStart = (id: number, source: "left" | "right") => {
    setDraggedItemId(id);
    setDragSource(source);
  };

  const handleDragEnter = (id: number) => {
    setDragOverItemId(id);
  };

  const handleDropLeft = () => {
    if (draggedItemId === null || dragSource === null) return;

    const draggedItem =
      dragSource === "left"
        ? leftButtons.find((btn) => btn.id === draggedItemId)
        : rightButtons.find((btn) => btn.id === draggedItemId);

    if (!draggedItem) return;

    // Remove dragged item from its source list
    if (dragSource === "right") {
      setRightButtons((prev) => prev.filter((btn) => btn.id !== draggedItemId));
    } else {
      setLeftButtons((prev) => prev.filter((btn) => btn.id !== draggedItemId));
    }

    // Insert into leftButtons at dragOverItemId index or at end
    setLeftButtons((prev) => {
      let newButtons = [...prev.filter((btn) => btn.id !== draggedItemId)];
      const index = dragOverItemId
        ? newButtons.findIndex((btn) => btn.id === dragOverItemId)
        : newButtons.length;
      if (index === -1) {
        newButtons.push(draggedItem);
      } else {
        newButtons.splice(index, 0, draggedItem);
      }
      return newButtons;
    });

    resetDragState();
    setDragOverItemId(null);
  };

  const handleDropRight = () => {
    if (draggedItemId === null || dragSource === null) return;

    const draggedItem =
      dragSource === "left"
        ? leftButtons.find((btn) => btn.id === draggedItemId)
        : rightButtons.find((btn) => btn.id === draggedItemId);

    if (!draggedItem) return;

    // Remove dragged item from its source list
    if (dragSource === "left") {
      setLeftButtons((prev) => prev.filter((btn) => btn.id !== draggedItemId));
    } else {
      setRightButtons((prev) => prev.filter((btn) => btn.id !== draggedItemId));
    }

    // Insert into rightButtons at dragOverItemId index or at end
    setRightButtons((prev) => {
      let newButtons = [...prev.filter((btn) => btn.id !== draggedItemId)];
      const index = dragOverItemId
        ? newButtons.findIndex((btn) => btn.id === dragOverItemId)
        : newButtons.length;
      if (index === -1) {
        newButtons.push(draggedItem);
      } else {
        newButtons.splice(index, 0, draggedItem);
      }
      return newButtons;
    });

    resetDragState();
    setDragOverItemId(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const resetDragState = () => {
    setDraggedItemId(null);
    setDragSource(null);
    setDragOverItemId(null);
  };

  const handleReset = () => {
    setLeftButtons(initialLeftButtons);
    setRightButtons([]);
  };

  const renderLeftButtons = () =>
    leftButtons.map((item, index) => (
      <div
        key={item.id}
        className="mb-2"
        draggable
        onDragStart={() => handleDragStart(item.id, "left")}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => handleDragEnter(item.id)}
        onDrop={handleDropLeft}
      >
        <button className="btn btn-outline-primary w-100 text-start redorder-btn p-4">
          <h5 className="m-0">{index + 1}. </h5>
          <p className="mb-0" style={{marginLeft:'1em'}}>{item.text}</p>
        </button>
      </div>
    ));

  const renderRightButtons = () =>
    rightButtons.map((item, index) => (
      <div
        key={item.id}
        className="mb-2"
        draggable
        onDragStart={() => handleDragStart(item.id, "right")}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => handleDragEnter(item.id)}
        onDrop={handleDropRight}
      >
        <button className="btn btn-outline-primary w-100 text-start redorder-btn p-4">
          <h5 className="m-0">{index + 1}. </h5>
          <p className="mb-0">{item.text}</p>
        </button>
      </div>
    ));

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Panel */}
        <div
          className="col-md-6  p-3"
          onDragOver={handleDragOver}
          onDrop={handleDropLeft}
        >
          <div className="card">
            <div className="card-header p-3">
              <div className="card-title text-white mb-0">Left Panel</div>
            </div>
            <div className="card-body p-4">
              {renderLeftButtons()}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div
          className="col-md-6  p-3"
          onDragOver={handleDragOver}
          onDrop={handleDropRight}
        >
          <div className="card">
            <div className="card-header p-3">
              <div className="card-title text-white mb-0">Right Panel</div>
            </div>
            <div className="card-body p-4">
              {renderRightButtons()}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default AmericanOrdering;
