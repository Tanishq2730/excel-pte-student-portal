import React, { useState, useRef, useEffect } from "react";

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

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

  return (
    <div className="mt-4">
      <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2">
        <button
          className="btn btn-outline-secondary rounded-circle me-3"
          onClick={togglePlay}
        >
          <i className={`bi ${isPlaying ? "fa fa-pause" : "fa fa-play"}`}></i>
        </button>

        <input
          type="range"
          className="form-range me-2 flex-grow-1"
          value={currentTime}
          max={duration}
          onChange={handleProgressChange}
        />
        <span className="me-3 text-muted">
          {formatTime(currentTime)}/{formatTime(duration)}
        </span>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="form-range me-2"
          style={{ width: "80px" }}
        />
        <select
          value={playbackRate}
          onChange={handleSpeedChange}
          className="form-select w-auto"
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1.0</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>

        <audio ref={audioRef} src="/your-audio.mp3" preload="metadata" />
      </div>
    </div>
  );
};

export default AudioPlayer;
