import { createContext, useContext, useEffect, useRef, useState } from "react";
import { audioDatabase } from "../AudioDatabase/AudioDatabase";

const AudioPlayerContext = createContext();

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}

export function AudioPlayerProvider({ children }) {
  const [audioDB, setAudioDB] = useState(audioDatabase);
  const audioRef = useRef(new Audio(audioDB[0].path));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(audioDB[0]);
  const [progress, setProgress] = useState(0);
  const [songDuration, setSongDuration] = useState(0);

  useEffect(() => {
    const currentAudio = audioRef.current;

    function handleLoadedMetadata() {
      setSongDuration(currentAudio.duration);
    }

    function handleCurrentTime() {
      setProgress(currentAudio.currentTime);
    }

    currentAudio.addEventListener("loadedmetadata", handleLoadedMetadata);

    currentAudio.addEventListener("timeupdate", handleCurrentTime);

    return () => {
      currentAudio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  function togglePlayPause() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleTrackSelection(newPath) {
    // console.log(newPath);
    if (audioRef.current) {
      audioRef.current.src = newPath;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  // function getSongDuration() {
  //   console.log(audioRef.duration);
  // }

  return (
    <AudioPlayerContext.Provider
      value={{
        audioDB,
        isPlaying,
        togglePlayPause,
        currentSong,
        setCurrentSong,
        progress,
        setProgress,
        handleTrackSelection,
        songDuration,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
