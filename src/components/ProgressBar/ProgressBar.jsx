import "./ProgressBar.css";

import { useAudioPlayer } from "../../../utils/AudioPlayerContext/AudioPlayerContext";

export default function ProgressBar({}) {
  const { progress, songDuration } = useAudioPlayer();

  return (
    <div className="progress-bar-container">
      <p className="progress-bar__duration-text">{progress}</p>
      <input type="range" className="progress-bar" />
      <p className="progress-bar__duration-text">{songDuration}</p>
    </div>
  );
}
