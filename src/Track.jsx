import Header from "./components/Header/Header";
import { Link, useParams } from "react-router-dom";
import { useAudioPlayer } from "../utils/AudioPlayerContext/AudioPlayerContext";

import "./Track.css";
import { useEffect, useState } from "react";
import PlaybackControls from "./components/PlaybackControls/PlaybackControls";
import NotFoundPage from "./NotFoundPage";
import ControlButton from "./components/ControlButton/ControlButton";
import PlayPauseIcon from "./components/PlayPauseIcon/PlayPauseIcon";

export default function Track() {
  const {
    audioDB,
    setCurrentSong,
    currentSong,
    isPlaying,
    togglePlayPause,
    handleTrackSelection,
  } = useAudioPlayer();
  const { id } = useParams();
  const [duration, setDuration] = useState("");

  const selectedTrack = audioDB.find((track) => {
    return track.id === id;
  });

  if (!selectedTrack) {
    return <NotFoundPage />;
  }

  useEffect(() => {
    getAudioDuration(selectedTrack.path);
  });

  function getAudioDuration(filePath) {
    const audioForDuration = new Audio(filePath);

    // Event-Listener, der ausgelöst wird, wenn Metadaten geladen sind
    audioForDuration.addEventListener("loadedmetadata", () => {
      const durationInSeconds = audioForDuration.duration; // Dauer in Sekunden

      // Optional: Umwandlung in Minuten und Sekunden
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = Math.floor(durationInSeconds % 60);

      const durationString = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

      setDuration(durationString);
    });
  }

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="track__content-section">
          <div className="track__content-wrapper">
            <div className="track__header-section">
              <img src={selectedTrack.cover} className="track__cover-image" />
              <span className="track__text-container">
                <p>Single</p>
                <h1 className="track__name-heading">{selectedTrack.name}</h1>
                <h3 className="track__artist-heading">
                  {selectedTrack.artist} - {selectedTrack.year}
                </h3>
              </span>
            </div>
            <div className="track__playback-controls">
              <ControlButton
                className="track__play-button"
                buttonImage={PlayPauseIcon(
                  isPlaying && selectedTrack === currentSong
                )}
                onClick={() => {
                  if (selectedTrack === currentSong) {
                    togglePlayPause();
                  } else {
                    setCurrentSong(selectedTrack);
                    handleTrackSelection(selectedTrack.path);
                  }
                }}
              />
            </div>
            <div>
              <div className="track__table-header">
                <span className="track__font-grey">#</span>
                <span className="track__font-grey">Track</span>
                <span className="track__font-grey">Dauer</span>
              </div>
              <hr />
              <div
                className="track__list"
                onClick={() => {
                  setCurrentSong(selectedTrack);
                  handleTrackSelection(selectedTrack.path);
                }}
              >
                <span className="track__identifier track__font-grey track__span">
                  1
                </span>
                <span className="track__play-icon track__font-grey track__span">
                  ▶
                </span>
                <span className="track__list-title-item">
                  <span className="track__list-title">
                    {selectedTrack.name}
                  </span>
                  <span className="track__list-artist track__font-grey">
                    {selectedTrack.artist}
                  </span>
                </span>
                <span>{duration}</span>
              </div>
            </div>
          </div>
          <Link to={"/"}>
            <button className="track__back-home-button">← Back to Home</button>
          </Link>
        </div>
      </main>
      <PlaybackControls />
    </>
  );
}
