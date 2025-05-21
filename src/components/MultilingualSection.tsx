import React, { useState, useEffect } from 'react';

interface Phrase {
  id: number;
  text: string;
  language: string;
  translation: string;
}

const MultilingualSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const phrases: Phrase[] = [
    {
      id: 1,
      text: "Tu mirada con la que veo el universo entero",
      language: "Español",
      translation: ""
    },
    {
      id: 2,
      text: "Your feelings",
      language: "English",
      translation: "Tus sentimientos"
    },
    {
      id: 3,
      text: "sei una canzone che voglio sempre ascoltare.",
      language: "Italiano",
      translation: "eres una canción que siempre quiero escuchar."
    },
    {
      id: 4,
      text: "ma belle femme",
      language: "Français",
      translation: "mi mujer linda"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setIsVisible(false);
        
        setTimeout(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          setIsVisible(true);
          
          setTimeout(() => {
            setIsAnimating(false);
          }, 500);
        }, 500);
      }
    }, 5000);
    
    setIsVisible(true);
    
    return () => clearInterval(interval);
  }, [phrases.length, isAnimating]);

  const handleLanguageClick = (index: number) => {
    if (index !== activeIndex && !isAnimating) {
      setIsAnimating(true);
      setIsVisible(false);
      
      setTimeout(() => {
        setActiveIndex(index);
        setIsVisible(true);
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 500);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-pink-50 dark:from-blue-900 dark:to-purple-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-800 dark:text-blue-300">
          Lo que te quiero decir no se queda en español
        </h2>
        <p className="text-center text-blue-700 dark:text-blue-400 mb-12 max-w-2xl mx-auto">
          Nos la damos de bilingues
        </p>
        
        <div className="relative min-h-[200px] flex flex-col items-center justify-center bg-white/50 dark:bg-blue-900/30 rounded-xl p-8 shadow-lg">
          <div className={`transition-all duration-500 text-center transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-2xl md:text-3xl font-medium text-blue-800 dark:text-blue-200 mb-4">
              "{phrases[activeIndex].text}"
            </p>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600 dark:bg-blue-700 text-white text-sm font-medium mb-2">
              {phrases[activeIndex].language}
            </span>
            {phrases[activeIndex].translation && (
              <p className="text-blue-700 dark:text-blue-400 italic">
                {phrases[activeIndex].translation}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-center mt-8 flex-wrap gap-2">
          {phrases.map((phrase, index) => (
            <button
              key={phrase.id}
              onClick={() => handleLanguageClick(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeIndex === index 
                ? 'bg-blue-600 text-white scale-110 shadow-md' 
                : 'bg-white/70 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-700/50'
              }`}
            >
              {phrase.language}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MultilingualSection;