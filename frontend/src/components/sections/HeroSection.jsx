import { motion } from 'framer-motion';
import Button from '../common/Button';
import { personalDetails } from '../../config/data';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const headlineWords = personalDetails.headline.split(' | ');

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Colorful dynamic trail effect */}
      <motion.div 
        animate={{ x: mousePos.x - 150, y: mousePos.y - 150 }}
        transition={{ type: 'spring', damping: 10, stiffness: 50, mass: 0.1 }}
        className="absolute w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0 hidden md:block mix-blend-screen"
      />
      <motion.div 
        animate={{ x: mousePos.x - 200, y: mousePos.y - 200 }}
        transition={{ type: 'spring', damping: 20, stiffness: 80, mass: 0.5 }}
        className="absolute w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none z-0 hidden md:block mix-blend-screen"
      />
      <motion.div 
        animate={{ x: mousePos.x - 100, y: mousePos.y - 100 }}
        transition={{ type: 'spring', damping: 15, stiffness: 100, mass: 0.8 }}
        className="absolute w-[200px] h-[200px] bg-cyan-400/15 rounded-full blur-[80px] pointer-events-none z-0 hidden md:block mix-blend-screen"
      />

      <div className="container mx-auto px-4 md:px-8 text-center flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)]"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">{personalDetails.location}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Hi, I'm <span className="text-gradient">{personalDetails.name}</span>
        </motion.h1>

        <div className="h-auto md:h-10 mb-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl font-medium text-muted-foreground flex flex-col md:flex-row items-center gap-2 md:gap-0"
          >
            {headlineWords.map((word, i) => (
               <motion.span 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.7 + (i * 0.2) }}
                 className="inline-flex items-center"
               >
                 {i > 0 && <span className="hidden md:inline-block mx-3 text-primary/50">|</span>}
                 {word}
               </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          {personalDetails.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View My Work
          </Button>
          <Button variant="glass" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Contact Me
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
