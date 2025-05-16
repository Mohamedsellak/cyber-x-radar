"use client";

import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Token {
  id: number;
  token: string;
  company: string;
  name: string;
}

interface UpdateTokenModalProps {
  token: Token;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, company: string, name: string) => Promise<void>;
}

export default function UpdateTokenModal({ token, isOpen, onClose, onUpdate }: UpdateTokenModalProps) {
  // Initialize with empty strings and use useEffect to set values after mounting
  // This helps avoid hydration mismatches
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Mark component as client-rendered to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
    // Update form when token changes
    if (token) {
      setCompanyName(token.company || '');
      setUserName(token.name || '');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName.trim() || !userName.trim()) {
      setError('Both company name and user name are required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onUpdate(token.id, companyName, userName);
    } catch (err) {
      setError('Failed to update token. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Only render the full component on the client to avoid hydration issues
  if (!isClient || !isOpen) {
    return null; // Return null during server-side rendering or when modal is closed
  }

  return (
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 rounded-xl border border-indigo-900/50 shadow-2xl w-full max-w-lg"
    >
      <div className="p-6 border-b border-indigo-900/50">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaEdit className="text-blue-400" />
          Update API Token
        </h2>
      </div>
      
      <div className="p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/20 p-3 rounded-lg border border-red-900/30 text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter company name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              User Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter user name"
              required
            />
          </div>
          
          <div className="bg-indigo-900/20 p-3 rounded-lg border border-indigo-900/30">
            <p className="text-xs text-gray-400">
              Note: This will only update the company and user names associated with the token. 
              The token value itself will remain unchanged.
            </p>
          </div>
        </form>
      </div>
      
      <div className="p-6 border-t border-indigo-900/50 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Updating...
            </>
          ) : (
            <>
              <FaEdit size={14} />
              Update Token
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
