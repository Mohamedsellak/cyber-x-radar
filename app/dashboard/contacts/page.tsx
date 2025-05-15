"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  FaEnvelope, FaSearch, FaEye, FaTrash, 
  FaCheck, FaTimes, FaBuilding, FaSyncAlt, FaToggleOn, FaToggleOff
} from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import ViewContactModal from './components/ViewContactModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

interface Contact {
  id: number;
  name: string;
  email: string;
  inquiry_type: string;
  company_name: string;
  message: string;
  created_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(3); // 3 seconds default
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(refreshInterval);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initial fetch
  useEffect(() => {
    fetchContacts();
    // Clean up any timers on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Auto refresh timer
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (autoRefresh) {
      // Set initial countdown
      setCountdown(refreshInterval);
      
      // Start new timer
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          // When we reach 0, refresh and reset
          if (prev <= 1) {
            fetchContacts();
            return refreshInterval;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoRefresh, refreshInterval]);

  // Fetch contacts from API
  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token not found');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch('http://localhost/cyber-x-radar/server/api/contacts/get.php', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setContacts(data.data || []);
        setLastRefreshTime(new Date());
      } else {
        setError(data.message || 'Failed to fetch contacts');
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete contact
  const handleDeleteContact = async (id: number) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token not found');
        return;
      }
      
      const response = await fetch(`http://localhost/cyber-x-radar/server/api/contacts/delete.php?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Remove from state after successful deletion
        setContacts(contacts.filter(contact => contact.id !== id));
        setIsDeleteModalOpen(false);
        setContactToDelete(null);
      } else {
        alert(data.message || 'Failed to delete contact');
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
      alert('Failed to connect to the server');
    }
  };

  // Show delete confirmation modal
  const showDeleteConfirmation = (contact: Contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const confirmDelete = async (id: number) => {
    await handleDeleteContact(id);
  };

  // Cancel delete
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setContactToDelete(null);
  };

  // View contact
  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  // Toggle auto refresh
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  // Change refresh interval
  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRefreshInterval(Number(e.target.value));
    setCountdown(Number(e.target.value));
  };

  // Format last refresh time
  const formatLastRefresh = () => {
    if (!lastRefreshTime) return 'Never';
    return lastRefreshTime.toLocaleTimeString();
  };

  // Filter and search contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (contact.company_name && contact.company_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || contact.inquiry_type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  // Navigation functions
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Change items per page
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
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
          <div className="flex items-center gap-3 bg-[#1A1A3A]/50 border border-indigo-900/50 rounded-lg px-3 py-1">
            <button 
              onClick={toggleAutoRefresh}
              className="text-blue-400 hover:text-blue-300 flex items-center"
              title={autoRefresh ? "Turn off auto-refresh" : "Turn on auto-refresh"}
            >
              {autoRefresh ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
            </button>
            
            {autoRefresh && (
              <select
                value={refreshInterval}
                onChange={handleIntervalChange}
                className="bg-[#121232]/70 border border-indigo-900/50 rounded py-1 px-2 text-xs text-gray-300"
              >
                <option value="10">10s</option>
                <option value="30">30s</option>
                <option value="60">1m</option>
                <option value="300">5m</option>
              </select>
            )}
            
            {autoRefresh && (
              <div className="text-xs text-gray-400">
                <span className="font-mono">{countdown}s</span>
              </div>
            )}
          </div>
          
          <button 
            className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-2"
            onClick={fetchContacts}
          >
            <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>
      
      {lastRefreshTime && (
        <div className="text-xs text-gray-500 flex justify-end">
          Last updated: {formatLastRefresh()}
        </div>
      )}
      
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
              <option value="General">General</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Loading & Error states */}
      {isLoading && (
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading contacts...</p>
        </div>
      )}
      
      {error && !isLoading && (
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-red-900/50 shadow-lg p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchContacts}
            className="mt-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Contacts table */}
      {!isLoading && !error && (
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg overflow-hidden">
          {/* Table header with items per page selector */}
          <div className="p-3 border-b border-indigo-900/30 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredContacts.length)} of {filteredContacts.length} messages
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-[#121232]/70 border border-indigo-900/50 rounded py-1 px-2 text-xs text-gray-300"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-indigo-900/30">
                  <th className="py-3 px-4 text-left">From</th>
                  <th className="py-3 px-4 text-left">Company</th>
                  <th className="py-3 px-4 text-left">Inquiry Type</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((contact) => (
                  <tr 
                    key={contact.id} 
                    className="border-b border-indigo-900/20 hover:bg-indigo-900/20 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium">
                        {contact.name}
                      </div>
                      <div className="text-sm text-gray-400">{contact.email}</div>
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <FaBuilding size={14} />
                      </div>
                      <span>{contact.company_name || 'N/A'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contact.inquiry_type === 'Sales' ? 'bg-purple-900/30 text-purple-400 border border-purple-700/30' :
                        contact.inquiry_type === 'Support' ? 'bg-blue-900/30 text-blue-400 border border-blue-700/30' :
                        contact.inquiry_type === 'Partnership' ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-700/30' :
                        'bg-green-900/30 text-green-400 border border-green-700/30'
                      }`}>
                        {contact.inquiry_type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{contact.created_at}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewContact(contact)}
                          className="p-1 text-blue-400 hover:text-blue-300 transition-colors" 
                          title="View"
                        >
                          <FaEye size={16} />
                        </button>
                        
                        <button 
                          onClick={() => showDeleteConfirmation(contact)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Delete"
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
          
          {filteredContacts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-400">No messages found matching your filters</p>
            </div>
          )}
          
          {/* Pagination Navigation */}
          {filteredContacts.length > 0 && (
            <div className="p-4 border-t border-indigo-900/30 flex justify-between items-center">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${
                  currentPage === 1 
                    ? 'border-gray-700 text-gray-600 cursor-not-allowed' 
                    : 'border-blue-600/30 text-blue-400 hover:bg-blue-600/10'
                }`}
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentPage === page
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                        : 'text-gray-400 hover:bg-indigo-900/30'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${
                  currentPage === totalPages 
                    ? 'border-gray-700 text-gray-600 cursor-not-allowed' 
                    : 'border-blue-600/30 text-blue-400 hover:bg-blue-600/10'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Contact stats */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
            <div className="text-sm text-gray-400 mb-1">Total Messages</div>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </div>
          
          <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
            <div className="text-sm text-gray-400 mb-1">Inquiry Types</div>
            <div className="text-2xl font-bold">
              {new Set(contacts.map(c => c.inquiry_type)).size}
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
            <div className="text-sm text-gray-400 mb-1">Last 7 Days</div>
            <div className="text-2xl font-bold">{contacts.filter(c => {
              const sevenDaysAgo = new Date();
              sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
              const contactDate = new Date(c.created_at);
              return contactDate >= sevenDaysAgo;
            }).length}</div>
          </div>
        </div>
      )}
      
      {/* View Contact Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedContact && (
          <ViewContactModal
            contact={selectedContact}
            onClose={() => setIsViewModalOpen(false)}
            onDelete={(id) => {
              setIsViewModalOpen(false);
              showDeleteConfirmation(selectedContact);
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && contactToDelete && (
          <DeleteConfirmationModal
            contactId={contactToDelete.id}
            contactName={contactToDelete.name}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
