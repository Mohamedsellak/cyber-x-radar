"use client";

import React, { useState } from 'react';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Token {
  id: number;
  token: string;
  company: string;
  name: string;
}

interface DeleteTokenModalProps {
  token: Token;
  onClose: () => void;
  onConfirm: (id: number) => Promise<void>;
}

export default function DeleteTokenModal({ token, onClose, onConfirm }: DeleteTokenModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(token.id);
    } catch (error) {
      console.error("Error deleting token:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 rounded-xl border border-red-900/40 shadow-2xl w-full max-w-md backdrop-blur-sm"
    >
      <div className="p-6 border-b border-red-900/30">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-2 rounded-lg shadow-md">
            <FaExclamationTriangle className="text-white" />
          </div>
          <span>Revoke API Token</span>
        </h2>
      </div>
      
      <div className="p-6">
        <p className="text-gray-300 mb-5 leading-relaxed">
          Are you sure you want to revoke the API token for <span className="font-medium text-white">{token.company}</span>?
        </p>
        
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-900/30 flex gap-3">
          <div className="text-red-400 mt-0.5">
            <FaExclamationTriangle />
          </div>
          <div>
            <p className="text-sm text-red-300 mb-1 font-medium">Warning</p>
            <p className="text-sm text-red-300 opacity-90">
              This action cannot be undone. The token will immediately become invalid and any applications using it will lose access.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-t border-red-900/30 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2.5 text-gray-400 hover:text-white transition-colors hover:bg-gray-800/30 rounded-lg"
          disabled={isDeleting}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={isDeleting}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          {isDeleting ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Revoking...
            </>
          ) : (
            <>
              <FaTrash size={14} />
              Revoke Token
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
