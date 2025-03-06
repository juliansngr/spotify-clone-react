import { useState } from "react";
import ControlButton from "../ControlButton/ControlButton";
import ProgressBar from "../ProgressBar/ProgressBar";

import "./PlaybackControls.css";

// Image Imports
import PlayPauseIcon from "../PlayPauseIcon/PlayPauseIcon";
import PrevIcon from "../PrevIcon/PrevIcon";
import NextIcon from "../NextIcon/NextIcon";

export default function PlaybackControls() {
  const [playbackState, setPlaybackState] = useState(true);

  function handlePlayPause() {
    setPlaybackState(!playbackState);
  }

  return (
    <>
      <div class="playback-controls-cointainer">
        <div className="control-button__container">
          <ControlButton buttonImage={PrevIcon()} />
          <ControlButton
            buttonImage={PlayPauseIcon(playbackState)}
            onClick={handlePlayPause}
          />
          <ControlButton buttonImage={NextIcon()} />
        </div>
        <ProgressBar />
      </div>
    </>
  );
}
