import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 bg-blue-900 dark:bg-blue-950 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Heart className="text-red-500 animate-pulse" />
        </div>
        
        <p className="mb-2 text-blue-200">
          Hecho con amor para celebrar nuestros 427 días juntos amazing
        </p>
        
        <p className="text-sm text-blue-300">
          &copy; {new Date().getFullYear()} - Para ti, mi vida castrosita
        </p>
      </div>
    </footer>
  );
};

export default Footer;