"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaRadiation, FaUserEdit } from 'react-icons/fa';

interface BlurOverlayProps {
  isVisible: boolean;
  onEnterInfo: () => void;
}

const BlurOverlay: React.FC<BlurOverlayProps> = ({ isVisible, onEnterInfo }) => {
  if (!isVisible) return null;
  
  return (
    <div className="overlay-container">
      <div className="max-w-md p-6 bg-gradient-to-b from-[#1A1A3A] to-[#121232] rounded-xl shadow-2xl border border-indigo-900/50 text-center">
        <FaRadiation size={40} className="mx-auto mb-4 text-blue-400" />
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
          Complete Your Profile
        </h3>
        <p className="text-gray-300 mb-4">
          Please provide your information to view the complete security report and get personalized recommendations.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnterInfo}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
        >
          <FaUserEdit className="mr-1" /> Enter Your Information
        </motion.button>
      </div>
    </div>
  );
};

export default BlurOverlay;
