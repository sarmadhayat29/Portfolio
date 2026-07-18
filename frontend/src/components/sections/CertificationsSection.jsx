import { motion } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';
import Section from '../common/Section';
import { certificationsData } from '../../config/data';

const CertificationsSection = () => {
  return (
    <Section id="certifications" title="Licenses & Certifications" containerClass="max-w-4xl">
      <div className="grid sm:grid-cols-2 gap-6">
        {certificationsData.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 flex items-start gap-4 hover:border-primary/50 transition-colors"
          >
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <FaCertificate size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{cert.name}</h3>
              <p className="text-muted-foreground text-sm">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground mt-2">{cert.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default CertificationsSection;
