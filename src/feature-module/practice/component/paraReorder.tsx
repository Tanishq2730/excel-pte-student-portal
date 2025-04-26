import React, { useState, useEffect } from "react";

interface ButtonItem {
  id: number;
  text: string;
  order: string;
}

interface QuestionData {
  answer_american: string;
  answer_british: string;
  option_one: string;
  option_two: string;
  option_three: string;
  option_four: string;
}

interface ParaReorderProps {
  questionData: QuestionData | null;
  onAnswerChange: (ans: string[]) => void;
  resetTrigger: boolean;
}

const ParaReorder = ({ questionData, onAnswerChange, resetTrigger }: ParaReorderProps) => {
  const [leftButtons, setLeftButtons] = useState<ButtonItem[]>([]);
  const [rightButtons, setRightButtons] = useState<ButtonItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<{
    id: number;
    from: "left" | "right";
  } | null>(null);

  const [initialLeftButtons, setInitialLeftButtons] = useState<ButtonItem[]>([]); // <-- New state to hold initial options

  const initializeButtons = (data: QuestionData) => {
    const options = [
      { id: 1, text: data.option_one, order: "1" },
      { id: 2, text: data.option_two, order: "2" },
      { id: 3, text: data.option_three, order: "3" },
      { id: 4, text: data.option_four, order: "4" },
    ];

    const order = data.answer_american.split(",").map((str) => parseInt(str, 10));
    const reorderedButtons = order.map((id) =>
      options.find((option) => option.id === id)
    ) as ButtonItem[];

    // Set the left buttons and store the initial left buttons for reset
    setLeftButtons(reorderedButtons);
    setInitialLeftButtons(options); // <-- Store the initial state
  };

  useEffect(() => {
    if (questionData) {
      initializeButtons(questionData);
    }
  }, [questionData]);

  useEffect(() => {
    if (resetTrigger) {
      setLeftButtons([...initialLeftButtons]); // Reset to initial state (ensure to create a fresh copy)
      setRightButtons([]);
      setDraggedItem(null);
    }
  }, [resetTrigger, initialLeftButtons]);

  useEffect(() => {
    onAnswerChange(rightButtons.map((btn) => btn.order));
  }, [rightButtons]);

  const handleDragStart = (id: number, from: "left" | "right") => {
    setDraggedItem({ id, from });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropLeft = (dropId: number) => {
    if (!draggedItem) return;
  
    const currentOrder = [...leftButtons];
  
    if (draggedItem.from === "right") {
      const updatedRight = rightButtons.filter((btn) => btn.id !== draggedItem.id);
      setRightButtons(updatedRight);
  
      const draggedButton = rightButtons.find((btn) => btn.id === draggedItem.id);
      if (!draggedButton) return;
  
      const dropIndex = currentOrder.findIndex((btn) => btn.id === dropId);
      if (dropIndex === -1) {
        currentOrder.push(draggedButton);
      } else {
        currentOrder.splice(dropIndex, 0, draggedButton);
      }
    } else if (draggedItem.from === "left") {
      const dragIndex = currentOrder.findIndex((btn) => btn.id === draggedItem.id);
      const dropIndex = currentOrder.findIndex((btn) => btn.id === dropId);
  
      const draggedButton = currentOrder.find((btn) => btn.id === draggedItem.id);
      if (!draggedButton) return;
  
      currentOrder.splice(dragIndex, 1);
      currentOrder.splice(dropIndex, 0, draggedButton);
    }
  
    setLeftButtons(currentOrder);
    setDraggedItem(null);
  };
  
  const handleDropRight = (dropId: number | null) => {
    if (!draggedItem) return;
  
    const newRight = [...rightButtons];
  
    if (draggedItem.from === "left") {
      const item = leftButtons.find((btn) => btn.id === draggedItem.id);
      if (!item) return;
  
      const newLeft = leftButtons.filter((btn) => btn.id !== draggedItem.id);
      setLeftButtons(newLeft);
  
      const isInRight = newRight.find((btn) => btn.id === item.id);
      if (!isInRight) {
        const dropIndex =
          dropId !== null ? newRight.findIndex((btn) => btn.id === dropId) : -1;
        if (dropIndex === -1) {
          newRight.push(item);
        } else {
          newRight.splice(dropIndex, 0, item);
        }
      }
    } else if (draggedItem.from === "right") {
      const dragIndex = newRight.findIndex((btn) => btn.id === draggedItem.id);
      const dropIndex =
        dropId !== null ? newRight.findIndex((btn) => btn.id === dropId) : -1;
  
      if (dragIndex === -1) return;
  
      const draggedItemObj = newRight.splice(dragIndex, 1)[0];
  
      if (dropIndex === -1 || dragIndex === dropIndex) {
        newRight.push(draggedItemObj);
      } else {
        newRight.splice(dropIndex, 0, draggedItemObj);
      }
    }
  
    setRightButtons(newRight);
    setDraggedItem(null);
  };

  const renderLeftButtons = () =>
    leftButtons.map((item) => (
      <div
        key={item.id}
        className="mb-2"
        draggable
        onDragStart={() => handleDragStart(item.id, "left")}
        onDragOver={handleDragOver}
        onDrop={() => handleDropLeft(item.id)}
      >
        <button className="btn btn-outline-primary w-100 text-start redorder-btn">
          <span>{item.order} </span>
          {item.text}
        </button>
      </div>
    ));

  const renderRightButtons = () =>
    rightButtons.map((item) => (
      <div
        key={item.id}
        className="mb-2"
        draggable
        onDragStart={() => handleDragStart(item.id, "right")}
        onDragOver={handleDragOver}
        onDrop={() => handleDropRight(item.id)}
      >
        <button className="btn btn-outline-success w-100 text-start redorder-btn">
          <span>{item.order} </span>
          {item.text}
        </button>
      </div>
    ));

  return (
    <div className="container mt-4">
      <div className="row">
        {/* LEFT CARD */}
        <div className="col-md-6">
          <div className="card" onDragOver={handleDragOver}>
            <div className="card-header bg-primary">
              <h5 className="text-white m-0">Source</h5>
            </div>
            <div className="card-body">{renderLeftButtons()}</div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div
          className="col-md-6"
          onDragOver={handleDragOver}
          onDrop={() => handleDropRight(null)}
        >
          <div className="card">
            <div className="card-header bg-success">
              <h5 className="text-white m-0">Target</h5>
            </div>
            <div className="card-body">{renderRightButtons()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParaReorder;
