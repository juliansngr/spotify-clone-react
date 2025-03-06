import "./App.css";

// Temporary Imports
import PlaybackControls from "./components/PlaybackControls/PlaybackControls";
import { audioDatabase } from "../utils/AudioDatabase/AudioDatabase";
import { useState } from "react";
import SingleSong from "./components/SingleSong/SingleSong";
import SongCollection from "./components/SongCollection/SongCollection";

function App() {
  const [audioDB, setAudioDB] = useState(audioDatabase);
  const [currentTrack, setCurrentTrack] = useState([audioDB[0]]);

  function handleTrackSelection(selectedTrackID) {
    console.log("handleTrackSelection initiated");
    const newCurrentTrack = audioDB.filter((track) => {
      if (selectedTrackID === track.id) {
        return track;
      }
    });

    setCurrentTrack(newCurrentTrack);
  }

  console.log("current track: ", currentTrack);

  return (
    <>
      <PlaybackControls audioDB={audioDB} currentTrack={currentTrack} />
      <SongCollection
        audioDB={audioDB}
        handleTrackSelection={handleTrackSelection}
      />
    </>
  );
}

export default App;
