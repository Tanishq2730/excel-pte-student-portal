import React, { useRef, useState, useEffect } from "react";

const ShareLink: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  return (
    <div className="page-wrappers">
      <div className="content sharelink">
        <div className="container mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Component</th>
                <th>Score</th>
                <th>Suggestion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Content <i className="bi bi-info-circle"></i>
                </td>
                <td>45/90</td>
                <td>
                  <strong>[APEUni RA EN Algo V2e]</strong>
                  <br />
                  The content score of RA is also influenced by pronunciation.
                  Bad pronunciation will cause trouble in recognizing spoken
                  words.
                </td>
              </tr>
              <tr>
                <td>
                  Pronunciation <i className="bi bi-info-circle"></i>
                </td>
                <td>29/90</td>
                <td>
                  A low score in pronunciation may be caused by:
                  <ol>
                    <li>unrecognizable pronunciation</li>
                    <li>speaking too fast / slow</li>
                    <li>speaking with too few to too many pauses</li>
                    <li>speaking with a heavy tone, too many stresses</li>
                  </ol>
                  Seek help at Telegram (t.me/pteapeuni)
                </td>
              </tr>
              <tr>
                <td>
                  Fluency <i className="bi bi-info-circle"></i>
                </td>
                <td>41/90</td>
                <td>
                  A low score in fluency may be caused by:
                  <ol>
                    <li>too many pauses</li>
                    <li>speaking too slow / fast</li>
                    <li>an incontinuous speech</li>
                  </ol>
                  Seek help at Telegram (t.me/pteapeuni)
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mb-3 mt-4">
            <strong>Max Score:</strong> 90, <strong>Your Score:</strong> 37
            <span className="ms-3 badge bg-primary">RA EN V2e</span>
            <a href="#" className="ms-3">
              Differ from scores in APP?
            </a>
          </div>

          {/* AUDIO PLAYER */}
          <div className="audio-player">
            <audio ref={audioRef} src="your-audio-url.mp3" />
            <button className="icon-button" onClick={togglePlay}>
              {isPlaying ? '❚❚' : '▶️'}
            </button>
            <span className="time-label">{formatTime(currentTime)} / {formatTime(duration)}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}></div>
            </div>
            <i className="bi bi-volume-up icon-button"></i>
            <i className="bi bi-three-dots-vertical icon-button"></i>
          </div>

          <div className="mb-3 mt-3">
            <strong>AI Speech Recognition:</strong>
            <div className="mt-2 speech-text">
              <span className="text-danger">
                Schools host / parent teacher conferences
              </span>{" "}
              <span className="text-success">
                four times a year and it is important for families to attend
              </span>{" "}
              <span className="text-warning">
                This is your chance to meet with teachers / and ask questions /
                about your child's progress
              </span>{" "}
              <span className="text-success">It can be / helpful to</span>{" "}
              <span className="text-danger">
                write down questions ahead / of time
              </span>
            </div>
          </div>

          <p className="text-muted">
            Click on the colored text to check score details
          </p>

          <div className="d-grid">
            <button className="btn btn-success">
              Practice with AI Scoring on EXCELPTE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareLink;
