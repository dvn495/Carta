import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovementCard {
  id: string;
  title: string;
  description: string;
  leftSide: string;
  rightSide: string;
}

const MovementsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards: MovementCard[] = [
    {
      id: 'strength-grace',
      title: 'Fuerza y Gracia',
      description: 'Mientras más tiempo pasamos juntos, más me doy cuenta de lo diferentes que somos',
      leftSide: 'Impacto y determinación', 
      rightSide: 'Fluidez y elegancia'
    },
    {
      id: 'rhythm-flow',
      title: 'Ritmo y Flujo',
      description: 'Creo que nosotros somos la prueba de que los opuestos se atraen',
      leftSide: 'Disciplina y persistencia',
      rightSide: 'Armonía y expresión'
    },
    {
      id: 'power-balance',
      title: 'Potencia y Equilibrio',
      description: 'Tu fuerza me inspira cada día a ser mejor',
      leftSide: 'Intensidad y pasión',
      rightSide: 'Precisión y balance'
    }
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in');
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-blue-950 dark:to-purple-950 opacity-0 transition-all duration-700 ease-out"
      id="movements"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300">
          Movimientos que nos definen
        </h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cards.map((card, index) => (
                <div key={card.id} className="w-full min-w-full px-4">
                  <div className="bg-white dark:bg-blue-900/30 rounded-xl overflow-hidden shadow-xl h-80 md:h-96 flex flex-col md:flex-row">
                    {/* Left side - represents strength/boxing */}
                    <div className="flex-1 p-6 bg-gradient-to-br from-blue-700/10 to-blue-900/20 dark:from-blue-800/30 dark:to-blue-950/50 flex flex-col justify-center items-center transform transition-transform duration-700 hover:scale-105 border-r border-blue-200 dark:border-blue-700">
                      <div className="w-16 h-16 rounded-full bg-blue-600 dark:bg-blue-500 mb-4 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute w-10 h-10 rounded-full bg-blue-800 dark:bg-blue-700 animate-pulse"></div>
                      </div>
                      <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">{card.leftSide}</h3>
                    </div>
                    
                    {/* Right side - represents grace/skating */}
                    <div className="flex-1 p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/20 dark:from-pink-800/30 dark:to-purple-900/50 flex flex-col justify-center items-center transform transition-transform duration-700 hover:scale-105">
                      <div className="w-16 h-16 rounded-full bg-pink-500 dark:bg-pink-600 mb-4 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute w-4 h-14 bg-pink-700 dark:bg-pink-800 rounded-full animate-wave"></div>
                      </div>
                      <h3 className="font-bold text-pink-900 dark:text-pink-300 mb-2">{card.rightSide}</h3>
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">{card.title}</h3>
                    <p className="text-blue-700 dark:text-blue-400 italic">"{card.description}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-blue-600 dark:bg-blue-700 text-white p-2 rounded-full shadow-lg transform transition hover:scale-110 hover:bg-blue-700 dark:hover:bg-blue-600 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-blue-600 dark:bg-blue-700 text-white p-2 rounded-full shadow-lg transform transition hover:scale-110 hover:bg-blue-700 dark:hover:bg-blue-600 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-3 h-3 mx-1 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'bg-blue-600 dark:bg-blue-400 w-6' 
                    : 'bg-blue-300 dark:bg-blue-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovementsSection;