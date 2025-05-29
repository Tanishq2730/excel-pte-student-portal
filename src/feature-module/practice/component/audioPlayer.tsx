import React, { useState, useRef, useEffect } from "react";
import { image_url } from "../../../environment";

interface QuestionData {
  speak_audio_file: string;
}
interface AudioPlayerProps {
  questionData?: QuestionData | null;
  startCountdown?: number | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ questionData,startCountdown }) => {
  const url = `${image_url}${questionData?.speak_audio_file}`;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
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

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuteState = !isMuted;
    audioRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
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

  useEffect(() => {
  if (startCountdown === 0 && audioRef.current) {
    audioRef.current.play();
    setIsPlaying(true);
  }
}, [startCountdown]);

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
      setIsMuted(newVolume === 0);
    }
  };

  const handleVolumeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let volumeValue = 1;
    if (value === "low") volumeValue = 0.3;
    else if (value === "medium") volumeValue = 0.6;
    else volumeValue = 1;

    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
      audioRef.current.muted = false;
    }
    setVolume(volumeValue);
    setIsMuted(false);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpeed = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
      setPlaybackRate(newSpeed);
    }
  };

  return (
    <div className="">
      <div
        className="d-flex flex-wrap align-items-center gap-3 p-3 rounded bg-white border"
        style={{ borderLeft: "6px solid #4a90e2" }}
      >
        {/* Play / Pause */}
        <button
          className="btn btn-primary rounded-circle"
          onClick={togglePlay}
          title={isPlaying ? "Pause" : "Play"}
        >
          <i className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
        </button>

        {/* Progress Bar */}
        <div className="flex-grow-1 me-2" style={{ minWidth: "200px",display:'flex',alignItems:'center' }}>
          <input
            type="range"
            className="form-range"
            value={currentTime}
            max={duration}
            onChange={handleProgressChange}
            style={{
              accentColor: "#4a90e2",
              background: `linear-gradient(to right, #4a90e2 ${
                (currentTime / duration) * 100
              }%, #e9ecef ${(currentTime / duration) * 100}%)`,
              height: "8px",
              borderRadius: "4px",
              cursor: "pointer",
              WebkitAppearance: "none",
              appearance: "none"
            }}
          />
          <small className="text-muted" style={{width:"6em",marginLeft:"1em"}}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </small>
        </div>

        {/* Mute Button */}
        <button
          className="btn btn-outline-primary rounded-circle px-2 py-2"
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
          style={{ padding: "10px 12px !important" }}
        >
          <i
            className={`fa ${isMuted ? "fa-volume-mute" : "fa-volume-up"}`}
          ></i>
        </button>

        {/* Volume Slider */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="form-range"
          style={{ width: "80px", accentColor: "#4a90e2" }}
        />

        {/* Volume Dropdown */}
        

        {/* Speed Dropdown */}
        <select
          value={playbackRate}
          onChange={handleSpeedChange}
          className="form-select form-select-sm w-auto"
          title="Playback Speed"
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1.0x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>

        <audio ref={audioRef} src={url} preload="metadata" />
      </div>
    </div>
  );
};

export default AudioPlayer;
