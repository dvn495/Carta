import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  // Set your anniversary date - adjust to your starting date
  const anniversaryDate = new Date('2024-03-20'); // Example date - replace with your actual date
  
  const [days, setDays] = useState(427);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTimeDifference = () => {
      const now = new Date();
      const difference = now.getTime() - anniversaryDate.getTime();
      
      // Calculate days, hours, minutes, seconds
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    };

    // Initial calculation
    calculateTimeDifference();
    
    // Update every second
    const timer = setInterval(calculateTimeDifference, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-4 px-6 rounded-lg bg-white/20 dark:bg-blue-950/30 backdrop-blur-md shadow-xl transition-all duration-500">
      <div className="text-3xl md:text-5xl font-bold text-blue-800 dark:text-blue-300">
        {days} <span className="text-xl md:text-2xl font-medium">días</span> {hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
      </div>
      <p className="text-blue-700 dark:text-blue-400 mt-2 font-medium">y contando...</p>
    </div>
  );
};

export default CountdownTimer;