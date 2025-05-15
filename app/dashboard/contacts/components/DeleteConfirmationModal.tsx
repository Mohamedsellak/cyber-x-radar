"use client";

import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface DeleteConfirmationModalProps {
  contactId: number;
  contactName: string;
  onCancel: () => void;
  onConfirm: (id: number) => void;
}

export default function DeleteConfirmationModal({ 
  contactId, 
  contactName, 
  onCancel, 
  onConfirm 
}: DeleteConfirmationModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 rounded-xl border border-red-800/50 shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-5 border-b border-red-900/50 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2 text-red-400">
            <FaExclamationTriangle className="text-red-400" />
            Confirm Deletion
          </h2>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-300 mb-2">
              Are you sure you want to delete this contact message?
            </p>
            <div className="bg-red-900/20 border border-red-900/30 rounded-lg p-3 text-red-300 text-sm">
              <span className="font-medium">{contactName}</span> - This action cannot be undone.
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(contactId)}
              className="bg-red-600/30 hover:bg-red-600/50 border border-red-700/50 text-red-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              Delete Permanently
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
