import React, { useEffect, useState } from "react";
import ReadingIntro from "../component/reading/readingIntro";
import WritingIntro from "../component/writing/writingIntro";
import SpeakingIntro from "../component/Speaking/speakingIntro";
import ListeningIntro from "../component/listening/listeningIntro";
// import ListeningIntro from "../component/listening/listeningIntro"; // future component

const MockAllQuestion: React.FC = () => {
  const [sectionPart, setSectionPart] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const testType = "reading"; // this can be dynamic in future

    switch (testType) {
      case "reading":
        // setSectionPart(<ReadingIntro />);
        // setSectionPart(<WritingIntro />);
        // setSectionPart(<SpeakingIntro />);
        setSectionPart(<ListeningIntro />);
        break;
      // case "listening":
      //   setSectionPart(<ListeningIntro />);
      //   break;
      default:
        setSectionPart(<div>No component found</div>);
    }
  }, []);

  return (
    <section className="mocktest-session">
      {sectionPart}
    </section>
  );
};

export default MockAllQuestion;
