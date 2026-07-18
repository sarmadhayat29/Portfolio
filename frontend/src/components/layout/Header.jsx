import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { cn } from '../../utils/cn';
import { navLinks, personalDetails } from '../../config/data';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />
      <header
        className={cn(
          'fixed top-1 w-full z-50 transition-all duration-300 border-b border-transparent',
          scrolled ? 'glass py-3 border-white/5 shadow-lg' : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="text-2xl font-heading font-bold text-gradient">
            {personalDetails.name.split(' ')[0]}<span className="text-foreground">.</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link 
              to="/admin/dashboard" 
              className="text-sm font-semibold bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full hover:bg-primary/20 transition-all hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]"
            >
              Admin Portal
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
