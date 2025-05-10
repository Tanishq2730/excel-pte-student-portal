// MockAllQuestionWrapper.tsx
import React from "react";
import { useParams } from "react-router-dom";
import MockAllQuestion from "./mockAllQuestion";

const MockAllQuestionWrapper: React.FC = () => {
  const { id, session_id } = useParams<{ id: string; session_id: string }>();

  if (!id || !session_id) {
    return <div>Invalid mock test session.</div>;
    }

    return (
    <MockAllQuestion
        id={id}
        session_id={session_id}
        LoadFinal={() => {}}
    />
    );
};

export default MockAllQuestionWrapper;
