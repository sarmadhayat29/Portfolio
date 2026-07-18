import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '../../services/api';
import Section from '../common/Section';
import Button from '../common/Button';
import { personalDetails } from '../../config/data';
import { FaPaperPlane } from 'react-icons/fa';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Point this to your backend once it is deployed. 
      // For now, assuming backend is running locally on port 5000.
      await api.submitContact(data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" title="Get In Touch" subtitle="Have a project in mind or just want to say hi?" className="bg-secondary/20">
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold">Let's work together!</h3>
          <p className="text-muted-foreground leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to connect, my inbox is always open. 
            I'll try my best to get back to you!
          </p>
          <div className="pt-4 space-y-4">
            <div>
              <p className="font-medium text-primary">Email</p>
              <a href={`mailto:${personalDetails.email}`} className="text-muted-foreground hover:text-white transition-colors">
                {personalDetails.email}
              </a>
            </div>
            <div>
              <p className="font-medium text-primary">Location</p>
              <p className="text-muted-foreground">{personalDetails.location}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                {...register('name')}
                className={`w-full bg-background border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                {...register('email')}
                className={`w-full bg-background border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                {...register('subject')}
                className={`w-full bg-background border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                placeholder="Opportunity"
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                {...register('message')}
                rows="4"
                className={`w-full bg-background border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none`}
                placeholder="Hello, I'd like to talk about..."
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : (
                <>Send Message <FaPaperPlane /></>
              )}
            </Button>

            {submitStatus === 'success' && (
              <p className="text-primary text-sm text-center mt-4">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 text-sm text-center mt-4">Failed to send message. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>
    </Section>
  );
};

export default ContactSection;
