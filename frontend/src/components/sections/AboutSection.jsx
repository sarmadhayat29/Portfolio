import { motion } from 'framer-motion';
import Section from '../common/Section';
import { personalDetails } from '../../config/data';
import { FaGraduationCap, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <Section id="about" title="About Me">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <p className="text-lg text-muted-foreground leading-relaxed">
          {personalDetails.summary}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 flex items-start gap-4 hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] group"
        >
          <div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <FaGraduationCap size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Education</h3>
            <p className="font-medium text-foreground text-lg">BS Computer Science</p>
            <p className="text-muted-foreground">National University of Technology (NUTECH)</p>
            <p className="text-primary font-medium mt-2">2023 – Expected 2027</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
        >
          <h3 className="text-xl font-bold mb-6">Contact Details</h3>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              <a href={`mailto:${personalDetails.email}`} className="hover:text-primary transition-colors">{personalDetails.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-primary" />
              <span>{personalDetails.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary" />
              <span>{personalDetails.location}</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </Section>
  );
};

export default AboutSection;
