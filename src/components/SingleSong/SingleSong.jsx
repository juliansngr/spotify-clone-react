import "./SingleSong.css";

export default function SingleSong({
  coverPath,
  songName,
  artistName,
  onClick,
}) {
  return (
    <div className="relative flex flex-col items-start h-auto p-2 xl:p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-neutral-800">
      <img
        className="max-w-40 sm:max-w-48 md:max-w-66 lg:max-w-78 xl:max-w-84 rounded-md"
        src={coverPath}
      ></img>
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
        className="single-song__container single-song__container--has-play text-wrap"
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
