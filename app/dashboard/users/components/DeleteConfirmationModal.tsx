"use client";

import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface DeleteConfirmationModalProps {
  userName: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export default function DeleteConfirmationModal({ 
  userName, 
  onCancel, 
  onConfirm,
  isDeleting
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
            disabled={isDeleting}
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-300 mb-2">
              Are you sure you want to delete this admin user?
            </p>
            <div className="bg-red-900/20 border border-red-900/30 rounded-lg p-3 text-red-300 text-sm">
              <span className="font-medium">{userName}</span> - This action cannot be undone and may affect system access.
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="bg-red-600/30 hover:bg-red-600/50 border border-red-700/50 text-red-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                "Delete Permanently"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
