import React, { useState, useEffect } from "react";
import MockRecorder from "../MockRecorder";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { saveIntroduction } from "../../../../api/mocktestAPI";

interface Props {
  id: string | undefined;
  session_id: string;
  LoadFinal: () => void;
  setCannotSkipModal: (value: boolean) => void;
}

const SelfIntroduction: React.FC<Props> = ({ id, session_id, LoadFinal,setCannotSkipModal  }) => {
  const [mtime, setmTime] = useState<number>(55);
  const [time2, setTime2] = useState<number>(25);
  const [recordingStoppedModal, setRecordingStoppedModal] =
    useState<boolean>(false);
  const [showRecorder, setShowRecorder] = useState(false); // Moved up ✅
  const [recordingDone, setRecordingDone] = useState(false);

  const [resetRecording, setResetRecording] = useState<boolean>(false);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string>("");
  const [startRecording, setStartRecording] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
  if (time2 > 0) {
    const interval = setInterval(() => {
      setTime2((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  } else {
    setShowRecorder(true);
    setStartRecording(true); // ✅ Start recording automatically
  }
}, [time2]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>; // ✅ Fixed type
    if (showRecorder && mtime > 0) {
      interval = setInterval(() => {
        setmTime((prev) => prev - 1);
      }, 1000);
    } else if (showRecorder && mtime === 0) {
      setRecordingStoppedModal(true);
      setRecordingDone(true); // ✅ enable the Next button
    }
    return () => clearInterval(interval);
  }, [showRecorder, mtime]);

  useEffect(() => {
    const introtime = localStorage.getItem("introtime");
    setmTime(introtime ? parseInt(introtime) : 55);
  }, []);

  const progress = ((25 - time2) / 25) * 100;

  const handleRecordingComplete = (audioBlob: Blob, audioUrl: string) => {
    console.log("Recording complete:", audioBlob, audioUrl);
    
    setRecordedAudioBlob(audioBlob);
    setRecordedAudioUrl(audioUrl);
  };

  const handleStopRecording = async () => {
  setCannotSkipModal(false);
  setResetRecording(true);
  SpeechRecognition.stopListening();
  resetTranscript();
  setTimeout(() => setResetRecording(false), 100);
  setRecordingDone(true);
  LoadFinal(); // ✅ Inform parent

  if (recordedAudioBlob && id && session_id) {
    try {
      const formData = new FormData();      
      if (recordedAudioBlob) {
        const audioFile = new File([recordedAudioBlob], "answer.wav", {
          type: "audio/wav",
        });
        formData.append("answer", audioFile);
      }

      formData.append("mocktestId", id);
      formData.append("sessionid", session_id);

      const response = await saveIntroduction(formData);
      console.log("Self introduction saved:", response);
    } catch (err) {
      console.error("Error saving self-introduction:", err);
    }
  }
};
console.log("session_id", session_id);

  return (
    <div>
      <div className="container">
        <div className="mockInfoContent">
          <h6 className="font-weight-bold">
            Read the prompt below. In 25 seconds, you must reply in your own
            words, as naturally and clearly as possible. You have 30 seconds to
            record your response. Your response will be sent together with your
            score report to the institutions selected by you.
          </h6>
          <br />
          <h5 className="mb-3 font-weight-normal">
            Please introduce yourself. For example, you could talk about one of
            the following.
          </h5>
          <div className="row">
            <div className="col-md-6">
              <h5 className="font-weight-normal">- Your interests</h5>
              <h5 className="font-weight-normal">
                - Your plans for future study
              </h5>
              <h5 className="font-weight-normal">
                - Why you want to study abroad
              </h5>
              <h5 className="font-weight-normal">
                - Why you need to learn English
              </h5>
              <h5 className="font-weight-normal">- Why you chose this test</h5>
              <br />
            </div>

            <div className="col-md-6">
              
              {showRecorder ? (
                <div className="micSection">
                  <MockRecorder
                    onRecordingComplete={handleRecordingComplete}
                    onStopRecording={handleStopRecording}
                    resetRecording={resetRecording}
                    startRecording={startRecording} // ✅ Pass this prop
                  />
                </div>
              ) :(
              <div className="record-box">
                <p className="record-title">Recorded Answer</p>
                <p className="record-status">
                  {time2 > 0 ? `Recording in ${time2} Seconds` : "Finished..."}
                </p>

                <div className="progress-wrapper">
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div
                    className="progress-indicator"
                    style={{ left: `${progress}%` }}
                  ></div>
                </div>
              </div>
              )}
            </div>

            
          </div>
        </div>

        {recordingStoppedModal && (
          <div className="modal-backdrop">
            <div className="modal-box">
              <h4>Time is up!</h4>
              <button className="btn btn-primary mt-3" onClick={() => setRecordingStoppedModal(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfIntroduction;
