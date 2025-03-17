import "./ProgressBar.css";

import { useAudioPlayer } from "../../../utils/AudioPlayerContext/AudioPlayerContext";

export default function ProgressBar() {
  const { progress, songDuration, handleProgressBar } = useAudioPlayer();

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <div className="flex gap-2 md:gap-4  w-[350px] sm:w-[600px] md:w-[700px] lg:w-[500px] xl:w-[700px]  2xl:w-[900px]">
      <p>{formatTime(progress)}</p>
      <input
        type="range"
        className="w-full"
        max={songDuration}
        value={progress}
        onChange={handleProgressBar}
      />
      <p>{formatTime(songDuration)}</p>
    </div>
  );
}
