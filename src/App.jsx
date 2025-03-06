import "./App.css";

// Temporary Imports
import PlaybackControls from "./components/PlaybackControls/PlaybackControls";
import { audioDatabase } from "../utils/AudioDatabase/AudioDatabase";
import { useRef, useState } from "react";
import { AudioPlayerProvider } from "../utils/AudioPlayerContext/AudioPlayerContext";
import SongCollection from "./components/SongCollection/SongCollection";

function App() {
  const [audioDB, setAudioDB] = useState(audioDatabase);
  const [currentTrack, setCurrentTrack] = useState([audioDB[0]]);

  function handleTrackSelection(selectedTrackID) {
    // console.log("handleTrackSelection initiated");
    const newCurrentTrack = audioDB.filter((track) => {
      if (selectedTrackID === track.id) {
        return track;
      }
    });

    setCurrentTrack(newCurrentTrack);
  }

  // console.log("current track: ", currentTrack);

  return (
    <>
      <AudioPlayerProvider>
        <PlaybackControls audioDB={audioDB} currentTrack={currentTrack} />
        <SongCollection
          audioDB={audioDB}
          handleTrackSelection={handleTrackSelection}
        />
      </AudioPlayerProvider>
    </>
  );
}

export default App;
