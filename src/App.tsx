import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import MovementsSection from './components/MovementsSection';
import UniverseSection from './components/UniverseSection';
import MultilingualSection from './components/MultilingualSection';
import ComplementarySection from './components/ComplementarySection';
import FutureSection from './components/FutureSection';
import Footer from './components/Footer';
import { SongProvider } from './contexts/SongContext';
import MusicPlayer from './components/MusicPlayer';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <SongProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-100 dark:from-blue-950 dark:to-purple-900 transition-colors duration-500">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        
        <Hero />
        <Timeline />
        <MovementsSection />
        <UniverseSection />
        <MultilingualSection />
        <ComplementarySection />
        <FutureSection />
        <Footer />
        
        <MusicPlayer />
      </div>
    </SongProvider>
  );
}

export default App;