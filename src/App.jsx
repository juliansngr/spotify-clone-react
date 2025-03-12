import "./App.css";

// Temporary Imports
import PlaybackControls from "./components/PlaybackControls/PlaybackControls";
import { AudioPlayerProvider } from "../utils/AudioPlayerContext/AudioPlayerContext";
import SongCollection from "./components/SongCollection/SongCollection";
import Header from "./components/Header/Header";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import EmptySongCollection from "./components/EmptySongCollection/EmptySongCollection";

function App() {
  // const { currentSong, setCurrentSong } = useAudioPlayer();
  // const [currentTrack, setCurrentTrack] = useState([audioDB[0]]);

  // function handleTrackSelection(selectedTrackID) {
  //   // console.log("handleTrackSelection initiated");
  //   const newCurrentTrack = audioDB.filter((track) => {
  //     if (selectedTrackID === track.id) {
  //       return track;
  //     }
  //   });

  //   setCurrentTrack(newCurrentTrack);
  // }

  // console.log("current track: ", currentTrack);

  return (
    <>
      <Header />
      <AudioPlayerProvider>
        <PlaybackControls />
        <SignedOut>
          <EmptySongCollection />
        </SignedOut>
        <SignedIn>
          <SongCollection />
        </SignedIn>
      </AudioPlayerProvider>
    </>
  );
}

export default App;
