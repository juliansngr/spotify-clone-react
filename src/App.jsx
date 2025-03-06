import "./App.css";

// Temporary Imports
import PlaybackControls from "./components/PlaybackControls/PlaybackControls";
import { audioDatabase } from "../utils/AudioDatabase/AudioDatabase";
import { useState } from "react";
import SingleSong from "./components/SingleSong/SingleSong";
import SongCollection from "./components/SongCollection/SongCollection";

function App() {
  // const [currentTrack, setCurrentTrack] = useState([]);
  const [audioDB, setAudioDB] = useState(audioDatabase);

  return (
    <>
      <PlaybackControls />
      <SongCollection audioDB={audioDB} />
    </>
  );
}

export default App;
