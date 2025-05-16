"use client";

import React from 'react';
import { FaEnvelope, FaTimes, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Contact {
  id: number;
  name: string;
  email: string;
  inquiry_type: string;
  company_name: string;
  message: string;
  created_at: string;
}

interface ViewContactModalProps {
  contact: Contact;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export default function ViewContactModal({ contact, onClose, onDelete }: ViewContactModalProps) {
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
        className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 rounded-xl border border-indigo-900/50 shadow-2xl w-full max-w-2xl"
      >
        <div className="p-6 border-b border-indigo-900/50 flex justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaEnvelope className="text-blue-400" />
            Message Details
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-xs text-gray-400 mb-1">From</h3>
              <p className="text-white font-medium">{contact.name}</p>
              <p className="text-gray-400 text-sm">{contact.email}</p>
            </div>
            <div>
              <h3 className="text-xs text-gray-400 mb-1">Company</h3>
              <p className="text-white">{contact.company_name || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-xs text-gray-400 mb-1">Inquiry Type</h3>
              <span className={`px-2 py-1 rounded-full text-xs inline-block ${
                contact.inquiry_type === 'Sales' ? 'bg-purple-900/30 text-purple-400 border border-purple-700/30' :
                contact.inquiry_type === 'Support' ? 'bg-blue-900/30 text-blue-400 border border-blue-700/30' :
                'bg-indigo-900/30 text-indigo-400 border border-indigo-700/30'
              }`}>
                {contact.inquiry_type}
              </span>
            </div>
            <div>
              <h3 className="text-xs text-gray-400 mb-1">Date Received</h3>
              <p className="text-gray-300">{contact.created_at}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Message</h3>
            <div className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg p-4 text-gray-300 whitespace-pre-line">
              {contact.message}
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                onDelete(contact.id);
                onClose();
              }}
              className="flex items-center gap-2 bg-red-700/20 hover:bg-red-700/30 border border-red-700/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
            >
              <FaTrash size={14} />
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
