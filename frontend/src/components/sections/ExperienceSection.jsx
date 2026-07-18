import { motion } from 'framer-motion';
import Section from '../common/Section';
import { experienceData } from '../../config/data';

const ExperienceSection = () => {
  return (
    <Section id="experience" title="My Experience" className="bg-secondary/20" containerClass="max-w-4xl">
      <div className="space-y-8">
        {experienceData.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="md:w-1/3 shrink-0">
              <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
              <p className="text-foreground font-medium">{exp.company}</p>
              <p className="text-sm text-muted-foreground mt-2">{exp.period}</p>
            </div>
            <div className="md:w-2/3">
              <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default ExperienceSection;
