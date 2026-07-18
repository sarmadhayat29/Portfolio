import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Section = ({ id, className, title, subtitle, children, containerClass }) => {
  return (
    <section id={id} className={cn('py-24 relative', className)}>
      <div className={cn('container mx-auto px-4 md:px-8', containerClass)}>
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title.split(' ').map((word, i, arr) => 
                  i === arr.length - 1 ? (
                    <span key={i} className="text-primary">{word}</span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h2>
            )}
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </motion.div>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default Section;
