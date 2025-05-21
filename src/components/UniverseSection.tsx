import React, { useEffect, useRef, useState } from 'react';
import { useSong, getAllSongs } from '../contexts/SongContext';
import { Music } from 'lucide-react';

interface Star {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  pulse: boolean;
}

const UniverseSection: React.FC = () => {
  const { playSong, pauseSong, currentSong, isPlaying } = useSong();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeConstellation, setActiveConstellation] = useState<string | null>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const songs = getAllSongs();
  const constellationCenters = useRef<{[key: string]: {x: number, y: number}}>({});
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: 600
  });

  // Generate stars for the sky
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWindowSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Generate background stars
    const baseStars: Star[] = [];
    const width = windowSize.width;
    const height = windowSize.height;
    
    // Create background stars
    for (let i = 0; i < 100; i++) {
      baseStars.push({
        id: `star-${i}`,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
        pulse: Math.random() > 0.7
      });
    }
    
    // Create constellation points - MODIFICADO para distribución en semicírculo
    songs.forEach((song, songIndex) => {
      // Calcular posiciones en un semicírculo para mejor distribución
      const totalSongs = songs.length;
      const angle = (Math.PI * (songIndex / totalSongs)) + (Math.PI / 4); // Distribución en semicírculo
      const radius = Math.min(width, height) * 0.3; // Radio proporcional a la pantalla
      
      const centerX = width * 0.5 + Math.cos(angle) * radius;
      const centerY = height * 0.4 + Math.sin(angle) * radius;
      
      constellationCenters.current[song.id] = { x: centerX, y: centerY };
      
      // Add constellation stars (5-7 stars per constellation)
      const starCount = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < starCount; i++) {
        const starAngle = (Math.PI * 2 * i) / starCount;
        const distance = 30 + Math.random() * 20;
        baseStars.push({
          id: `constellation-${song.id}-${i}`,
          x: centerX + Math.cos(starAngle) * distance,
          y: centerY + Math.sin(starAngle) * distance,
          size: 2 + Math.random() * 2,
          color: i === 0 ? '#63B3ED' : '#90CDF4',
          pulse: true
        });
      }
      
      // Add center star (larger)
      baseStars.push({
        id: `constellation-${song.id}-center`,
        x: centerX,
        y: centerY,
        size: 4 + Math.random() * 2,
        color: song.id === 'my-kind-of-woman' ? '#3182CE' : '#4299E1',
        pulse: true
      });
    });
    
    setStars(baseStars);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width, windowSize.height]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = windowSize.width;
    canvas.height = windowSize.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.fill();
    });
    
    // Draw constellation lines if active
    if (activeConstellation) {
      const center = constellationCenters.current[activeConstellation];
      if (center) {
        // Get all stars for this constellation
        const constellationStars = stars.filter(star => 
          star.id.includes(`constellation-${activeConstellation}`)
        );
        
        // Draw lines between stars
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(99, 179, 237, 0.6)';
        ctx.lineWidth = 1.5;
        
        // Start from center
        ctx.moveTo(center.x, center.y);
        
        // Connect to other stars
        constellationStars.forEach(star => {
          if (!star.id.includes('center')) {
            ctx.lineTo(star.x, star.y);
            ctx.moveTo(center.x, center.y);
          }
        });
        
        ctx.stroke();
        
        // Highlight stars
        constellationStars.forEach(star => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size + 1, 0, Math.PI * 2);
          ctx.fillStyle = star.id.includes('center') ? '#3182CE' : 'rgba(144, 205, 244, 0.8)';
          ctx.fill();
        });
      }
    }
  }, [stars, activeConstellation, windowSize]);

  // Handle playing song from constellation
  const handlePlaySong = (songId: string) => {
    const song = songs.find(s => s.id === songId);
    if (song) {
      if (isPlaying && currentSong?.id === songId) {
        pauseSong();
      } else {
        playSong(song);
      }
    }
  };

  return (
    <section
      id="universe"
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-900 to-purple-950"
      style={{ height: '800px' }}
    >
      <div className="absolute inset-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-100">
          Nuestro Universo Musical
        </h2>
        
        <div className="relative h-[500px]">
          {songs.map((song) => {
            const center = constellationCenters.current[song.id];
            // Determinar si el tooltip debe mostrarse arriba o abajo basado en la posición
            const tooltipPosition = center && center.y > windowSize.height * 0.6 ? 'top' : 'bottom';
            
            return center ? (
              <div
                key={song.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: center.x,
                  top: center.y,
                  zIndex: activeConstellation === song.id ? 20 : 10
                }}
              >
                <button
                  className={`group relative flex flex-col items-center transition-all duration-300 ${activeConstellation === song.id ? 'scale-110' : ''}`}
                  onMouseEnter={() => setActiveConstellation(song.id)}
                  onMouseLeave={() => setActiveConstellation(null)}
                  onClick={() => handlePlaySong(song.id)}
                  aria-label={`Play ${song.title}`}
                >
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    song.id === 'my-kind-of-woman'
                      ? 'bg-blue-600 dark:bg-blue-500'
                      : 'bg-blue-500/80 dark:bg-blue-600/80'
                  } text-white shadow-lg transition-all duration-300 ${
                    isPlaying && currentSong?.id === song.id
                      ? 'animate-pulse'
                      : 'group-hover:scale-110'
                  }`}>
                    <Music size={18} />
                  </span>
                  
                  <div className={`absolute ${
                    tooltipPosition === 'top' ? 'bottom-12' : 'mt-12'
                  } w-48 text-center p-3 rounded-lg bg-white/90 dark:bg-blue-900/90 shadow-xl transition-opacity duration-300 ${
                    activeConstellation === song.id ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none'
                  }`}>
                    <p className="font-bold text-blue-900 dark:text-blue-300">{song.title}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">{song.artist}</p>
                    <p className="text-xs italic mt-2 text-blue-800 dark:text-blue-200">"{song.quote}"</p>
                  </div>
                </button>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
};

export default UniverseSection;