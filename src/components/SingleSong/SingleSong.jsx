import "./SingleSong.css";

export default function SingleSong({
  coverPath,
  songName,
  artistName,
  onClick,
}) {
  return (
    <div className="single-song__container" onClick={onClick}>
      <img className="cover-image" src={coverPath}></img>
      <p className="single-song__title">{songName}</p>
      <p className="single-song__subtext">{artistName}</p>
    </div>
  );
}
