"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';

interface Scan {
  id: number;
  domain_name: string;
}

interface DeleteScanModalProps {
  scan: Scan;
  onClose: () => void;
  onConfirm: (scanId: number) => void;
  isDeleting: boolean;
}

export default function DeleteScanModal({ scan, onClose, onConfirm, isDeleting }: DeleteScanModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-filter backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative max-w-md w-full rounded-xl bg-gradient-to-b from-[#1D1D42] to-[#131330] border border-red-900/30 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-900/30 border border-red-700/30 flex items-center justify-center text-red-400">
              <FaExclamationTriangle size={20} />
            </div>
            <div>
              <h3 className="text-white text-lg font-medium">Confirm Deletion</h3>
              <p className="text-gray-400 text-sm">This action cannot be undone</p>
            </div>
          </div>
          <p className="text-gray-300 mb-6">
            Are you sure you want to delete the scan record for <span className="text-blue-400 font-medium">{scan.domain_name}</span>?
          </p>
          <div className="flex items-center justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isDeleting}
              className="px-4 py-2 bg-[#1A1A3A] text-gray-300 rounded-md text-sm hover:bg-[#1E1E45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClose}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isDeleting}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-md text-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onConfirm(scan.id)}
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <FaTrash size={14} />
                  Delete Record
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
