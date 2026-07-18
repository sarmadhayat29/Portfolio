import { motion } from 'framer-motion';
import Button from '../common/Button';
import Section from '../common/Section';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectsData } from '../../config/data';

const ProjectsSection = () => {
  return (
    <Section id="projects" title="Featured Projects" subtitle="Some of my recent work">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card overflow-hidden group flex flex-col hover:border-primary/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-500"
          >
            <div className="relative h-56 overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-auto">
                <Button variant="outline" size="sm" className="gap-2 w-full" onClick={() => window.open(project.github, '_blank')}>
                  <FaGithub /> Code
                </Button>
                {project.demo !== '#' && (
                  <Button size="sm" className="gap-2 w-full" onClick={() => window.open(project.demo, '_blank')}>
                    <FaExternalLinkAlt /> Demo
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default ProjectsSection;
