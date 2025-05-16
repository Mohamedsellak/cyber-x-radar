"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaKey, FaPlus, FaSearch, FaEye, FaEyeSlash, 
  FaTrash, FaCopy, FaBuilding, FaEdit,
  FaExclamationTriangle, FaSyncAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import TokenModal from './components/TokenModal';
import DeleteTokenModal from './components/DeleteTokenModal';
import UpdateTokenModal from './components/UpdateTokenModal';

interface Token {
  id: number;
  token: string;
  company: string;
  name: string;
  created_at?: string;
}

export default function TokenManagement() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  //const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [hiddenTokens, setHiddenTokens] = useState<number[]>([]);
  const [copySuccess, setCopySuccess] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tokens on page load
  useEffect(() => {
    fetchTokens();
  }, []);

  // Fetch tokens directly from API
  const fetchTokens = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token not found');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch('https://scan.cyberxradar.com/server/api/tokens/get.php', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setTokens(data.data || []);
        
        // Hide all tokens by default
        setHiddenTokens(data.data.map((token: Token) => token.id));
      } else {
        setError(data.message || 'Failed to fetch tokens');
      }
    } catch (err) {
      console.error('Error fetching tokens:', err);
      setError('Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and search tokens
  const filteredTokens = tokens.filter(token => {
    return token.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (token.name && token.name.toLowerCase().includes(searchTerm.toLowerCase()));
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

  // Generate new token
  const handleGenerateToken = async (company: string, name: string) => {
    try {
      const authToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!authToken) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch('https://scan.cyberxradar.com/server/api/tokens/generate.php', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ company, name })
      });
      
      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        // Add the new token to the list
        setTokens([...tokens, data.data]);
        setIsModalOpen(false);
      } else {
        throw new Error(data.message || 'Failed to generate token');
      }
    } catch (err) {
      console.error('Error generating token:', err);
      throw err;
    }
  };

  // Prepare to update token
  const handleUpdateClick = (token: Token) => {
    setSelectedToken(token);
    setUpdateModalOpen(true);
  };

  // Update token
  const handleUpdateToken = async (id: number, company: string, name: string) => {
    try {
      const authToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!authToken) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch('https://scan.cyberxradar.com/server/api/tokens/update.php', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, company, name })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Update the token in the list
        setTokens(tokens.map(token => 
          token.id === id ? { ...token, company, name } : token
        ));
        setUpdateModalOpen(false);
        setSelectedToken(null);
      } else {
        throw new Error(data.message || 'Failed to update token');
      }
    } catch (err) {
      console.error('Error updating token:', err);
      throw err;
    }
  };

  // Prepare to delete token
  const handleDeleteClick = (token: Token) => {
    setSelectedToken(token);
    setDeleteModalOpen(true);
  };

  // Confirm delete token
  const confirmDelete = async (id: number) => {
    try {
      const authToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!authToken) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(`https://scan.cyberxradar.com/server/api/tokens/delete.php?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Remove the deleted token from the list
        setTokens(tokens.filter(token => token.id !== id));
        setDeleteModalOpen(false);
        setSelectedToken(null);
      } else {
        throw new Error(data.message || 'Failed to delete token');
      }
    } catch (err) {
      console.error('Error deleting token:', err);
      alert('Failed to delete token');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center gap-2">
            <FaKey className="text-blue-400" />
            API Tokens
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage company API tokens for accessing the Cyber X Radar API</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchTokens}
            className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-3 py-2 rounded-lg flex items-center gap-2"
            disabled={isLoading}
          >
            <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
            Refresh
          </motion.button>
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
      </div>
      
      {/* Search bar */}
      <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by company or user name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 pl-10 pr-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading API tokens...</p>
        </div>
      )}
      
      {/* Error state */}
      {error && !isLoading && (
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-red-900/50 shadow-lg p-6 text-center">
          <FaExclamationTriangle className="mx-auto text-red-400 text-2xl mb-3" />
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchTokens}
            className="mt-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Tokens table */}
      {!isLoading && !error && (
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-indigo-900/30">
                  <th className="py-3 px-4 text-left">Company</th>
                  <th className="py-3 px-4 text-left">User</th>
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
                      <span>{token.company}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {token.name}
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
                    <td className="py-3 px-4 text-gray-400 text-sm">{token.created_at || 'Unknown'}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleUpdateClick(token)}
                          className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                          title="Edit Token"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(token)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Revoke Token"
                        >
                          <FaTrash size={16} />
                        </button>
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
      )}
      
      {/* Token generation modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <TokenModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              onSubmit={handleGenerateToken} 
            />
          </div>
        )}
      </AnimatePresence>
      
      {/* Token update modal */}
      <AnimatePresence>
        {updateModalOpen && selectedToken && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <UpdateTokenModal 
              token={selectedToken}
              isOpen={updateModalOpen}
              onClose={() => setUpdateModalOpen(false)} 
              onUpdate={handleUpdateToken} 
            />
          </div>
        )}
      </AnimatePresence>
      
      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteModalOpen && selectedToken && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <DeleteTokenModal 
              token={selectedToken}
              onClose={() => setDeleteModalOpen(false)} 
              onConfirm={confirmDelete} 
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
