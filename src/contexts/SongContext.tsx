import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

type Song = {
  id: string;
  title: string;
  artist: string;
  src: string;
  quote: string;
};

interface SongContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  togglePlayPause: () => void;
  setVolume: (value: number) => void;
}

const songsList: Song[] = [
  {
    id: 'my-kind-of-woman',
    title: 'My Kind of Woman',
    artist: 'Mac DeMarco',
    src: '/src/songs/MyKindOfWoman.mp3',
    quote: 'Te amo porque tú me haces feliz',
  },
  {
    id: 'maguia',
    title: 'Magia (feat. Yatra)',
    artist: 'Cepeda ft. Yatra',
    src: '/src/songs/Andrés Cepeda, Sebastian Yatra - Magia (Letra).mp3',
    quote: 'Mientras más tiempo pasamos juntos, más me doy cuenta de lo diferentes que somos',
  },
  {
    id: 'birds-of-a-feather',
    title: 'Birds of a Feather',
    artist: 'Billie Eilish',
    src: '/src/songs/Billie Eilish - BIRDS OF A FEATHER (Official Lyric Video).mp3',
    quote: 'Siento que contigo estoy con alguien que puede comprender qué pasa conmigo',
  },
  {
    id: 'accidentally-in-love',
    title: 'Accidentally in Love',
    artist: 'Counting Crows',
    src: '/src/songs/Accidentally In Love (From Shrek 2 Soundtrack).mp3',
    quote: 'Te amo a ti y solo a ti',
  },
  {
    id: 'cant-help-falling-in-love',
    title: "Can't Help Falling in Love",
    artist: 'Elvis Presley',
    src: "/src/songs/Elvis Presley - Can't Help Falling In Love (Official Audio).mp3",
    quote: 'Nunca se me van a acabar las razones por las que me enamoré de ti',
  },
];

const SongContext = createContext<SongContextType | undefined>(undefined);

export function SongProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    
    // Set default song to My Kind of Woman
    setCurrentSong(songsList[0]);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    
    audioRef.current.src = currentSong.src;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const playSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(true);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const setVolume = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  return (
    <SongContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        pauseSong,
        togglePlayPause,
        setVolume
      }}
    >
      {children}
    </SongContext.Provider>
  );
}

export const useSong = (): SongContextType => {
  const context = useContext(SongContext);
  if (context === undefined) {
    throw new Error('useSong must be used within a SongProvider');
  }
  return context;
};

export const getSongById = (id: string): Song | undefined => {
  return songsList.find(song => song.id === id);
};

export const getAllSongs = (): Song[] => {
  return songsList;
};