import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ label, percentage, color = 'bg-[#0057B8]' }) => {
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-sm font-bold text-white">{percentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
