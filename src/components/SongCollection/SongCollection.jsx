import SingleSong from "../SingleSong/SingleSong";
import { SingleSongRandom } from "../SingleSong/SingleSong";
import "./SongCollection.css";
import { useAudioPlayer } from "../../../utils/AudioPlayerContext/AudioPlayerContext";
import FeelingLuckyButton from "../FeelingLuckyButton/FeelingLuckyButton";
import { useState } from "react";
import { trackIdDatabase } from "../../../utils/trackIdDatabase/trackIdDatabase";
import Tooltip from "../Tooltip/Tooltip";

export default function SongCollection() {
  const { audioDB, currentSong, setCurrentSong, handleTrackSelection } =
    useAudioPlayer();

  const [randomTrackState, setRandomTrackState] = useState([]);

  // const randomSongID = "2WYs5LxOZfEyURXu7V0O1a";
  function generateRandomSongID() {
    //Base62 Kodierung -> Leider zu ungenau, deshalb switch auf eigene Datenbank
    // const charSet =
    //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // let randomSongID = "";
    // for (let i = 0; i < 22; i++) {
    //   randomSongID += charSet.charAt(
    //     Math.floor(Math.random() * charSet.length)
    //   );
    // }
    // console.log(randomSongID);
    // return randomSongID;
    //------------------------------

    function getRandomIdNumber() {
      return Math.floor(Math.random() * 114001);
    }

    const randomSongID = trackIdDatabase[getRandomIdNumber()].track_id;
    return randomSongID;
  }

  const clientId = "300d4a7b3e434a679584ae6117d6aaf7";
  const clientSecret = "53f0ae113112461e91dae9c11d7137f5";

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
      // console.log(data.access_token);
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
      <div className="feeling-lucky-button-section">
        <div className="feeling-lucky-button-container">
          <FeelingLuckyButton
            onClick={async () => {
              const access_token = await getSpotifyToken();
              const randomID = generateRandomSongID();
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
