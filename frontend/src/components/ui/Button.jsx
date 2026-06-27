import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B1020]";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#0057B8] to-[#0070e0] hover:shadow-[0_0_15px_rgba(0,87,184,0.6)] text-white focus:ring-[#0057B8]",
    secondary: "bg-gradient-to-r from-[#F4C542] to-[#f6d365] hover:shadow-[0_0_15px_rgba(244,197,66,0.6)] text-[#0B1020] focus:ring-[#F4C542]",
    accent: "bg-gradient-to-r from-[#00C896] to-[#00dfa7] hover:shadow-[0_0_15px_rgba(0,200,150,0.6)] text-[#0B1020] focus:ring-[#00C896]",
    outline: "border border-white/20 hover:bg-white/5 text-white focus:ring-white/50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
