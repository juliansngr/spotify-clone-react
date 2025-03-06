import { useState } from "react";
import ControlButton from "../ControlButton/ControlButton";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useAudioPlayer } from "../../../utils/AudioPlayerContext/AudioPlayerContext";

import "./PlaybackControls.css";

// Image Imports
import PlayPauseIcon from "../PlayPauseIcon/PlayPauseIcon";
import PrevIcon from "../PrevIcon/PrevIcon";
import NextIcon from "../NextIcon/NextIcon";
import CurrentTrackDisplay from "../CurrentTrackDisplay/CurrentTrackDisplay";

export default function PlaybackControls() {
  const [playbackState, setPlaybackState] = useState(true);

  // console.log(useAudioPlayer());
  const { audioDB, isPlaying, togglePlayPause, currentSong } = useAudioPlayer();

  function handlePlayPause() {
    setPlaybackState(!playbackState);
  }

  return (
    <>
      <div className="playback-controls-container">
        <div className="current-track-container">
          <CurrentTrackDisplay
            songName={currentSong.name}
            artistName={currentSong.artist}
            coverPath={currentSong.cover}
          />
        </div>
        <div className="playback-middlesection-container">
          <div className="control-button__container">
            <ControlButton buttonImage={PrevIcon()} />
            <ControlButton
              buttonImage={PlayPauseIcon(isPlaying)}
              onClick={togglePlayPause}
            />
            <ControlButton buttonImage={NextIcon()} />
          </div>
          <ProgressBar />
        </div>
        <div className="current-track-container">
          <CurrentTrackDisplay
            songName={currentSong.name}
            artistName={currentSong.artist}
          />
        </div>
      </div>
    </>
  );
}
