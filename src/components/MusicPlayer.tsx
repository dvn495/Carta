import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useSong } from '../contexts/SongContext';

const MusicPlayer: React.FC = () => {
  const { currentSong, isPlaying, togglePlayPause, setVolume } = useSong();
  const [volumeLevel, setVolumeLevel] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolumeLevel(newVolume);
    setVolume(isMuted ? 0 : newVolume);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? volumeLevel : 0);
  };
  
  if (!currentSong) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-blue-950/90 backdrop-blur-md border-t border-blue-200 dark:border-blue-800 shadow-md transition-all duration-300 ease-in-out z-50 ${
        isExpanded ? 'h-24' : 'h-16'
      }`}
    >
      <div className="container mx-auto max-w-4xl h-full">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 mr-4"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-200">{currentSong.title}</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">{currentSong.artist}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-300"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumeLevel}
              onChange={handleVolumeChange}
              className="w-20 md:w-24 h-2 bg-blue-200 dark:bg-blue-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 dark:[&::-webkit-slider-thumb]:bg-blue-400"
              aria-label="Volume"
            />
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 p-2 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors duration-300"
              aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
            >
              <div className="w-5 h-1 bg-current rounded-full"></div>
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="px-4 pb-4">
            <p className="text-blue-800 dark:text-blue-300 text-sm italic">
              "{currentSong.quote}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;