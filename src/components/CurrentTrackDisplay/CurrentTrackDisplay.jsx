export default function CurrentTrackDisplay({
  songName,
  artistName,
  coverPath,
}) {
  return (
    <>
      <img src={coverPath} className="current-track-display__cover" />
      <div className="current-track-display__text">
        <p className="current-track-display__text--title">{songName}</p>
        <p className="current-track-display__text--subtext">{artistName}</p>
      </div>
    </>
  );
}
