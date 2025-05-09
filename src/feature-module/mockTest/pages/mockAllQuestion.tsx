import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReadingIntro from "../component/reading/readingIntro";
import WritingIntro from "../component/writing/writingIntro";
import SpeakingIntro from "../component/Speaking/speakingIntro";
import ListeningIntro from "../component/listening/listeningIntro";
import { sessionValidate, mockTestQuestions } from "../../../api/mocktestAPI";
import { image_url } from "../../../environment";
import AlertModal from "../component/modal/alertModal";

interface MockAllQuestionProps {
  id: string | undefined;
  session_id: string;
  LoadFinal: () => void;
}

const MockAllQuestion: React.FC<MockAllQuestionProps> = ({ id, session_id }) => {
  const navigate = useNavigate();
  const [apiCalled, setApiCalled] = useState(false);
  const [sectionPart, setSectionPart] = useState<JSX.Element | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  useEffect(() => {
    document.addEventListener("copy", preventCopyPaste);
    document.addEventListener("paste", preventCopyPaste);
    return () => {
      document.removeEventListener("copy", preventCopyPaste);
      document.removeEventListener("paste", preventCopyPaste);
    };
  }, []);

  const preventCopyPaste = (e: ClipboardEvent) => {
    e.preventDefault();
    return false;
  };

  const stopLoading = () => {
    setShowAlertModal(false);
    navigate("/");
  };

  const continueLoading = async () => {
    try {
      const res = await mockTestQuestions(id);
      const mockData = res.data;

      preloadMedia(mockData);

      const {
        speaking = [],
        writing = [],
        reading = [],
        listening = [],
        mockresults
      } = mockData;

      let queno = 0;

      const buildComponent = (type: string, questions: any[], Component: React.FC<any>) => {
        const index = questions.findIndex((q) => q.id === parseInt(mockresults.questionId));
        const idx = index !== -1 ? index : 0;
        queno = idx + 1;

        if (type === "writing") queno += speaking.length;
        if (type === "reading") queno += speaking.length + writing.length;
        if (type === "listening") queno += speaking.length + writing.length + reading.length;

        return (
          <Component
            queno={queno}
            mockquestions={mockData}
            setSectionPart={setSectionPart}
            continuest={true}
          />
        );
      };

      if (mockresults && mockresults.questionId) {
        switch (mockresults.button_type) {
          case "speaking":
            setSectionPart(buildComponent("speaking", speaking, SpeakingIntro));
            break;
          case "writing":
            setSectionPart(buildComponent("writing", writing, SpeakingIntro));
            break;
          case "reading":
            setSectionPart(buildComponent("reading", reading, ReadingIntro));
            break;
          case "listening":
            setSectionPart(buildComponent("listening", listening, ListeningIntro));
            break;
        }
      } else {
        if (speaking.length > 0) {
          setSectionPart(
            <SpeakingIntro queno={0} mockquestions={mockData} setSectionPart={setSectionPart} />
          );
        } else if (writing.length > 0) {
          setSectionPart(
            <WritingIntro queno={0} mockquestions={mockData} setSectionPart={setSectionPart} />
          );
        } else if (reading.length > 0) {
          setSectionPart(
            <ReadingIntro queno={0} mockquestions={mockData} setSectionPart={setSectionPart} />
          );
        } else if (listening.length > 0) {
          setSectionPart(
            <ListeningIntro queno={0} mockquestions={mockData} setSectionPart={setSectionPart} />
          );
        } else {
          navigate("/");
        }
      }
      setShowAlertModal(false);
    } catch (error) {
      console.error("Error loading mock test:", error);
    }
  };

  const preloadMedia = (mockData: any) => {
    const sections = ["speaking", "writing", "reading", "listening"];
    let urls: string[] = [];

    sections.forEach((section) => {
      const questions = mockData[section] || [];
      questions.forEach((q: any) => {
        const mediaUrl =
          q.audio_file || q.speek_audio_file || q.describe_image || null;
        if (mediaUrl) {
          urls.push(image_url + mediaUrl);
        }
      });
    });

    setMediaUrls(urls);
  };

  useEffect(() => {
    const validateAndLoad = async () => {
      if (!apiCalled && id) {
        setApiCalled(true);
        try {
          const result = await sessionValidate({ mocktestId: id, sessionid: session_id });
          if (result.success) {
            setShowAlertModal(true); // show "Continue?" modal
          } else {
            navigate("/");
          }
        } catch (err) {
          console.error("Validation error", err);
          navigate("/");
        }
      }
    };
    validateAndLoad();
  }, [id, session_id]);

  return (
    <section className="mocktest-session">
      {sectionPart}
      {showAlertModal && (
         <AlertModal
            show={showAlertModal}
            onHide={() => setShowAlertModal(false)}
            onButtonClick={continueLoading}
            onCloseClick={stopLoading}
          />
      )}
    </section>
  );
};

export default MockAllQuestion;
