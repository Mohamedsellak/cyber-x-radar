"use client";

import React, { useState } from 'react';
import { 
  FaEnvelope, FaSearch, FaEye, FaTrash, 
  FaReply, FaCheck, FaTimes, FaBuilding
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  inquiryType: 'Sales' | 'Support' | 'Partnership';
  company: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function Messages() {
  // Mock messages data
  const initialMessages: ContactMessage[] = [
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john@example.com', 
      inquiryType: 'Support', 
      company: 'Tech Corp',
      message: 'I\'m experiencing some issues with loading the dashboard. The scan results aren\'t showing up properly. Can you please help?',
      createdAt: '2023-11-15 10:30:42', 
      read: false
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah@company.co', 
      inquiryType: 'Sales', 
      company: 'Global Systems Inc',
      message: 'We\'re interested in your enterprise plan. Could you provide more information about pricing for a team of 50 people? Thank you.',
      createdAt: '2023-11-14 14:22:10', 
      read: true
    },
    { 
      id: 3, 
      name: 'Mike Williams', 
      email: 'mike@domain.io', 
      inquiryType: 'Partnership', 
      company: 'Security Partners',
      message: 'Our company develops a complementary security product and we\'d like to discuss a potential integration partnership. Please let me know when we can schedule a call.',
      createdAt: '2023-11-13 09:45:33', 
      read: true
    },
  ];

  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  // Filter and search messages
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || message.inquiryType === filterType;
    
    return matchesSearch && matchesType;
  });

  // View message
  const handleViewMessage = (message: ContactMessage) => {
    // Mark as read
    if (!message.read) {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      ));
    }
    setSelectedMessage(message);
    setIsViewModalOpen(true);
  };

  // Reply to message
  const handleReply = (message: ContactMessage) => {
    setSelectedMessage(message);
    setReplyText(`Hi ${message.name},\n\nThank you for your inquiry. `);
    setIsReplyModalOpen(true);
  };

  // Send reply (simulated)
  const sendReply = () => {
    // Here we would typically connect to an email API
    // This is just a simulation
    alert(`Reply to ${selectedMessage?.email} has been sent.`);
    setIsReplyModalOpen(false);
    setReplyText('');
  };

  // Delete message
  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter(message => message.id !== id));
    setConfirmDeleteId(null);
  };

  // Mark all as read
  const markAllAsRead = () => {
    setMessages(messages.map(message => ({ ...message, read: true })));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center gap-2">
            <FaEnvelope className="text-blue-400" />
            Contact Messages
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage contact form submissions from users</p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-400">
            {messages.filter(m => !m.read).length} unread
          </span>
          <button 
            className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-3 py-1 rounded-lg text-sm transition-colors"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </button>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 pl-10 pr-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Inquiry Types</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Messages table */}
      <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-indigo-900/30">
                <th className="py-3 px-4 text-left">From</th>
                <th className="py-3 px-4 text-left">Company</th>
                <th className="py-3 px-4 text-left">Inquiry Type</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message) => (
                <tr 
                  key={message.id} 
                  className={`border-b border-indigo-900/20 hover:bg-indigo-900/20 transition-colors ${!message.read ? 'bg-blue-900/10' : ''}`}
                >
                  <td className="py-3 px-4">
                    <div className={`font-medium ${!message.read ? 'text-white' : ''}`}>
                      {message.name}
                    </div>
                    <div className="text-sm text-gray-400">{message.email}</div>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <FaBuilding size={14} />
                    </div>
                    <span>{message.company || 'N/A'}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      message.inquiryType === 'Sales' ? 'bg-purple-900/30 text-purple-400 border border-purple-700/30' :
                      message.inquiryType === 'Support' ? 'bg-blue-900/30 text-blue-400 border border-blue-700/30' :
                      'bg-indigo-900/30 text-indigo-400 border border-indigo-700/30'
                    }`}>
                      {message.inquiryType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{message.createdAt}</td>
                  <td className="py-3 px-4">
                    {message.read ? (
                      <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400 border border-green-700/30">
                        Read
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/30 text-yellow-400 border border-yellow-700/30">
                        Unread
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewMessage(message)}
                        className="p-1 text-blue-400 hover:text-blue-300 transition-colors" 
                        title="View"
                      >
                        <FaEye size={16} />
                      </button>
                      
                      <button 
                        onClick={() => handleReply(message)}
                        className="p-1 text-green-400 hover:text-green-300 transition-colors" 
                        title="Reply"
                      >
                        <FaReply size={16} />
                      </button>
                      
                      {confirmDeleteId === message.id ? (
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleDeleteMessage(message.id)}
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
                          onClick={() => setConfirmDeleteId(message.id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Delete"
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
        
        {filteredMessages.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-400">No messages found matching your filters</p>
          </div>
        )}
      </div>
      
      {/* Message stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
          <div className="text-sm text-gray-400 mb-1">Total Messages</div>
          <div className="text-2xl font-bold">{messages.length}</div>
        </div>
        
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
          <div className="text-sm text-gray-400 mb-1">Unread Messages</div>
          <div className="text-2xl font-bold">{messages.filter(m => !m.read).length}</div>
        </div>
        
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
          <div className="text-sm text-gray-400 mb-1">Last 7 Days</div>
          <div className="text-2xl font-bold">{messages.filter(m => {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const messageDate = new Date(m.createdAt);
            return messageDate >= sevenDaysAgo;
          }).length}</div>
        </div>
      </div>
      
      {/* View Message Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedMessage && (
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
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-xs text-gray-400 mb-1">From</h3>
                    <p className="text-white font-medium">{selectedMessage.name}</p>
                    <p className="text-gray-400 text-sm">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-400 mb-1">Company</h3>
                    <p className="text-white">{selectedMessage.company || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-400 mb-1">Inquiry Type</h3>
                    <span className={`px-2 py-1 rounded-full text-xs inline-block ${
                      selectedMessage.inquiryType === 'Sales' ? 'bg-purple-900/30 text-purple-400 border border-purple-700/30' :
                      selectedMessage.inquiryType === 'Support' ? 'bg-blue-900/30 text-blue-400 border border-blue-700/30' :
                      'bg-indigo-900/30 text-indigo-400 border border-indigo-700/30'
                    }`}>
                      {selectedMessage.inquiryType}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-400 mb-1">Date Received</h3>
                    <p className="text-gray-300">{selectedMessage.createdAt}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Message</h3>
                  <div className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg p-4 text-gray-300 whitespace-pre-line">
                    {selectedMessage.message}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      handleReply(selectedMessage);
                    }}
                    className="flex items-center gap-2 bg-green-700/20 hover:bg-green-700/30 border border-green-700/30 text-green-400 px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaReply size={14} />
                    Reply
                  </button>
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      setConfirmDeleteId(selectedMessage.id);
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
        )}
      </AnimatePresence>
      
      {/* Reply Modal */}
      <AnimatePresence>
        {isReplyModalOpen && selectedMessage && (
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
                  <FaReply className="text-green-400" />
                  Reply to {selectedMessage.name}
                </h2>
                <button 
                  onClick={() => setIsReplyModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">To</h3>
                  <div className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg p-3 text-gray-300 flex justify-between">
                    <div>{selectedMessage.email}</div>
                    <div className="text-xs text-gray-400">{selectedMessage.name}</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Message</h3>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={8}
                    className="w-full bg-[#121232]/70 border border-indigo-900/50 rounded-lg p-3 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsReplyModalOpen(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendReply}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaReply size={14} />
                    Send Reply
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
