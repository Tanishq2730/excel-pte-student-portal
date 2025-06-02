import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecorderComponent from "../component/recorderComponent";
import Community from "../component/Community/community";
import CardHeading from "../component/cardHeading";
import { fetchQuestionData, savePractice } from "../../../api/practiceAPI";
import { QuestionData } from "../../../core/data/interface";
import { all_routes } from "../../router/all_routes";
import CardButton from "../component/cardButton";
import QuestionNavigation from "../component/questionNavigation";
import MyNotes from "../component/myNotes";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Recorder from "../component/recorder";
import stringSimilarity from "string-similarity";
import parse from "html-react-parser";
import spanHtml from "../component/spanHtml";
import AlertComponent from "../../../core/common/AlertComponent";
import ReactDOMServer from "react-dom/server";
import { image_url } from "../../../environment";
import PageHeading from "../component/pageHeading";
import DictionaryModal from "../component/DictionaryModal";

// Define types
interface Timestamp {
  word: string;
  timestamp: Date;
}
const ReadAloud = () => {
  const { subtype_id, question_id } = useParams<{
    subtype_id: string;
    question_id?: string;
  }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [countdown, setCountdown] = useState<number>(1);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [resetRecording, setResetRecording] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false); // ⭐ New State for MyNotes
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [recordingStartTime, setRecordingStartTime] = useState<number>(
    Date.now()
  );
  const [correctText, setCorrectText] = useState<string>("");
  const [transcriptTimestamps, setTranscriptTimestamps] = useState<Timestamp[]>(
    []
  );
  const [goodWords, setGoodWords] = useState<number>(0);
  const [lateSpeak, setLateSpeak] = useState<number>(0);
  const [totalWordsInCorrectText, settotalWordsInCorrectText] =
    useState<number>(0);
  const [contentScoreOutOf90, setContentScoreOutOf90] = useState<number>(0);
  const [fluencyScoreOutOf90, setFluencyScoreOutOf90] = useState<number>(0);
  const [pronunciationScoreOutOf90, setPronunciationScoreOutOf90] =
    useState<number>(0);
  const [targetScoreOutOf90, setTargetScoreOutOf90] = useState<string>("0.00");
  const [badWords, setBadWords] = useState(0);
  const [avgWords, setAvgWords] = useState(0);
  const [pauseWords, setPauseWords] = useState(0);
  const [transcriptWithPauses, setTranscriptWithPauses] = useState<
    { word: string; isPauseWord: boolean; color: string }[]
  >([]);
  const url = `${image_url}${questionData?.speak_audio_file}`;

  const [timeSpent, setTimeSpent] = useState(0);
  const startTime = useRef(Date.now());

  const timeSpentRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      timeSpentRef.current = (Date.now() - startTime.current) / 1000 / 60;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRecordingComplete = (audioBlob: Blob, audioUrl: string) => {
    setRecordedAudioBlob(audioBlob);
    setRecordedAudioUrl(audioUrl);
  };

  const getData = async () => {
    try {
      const subtypeIdNum = Number(subtype_id);
      const questionIdNum = question_id ? Number(question_id) : 0;

      const res = await fetchQuestionData(subtypeIdNum, questionIdNum);

      if (!res.success || !res.data) {
        navigate(all_routes.adminDashboard);
        return;
      }

      setQuestionData(res.data);

      const parser = new DOMParser();
      const doc = parser.parseFromString(res.data.question, "text/html");
      const questionText = doc.body.textContent || "";
      setCorrectText(questionText);
    } catch (err) {
      console.error("Error fetching question data:", err);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (subtype_id) getData();
  }, [subtype_id, question_id, navigate]);

  useEffect(() => {
    if (questionData?.Subtype?.preparation_time) {
      const preparationTimeInSeconds = parseInt(
        questionData.Subtype.preparation_time,
        10
      );
      setCountdown(preparationTimeInSeconds);
      setTimerActive(true);
    }
  }, [questionData]);

  const startRecordingCallback = useCallback(() => {
    if (questionData && questionData.Subtype.preparation_time === "0") {
      document.getElementById("startRecordingButton")?.click();
    }
  }, [questionData]);

  useEffect(() => {
    let intervalId: number;

    if (timerActive && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (timerActive && countdown <= 0) {
      setTimerActive(false);
      startRecordingCallback();
    }

    return () => clearInterval(intervalId);
  }, [countdown, timerActive, startRecordingCallback]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
      }`;
  };

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };



  const handleRestart = () => {
    const preparationTimeInSeconds = parseInt(
      questionData?.Subtype.preparation_time || "0",
      10
    );
    setCountdown(preparationTimeInSeconds);
    setTimerActive(true);
    setShowAnswer(false);
    setResetRecording(true);
    SpeechRecognition.stopListening();
    resetTranscript();
    setLateSpeak(0);
    settotalWordsInCorrectText(0);
    setContentScoreOutOf90(0);
    setFluencyScoreOutOf90(0);
    setPronunciationScoreOutOf90(0);
    setTargetScoreOutOf90("0.00");
    setGoodWords(0);
    setTimeout(() => setResetRecording(false), 100);
  };

  const handleStopRecording = () => {
    const preparationTimeInSeconds = parseInt(
      questionData?.Subtype.preparation_time || "0",
      10
    );
    setCountdown(preparationTimeInSeconds);
    setTimerActive(true);
    setShowAnswer(false);
    setResetRecording(true);
    SpeechRecognition.stopListening();
    resetTranscript();
    setLateSpeak(0);
    settotalWordsInCorrectText(0);
    setContentScoreOutOf90(0);
    setFluencyScoreOutOf90(0);
    setPronunciationScoreOutOf90(0);
    setTargetScoreOutOf90("0.00");
    setGoodWords(0);
    setTimeout(() => setResetRecording(false), 100);
  };
  const handleNext = () => {
    if (questionData?.nextQuestionId) {
      navigate(`/read-aloud/${subtype_id}/${questionData?.nextQuestionId}`);
      const preparationTimeInSeconds = parseInt(
        questionData?.Subtype.preparation_time || "0",
        10
      );
      setCountdown(preparationTimeInSeconds);
      setTimerActive(true);
      setShowAnswer(false);
      setResetRecording(true);
      SpeechRecognition.stopListening();
      resetTranscript();
      setLateSpeak(0);
      settotalWordsInCorrectText(0);
      setContentScoreOutOf90(0);
      setFluencyScoreOutOf90(0);
      setPronunciationScoreOutOf90(0);
      setTargetScoreOutOf90("0.00");
      setGoodWords(0);
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(`/read-aloud/${subtype_id}/${questionData?.previousQuestionId}`);
      const preparationTimeInSeconds = parseInt(
        questionData?.Subtype.preparation_time || "0",
        10
      );
      setCountdown(preparationTimeInSeconds);
      setTimerActive(true);
      setShowAnswer(false);
      setResetRecording(true);
      SpeechRecognition.stopListening();
      resetTranscript();
      setLateSpeak(0);
      settotalWordsInCorrectText(0);
      setContentScoreOutOf90(0);
      setFluencyScoreOutOf90(0);
      setPronunciationScoreOutOf90(0);
      setTargetScoreOutOf90("0.00");
      setGoodWords(0);
    }
  };

  const toggleNotes = () => {
    setShowNotes((prev) => !prev);
  };

  // Calculate pause duration
  const calculatePauseDuration = (currentIndex: number): number => {
    if (
      !transcriptTimestamps ||
      transcriptTimestamps.length <= currentIndex ||
      currentIndex === 0
    ) {
      return 0;
    }

    const prevWordTimestamp = transcriptTimestamps[currentIndex - 1];
    const currentWordTimestamp = transcriptTimestamps[currentIndex];
    const currentWord = spokenWords2[currentIndex];

    if (!prevWordTimestamp || !currentWordTimestamp) {
      return 0;
    }

    if (currentWord.endsWith(".")) {
      return 1;
    }

    const pauseDuration =
      (currentWordTimestamp.timestamp.getTime() -
        prevWordTimestamp.timestamp.getTime()) /
      1000;

    return pauseDuration;
  };

  // Calculate pronunciation score
  const calculatePronunciationScore = (
    recognizedTranscript: string,
    correctText: string
  ): number => {
    const recognizedLowercase = recognizedTranscript.toLowerCase();
    const correctLowercase = correctText.toLowerCase();

    const similarity = stringSimilarity.compareTwoStrings(
      recognizedLowercase,
      correctLowercase
    );

    const pronunciationScore = similarity * 90;
    return pronunciationScore;
  };

  // Update transcript timestamps
  const updateTranscriptTimestamps = (index: number, word: string): void => {
    const newTimestamps = [...transcriptTimestamps];
    newTimestamps[index] = { word, timestamp: new Date() };
    setTranscriptTimestamps(newTimestamps);
  };

  // Memoized spoken words
  const spokenWords2 = useMemo<string[]>(() => {
    return transcript
      ? transcript
        .toLowerCase()
        .trim()
        .split(/\s+|(?<=\w)(?=\W)/)
      : [];
  }, [transcript]);

  useEffect(() => {
    if (spokenWords2.length > 0) {
      updateTranscriptTimestamps(
        spokenWords2.length - 1,
        spokenWords2[spokenWords2.length - 1]
      );
    }
  }, [spokenWords2]);

  useEffect(() => {
    // Placeholder if you want to perform anything on transcriptTimestamps change
  }, [transcriptTimestamps]);

  useEffect(() => {
    if (transcript && recordedAudioBlob) {
      let pauseDurationAccumulator = 0;

      const spokenWords = transcript
        .toLowerCase()
        .trim()
        .split(/\s+|(?<=\w)(?=\W)/);

      const correctWords = correctText.toLowerCase().trim().split(/\s+/);

      const goodCount = spokenWords.filter((word) =>
        correctWords.includes(word)
      ).length;

      setGoodWords(goodCount);

      let totalPauseWords = 0;
      let avgCount = 0;
      let badCount = 0;

      const transcriptWithPauses = spokenWords2.map((word, index) => {
        const isEndOfSentence = word.endsWith(".");
        const pauseDuration = calculatePauseDuration(index);
        const isPauseWord = pauseDuration > 1;
        const cleanWord = word
          .toLowerCase()
          .replace(/[^\w\s]|_/g, "")
          .replace(/\s+/g, " ");

        const isGood = correctWords.includes(cleanWord);
        const isAverage =
          !isGood && correctWords.find((w) => w.includes(cleanWord));

        let color = "";
        if (isGood) {
          color = "goodword";
        } else if (isAverage) {
          color = "avgword";
          if (word !== "." && word !== "?") {
            avgCount++;
          }
        } else {
          color = "badword";
          badCount++;
        }

        pauseDurationAccumulator += pauseDuration;
        if (isPauseWord) {
          totalPauseWords++;
          pauseDurationAccumulator = 0;
        }

        return { word, isPauseWord, color };
      });

      const totalWords = spokenWords.length;
      const totalDuration = recordingStartTime
        ? (Date.now() - recordingStartTime) / 1000
        : 1;

      const totalWordsInCorrectText = correctWords.length;
      const goodCount2 = spokenWords.filter((word) =>
        correctWords.includes(word)
      ).length;

      const avgscore = (avgCount * 90) / totalWordsInCorrectText;
      const badscore = (badCount * 90) / totalWordsInCorrectText;
      const pausescore = (totalPauseWords * 90) / totalWordsInCorrectText;

      let pronunciationScoreOutOf90 = calculatePronunciationScore(
        transcript,
        correctText
      );
      pronunciationScoreOutOf90 =
        pronunciationScoreOutOf90 - avgscore - badscore - pausescore;

      if (pronunciationScoreOutOf90 > 90) {
        pronunciationScoreOutOf90 = 90;
      }

      let contentx = totalWords - badCount - avgCount - totalPauseWords;
      let contentScoreOutOf90 = (contentx * 90) / totalWordsInCorrectText;

      if (contentScoreOutOf90 > 90) {
        contentScoreOutOf90 = 90;
      }

      const fluencyScoreMeter = 45;
      let fluencyScoreOutOf90 =
        (goodCount2 * fluencyScoreMeter) / totalDuration;
      if (fluencyScoreOutOf90 > 90) {
        fluencyScoreOutOf90 = 90;
      }

      if (totalDuration <= 10) {
        fluencyScoreOutOf90 = 10;
        contentScoreOutOf90 = 10;
        pronunciationScoreOutOf90 = 10;

        if (!spokenWords || spokenWords.length === 0) {
          fluencyScoreOutOf90 = 0;
          contentScoreOutOf90 = 0;
          pronunciationScoreOutOf90 = 0;
        }
      }

      if (totalDuration === 0) {
        fluencyScoreOutOf90 = 0;
        contentScoreOutOf90 = 0;
        pronunciationScoreOutOf90 = 0;
      }

      if (fluencyScoreOutOf90 < 0) fluencyScoreOutOf90 = 0;
      if (contentScoreOutOf90 < 0) contentScoreOutOf90 = 0;
      if (pronunciationScoreOutOf90 < 0) pronunciationScoreOutOf90 = 0;

      const targetScoreOutOf90 = (
        fluencyScoreOutOf90 * 0.3 +
        contentScoreOutOf90 * 0.4 +
        pronunciationScoreOutOf90 * 0.3
      ).toFixed(2);

      setLateSpeak(1);
      settotalWordsInCorrectText(totalWordsInCorrectText);
      setContentScoreOutOf90(contentScoreOutOf90);
      setFluencyScoreOutOf90(fluencyScoreOutOf90);
      setPronunciationScoreOutOf90(pronunciationScoreOutOf90);
      setTargetScoreOutOf90(targetScoreOutOf90);
      setAvgWords(avgCount);
      setBadWords(badCount);
      setPauseWords(totalPauseWords);
      setTranscriptWithPauses(transcriptWithPauses);
    }
  }, [transcript, recordedAudioBlob]);

  const handleSubmitPractice = async () => {
    if (!questionData?.id || !subtype_id) return;

    try {
      const totalscore = 90;
      const combinedTranscriptHTML = ReactDOMServer.renderToString(
        <span>
          {transcriptWithPauses.map((wordObj, index) => (
            <span key={index} className={wordObj.color}>
              {wordObj.word}{" "}
            </span>
          ))}
        </span>
      );

      let score_data = {
        content: contentScoreOutOf90,
        fluency: fluencyScoreOutOf90,
        pronunciation: pronunciationScoreOutOf90,
        transcript: questionData?.transcription,
        scored_transcript: combinedTranscriptHTML,
      };

      const questionId = questionData?.id;
      const formData = new FormData();
      formData.append("questionId", questionId.toString());
      formData.append("totalscore", totalscore.toString());
      formData.append("lateSpeak", lateSpeak.toString());
      formData.append("timeSpent", timeSpent.toString());
      formData.append("score", targetScoreOutOf90.toString());
      formData.append("score_data", JSON.stringify(score_data));

      // Attach audio blob as file
      if (recordedAudioBlob) {
        const audioFile = new File([recordedAudioBlob], "answer.wav", {
          type: "audio/wav",
        });
        formData.append("answer", audioFile);
      }

      // Send to backend
      try {
        const response = await savePractice(true, formData);

        if (response.success) {
          getData();
          const preparationTimeInSeconds = parseInt(
            questionData?.Subtype.beginning_in || "0",
            10
          );
          setCountdown(preparationTimeInSeconds);
          setTimerActive(true); // Restart the countdown
          setTimeSpent(0);
          setShowAnswer(false); // Optionally reset the answer view
          setAlert({ type: "success", message: "Your Answer Saved!" });
        } else {
          setAlert({ type: "danger", message: "Failed to save practice" });
        }
      } catch (error) {
        console.error("Submission Error:", error);
      }
    } catch (error) {
      console.error("Error saving practice:", error);
      setAlert({ type: "danger", message: "Something went wrong." });
    }
  };
  const [showDictionaryModal, setShowDictionaryModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string>("");

  const handleWordClick = (word: string) => {
   
    setSelectedWord(word);
    setShowDictionaryModal(true);
  };

  const [recordingTime, setRecordingTime] = useState(0);

  const handleTimerUpdate = (seconds: number) => {
    setRecordingTime(seconds);
  };
console.log(questionData);


  return (
    <div className="page-wrappers">
      {alert && (
        <AlertComponent
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Button to open My Notes */}
            <div className="col-12 mb-3">
              <button
                className="btn btn-primary mynotesBtn"
                style={{ display: "flex", flexDirection: "column" }}
                onClick={toggleNotes}
              >
                <i className="fa fa-book"></i>
                {showNotes ? "Close Notes" : "My Notes"}
              </button>
            </div>
            <PageHeading title="Read Aloud" />

            <div className={showNotes ? "col-md-9" : "col-md-12"}>
              <div className="practiceLayout">
                <p className="my-3">
                  Look at the text below. In 40 seconds, you must read this text
                  aloud as naturally and clearly as possible...
                </p>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title text-white">
                      {questionData?.question_name}
                      <span>{questionData?.tested === "yes" && `Tested (${questionData?.tested_count})`}</span>  
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="time">
                      <div className="headBtn">
                        <span className="text-danger">
                          {recordingTime > 0
                            ? `Recording: ${recordingTime}`
                            : countdown > 0
                              ? `Prepare: ${formatTime(countdown)}`
                              : "Prepare"}
                        </span>
                        <CardButton questionData={questionData} />
                      </div>
                      <div className="innercontent">
                        <p>
                          {questionData?.question?.split(" ").map((word, idx) => (
                            <span
                              key={idx}
                              onClick={() => handleWordClick(word)}
                              style={{ cursor: "pointer", marginRight: 4 }}
                              title="Click to see definition"
                            >
                              {word}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="micSection">
                        <Recorder
                          onRecordingComplete={handleRecordingComplete}
                          onStopRecording={handleStopRecording}
                          resetRecording={resetRecording}
                          countdown={countdown}
                          onTimerUpdate={handleTimerUpdate}
                          durationLimit={
                            questionData?.Subtype?.recording_time != null
                              ? Number(questionData.Subtype.recording_time)
                              : undefined
                          }
                        />
                      </div>

                      <div className="bottomBtn mt-3">
                        <QuestionNavigation
                          questionData={questionData}
                          onAnswerClick={handleAnswerClick}
                          onRestart={handleRestart}
                          onNext={handleNext}
                          onPrevious={handlePrevious}
                          onSubmit={handleSubmitPractice}
                        />
                      </div>
                      {showAnswer && (
                        <div
                          className="py-4 mx-auto audio-card answerCard my-3 rounded-3"
                          style={{ background: "rgb(228 246 255)" }}
                        >
                          <div
                            className="audio-inner p-4 rounded-3"

                          >
                            <h3 className="mb-3">Answer</h3>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: questionData?.answer_american || "",
                              }}
                            />
                            <hr />
                          <audio controls className="w-100" style={{background:'#fff !important'}}>
                            <source
                              src="your-audio-file.mp3"
                              type="audio/mpeg"
                              style={{background:'#fff !important'}}
                            />
                            Your browser does not support the audio element.
                          </audio>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DictionaryModal
              isOpen={showDictionaryModal}
              onClose={() => setShowDictionaryModal(false)}
              word={selectedWord}
            />

            {showNotes && (
              <div className="col-md-3">
                <MyNotes />
              </div>
            )}
          </div>
          <div className="community">
            <Community questionData={questionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadAloud;
