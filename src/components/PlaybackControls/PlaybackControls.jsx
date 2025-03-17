import { useState } from "react";
import ControlButton from "../ControlButton/ControlButton";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useAudioPlayer } from "../../../utils/AudioPlayerContext/AudioPlayerContext";

// Image Imports
import PlayPauseIcon from "../PlayPauseIcon/PlayPauseIcon";
import PrevIcon from "../PrevIcon/PrevIcon";
import NextIcon from "../NextIcon/NextIcon";
import CurrentTrackDisplay from "../CurrentTrackDisplay/CurrentTrackDisplay";
import VolumeControl from "../VolumeControl/VolumeControl";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function PlaybackControls() {
  const [playbackState, setPlaybackState] = useState(true);

  // console.log(useAudioPlayer());
  const { audioDB, isPlaying, togglePlayPause, currentSong } = useAudioPlayer();

  function handlePlayPause() {
    setPlaybackState(!playbackState);
  }

  return (
    <>
      <div className="flex justify-between items-center flex-col gap-5 lg:flex-row bg-gradient-to-t from-black to-neutral-800/90 lg:bg-black lg:bg-none py-5 fixed bottom-0 w-full z-50 [clip-path:ellipse(100%_60%_at_50%_60%)] lg:[clip-path:none]">
        <div className="flex items-center pl-4">
          <CurrentTrackDisplay
            songName={currentSong.name}
            artistName={currentSong.artist}
            coverPath={currentSong.cover}
          />
        </div>
        <div className="flex flex-col-reverse gap-2 lg:flex-col justify-center max-w-[900px]">
          <div className="control-button__container">
            <SignedOut>
              <ControlButton buttonImage={PrevIcon()} disabled={true} />
              <ControlButton
                buttonImage={PlayPauseIcon(isPlaying)}
                onClick={togglePlayPause}
                disabled={true}
              />
              <ControlButton buttonImage={NextIcon()} disabled={true} />
            </SignedOut>
            <SignedIn>
              <ControlButton buttonImage={PrevIcon()} disabled={false} />
              <ControlButton
                buttonImage={PlayPauseIcon(isPlaying)}
                onClick={togglePlayPause}
                disabled={false}
              />
              <ControlButton buttonImage={NextIcon()} disabled={false} />
            </SignedIn>
          </div>
          <SignedOut>
            <ProgressBar disabled={true} />
          </SignedOut>
          <SignedIn>
            <ProgressBar disabled={false} />
          </SignedIn>
        </div>
        <div className="hidden lg:block">
          <VolumeControl />
        </div>
      </div>
    </>
  );
}
