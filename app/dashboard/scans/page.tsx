"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSort, FaEye, FaTrash, FaRadiation, FaDownload, FaExclamationTriangle, 
         FaShieldAlt, FaRegCopy, FaPlus, FaCalendarAlt, FaCheck, FaTimes, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

// Simplified scan record type that includes only domain and scanner contact info
interface ScanRecord {
  id: string;
  domainName: string;
  scanDate: string;
  scannerName: string;
  scannerEmail: string;
  scannerPhone: string;
}

// Updated mock data with scanner contact information
const mockScanRecords: ScanRecord[] = [
  {
    id: '1001',
    domainName: 'acme-industries.com',
    scanDate: '2023-11-15T08:30:00Z',
    scannerName: 'John Smith',
    scannerEmail: 'john.smith@example.com',
    scannerPhone: '+1 (555) 123-4567'
  },
  {
    id: '1002',
    domainName: 'globex-corp.net',
    scanDate: '2023-11-14T14:45:00Z',
    scannerName: 'Jane Doe',
    scannerEmail: 'jane.doe@example.com',
    scannerPhone: '+1 (555) 987-6543'
  },
  {
    id: '1003',
    domainName: 'initech-systems.org',
    scanDate: '2023-11-14T09:15:00Z',
    scannerName: 'Michael Johnson',
    scannerEmail: 'michael.j@example.com',
    scannerPhone: '+1 (555) 567-8901'
  },
  {
    id: '1004',
    domainName: 'umbrella-security.com',
    scanDate: '2023-11-13T16:20:00Z',
    scannerName: 'Sarah Williams',
    scannerEmail: 's.williams@example.com',
    scannerPhone: '+1 (555) 234-5678'
  },
  {
    id: '1005',
    domainName: 'stark-enterprises.com',
    scanDate: '2023-11-15T10:10:00Z',
    scannerName: 'Robert Brown',
    scannerEmail: 'r.brown@example.com',
    scannerPhone: '+1 (555) 876-5432'
  },
  {
    id: '1006',
    domainName: 'wayne-industries.net',
    scanDate: '2023-11-12T13:25:00Z',
    scannerName: 'Emily Davis',
    scannerEmail: 'emily.davis@example.com',
    scannerPhone: '+1 (555) 345-6789'
  }
];

const ScansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState<ScanRecord[]>(mockScanRecords);
  const [sortField, setSortField] = useState<keyof ScanRecord>('scanDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isClient, setIsClient] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  // State variables for functionality
  const [selectedRecord, setSelectedRecord] = useState<ScanRecord | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isColumnView, setIsColumnView] = useState(true);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Set isClient to true after component mounts to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
    
    // Add click outside listener for dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowExportOptions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter and sort records when search term or sort options change
  useEffect(() => {
    let results = [...mockScanRecords];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        record => 
          record.domainName.toLowerCase().includes(term) ||
          record.scannerName.toLowerCase().includes(term) ||
          record.scannerEmail.toLowerCase().includes(term) ||
          record.scannerPhone.toLowerCase().includes(term)
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
    
    setFilteredRecords(results);
  }, [searchTerm, sortField, sortDirection]);

  // View record details
  const handleViewDetails = (record: ScanRecord) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };
  
  // Delete record
  const handleDeleteClick = (record: ScanRecord) => {
    setSelectedRecord(record);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = () => {
    if (selectedRecord) {
      // Filter out the record to be deleted
      const updatedRecords = mockScanRecords.filter(record => record.id !== selectedRecord.id);
      setFilteredRecords(updatedRecords);
      setShowDeleteModal(false);
      
      // Show success toast
      setSuccessMessage(`Domain ${selectedRecord.domainName} has been deleted`);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };
  
  // Copy to clipboard functionality
  const copyToClipboard = (text: string, recordId: string) => {
    navigator.clipboard.writeText(text);
    setActiveCardId(recordId);
    setTimeout(() => setActiveCardId(null), 1500);
  };
  
  // Download report functionality
  const handleDownload = (record: ScanRecord) => {
    // Simulating download
    setSuccessMessage(`Report for ${record.domainName} is being downloaded`);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
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
  
  const neumorphicCard = "bg-gradient-to-br from-[#1D1D42]/90 to-[#131330]/90 rounded-xl border border-indigo-900/30 shadow-lg hover:shadow-blue-900/10 transition-all duration-300";

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
                  <span className="text-gray-400 text-sm">Total Scans: <span className="text-blue-400 font-medium">{mockScanRecords.length}</span></span>
                </div>
                
                <div className="bg-gradient-to-br from-[#1D1D42]/70 to-[#131330]/70 px-4 py-2 rounded-full border border-indigo-900/20 shadow-inner flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-gray-400 text-sm">Last Scan: <span className="text-green-400 font-medium">Today</span></span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* View Toggle Buttons */}
              <div className="bg-[#1A1A3A]/60 p-1 rounded-full flex items-center gap-2 self-start mb-3 sm:mb-0 mr-auto sm:mr-0">
                <button 
                  onClick={() => setIsColumnView(true)} 
                  className={`p-2 rounded-full transition-all ${isColumnView ? 'bg-blue-900/70 text-blue-300' : 'text-gray-400 hover:text-gray-200'}`}
                  title="Column View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setIsColumnView(false)} 
                  className={`p-2 rounded-full transition-all ${!isColumnView ? 'bg-blue-900/70 text-blue-300' : 'text-gray-400 hover:text-gray-200'}`}
                  title="Row View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Export Options Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center px-4 py-2.5 border border-indigo-700/50 text-sm font-medium rounded-full shadow-sm text-blue-400 bg-[#1A1A3A]/60 hover:bg-[#1A1A3A] focus:outline-none"
                  onClick={() => setShowExportOptions(!showExportOptions)}
                >
                  <FaDownload className="mr-2" size={14} /> Export
                  <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                
                {/* Export options dropdown menu */}
                <AnimatePresence>
                  {showExportOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1A1A3A] border border-indigo-900/50 z-10"
                    >
                      <div className="py-1">
                        {['CSV Format', 'JSON Format'].map((format) => (
                          <button
                            key={format}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-indigo-900/30 hover:text-blue-400 transition-colors"
                            onClick={() => {
                              setShowExportOptions(false);
                              setSuccessMessage(`Exporting scan data as ${format}`);
                              setShowSuccessToast(true);
                              setTimeout(() => setShowSuccessToast(false), 3000);
                            }}
                          >
                            <FaDownload className="mr-2" size={12} />
                            Export as {format}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 focus:outline-none"
              >
                <FaPlus className="mr-2" size={14} /> New Scan
              </motion.button>
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
                  {filteredRecords.length} {filteredRecords.length === 1 ? 'result' : 'results'}
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
                    setSortField(field as keyof ScanRecord);
                    setSortDirection(direction as 'asc' | 'desc');
                  }}
                >
                  <option value="scanDate-desc">Newest First</option>
                  <option value="scanDate-asc">Oldest First</option>
                  <option value="domainName-asc">Domain Name (A-Z)</option>
                  <option value="domainName-desc">Domain Name (Z-A)</option>
                  <option value="scannerName-asc">Scanner Name (A-Z)</option>
                  <option value="scannerName-desc">Scanner Name (Z-A)</option>
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
        
        {/* Scan records layout - cards or table */}
        {isClient && (
          <>
            {filteredRecords.length > 0 ? (
              <div className="mb-8">
                {/* Column View (Cards) */}
                {isColumnView ? (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredRecords.map((record, index) => (
                      <motion.div 
                        key={record.id}
                        variants={itemVariants}
                        className="bg-gradient-to-br from-[#1D1D42]/90 to-[#131330]/90 rounded-xl border border-indigo-900/30 shadow-lg overflow-hidden relative"
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        whileHover={{ y: -5, scale: 1.02 }}
                        layoutId={`record-${record.id}`}
                      >
                        {/* Domain info with gradient top border */}
                        <div className="relative pt-4">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                          <div className="px-4 pb-3 flex items-center gap-3 relative">
                            <div className="h-12 w-12 rounded-lg flex-shrink-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-indigo-800/20 flex items-center justify-center shadow-lg">
                              <FaShieldAlt className="text-blue-400" size={18} />
                            </div>
                            <div className="flex-grow min-w-0">
                              <div className="font-medium text-lg text-blue-400 truncate group flex items-center" title={record.domainName}>
                                <span className="truncate">{record.domainName}</span>
                                
                                {/* Copy confirmation message */}
                                <AnimatePresence>
                                  {activeCardId === record.id && (
                                    <motion.span
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 20 }}
                                      className="ml-2 text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full"
                                    >
                                      Copied!
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </div>
                              <div className="flex items-center text-xs text-gray-400 gap-2">
                                <span>ID: {record.id}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <FaCalendarAlt size={10} />
                                  {formatDate(record.scanDate)}
                                </span>
                              </div>
                            </div>
                            <button 
                              className="p-1.5 rounded-full bg-indigo-900/30 hover:bg-indigo-800/50 text-gray-400 hover:text-white transition-colors"
                              title="Copy domain"
                              onClick={() => copyToClipboard(record.domainName, record.id)}
                            >
                              <FaRegCopy size={12} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Scanner contact info */}
                        <div className="px-4 py-3 bg-[#121232]/50 border-t border-indigo-900/30">
                          <div className="flex flex-col gap-1.5">
                            <div className="text-xs uppercase text-gray-500 mb-1 flex items-center gap-1">
                              <FaUser size={10} className="text-blue-400" /> Scanner Contact
                            </div>
                            <div className="flex items-center text-white">
                              <span className="truncate font-medium">{record.scannerName}</span>
                            </div>
                            <div className="flex items-center text-sm text-blue-400">
                              <FaEnvelope size={10} className="mr-1.5 text-blue-500" />
                              <span className="truncate">{record.scannerEmail}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                              <FaPhone size={10} className="mr-1.5 text-gray-500" />
                              <span>{record.scannerPhone}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex justify-between items-center p-3 bg-gradient-to-b from-[#121232]/20 to-[#121232]/40 border-t border-indigo-900/20">
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-md hover:bg-blue-900/20" 
                            title="View Details"
                            onClick={() => handleViewDetails(record)}
                          >
                            <FaEye size={14} />
                            <span>Details</span>
                          </motion.button>
                          
                          <div className="flex items-center gap-1">
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-sm text-gray-400 hover:text-gray-300 p-2 rounded-md hover:bg-gray-800/40 transition-colors" 
                              title="Download Scan Data"
                              onClick={() => handleDownload(record)}
                            >
                              <FaDownload size={14} />
                            </motion.button>
                            
                            <motion.button 
                              whileHover={{ scale: 1.05, rotate: 5 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-sm text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-900/20 transition-colors" 
                              title="Delete Record"
                              onClick={() => handleDeleteClick(record)}
                            >
                              <FaTrash size={14} />
                            </motion.button>
                          </div>
                        </div>
                        
                        {/* Animated glow on hover */}
                        {hoverIndex === index && (
                          <motion.div 
                            className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl z-[-1] opacity-0"
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          ></motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  /* Row View (Table) */
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
                          {filteredRecords.map((record, index) => (
                            <motion.tr 
                              key={record.id}
                              variants={itemVariants}
                              className="hover:bg-indigo-900/10 transition-colors"
                              onMouseEnter={() => setHoverIndex(index)}
                              onMouseLeave={() => setHoverIndex(null)}
                              layoutId={`record-row-${record.id}`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-lg flex-shrink-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-indigo-800/20 flex items-center justify-center mr-3">
                                    <FaShieldAlt className="text-blue-400" />
                                  </div>
                                  <div className="group">
                                    <div className="font-medium text-blue-400 flex items-center gap-2" title={record.domainName}>
                                      {record.domainName}
                                      
                                      <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-gray-500 hover:text-blue-400 transition-colors" 
                                        title="Copy domain" 
                                        onClick={() => copyToClipboard(record.domainName, record.id)}
                                      >
                                        <FaRegCopy size={12} />
                                      </motion.button>
                                      
                                      {/* Copy confirmation */}
                                      <AnimatePresence>
                                        {activeCardId === record.id && (
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
                                    <div className="text-xs text-gray-400">ID: {record.id}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-white">
                                  {record.scannerName}
                                </div>
                                <div className="text-xs text-blue-400 flex items-center gap-1">
                                  <FaEnvelope size={10} className="text-blue-500" />
                                  {record.scannerEmail}
                                </div>
                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                  <FaPhone size={10} className="text-gray-500" />
                                  {record.scannerPhone}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {formatDate(record.scanDate)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  <motion.button 
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-blue-400 hover:text-blue-300 transition-colors p-1.5"
                                    onClick={() => handleViewDetails(record)}
                                    title="View Details"
                                  >
                                    <FaEye size={16} />
                                  </motion.button>
                                  <motion.button 
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-gray-400 hover:text-gray-300 transition-colors p-1.5"
                                    onClick={() => handleDownload(record)}
                                    title="Download Scan Data"
                                  >
                                    <FaDownload size={16} />
                                  </motion.button>
                                  <motion.button 
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-red-400 hover:text-red-300 transition-colors p-1.5"
                                    onClick={() => handleDeleteClick(record)}
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
                )}
              </div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#1D1D42]/90 to-[#131330]/90 rounded-xl border border-indigo-900/30 shadow-lg p-8 text-center"
              >
                <FaExclamationTriangle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No scan records found</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                  We couldn't find any domain scan records matching your search criteria. Try adjusting your filters or scan a new domain.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-full text-sm font-medium inline-flex items-center gap-2 shadow-lg"
                >
                  <FaRadiation size={14} />
                  Scan New Domain
                </motion.button>
              </motion.div>
            )}
          </>
        )}
        
        {/* Pagination */}
        {filteredRecords.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-[#1A1A3A]/40 to-[#1E1E45]/40 p-4 rounded-lg border border-indigo-900/30"
          >
            <div className="text-sm text-gray-400 mb-3 sm:mb-0">
              Showing <span className="text-blue-400 font-medium">{filteredRecords.length}</span> of <span className="text-gray-300">{mockScanRecords.length}</span> records
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
      
      {/* View Details Modal - Updated to show scanner contact info */}
      <AnimatePresence>
        {showDetailModal && selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-filter backdrop-blur-sm"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-lg w-full rounded-xl bg-gradient-to-b from-[#1D1D42] to-[#131330] border border-indigo-900/40 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="bg-[#121232] px-6 py-4 border-b border-indigo-900/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-indigo-900/50 flex items-center justify-center">
                    <FaShieldAlt className="text-blue-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Domain Scan Details</h3>
                    <p className="text-sm text-gray-400">{selectedRecord.domainName}</p>
                  </div>
                </div>
                <button
                  className="rounded-full p-1 text-gray-400 hover:text-white hover:bg-indigo-900/30 transition-colors"
                  onClick={() => setShowDetailModal(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal body - Domain and scanner info */}
              <div className="p-6">
                <div className="bg-[#1A1A3A]/60 p-4 rounded-lg border border-indigo-900/30 mb-6">
                  <h4 className="text-blue-400 text-sm font-medium mb-3">Domain Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Domain:</span>
                      <span className="text-white font-medium">{selectedRecord.domainName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Scan Date:</span>
                      <span className="text-white">{formatDate(selectedRecord.scanDate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Scan ID:</span>
                      <span className="text-white">{selectedRecord.id}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1A1A3A]/60 p-4 rounded-lg border border-indigo-900/30">
                  <h4 className="text-blue-400 text-sm font-medium mb-3">Scanner Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white font-medium">{selectedRecord.scannerName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-blue-300">{selectedRecord.scannerEmail}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Phone:</span>
                      <span className="text-white">{selectedRecord.scannerPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal footer */}
              <div className="px-6 py-4 border-t border-indigo-900/40 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-[#1A1A3A] text-gray-300 rounded-md text-sm flex items-center gap-2 hover:bg-[#1E1E45] transition-colors"
                  onClick={() => setShowDetailModal(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-md text-sm flex items-center gap-2 transition-colors"
                  onClick={() => {
                    setShowDetailModal(false);
                    setSuccessMessage("Downloading scan data for " + selectedRecord.domainName);
                    setShowSuccessToast(true);
                    setTimeout(() => setShowSuccessToast(false), 3000);
                  }}
                >
                  <FaDownload size={14} />
                  Download Data
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-filter backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
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
                  Are you sure you want to delete the scan record for <span className="text-blue-400 font-medium">{selectedRecord.domainName}</span>?
                </p>
                <div className="flex items-center justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-[#1A1A3A] text-gray-300 rounded-md text-sm hover:bg-[#1E1E45] transition-colors"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-md text-sm flex items-center gap-2 transition-colors"
                    onClick={confirmDelete}
                  >
                    <FaTrash size={14} />
                    Delete Record
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Success Toast Notification */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-4 right-4 z-50 max-w-md w-full bg-gradient-to-r from-green-900/90 to-green-800/90 border border-green-700/50 rounded-lg shadow-lg backdrop-blur-sm p-4 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-green-900 border border-green-700 flex items-center justify-center flex-shrink-0">
              <FaCheck className="text-green-400" />
            </div>
            <div className="flex-grow">
              <p className="text-green-300 font-medium">Success</p>
              <p className="text-green-200/80 text-sm">{successMessage}</p>
            </div>
            <button
              className="text-green-400 hover:text-green-300 transition-colors"
              onClick={() => setShowSuccessToast(false)}
            >
              <FaTimes />
            </button>
          </motion.div>
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
