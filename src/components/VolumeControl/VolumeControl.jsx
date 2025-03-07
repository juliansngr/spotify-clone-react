import { useAudioPlayer } from "../../../utils/AudioPlayerContext/AudioPlayerContext";
import "./VolumeControl.css";

export default function VolumeControl() {
  const { handleVolumeChange, volume, isMuted, handleMute } = useAudioPlayer();

  return (
    <>
      <button className="mute-button" onClick={handleMute} value={0}>
        {isMuted ? (
          <i class="material-icons">volume_off</i>
        ) : (
          <i class="material-icons">volume_up</i>
        )}
      </button>

      <input
        className="volume-control"
        type="range"
        step="0.001"
        min="0"
        max="1"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
      />
    </>
  );
}
