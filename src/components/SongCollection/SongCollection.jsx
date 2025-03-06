import SingleSong from "../SingleSong/SingleSong";
import "./SongCollection.css";

export default function SongCollection({ audioDB, handleTrackSelection }) {
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
                handleTrackSelection(audio.id);
              }}
              key={audio.id}
            />
          );
        })}
      </div>
    </>
  );
}
