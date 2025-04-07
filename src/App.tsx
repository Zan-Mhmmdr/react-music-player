import { useEffect, useState, useRef, useMemo } from 'react';
import './App.css';
import bg from './assets/img/bg.jpeg';
import chonoHina from './assets/img/chono-hina.jpg';
import saitama from './assets/img/saitama.jpg';

type Song = {
  path: string;
  name: string;
  artist: string;
  img: string;
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null); // Using useRef to store the audio object
  const [progress, setProgress] = useState(0); // state untuk progress
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // state untuk index lagu yang sedang diputar

  const songs: Song[] = useMemo(() => [
    {
      path: "../src/assets/audio/seigi-shikkou.mp3",
      name: "The Hero!!",
      artist: "JAM Project",
      img: "../src/assets/img/saitama.jpg",
    },
    {
      path: "../src/assets/audio/same-blue.mp3",
      name: "Same Blue",
      artist: "Official HIGE DANdism",
      img: "../src/assets/img/chono-hina.jpg",
    },
  ], [])

  useEffect(() => {
    // Initialize the audio when the component mounts
    musicRef.current = new Audio(songs[currentSongIndex].path);

    // Event listener untuk mengupdate progress saat musik diputar
    musicRef.current.addEventListener('timeupdate', updateProgress);

    // Clean up the audio when the component unmounts
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, [songs]);

  // Update progress setiap kali timeupdate terjadi
  const updateProgress = (): void => {
    if (musicRef.current) {
      setProgress((musicRef.current.currentTime / musicRef.current.duration) * 100);
    }
  };

  const togglePlay = (): void => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const playMusic = (): void => {
    if (musicRef.current) {
      musicRef.current.play().catch((error) => {
        console.error("Error playing music:", error);
      });
      setIsPlaying(true);
    }
  };

  const pauseMusic = (): void => {
    if (musicRef.current) {
      musicRef.current.pause();
      setIsPlaying(false);
    }
  };

  const setProgressBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickX = e.nativeEvent.offsetX;
    if (musicRef.current) {
      musicRef.current.currentTime = (clickX / e.currentTarget.clientWidth) * musicRef.current.duration;
    }
  }

  // Fungsi untuk pindah ke lagu sebelumnya
  const prevSong = ():void => {
    setCurrentSongIndex((prevIndex) => (prevIndex === 0 ? songs.length - 1 : prevIndex - 1));
  };

  // Fungsi untuk pindah ke lagu berikutnya
  const nextSong = ():void => {
    setCurrentSongIndex((prevIndex) => (prevIndex === songs.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className="background">
        <img src={bg} alt="background" className="bg-img" />
      </div>

      <div className="container">
        <div className="player-img">
          <img src={songs[currentSongIndex].img} alt="img-music" className="active" />
        </div>

        <h2>{songs[currentSongIndex].name}</h2>
        <h3>{songs[currentSongIndex].artist}</h3>

        <div className="player-progress" onClick={(e) => setProgressBar(e)}>
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="music-duration">
            <span>{(musicRef.current ? musicRef.current.currentTime.toFixed(2) : '0.00')}</span>
            <span>{(musicRef.current ? musicRef.current.duration.toFixed(2) : '0.00')}</span>

          </div>
        </div>

        <div className="player-controls">
          <i
            className="fa-solid fa-backward"
            title="Previous"
            onClick={prevSong}></i>
          <i
            className={`fa-solid play-button ${isPlaying ? 'fa-pause' : 'fa-play'}`}
            title="Play"
            id="play"
            onClick={togglePlay}
          ></i>
          <i
            className="fa-solid fa-forward"
            title="Next"
            onClick={nextSong} ></i>
        </div>
      </div>
    </>
  );
}

export default App;
