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
import AudioPlayer from "../component/audioPlayer";

interface Timestamp {
  word: string;
  timestamp: Date;
}

const AnswerShortQuestion = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const { subtype_id, question_id } = useParams<{
    subtype_id: string;
    question_id?: string;
  }>();
  const navigate = useNavigate();

  const [showAnswer, setShowAnswer] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [countdown, setCountdown] = useState<number>(0); // Store remaining time in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [resetRecording, setResetRecording] = useState<boolean>(false); // Add reset state
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

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
  const [targetScoreOutOf90, setTargetScoreOutOf90] = useState<number>(0);
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
      const doc = parser.parseFromString(res.data.answer_american, "text/html");
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


  const [startCountdown, setStartCountdown] = useState<number | null>(null);
  const [startCountdownActive, setStartCountdownActive] = useState(false);
  
   useEffect(() => {
    if (!questionData) return;
  
    const prepTime = parseInt(questionData.Subtype?.preparation_time || "0", 10);
  
    if (prepTime > 0) {
      setCountdown(prepTime);
      setTimerActive(true);
    } else {
      setStartCountdown(3);
      setStartCountdownActive(true);
    }
  }, [questionData]);

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
  
    if (startCountdownActive && startCountdown && startCountdown > 0) {
      intervalId = setInterval(() => {
        setStartCountdown((prev) => (prev ? prev - 1 : 0));
      }, 1000);
    } else if (startCountdownActive && startCountdown === 0) {
      setStartCountdownActive(false);
      startRecordingCallback(); // Start recording after 3-2-1
    }
  
    return () => clearInterval(intervalId);
  }, [startCountdown, startCountdownActive, startRecordingCallback]);
  
  

  useEffect(() => {
    let intervalId: number;

    if (timerActive && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (timerActive && countdown <= 0) {
      setTimerActive(false);
      startRecordingCallback(); // Start recording after countdown ends
    }

    return () => clearInterval(intervalId);
  }, [countdown, timerActive, startRecordingCallback]);

  const formatTimePrepare = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
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
    setTargetScoreOutOf90(0);
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
    setTargetScoreOutOf90(0);
    setGoodWords(0);
    setTimeout(() => setResetRecording(false), 100);
  };

  // Handling navigation to next and previous questions
  const handleNext = () => {
    if (questionData?.nextQuestionId) {
      navigate(
        `/answer-short-question/${subtype_id}/${questionData?.nextQuestionId}`
      );
      handleStopRecording();
    }
  };

  const handlePrevious = () => {
    if (questionData?.previousQuestionId) {
      navigate(
        `/answer-short-question/${subtype_id}/${questionData?.previousQuestionId}`
      );
      handleStopRecording();
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpeed = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
      setPlaybackRate(newSpeed);
    }
  };

  const handleAnswerClick = () => {
    setShowAnswer((prev) => !prev);
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
      console.log(transcript, "transcript");

      const spokenWords = transcript
        .toLowerCase()
        .trim()
        .split(/\s+|(?<=\w)(?=\W)/);

      // console.log("spokenWords", spokenWords);
      const correctWords = correctText
        .replace(/\./g, "")
        .toLowerCase()
        .trim()
        .split(/\s+/);
      console.log(correctWords, "correctWords");
      console.log(spokenWords, "spokenWords");
      // console.log("correctWords", correctWords);
      const goodCount = spokenWords.filter((word) =>
        correctWords.includes(word)
      ).length;

      // console.log("spokenWords", spokenWords);
      // console.log("correctWords", correctText);
      // console.log("goodCount", goodCount);

      setGoodWords(goodCount);

      // console.log("SpeechRecognition", aiScore);
      // Count good and bad words
      let totalPauseWords = 0;
      let avgCount = 0;
      let badCount = 0;

      const transcriptWithPauses = spokenWords2.map((word, index) => {
        let color = "defaultdword";

        // Capitalize the first word of the transcript
        if (index === 0) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }

        // Determine if the word is the end of a sentence
        const isEndOfSentence = word.endsWith(".");

        // Calculate the pause duration after the current word
        const pauseDuration = calculatePauseDuration(index);

        // Check if the current word is a pause word
        const isPauseWord = pauseDuration > 1;

        // Accumulate the pause duration
        pauseDurationAccumulator += pauseDuration;
        if (isPauseWord) {
          totalPauseWords++;
          pauseDurationAccumulator = 0; // Reset the pause duration accumulator
        }

        // Convert the entire transcript to lowercase and trim whitespace
        const spokenWordsLowercase = transcript.toLowerCase().trim();

        // Split the correct text into sentences
        const correctSentences = correctText
          .trim()
          .split(/\?+/)
          .map((sentence) => sentence.trim());
        console.log(correctSentences, "correctSentences");

        // Get the answer text from the second sentence if it exists
        const answerText = correctSentences[0] ? correctSentences[0] : "";
        console.log(answerText, "answerText");
        // Extract possible answers from the answer text
        const possibleAnswers = answerText
          .toLowerCase()
          .split("/")
          .map((answer) => answer.trim());
        console.log(possibleAnswers, "possibleAnswers");

        // Check if any of the possible answers is in the spoken words
        const isAnswerInTxt = possibleAnswers.some((answer) =>
          spokenWordsLowercase.includes(answer)
        );
        console.log(isAnswerInTxt, "isAnswerInTxt");
        // Determine the content score based on the presence of any correct answer
        let contentscore = 0;
        if (isAnswerInTxt) {
          contentscore = 1;
        }

        setContentScoreOutOf90(contentscore);
        setTargetScoreOutOf90(contentscore);
        setLateSpeak(1);
        ////////////////////////////////////////////////////////////////
        return { word, isPauseWord, color };
      });

      setAvgWords(avgCount);
      setBadWords(badCount);
      setPauseWords(totalPauseWords);
      setTranscriptWithPauses(transcriptWithPauses);
    }
  }, [transcript, recordedAudioBlob]);

  const handleSubmitPractice = async () => {
    if (!questionData?.id || !subtype_id) return;

    try {
      const totalscore = 1;
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
        transcript: questionData?.transcription,
        scored_transcript: combinedTranscriptHTML,
        badWords:badWords,
        avgWords:avgWords,
        pauseWords:pauseWords,
        goodWords:goodWords
      };

      const questionId = questionData?.id;
      const formData = new FormData();
      formData.append("questionId", questionId.toString());
      formData.append("totalscore", totalscore.toString());
      formData.append("lateSpeak", lateSpeak.toString());
      formData.append("timeSpent", timeSpent.toString());
      formData.append("score", targetScoreOutOf90.toString());
      formData.append("score_data", JSON.stringify(score_data));

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
          // setAlert({ type: "success", message: "Your Answer Saved!" });
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

          <PageHeading title="Answer Short Question" />

          <div className="practiceLayout">
            <p className="my-3">
              Look at the text below. In 40 seconds, you must read this text
              aloud as naturally and clearly as possible. You have 40 seconds to
              read aloud. Speak within 3 seconds otherwise the microphone will
              close and you will lose the marks.
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
                     {startCountdownActive ? (
                      <span className="text-primary">Starting in: {startCountdown}</span>
                    ) : (
                      <span className="text-danger">Prepare: {formatTime(countdown)}</span>
                    )}
                    <CardButton questionData={questionData} />
                  </div>
                  <div className="innercontent">
                    
                    <AudioPlayer questionData={questionData} startCountdown={startCountdown } />
                  </div>
                  <div className="micSection">
                    <Recorder
                      onRecordingComplete={handleRecordingComplete}
                      onStopRecording={handleStopRecording}
                      resetRecording={resetRecording}
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
                      style={{ background: "rgb(228, 246, 255) !important" }}
                    >
                      <div
                        className="audio-inner p-4 rounded-3"
                      
                      >
                        <h3 className="mb-3">Answer</h3>
                        <p dangerouslySetInnerHTML={{ __html: questionData?.answer_american || "" }} />
                       
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Notes Section */}
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

export default AnswerShortQuestion;
