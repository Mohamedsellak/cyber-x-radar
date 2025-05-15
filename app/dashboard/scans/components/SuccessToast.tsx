"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface SuccessToastProps {
  message: string;
  onClose: () => void;
}

export default function SuccessToast({ message, onClose }: SuccessToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed bottom-4 right-4 z-50 max-w-md w-full bg-gradient-to-r from-green-900/90 to-green-800/90 border border-green-700/50 rounded-lg shadow-lg backdrop-blur-sm p-4 flex items-center gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-green-900 border border-green-700 flex items-center justify-center flex-shrink-0">
        <FaCheck className="text-green-400" />
      </div>
      <div className="flex-grow">
        <p className="text-green-300 font-medium">Success</p>
        <p className="text-green-200/80 text-sm">{message}</p>
      </div>
      <button
        className="text-green-400 hover:text-green-300 transition-colors"
        onClick={onClose}
      >
        <FaTimes />
      </button>
    </motion.div>
  );
}
