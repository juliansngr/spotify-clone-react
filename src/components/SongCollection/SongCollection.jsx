import SingleSong from "../SingleSong/SingleSong";
import { SingleSongRandom } from "../SingleSong/SingleSong";
import "./SongCollection.css";
import "../SingleSong/SingleSong.css";
import { useAudioPlayer } from "../../../utils/AudioPlayerContext/AudioPlayerContext";

import { useState } from "react";

import Tooltip from "../Tooltip/Tooltip";
import { Link } from "react-router-dom";
import PlayPauseIcon from "../PlayPauseIcon/PlayPauseIcon";
import ControlButton from "../ControlButton/ControlButton";
import GeneralButton from "../GeneralButton/GeneralButton";

export default function SongCollection() {
  const {
    audioDB,
    isPlaying,
    setCurrentSong,
    currentSong,
    handleTrackSelection,
    togglePlayPause,
  } = useAudioPlayer();

  const [randomTrackState, setRandomTrackState] = useState([]);

  async function generateRandomSongID() {
    try {
      const response = await fetch("/data.json");
      const trackIdDatabase = await response.json();

      function getRandomIdNumber() {
        return Math.floor(Math.random() * trackIdDatabase.length);
      }
      const randomTrackID = trackIdDatabase[getRandomIdNumber()].track_id;
      console.log(randomTrackID);
      return randomTrackID;
    } catch (error) {
      console.error("Fehler beim Laden der Track-Daten:", error);
      return null;
    }
  }

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  const body = "grant_type=client_credentials";

  async function getSpotifyToken() {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    };

    try {
      const response = await fetch(`https://accounts.spotify.com/api/token`, {
        method: "POST",
        headers: headers,
        body: body,
      });
      const data = await response.json("");

      if (!response.ok) {
        throw new Error(`Fetch Error! ${response.headers}`);
      }

      return data.access_token;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchRandomTrack(trackId, token) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json("");

      console.log(data);

      if (!response.ok) {
        if (response.status === 404) {
          console.log(`Track ${trackId} does not exist!`);
          return;
        }
        throw new Error(`Fetch Error! ${response.status}`);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="song-collection-container">
        {audioDB.map((audio) => {
          return (
            <div class="single-song__card-wrapper">
              <ControlButton
                className="single-song__play-button"
                buttonImage={PlayPauseIcon(isPlaying && audio === currentSong)}
                onClick={() => {
                  if (audio === currentSong) {
                    togglePlayPause();
                  } else {
                    setCurrentSong(audio);
                    handleTrackSelection(audio.path);
                  }
                }}
              />
              {/* <button
                className="single-song__play-button"
                onClick={() => {
                  setCurrentSong(audio);
                  handleTrackSelection(audio.path);
                }}
              >
                <PlayPauseIcon />
              </button> */}
              <Link to={`/track/${audio.id}`}>
                <SingleSong
                  coverPath={audio.cover}
                  songName={audio.name}
                  artistName={audio.artist}
                  // onClick={() => {
                  //   setCurrentSong(audio);
                  //   handleTrackSelection(audio.path);
                  // }}
                  key={audio.id}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="feeling-lucky-button-section">
        <div className="feeling-lucky-button-container">
          <GeneralButton
            buttonText="Feelin' lucky today?"
            onClick={async () => {
              const access_token = await getSpotifyToken();
              const randomID = await generateRandomSongID();
              const randomTrack = await fetchRandomTrack(
                randomID,
                access_token
              );

              setRandomTrackState([randomTrack]);
            }}
          />

          <Tooltip
            className="tooltip--padding"
            text={
              "Press to get a completely random song you've probably never heard before!"
            }
          >
            <span class="material-symbols-outlined">info</span>
          </Tooltip>
        </div>
        {randomTrackState.map((track) => {
          if (randomTrackState) {
            return (
              <SingleSongRandom
                coverPath={track.album.images[0].url}
                songName={track.album.name}
                artistName={track.artists[0].name}
                link={track.external_urls.spotify}
                uri={track.uri}
                // onClick={() => {
                //   setCurrentSong(audio);
                //   handleTrackSelection(audio.path);
                // }}
                // key={randomSongID}
              />
            );
          }
        })}
      </div>
    </>
  );
}
