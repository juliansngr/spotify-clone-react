import "./SingleSong.css";

export default function SingleSong({ coverPath, songID }) {
  return (
    <img
      className="cover-image"
      src={coverPath}
      onClick={() => {
        console.log(songID);
      }}
    ></img>
  );
}
