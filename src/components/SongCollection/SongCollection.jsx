import SingleSong from "../SingleSong/SingleSong";
import "./SongCollection.css";
import { useAudioPlayer } from "../../../utils/AudioPlayerContext/AudioPlayerContext";

export default function SongCollection() {
  const { audioDB, currentSong, setCurrentSong, handleTrackSelection } =
    useAudioPlayer();

  return (
    <>
      <div className="song-collection-container">
        {audioDB.map((audio) => {
          return (
            <SingleSong
              coverPath={audio.cover}
              songName={audio.name}
              artistName={audio.artist}
              onClick={() => {
                setCurrentSong(audio);
                handleTrackSelection(audio.path);
              }}
              key={audio.id}
            />
          );
        })}
      </div>
    </>
  );
}
