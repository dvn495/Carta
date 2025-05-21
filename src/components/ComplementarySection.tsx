import React, { useRef, useEffect } from "react";

const ComplementarySection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = 400;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Animation variables
    let time = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Particles for the two elements
    const element1Particles: {
      x: number;
      y: number;
      angle: number;
      speed: number;
      size: number;
    }[] = [];
    const element2Particles: {
      x: number;
      y: number;
      angle: number;
      speed: number;
      size: number;
    }[] = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      element1Particles.push({
        x: centerX - 100,
        y: centerY,
        angle: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.8,
        size: 1 + Math.random() * 3,
      });

      element2Particles.push({
        x: centerX + 100,
        y: centerY,
        angle: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.8,
        size: 1 + Math.random() * 3,
      });
    }

    // Animation function
    const animate = () => {
      time += 0.01;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(66, 153, 225, 0.1)");
      gradient.addColorStop(1, "rgba(237, 100, 166, 0.1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connection between elements
      ctx.beginPath();
      ctx.moveTo(centerX - 100, centerY);

      // Draw bezier curve that changes over time
      const controlX1 = centerX - 50 + Math.sin(time) * 20;
      const controlY1 = centerY - 50 + Math.cos(time) * 20;
      const controlX2 = centerX + 50 + Math.cos(time) * 20;
      const controlY2 = centerY - 50 + Math.sin(time) * 20;

      ctx.bezierCurveTo(
        controlX1,
        controlY1,
        controlX2,
        controlY2,
        centerX + 100,
        centerY
      );

      const gradient2 = ctx.createLinearGradient(
        centerX - 100,
        centerY,
        centerX + 100,
        centerY
      );
      gradient2.addColorStop(0, "#3182CE");
      gradient2.addColorStop(1, "#ED64A6");

      ctx.strokeStyle = gradient2;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw element 1 (Strength - Blue)
      ctx.beginPath();
      ctx.arc(centerX - 100, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(49, 130, 206, 0.8)";
      ctx.fill();

      // Draw element 2 (Grace - Pink)
      ctx.beginPath();
      ctx.arc(centerX + 100, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(237, 100, 166, 0.8)";
      ctx.fill();

      // Update and draw element 1 particles
      element1Particles.forEach((particle) => {
        particle.angle += 0.02;
        particle.x =
          centerX -
          100 +
          Math.cos(particle.angle) *
            (30 + Math.sin(time + particle.angle) * 10);
        particle.y =
          centerY +
          Math.sin(particle.angle) *
            (30 + Math.cos(time + particle.angle) * 10);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(49, 130, 206, 0.6)";
        ctx.fill();
      });

      // Update and draw element 2 particles
      element2Particles.forEach((particle) => {
        particle.angle -= 0.02;
        particle.x =
          centerX +
          100 +
          Math.cos(particle.angle) *
            (30 + Math.sin(time + particle.angle) * 10);
        particle.y =
          centerY +
          Math.sin(particle.angle) *
            (30 + Math.cos(time + particle.angle) * 10);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(237, 100, 166, 0.6)";
        ctx.fill();
      });

      // Draw center (where they meet - Purple)
      ctx.beginPath();
      const pulseSize = 15 + Math.sin(time * 3) * 5;
      ctx.arc(
        centerX,
        centerY - 30 + Math.sin(time) * 10,
        pulseSize,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(159, 122, 234, 0.8)";
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section
      className="py-20 px-4 bg-white dark:bg-blue-950 transition-colors duration-500"
      ref={containerRef}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-800 dark:text-blue-300">
          Complementarios
        </h2>
        <p className="text-center text-blue-700 dark:text-blue-400 mb-8 max-w-2xl mx-auto">
          "De cierta manera filosofica universal, nuetras diferencias nos hacen
          mas parecidos"
        </p>

        <div className="rounded-xl overflow-hidden shadow-xl mb-8">
          <canvas ref={canvasRef} className="w-full h-[400px]"></canvas>
        </div>

        <div className="bg-blue-100/70 dark:bg-blue-900/30 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 p-4 rounded-lg bg-white/70 dark:bg-blue-800/30 shadow-md">
              <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">
                Yo
              </h3>
              <p className="text-blue-800 dark:text-blue-400">
                Yoo yo soy opuesto, creo, sjsj yo se mis razones pero tu las tienes q decir jiji.
              </p>
            </div>

            <div className="flex-1 p-4 rounded-lg bg-white/70 dark:bg-blue-800/30 shadow-md">
              <h3 className="text-xl font-bold mb-2 text-pink-700 dark:text-pink-300">
                Tu
              </h3>
              <p className="text-pink-800 dark:text-pink-400">
                Tu eres una personita responsable, inteligente, muy penosa,
                esquiva, aunq muy cariñosa a tu propia manera, perooo te
                preocupas por mi, no sabes lo q valoro eso.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="italic text-blue-900 dark:text-blue-200">
              "Te amo por quien eres y por que me amas por quien soy"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplementarySection;
