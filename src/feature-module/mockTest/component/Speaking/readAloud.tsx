import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { image_url } from "../../../../environment";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import stringSimilarity from "string-similarity";
interface getProps {
  questionData: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => void) => void;
  setCountdownDone: (done: boolean) => void;
}

interface Timestamp {
  word: string;
  timestamp: Date;
}

const ReadAloud: React.FC<getProps> = ({
  questionData,
  setAnswer,
  registerSubmit,
  setCountdownDone,
}) => {
  const [countdown, setCountdown] = useState(
    questionData.Subtype.preparation_time
  );
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [recordingTimeLeft, setRecordingTimeLeft] = useState(
    questionData.Subtype.recording_time
  );
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const { id, session_id } = useParams<{ id: any; session_id: any }>();
  const [transcript, setTranscript] = useState<any>(null);
  const [recordedAudioBlob, setSetAudioBlob] = useState<any>(null);
  const timerRef = useRef<number | null>(null);
  const recordingRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
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
  const [recordingStartTime, setRecordingStartTime] = useState<number>(
    Date.now()
  );

  const playBeep = () => {
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(1000, ctx.currentTime); // 1000 Hz = beep
    gainNode.gain.setValueAtTime(1, ctx.currentTime);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.3); // 0.3 second beep
  };

  // Countdown
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = window.setTimeout(
        () => setCountdown(countdown - 1),
        1000
      );
    } else {
      playBeep();
      setTimeout(() => setIsRecording(true), 300); // Small delay after beep
      setCountdownDone(true);
    }
    return () => clearTimeout(timerRef.current!);
  }, [countdown]);

  // Start recording when isRecording becomes true
  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];

        // ✅ Setup SpeechRecognition
        const SpeechRecognition =
          (window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.continuous = true;

        recognition.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }
          setTranscript(finalTranscript);
        };

        recognition.onerror = (e: any) => {
          console.error("Speech recognition error:", e);
        };

        recognition.start(); // ✅ Start listening

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          const audioBlobData = new Blob(chunks, { type: "audio/webm" });
          setSetAudioBlob(audioBlobData); // ✅ Send both audio and text
          setAudioChunks(chunks);
          recognition.stop(); // ✅ Stop listening
          stream.getTracks().forEach((track) => track.stop());
        };

        recorder.start();
        setMediaRecorder(recorder);
        setAudioChunks([]);
      } catch (error) {
        console.error("Error accessing microphone", error);
      }
    };

    if (isRecording) {
      startRecording();
    }
  }, [isRecording]);

  // Handle recording time countdown and stop
  useEffect(() => {
    if (isRecording && recordingTimeLeft > 0) {
      recordingRef.current = window.setTimeout(() => {
        setRecordingTimeLeft((prev: any) => prev - 1);
        setRecordingProgress(
          ((questionData.Subtype.recording_time - recordingTimeLeft + 1) /
            questionData.Subtype.recording_time) *
            100
        );
      }, 1000);
    }

    if (
      isRecording &&
      recordingTimeLeft === 0 &&
      mediaRecorder?.state === "recording"
    ) {
      mediaRecorder.stop();
      setIsRecording(false);
    }

    return () => clearTimeout(recordingRef.current!);
  }, [isRecording, recordingTimeLeft]);

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

      const goodCount = spokenWords.filter((word: any) =>
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
      const goodCount2 = spokenWords.filter((word: any) =>
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

  useEffect(() => {
    setSetAudioBlob(null); // Reset selection on question change
  }, [questionData]);

  useEffect(() => {
    registerSubmit(handleSubmit); // Register new submit function on change
  }, [questionData, recordedAudioBlob, transcript]);

  const handleSubmit = async () => {
    console.log(questionData, "question");
    if (!recordedAudioBlob && !transcript) {
      return false;
    }

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
    formData.append("sessionId", session_id.toString());
    formData.append("mocktest_id", id.toString());
    formData.append("totalscore", totalscore.toString());
    formData.append("lateSpeak", lateSpeak.toString());
    formData.append("score", targetScoreOutOf90.toString());
    formData.append("score_data", JSON.stringify(score_data));
    console.log(recordedAudioBlob);

    // Attach audio blob as file
    if (recordedAudioBlob) {
      const audioFile = new File([recordedAudioBlob], "answer.wav", {
        type: "audio/wav",
      });
      formData.append("answer", audioFile);
    }
    return formData;
  };

  return (
    <div className="container mt-3">
      <p className="mockHead">
        Look at the text below. In 40 seconds, you must read this text aloud as
        naturally and clearly as possible. You have 40 seconds to read aloud.
      </p>
      <div className="recorderDetail">
        <div className="recorder">
          <div
            style={{
              border: "1px solid #111",
              padding: "20px",
              backgroundColor: "#f5f5f8",
              borderRadius: "5px",
              width:'25em'
            }}
          >
            <p style={{ marginBottom: 5 }}>Recorded Answer</p>
            <p style={{ marginBottom: 5 }}>Current status :</p>
            <h4 style={{ marginTop: 0,width:"100%" }}>
              {isRecording
                ? "Recording..."
                : countdown > 0
                ? `Beginning in ${countdown} Seconds`
                : "Recording completed"}
            </h4>
            <div
              style={{
                height: 8,
                backgroundColor: "#d3d3d3",
                borderRadius: 10,
                position: "relative",
                overflow: "hidden",
                marginTop: 10,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: isRecording ? `${recordingProgress}%` : "0%",
                  backgroundColor: "#111",
                  transition: "width 1s linear",
                  borderRadius: 10,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="recorderQuestion mt-3">
          <div dangerouslySetInnerHTML={{ __html: questionData.question }} />
        </div>
      </div>
    </div>
  );
};

export default ReadAloud;
