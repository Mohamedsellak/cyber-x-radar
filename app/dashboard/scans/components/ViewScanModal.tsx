"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

interface Scan {
  id: number;
  domain_name: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface ViewScanModalProps {
  scan: Scan;
  onClose: () => void;
}

export default function ViewScanModal({ scan, onClose }: ViewScanModalProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-filter backdrop-blur-sm"
      onClick={onClose}
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
              <div className="text-sm text-gray-400 flex items-center gap-1">
                <a 
                  href={`https://${scan.domain_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  {scan.domain_name}
                  <FaExternalLinkAlt size={10} />
                </a>
              </div>
            </div>
          </div>
          <button
            className="rounded-full p-1 text-gray-400 hover:text-white hover:bg-indigo-900/30 transition-colors"
            onClick={onClose}
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Modal body with tables instead of cards */}
        <div className="p-6">
          {/* Domain Information Table */}
          <div className="mb-6">
            <h4 className="text-blue-400 text-sm font-medium mb-3">Domain Information</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-indigo-900/30">
                    <td className="py-3 px-4 text-left text-gray-400">Domain</td>
                    <td className="py-3 px-4 text-right font-medium text-white">{scan.domain_name}</td>
                  </tr>
                  <tr className="border-b border-indigo-900/30">
                    <td className="py-3 px-4 text-left text-gray-400">Scan Date</td>
                    <td className="py-3 px-4 text-right text-white">{formatDate(scan.created_at)}</td>
                  </tr>
                  <tr className="border-b border-indigo-900/30">
                    <td className="py-3 px-4 text-left text-gray-400">Scan ID</td>
                    <td className="py-3 px-4 text-right text-white">{scan.id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Scanner Contact Information Table */}
          <div>
            <h4 className="text-blue-400 text-sm font-medium mb-3">Scanner Contact Information</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-indigo-900/30">
                    <td className="py-3 px-4 text-left text-gray-400">Name</td>
                    <td className="py-3 px-4 text-right font-medium text-white">{scan.name}</td>
                  </tr>
                  <tr className="border-b border-indigo-900/30">
                    <td className="py-3 px-4 text-left text-gray-400">Email</td>
                    <td className="py-3 px-4 text-right text-blue-300">{scan.email}</td>
                  </tr>
                  <tr className="border-b border-indigo-900/30">
                    <td className="py-3 px-4 text-left text-gray-400">Phone</td>
                    <td className="py-3 px-4 text-right text-white">{scan.phone || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Modal footer - removed download button */}
        <div className="px-6 py-4 border-t border-indigo-900/40 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 bg-[#1A1A3A] text-gray-300 rounded-md text-sm flex items-center gap-2 hover:bg-[#1E1E45] transition-colors"
            onClick={onClose}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
