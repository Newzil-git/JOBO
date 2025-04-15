import React from 'react';
import { motion } from 'framer-motion';

// Container for staggered animations
export const MotionContainer = ({ children, className, delay = 0, ...props }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Item for staggered animations
export const MotionItem = ({ children, className, ...props }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Fade in animation
export const MotionFade = ({ children, className, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scale in animation
export const MotionScale = ({ children, className, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide in from bottom animation
export const MotionSlideUp = ({ children, className, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide in from left animation
export const MotionSlideRight = ({ children, className, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide in from right animation
export const MotionSlideLeft = ({ children, className, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated button
export const MotionButton = ({ children, className, delay = 0, whileHover = {}, ...props }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={whileHover || { scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Animated card
export const MotionCard = ({ children, className, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className={`card ${className || ''}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Header animation for logo and text
export const MotionLogo = ({ children, className, ...props }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`auth-logo text-center ${className || ''}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Header animations for text
export const MotionTitle = ({ children, className, delay = 0.2, ...props }) => {
  return (
    <motion.h1 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`text-2xl font-bold mb-2 ${className || ''}`}
      {...props}
    >
      {children}
    </motion.h1>
  );
};

export const MotionSubtitle = ({ children, className, delay = 0.3, ...props }) => {
  return (
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`text-sm opacity-80 ${className || ''}`}
      {...props}
    >
      {children}
    </motion.p>
  );
}; 