"use client";

import React, { useState } from 'react';
import { FaKey, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (company: string, name: string) => Promise<void>;
}

export default function TokenModal({ isOpen, onClose, onSubmit }: TokenModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName.trim() || !userName.trim()) {
      setError('Both company name and user name are required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onSubmit(companyName, userName);
      setCompanyName('');
      setUserName('');
    } catch (err) {
      setError('Failed to generate token. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      className="bg-gradient-to-b from-[#1A2A4A]/95 to-[#121232]/95 rounded-xl border border-indigo-900/50 shadow-2xl w-full max-w-lg backdrop-blur-sm"
    >
      <div className="p-6 border-b border-indigo-900/50">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg shadow-md">
            <FaKey className="text-white" />
          </div>
          <span>Generate New API Token</span>
        </h2>
      </div>
      
      <div className="p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/20 p-4 rounded-lg border border-red-900/30 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2.5 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
              placeholder="Enter company name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              User Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2.5 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
              placeholder="Enter user name"
              required
            />
          </div>
          
          <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-900/30 flex gap-3">
            <div className="text-yellow-400 mt-0.5">
              <FaLightbulb />
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-1 font-medium">Important Information</p>
              <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                <li>API tokens provide full access to the Cyber X Radar API</li>
                <li>Store the token securely and never expose it in client-side code</li>
                <li>You won&apos;t be able to view the full token again after generation</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
      
      <div className="p-6 border-t border-indigo-900/50 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2.5 text-gray-400 hover:text-white transition-colors hover:bg-gray-800/30 rounded-lg"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <FaKey size={14} />
              Generate Token
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
