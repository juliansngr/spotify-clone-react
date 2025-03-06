import SingleSong from "../SingleSong/SingleSong";
import "./SongCollection.css";

export default function SongCollection({ audioDB }) {
  return (
    <>
      <div className="song-collection-container">
        {audioDB.map((audio) => {
          return (
            <SingleSong
              coverPath={audio.cover}
              songID={audio.id}
              key={audio.id}
            />
          );
        })}
      </div>
    </>
  );
}
