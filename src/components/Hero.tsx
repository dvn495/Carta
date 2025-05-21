import React, { useEffect, useState } from 'react';
import { useSong, getSongById } from '../contexts/SongContext';
import { Play, Pause } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

const Hero: React.FC = () => {
  const { playSong, pauseSong, isPlaying, currentSong } = useSong();
  const [isVisible, setIsVisible] = useState(false);
  
  const handlePlayMainSong = () => {
    const mainSong = getSongById('my-kind-of-woman');
    if (mainSong) {
      if (isPlaying && currentSong?.id === mainSong.id) {
        pauseSong();
      } else {
        playSong(mainSong);
      }
    }
  };
  
  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="mb-8">
          <CountdownTimer />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-blue-200 mb-6 transition-colors duration-500">
          <span className="block mb-2 animate-fadeIn">Te amo porque</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-pink-600 dark:from-blue-400 dark:to-pink-400 animate-fadeIn animation-delay-300">
            tú me haces feliz
          </span>
        </h1>
        
        <button 
          onClick={handlePlayMainSong}
          className="bg-blue-600 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-700 text-white rounded-full p-3 flex items-center justify-center transition duration-300 transform hover:scale-105 shadow-lg group"
          aria-label={isPlaying && currentSong?.id === 'my-kind-of-woman' ? 'Pause My Kind of Woman' : 'Play My Kind of Woman'}
        >
          <div className="flex items-center gap-2 px-4">
            {isPlaying && currentSong?.id === 'my-kind-of-woman' ? (
              <>
                <Pause size={20} />
                <span className="font-medium">Pause</span>
              </>
            ) : (
              <>
                <Play size={20} />
                <span className="font-medium">My Kind of Woman</span>
              </>
            )}
          </div>
        </button>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 dark:from-blue-900/60 dark:via-purple-900/40 dark:to-pink-900/60 -z-10"></div>
      
      <div className="absolute bottom-8 animate-bounce">
        <span className="block w-8 h-8 border-b-2 border-r-2 border-blue-600 dark:border-blue-400 transform rotate-45"></span>
      </div>
    </section>
  );
};

export default Hero;