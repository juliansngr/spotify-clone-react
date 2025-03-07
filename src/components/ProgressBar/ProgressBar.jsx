import "./ProgressBar.css";

import { useAudioPlayer } from "../../../utils/AudioPlayerContext/AudioPlayerContext";

export default function ProgressBar() {
  const { progress, songDuration } = useAudioPlayer();

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <div className="progress-bar-container">
      <p className="progress-bar__duration-text">{formatTime(progress)}</p>
      <input
        type="range"
        className="progress-bar"
        max={songDuration}
        value={progress}
      />
      <p className="progress-bar__duration-text">{formatTime(songDuration)}</p>
    </div>
  );
}
