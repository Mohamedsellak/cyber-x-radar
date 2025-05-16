"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSort, FaEye, FaTrash, FaRadiation, FaExclamationTriangle, 
         FaShieldAlt, FaRegCopy,FaEnvelope, FaPhone, FaSyncAlt, FaExternalLinkAlt } from 'react-icons/fa';
// Import the missing toggle icons
import { IoToggle, IoToggleOutline } from 'react-icons/io5';
import ViewScanModal from './components/ViewScanModal';
import DeleteScanModal from './components/DeleteScanModal';
import SuccessToast from './components/SuccessToast';

// Updated interface to match API response
interface Scan {
  id: number;
  domain_name: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at?: string;
}

const ScansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scans, setScans] = useState<Scan[]>([]);
  const [filteredScans, setFilteredScans] = useState<Scan[]>([]);
  const [sortField, setSortField] = useState<keyof Scan>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isClient, setIsClient] = useState(false);
  // Remove unused hoverIndex state variable
  
  // State variables for functionality
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  // Remove unused showExportOptions state variable
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [countdown, setCountdown] = useState(refreshInterval);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Set isClient to true after component mounts to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
    fetchScans();
    
    // Add click outside listener for dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // No need to set showExportOptions since it's been removed
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
            fetchScans();
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

  // Fetch scans from the API
  const fetchScans = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token not found');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch('https://scan.cyberxradar.com/server/api/scans/get.php', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setScans(data.data || []);
        setLastRefreshTime(new Date());
      } else {
        setError(data.message || 'Failed to fetch scans');
      }
    } catch (err) {
      console.error('Error fetching scans:', err);
      setError('Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort scans when search term or sort options change
  useEffect(() => {
    let results = [...scans];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        scan => 
          scan.domain_name.toLowerCase().includes(term) ||
          scan.name.toLowerCase().includes(term) ||
          scan.email.toLowerCase().includes(term) ||
          (scan.phone && scan.phone.toLowerCase().includes(term))
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      } else {
        return sortDirection === 'asc' 
          ? (fieldA as number) - (fieldB as number)
          : (fieldB as number) - (fieldA as number);
      }
    });
    
    setFilteredScans(results);
  }, [searchTerm, sortField, sortDirection, scans]);

  // View scan details
  const handleViewDetails = (scan: Scan) => {
    setSelectedScan(scan);
    setShowDetailModal(true);
  };
  
  // Delete scan
  const handleDeleteClick = (scan: Scan) => {
    setSelectedScan(scan);
    setShowDeleteModal(true);
  };
  
  // Confirm delete with API call
  const confirmDelete = async (scanId: number) => {
    setIsDeleting(true);
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token not found');
        setIsDeleting(false);
        return;
      }
      
      const response = await fetch(`https://scan.cyberxradar.com/server/api/scans/delete.php?id=${scanId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Filter out the deleted scan
        setScans(scans.filter(scan => scan.id !== scanId));
        setShowDeleteModal(false);
        
        // Show success message
        if (selectedScan) {
          setSuccessMessage(`Scan for ${selectedScan.domain_name} has been deleted`);
          setShowSuccessToast(true);
          setTimeout(() => setShowSuccessToast(false), 3000);
        }
      } else {
        alert(data.message || 'Failed to delete scan');
      }
    } catch (err) {
      console.error('Error deleting scan:', err);
      alert('Failed to connect to the server');
    } finally {
      setIsDeleting(false);
    }
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

  // Set the last refresh time
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);

  // Format last refresh time
  const formatLastRefresh = () => {
    if (!lastRefreshTime) return 'Never';
    return lastRefreshTime.toLocaleTimeString();
  };
  
  // Copy to clipboard functionality
  const copyToClipboard = (text: string, recordId: string) => {
    navigator.clipboard.writeText(text);
    setActiveCardId(recordId);
    setTimeout(() => setActiveCardId(null), 1500);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A1F] to-[#121221] min-h-screen text-white">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"
        ></motion.div>
      </div>
      
      {/* Cyber-themed grid pattern overlay */}
      <motion.div 
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07] pointer-events-none"
      ></motion.div>
      
      <div className="max-w-full mx-auto relative z-10">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-900/30 border border-blue-700/30 flex items-center justify-center shadow-inner">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <FaRadiation className="text-blue-400" size={18} />
                  </motion.div>
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
                >
                  Domain Scan Records
                </motion.h1>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-400 text-lg ml-1 max-w-2xl"
              >
                View a history of all domain scans performed on the system.
              </motion.p>
              
              {/* Stats summary */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="bg-gradient-to-br from-[#1D1D42]/70 to-[#131330]/70 px-4 py-2 rounded-full border border-indigo-900/20 shadow-inner flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-gray-400 text-sm">Total Scans: <span className="text-blue-400 font-medium">{scans.length}</span></span>
                </div>
                
                <div className="bg-gradient-to-br from-[#1D1D42]/70 to-[#131330]/70 px-4 py-2 rounded-full border border-indigo-900/20 shadow-inner flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-gray-400 text-sm">Last Refresh: <span className="text-green-400 font-medium">{formatLastRefresh()}</span></span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Auto-refresh controls - fixed toggle icons */}
              <div className="flex items-center gap-3 bg-[#1A1A3A]/50 border border-indigo-900/50 rounded-lg px-3 py-1">
                <button 
                  onClick={toggleAutoRefresh}
                  className="text-blue-400 hover:text-blue-300 flex items-center"
                  title={autoRefresh ? "Turn off auto-refresh" : "Turn on auto-refresh"}
                >
                  {autoRefresh ? <IoToggle size={20} /> : <IoToggleOutline size={20} />}
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
              
              {/* Refresh button */}
              <button 
                className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-2"
                onClick={fetchScans}
              >
                <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
                Refresh
              </button>
              
              {/* Export Options Dropdown and Add New Scan buttons removed */}
            </div>
          </div>
        </div>
        
        {/* Search bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-[#1D1D42]/90 to-[#131330]/90 rounded-xl border border-indigo-900/30 shadow-lg p-4 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            <div className="relative flex-grow group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-indigo-900/50 rounded-lg leading-5 bg-[#121232] text-gray-200 placeholder-gray-400 focus:outline-none focus:bg-[#1E1E3E] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-200"
                placeholder="Search by domain or scanner contact info..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden">
                <motion.div 
                  className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" 
                  animate={{ x: ['-100%', '400%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              </div>
              
              {/* Search results count badge */}
              {searchTerm && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-900/30 px-2 py-0.5 rounded-full text-xs text-blue-400 border border-blue-800/30">
                  {filteredScans.length} {filteredScans.length === 1 ? 'result' : 'results'}
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative inline-flex group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSort className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" aria-hidden="true" />
                </div>
                <select
                  className="appearance-none block pl-10 pr-12 py-3 border border-indigo-900/50 rounded-lg leading-5 bg-[#121232] text-gray-200 focus:outline-none focus:bg-[#1E1E3E] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-200"
                  value={`${sortField}-${sortDirection}`}
                  onChange={(e) => {
                    const [field, direction] = e.target.value.split('-');
                    setSortField(field as keyof Scan);
                    setSortDirection(direction as 'asc' | 'desc');
                  }}
                >
                  <option value="created_at-desc">Newest First</option>
                  <option value="created_at-asc">Oldest First</option>
                  <option value="domain_name-asc">Domain Name (A-Z)</option>
                  <option value="domain_name-desc">Domain Name (Z-A)</option>
                  <option value="name-asc">Scanner Name (A-Z)</option>
                  <option value="name-desc">Scanner Name (Z-A)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading scan records...</p>
          </div>
        )}
        
        {/* Error state */}
        {error && !isLoading && (
          <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-red-900/50 shadow-lg p-6 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchScans}
              className="mt-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Scan records - table only */}
        {isClient && !isLoading && !error && (
          <>
            {filteredScans.length > 0 ? (
              <div className="mb-8">
                {/* Table View Only */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-gradient-to-br from-[#1D1D42]/90 to-[#131330]/90 rounded-xl border border-indigo-900/30 shadow-lg overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-indigo-900/30">
                      <thead className="bg-[#121232]">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Domain
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Scanner Contact
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Scan Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-indigo-900/30">
                        {filteredScans.map((scan) => (
                          <motion.tr 
                            key={scan.id}
                            variants={itemVariants}
                            className="hover:bg-indigo-900/10 transition-colors"
                            // Remove onMouseEnter and onMouseLeave events since hoverIndex is removed
                            layoutId={`scan-row-${scan.id}`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-lg flex-shrink-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-indigo-800/20 flex items-center justify-center mr-3">
                                  <FaShieldAlt className="text-blue-400" />
                                </div>
                                <div className="group">
                                  <div className="font-medium text-blue-400 flex items-center gap-2" title={scan.domain_name}>
                                    {/* Add link to domain */}
                                    <a 
                                      href={`https://${scan.domain_name}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 hover:underline"
                                    >
                                      {scan.domain_name}
                                      <FaExternalLinkAlt size={10} />
                                    </a>
                                    
                                    <motion.button 
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="text-gray-500 hover:text-blue-400 transition-colors" 
                                      title="Copy domain" 
                                      onClick={() => copyToClipboard(scan.domain_name, scan.id.toString())}
                                    >
                                      <FaRegCopy size={12} />
                                    </motion.button>
                                    
                                    {/* Copy confirmation */}
                                    <AnimatePresence>
                                      {activeCardId === scan.id.toString() && (
                                        <motion.span
                                          initial={{ opacity: 0, x: 20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: 20 }}
                                          className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full"
                                        >
                                          Copied!
                                        </motion.span>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                  <div className="text-xs text-gray-400">ID: {scan.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-white">
                                {scan.name}
                              </div>
                              <div className="text-xs text-blue-400 flex items-center gap-1">
                                <FaEnvelope size={10} className="text-blue-500" />
                                {scan.email}
                              </div>
                              <div className="text-xs text-gray-400 flex items-center gap-1">
                                <FaPhone size={10} className="text-gray-500" />
                                {scan.phone || 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {formatDate(scan.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <motion.button 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-blue-400 hover:text-blue-300 transition-colors p-1.5"
                                  onClick={() => handleViewDetails(scan)}
                                  title="View Details"
                                >
                                  <FaEye size={16} />
                                </motion.button>
                                <motion.button 
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-red-400 hover:text-red-300 transition-colors p-1.5"
                                  onClick={() => handleDeleteClick(scan)}
                                  title="Delete Record"
                                >
                                  <FaTrash size={16} />
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#1D1D42]/90 to-[#131330]/90 rounded-xl border border-indigo-900/30 shadow-lg p-8 text-center"
              >
                <FaExclamationTriangle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No scan records found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  We couldn&apos;t find any domain scan records matching your search criteria. Try adjusting your filters.
                </p>
              </motion.div>
            )}
          </>
        )}
        
        {/* Pagination */}
        {filteredScans.length > 0 && !isLoading && !error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-[#1A1A3A]/40 to-[#1E1E45]/40 p-4 rounded-lg border border-indigo-900/30"
          >
            <div className="text-sm text-gray-400 mb-3 sm:mb-0">
              Showing <span className="text-blue-400 font-medium">{filteredScans.length}</span> of <span className="text-gray-300">{scans.length}</span> records
            </div>
            
            <div className="flex items-center gap-2">
              <button disabled className="px-4 py-2 border border-indigo-900/50 bg-[#121232]/70 text-gray-500 rounded-md text-sm flex items-center gap-1 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center border border-indigo-700/50 bg-indigo-900/30 text-blue-400 rounded-md text-sm font-medium hover:bg-indigo-900/50 transition-colors">1</button>
              <button disabled className="px-4 py-2 border border-indigo-900/50 bg-[#121232]/70 text-gray-500 rounded-md text-sm flex items-center gap-1 transition-colors">
                <span>Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* View Details Modal */}
      <AnimatePresence>
        {showDetailModal && selectedScan && (
          <ViewScanModal 
            scan={selectedScan}
            onClose={() => setShowDetailModal(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedScan && (
          <DeleteScanModal
            scan={selectedScan}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>
      
      {/* Success Toast Notification */}
      <AnimatePresence>
        {showSuccessToast && (
          <SuccessToast 
            message={successMessage}
            onClose={() => setShowSuccessToast(false)}
          />
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ScansPage;
