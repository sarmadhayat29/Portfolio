import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { personalDetails } from '../../config/data';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-sm py-8 mt-20">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {personalDetails.name}. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href={personalDetails.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
            <FaGithub size={22} />
          </a>
          <a href={personalDetails.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
            <FaLinkedin size={22} />
          </a>
          <a href={personalDetails.instagram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
            <FaInstagram size={22} />
          </a>
          <a href={`mailto:${personalDetails.email}`} className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
            <FaEnvelope size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
