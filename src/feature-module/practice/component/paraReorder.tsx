import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface ButtonItem {
  id: number;
  text: string;
  order:string;
}

const initialLeftButtons: ButtonItem[] = [
  { id: 1, text: "Paragraph 1", order:"A" },
  { id: 2, text: "Paragraph 2", order:"B" },
  { id: 3, text: "Paragraph 3", order:"C" },
  { id: 4, text: "Paragraph 4", order:"D" },
];

const ParaReorder: React.FC = () => {
  const [leftOrder, setLeftOrder] = useState<number[]>([1, 2, 3, 4]);
  const [rightButtons, setRightButtons] = useState<ButtonItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<{
    id: number;
    from: "left" | "right";
  } | null>(null);

  const visibleLeftOrder = leftOrder.filter(
    (id) => !rightButtons.some((btn) => btn.id === id)
  );

  const getItemById = (id: number): ButtonItem =>
    initialLeftButtons.find((item) => item.id === id)!;

  const handleDragStart = (id: number, from: "left" | "right") => {
    setDraggedItem({ id, from });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropLeft = (dropId: number) => {
    if (!draggedItem || draggedItem.from !== "left") return;

    const currentOrder = [...leftOrder];
    const dragIndex = currentOrder.indexOf(draggedItem.id);
    const dropIndex = currentOrder.indexOf(dropId);

    if (dragIndex === -1 || dropIndex === -1 || dragIndex === dropIndex) return;

    currentOrder.splice(dragIndex, 1);
    currentOrder.splice(dropIndex, 0, draggedItem.id);

    setLeftOrder(currentOrder);
    setDraggedItem(null);
  };

  const handleDropRight = (dropId: number | null) => {
    if (!draggedItem) return;

    const item = getItemById(draggedItem.id);
    const isInRight = rightButtons.find((btn) => btn.id === item.id);
    const newRight = [...rightButtons];

    if (draggedItem.from === "left" && !isInRight) {
      const dropIndex =
        dropId !== null ? newRight.findIndex((btn) => btn.id === dropId) : -1;
      if (dropIndex === -1) {
        newRight.push(item);
      } else {
        newRight.splice(dropIndex, 0, item);
      }
    } else if (draggedItem.from === "right") {
      const dragIndex = newRight.findIndex((btn) => btn.id === draggedItem.id);
      const dropIndex =
        dropId !== null ? newRight.findIndex((btn) => btn.id === dropId) : -1;

      if (dragIndex !== -1 && dropIndex !== -1 && dragIndex !== dropIndex) {
        const updated = [...newRight];
        const dragged = updated.splice(dragIndex, 1)[0];
        updated.splice(dropIndex, 0, dragged);
        setRightButtons(updated);
        setDraggedItem(null);
        return;
      }
    }

    setRightButtons(newRight);
    setDraggedItem(null);
  };

  const renderLeftButtons = () =>
    visibleLeftOrder.map((id) => {
      const item = getItemById(id);
      return (
        <div
          key={item.id}
          className="mb-2"
          draggable
          onDragStart={() => handleDragStart(item.id, "left")}
          onDragOver={handleDragOver}
          onDrop={() => handleDropLeft(item.id)}
        >
          <button className="btn btn-outline-primary w-100 text-start redorder-btn">
            <span>{item.order}</span>{item.text}
          </button>
        </div>
      );
    });

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
        <button className="btn btn-outline-primary w-100 text-start redorder-btn">
            <span>{item.order}</span>{item.text}
          </button>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {/* LEFT CARD */}
        <div className="col-md-6">
          <div className="card" onDragOver={handleDragOver}>
            <div className="card-header">
              <div className="card-title">
                <h5 className="text-white">Source</h5>
              </div>
            </div>
            <div className="card-body">{renderLeftButtons()}</div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div
          className="col-md-6"
          onDragOver={handleDragOver}
          onDrop={() => handleDropRight(null)} // drop on empty area
        >
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <h5 className="text-white">Target</h5>
              </div>
            </div>
            <div className="card-body">{renderRightButtons()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParaReorder;
