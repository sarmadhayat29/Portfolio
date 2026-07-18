import { motion } from 'framer-motion';
import Section from '../common/Section';
import { skillsData } from '../../config/data';

const SkillsSection = () => {
  return (
    <Section id="skills" title="My Arsenal" subtitle="Technologies and tools I use to build solutions" className="bg-secondary/30">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center p-6 glass-card hover:bg-card hover:border-primary/50 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)] transition-all duration-300 cursor-pointer group"
          >
            <skill.icon className={`text-4xl mb-4 ${skill.color} group-hover:scale-110 transition-transform`} />
            <span className="font-medium text-sm text-center group-hover:text-primary transition-colors">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default SkillsSection;
