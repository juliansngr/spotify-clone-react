import "./SingleSong.css";
import PlayPauseIcon from "../PlayPauseIcon/PlayPauseIcon";

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

export function SingleSongRandom({
  coverPath,
  songName,
  artistName,
  onClick,
  link,
  uri,
}) {
  return (
    <a href={uri || link}>
      <div
        className="single-song__container single-song__container--has-play"
        onClick={onClick}
      >
        <div className="cover-image-wrapper">
          <img className="cover-image" src={coverPath}></img>
          {/* <div className="single-song__play-icon">
          <PlayPauseIcon />
        </div> */}
        </div>
        <p className="single-song__title">{songName}</p>
        <p className="single-song__subtext">{artistName}</p>
      </div>
    </a>
  );
}
