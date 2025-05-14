"use client";

import React, { useState } from 'react';
import { 
  FaKey, FaPlus, FaSearch, FaEye, FaEyeSlash, 
  FaTrash, FaCheck, FaTimes, FaCopy, FaBuilding
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Token {
  id: number;
  companyName: string;
  token: string;
  createdAt: string;
}

export default function TokenManagement() {
  // Mock tokens data
  const initialTokens: Token[] = [
    { id: 1, companyName: 'Acme Corporation', token: 'af45bc78d3e2ff1a9b6c45d8', createdAt: '2023-10-12 08:30:42' },
    { id: 2, companyName: 'Tech Solutions Inc', token: '7fb92e3c1d5a48f2e9a7d6b0', createdAt: '2023-11-05 14:22:10' },
    { id: 3, companyName: 'Global Systems LLC', token: 'c2e4f6a8b0d2e4f6a8c0d2e4', createdAt: '2023-11-14 09:45:33' },
  ];

  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [hiddenTokens, setHiddenTokens] = useState<number[]>([2, 3]);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [copySuccess, setCopySuccess] = useState<number | null>(null);

  // Filter and search tokens
  const filteredTokens = tokens.filter(token => {
    return token.companyName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Toggle token visibility
  const toggleTokenVisibility = (id: number) => {
    if (hiddenTokens.includes(id)) {
      setHiddenTokens(hiddenTokens.filter(tokenId => tokenId !== id));
    } else {
      setHiddenTokens([...hiddenTokens, id]);
    }
  };

  // Copy token to clipboard
  const copyToClipboard = (token: string, id: number) => {
    navigator.clipboard.writeText(token);
    setCopySuccess(id);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  // Add new token
  const handleAddToken = () => {
    if (!newCompanyName.trim()) return;
    
    // Generate a random token
    const randomToken = Array.from(Array(24), () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const newToken: Token = {
      id: tokens.length + 1,
      companyName: newCompanyName,
      token: randomToken,
      createdAt: new Date().toLocaleString(),
    };
    
    setTokens([...tokens, newToken]);
    setNewCompanyName('');
    setIsModalOpen(false);
  };

  // Delete token
  const handleDeleteToken = (id: number) => {
    setTokens(tokens.filter(token => token.id !== id));
    setConfirmDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center gap-2">
            <FaKey className="text-blue-400" />
            API Tokens
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage company API tokens for accessing the Cyber X Radar API</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Generate New Token
        </motion.button>
      </div>
      
      {/* Search */}
      <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by company name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 pl-10 pr-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Tokens table */}
      <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-indigo-900/30">
                <th className="py-3 px-4 text-left">Company</th>
                <th className="py-3 px-4 text-left">API Token</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.map((token) => (
                <tr key={token.id} className="border-b border-indigo-900/20 hover:bg-indigo-900/20 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <FaBuilding size={14} />
                    </div>
                    <span>{token.companyName}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 font-mono text-sm">
                    <div className="flex items-center gap-2">
                      {hiddenTokens.includes(token.id) ? 
                        '••••••••••••••••••••••••' : 
                        token.token
                      }
                      <button 
                        onClick={() => toggleTokenVisibility(token.id)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {hiddenTokens.includes(token.id) ? <FaEye size={14} /> : <FaEyeSlash size={14} />}
                      </button>
                      <button 
                        onClick={() => copyToClipboard(token.token, token.id)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <FaCopy size={14} />
                      </button>
                      {copySuccess === token.id && (
                        <span className="text-xs text-green-400">Copied!</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{token.createdAt}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {confirmDeleteId === token.id ? (
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleDeleteToken(token.id)}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            title="Confirm"
                          >
                            <FaCheck size={16} />
                          </button>
                          <button 
                            onClick={() => setConfirmDeleteId(null)}
                            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                            title="Cancel"
                          >
                            <FaTimes size={16} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setConfirmDeleteId(token.id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Revoke Token"
                        >
                          <FaTrash size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTokens.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-400">No tokens found matching your search</p>
          </div>
        )}
      </div>
      
      {/* Token generation modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 rounded-xl border border-indigo-900/50 shadow-2xl w-full max-w-lg"
            >
              <div className="p-6 border-b border-indigo-900/50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaKey className="text-blue-400" />
                  Generate New API Token
                </h2>
              </div>
              
              <div className="p-6">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddToken(); }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={newCompanyName}
                      onChange={(e) => setNewCompanyName(e.target.value)}
                      className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                  
                  <div className="bg-indigo-900/20 p-3 rounded-lg border border-indigo-900/30">
                    <p className="text-sm text-gray-300 mb-1">Important Information</p>
                    <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                      <li>API tokens provide full access to the Cyber X Radar API</li>
                      <li>Store the token securely and never expose it in client-side code</li>
                      <li>You won't be able to view the full token again after generation</li>
                    </ul>
                  </div>
                </form>
              </div>
              
              <div className="p-6 border-t border-indigo-900/50 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToken}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaKey size={14} />
                  Generate Token
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
