import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-primary/30 bg-transparent text-primary hover:bg-primary/10',
    ghost: 'hover:bg-white/5 hover:text-white',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all duration-300',
  };

  const sizes = {
    default: 'h-11 px-6 py-2',
    sm: 'h-9 rounded-md px-3 text-sm',
    lg: 'h-14 rounded-lg px-8 text-lg',
    icon: 'h-10 w-10',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
