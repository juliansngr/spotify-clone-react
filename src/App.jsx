import "./App.css";

// Temporary Imports
import PlaybackControls from "./components/PlaybackControls/PlaybackControls";
import { AudioPlayerProvider } from "../utils/AudioPlayerContext/AudioPlayerContext";
import SongCollection from "./components/SongCollection/SongCollection";

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
      <AudioPlayerProvider>
        <PlaybackControls />
        <SongCollection />
      </AudioPlayerProvider>
    </>
  );
}

export default App;
