import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  const CardComponent = hover ? motion.div : 'div';
  
  const motionProps = hover ? {
    whileHover: { y: -5, transition: { duration: 0.2 } }
  } : {};

  return (
    <CardComponent
      className={`glass-card p-6 ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card;
