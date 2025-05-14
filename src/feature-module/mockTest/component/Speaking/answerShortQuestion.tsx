import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { image_url } from "../../../../environment";
import SpeechRecognition, { useSpeechRecognition, } from "react-speech-recognition";
import stringSimilarity from "string-similarity";
interface getProps {
  questionData: any;
  setAnswer: (answerData: any) => void;
  registerSubmit: (submitFn: () => void) => void;
}

interface Timestamp {
  word: string;
  timestamp: Date;
}

const AnswerShortQuestion: React.FC<getProps> = ({ questionData, setAnswer, registerSubmit }) => {
  const [countdown, setCountdown] = useState(questionData.Subtype.preparation_time);
   const [isRecording, setIsRecording] = useState(false);
   const [recordingProgress, setRecordingProgress] = useState(0);
   const [recordingTimeLeft, setRecordingTimeLeft] = useState(questionData.Subtype.recording_time);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
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
  const [targetScoreOutOf90, setTargetScoreOutOf90] = useState<any>("");
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
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
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
      timerRef.current = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      playBeep();
      setTimeout(() => setIsRecording(true), 300); // Small delay after beep
    }
    return () => clearTimeout(timerRef.current!);
  }, [countdown]);

  // Start recording when isRecording becomes true
  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];

        // ✅ Setup SpeechRecognition
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
          const audioBlobData = new Blob(chunks, { type: 'audio/webm' });
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
        setRecordingProgress(((questionData.Subtype.recording_time - recordingTimeLeft + 1) / questionData.Subtype.recording_time) * 100);
      }, 1000);
    }

    if (isRecording && recordingTimeLeft === 0 && mediaRecorder?.state === "recording") {
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
        const goodCount = spokenWords.filter((word:any) =>
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
      <p>
        Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.
      </p>
      <div className="recorderDetail">
        <div className="recorder">
          <div
            style={{
              border: "1px solid #111",
              padding: "20px",
              backgroundColor: "#f5f5f8",
              borderRadius: "5px",
              width: "fit-content",
            }}
          >
            <p style={{ marginBottom: 5 }}>Recorded Answer</p>
            <p style={{ marginBottom: 5 }}>Current status :</p>
            <h4 style={{ marginTop: 0 }}>
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

export default AnswerShortQuestion;
