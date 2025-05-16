"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRadiation, FaInfoCircle, FaSync, FaFileDownload, FaAngleRight, FaLock, FaGlobe, FaBug, FaServer,FaUserEdit } from 'react-icons/fa';

// Define the domain stats response interface
interface DomainStatisticsResponse {
  Severity: string;
  malwareLogs: string;
  publicBreaches: string;
  darkwebMentions: string;
  compromisedEmployees: string;
  compromisedUsers: string;
  lastMention: string;
  asnsCount: string;
  status?: string;
  message?: string;
}

interface SecurityResultsModalProps {
  domain: string;
  isOpen: boolean;
  domainStats: DomainStatisticsResponse;
  securityScore: number;
  onClose: () => void;
  onScanAnother: () => void;
  blurred: boolean;
  onReopenUserInfoModal: () => void;
  showOverlayMessage: boolean; // Add this prop to control when to show the overlay
}

// Helper function to safely parse integers
const safeParseInt = (value: string): number => {
  if (!value || value === "None" || value === "N/A") return 0;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
};

// Sample timeline data for the exposure chart
const timelineData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  darkwebData: [5, 8, 12, 10, 15, 20],
  malwareData: [3, 5, 4, 8, 12, 7]
};

const SecurityResultsModal: React.FC<SecurityResultsModalProps> = ({
  domain,
  isOpen,
  domainStats,
  securityScore,
  onClose,
  onScanAnother,
  blurred,
  onReopenUserInfoModal,
  showOverlayMessage
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Enhanced debugging to check props and state
  useEffect(() => {
    setIsMounted(true);
    console.log('SecurityResultsModal mounted, initial props:', { blurred, showOverlayMessage });
  }, []);

  // More visible debug logging when relevant props change
  useEffect(() => {
    console.log('🔍 OVERLAY STATE CHANGED:', { 
      blurred, 
      showOverlayMessage, 
      isMounted,
      shouldShowOverlay: blurred && showOverlayMessage && isMounted 
    });
  }, [blurred, showOverlayMessage, isMounted]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 rounded-xl border border-indigo-800/50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with glow effect */}
        <div className="relative p-6 border-b border-indigo-900/50">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent"></div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <div className="radar-container">
                  <div className="radar-background rounded-full"></div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="radar-sweep"
                  ></motion.div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaRadiation size={16} className="text-blue-400" />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Cyber X-Radar Report
                </h2>
                <p className="text-sm text-blue-300">
                  <span className="font-semibold">{domain}</span> Security Assessment
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                domainStats.Severity === "High" ? "bg-red-900/50 text-red-300 border border-red-700/30" : 
                domainStats.Severity === "Medium" ? "bg-yellow-900/50 text-yellow-300 border border-yellow-700/30" : 
                "bg-green-900/50 text-green-300 border border-green-700/30"
              }`}>
                {domainStats.Severity} Risk
              </span>
              
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/80 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
        
        {/* Modal content with inline blur style */}
        <div 
          className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]"
          style={{ 
            filter: isMounted && blurred ? 'blur(8px)' : 'none',
            transition: 'filter 0.3s ease-in-out'
          }}
        >
          {/* Security Score Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="relative h-40 w-40 flex-shrink-0 mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-full bg-gray-800/30 shadow-inner"></div>
              <motion.svg 
                className="w-full h-full relative z-10" 
                viewBox="0 0 100 100"
                initial={{ rotate: -90 }}
              >
                <defs>
                  <linearGradient id="modalScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={securityScore > 70 ? "#10B981" : securityScore > 40 ? "#FBBF24" : "#EF4444"} />
                    <stop offset="100%" stopColor={securityScore > 70 ? "#059669" : securityScore > 40 ? "#D97706" : "#B91C1C"} />
                  </linearGradient>
                </defs>
                <circle className="text-[#2A2A40]" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                <motion.circle 
                  className="transition-all duration-1000"
                  strokeWidth="10" 
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (securityScore / 100 * 251.2) }} 
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  strokeLinecap="round" 
                  stroke="url(#modalScoreGradient)" 
                  fill="transparent" 
                  r="40" 
                  cx="50" 
                  cy="50" 
                />
                <text x="50" y="45" textAnchor="middle" className="text-3xl font-bold fill-current text-white">{securityScore}</text>
                <text x="50" y="62" textAnchor="middle" className="text-lg font-medium fill-current text-gray-400">/100</text>
              </motion.svg>
              
              {/* Decorative pulse rings */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 animate-ping-slow rounded-full bg-blue-500/10 backdrop-blur-sm"></div>
                <div className="absolute inset-2 animate-ping-slow animation-delay-500 rounded-full bg-blue-500/5 backdrop-blur-sm"></div>
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-100 text-xl">Security Score Assessment</h3>
                <div className="text-xs text-gray-400">Generated on {new Date().toLocaleDateString()}</div>
              </div>
              
              <p className="text-gray-300 mb-4">
                {securityScore > 70 ? 
                  'Your domain has strong security posture with minimal vulnerabilities. Continue monitoring to maintain this level of security.' : 
                securityScore > 40 ? 
                  'Your domain has several security vulnerabilities that require attention. Address these issues to reduce risk of compromise.' : 
                  'Your domain has critical security issues that need immediate remediation. Significant risk of data breach or system compromise exists.'
                }
              </p>
              
              <div className="space-y-3">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium text-blue-300">Overall Security</div>
                    <div className="text-sm font-medium text-blue-300">{securityScore}%</div>
                  </div>
                  <div className="h-2 bg-[#2A2A40] rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${securityScore}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full`}
                      style={{ background: `linear-gradient(to right, ${
                        securityScore > 70 ? '#10B981, #059669' : 
                        securityScore > 40 ? '#FBBF24, #D97706' : 
                        '#EF4444, #B91C1C'
                      })` }}
                    ></motion.div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                  <div className="bg-[#1E1E35] p-3 rounded-lg border border-indigo-900/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Threat Level</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        domainStats.Severity === "High" ? "bg-red-900/50 text-red-300" : 
                        domainStats.Severity === "Medium" ? "bg-yellow-900/50 text-yellow-300" : 
                        "bg-green-900/50 text-green-300"
                      }`}>
                        {domainStats.Severity}
                      </span>
                    </div>
                    <div className="mt-1 text-lg font-medium text-gray-200">
                      {domainStats.Severity === "High" ? "Critical Attention Required" : 
                       domainStats.Severity === "Medium" ? "Moderate Issues Found" : 
                       "Low Risk Detected"}
                    </div>
                  </div>
                  
                  <div className="bg-[#1E1E35] p-3 rounded-lg border border-indigo-900/30">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-gray-400">Last Breach Mention</span>
                      <div className="tooltip-container group relative">
                        <FaInfoCircle size={12} className="text-gray-500" />
                        <div className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-xs text-gray-300 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 z-10">
                          Date when your domain was last mentioned in data breaches or dark web
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 text-lg font-medium text-yellow-300">
                      {domainStats.lastMention === "N/A" ? "No mentions found" : domainStats.lastMention}
                    </div>
                  </div>
                  
                  <div className="bg-[#1E1E35] p-3 rounded-lg border border-indigo-900/30">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-gray-400">Compromised Accounts</span>
                    </div>
                    <div className="mt-1 text-lg font-medium text-red-400">
                      {safeParseInt(domainStats.compromisedUsers) + safeParseInt(domainStats.compromisedEmployees) > 0 
                        ? `${safeParseInt(domainStats.compromisedUsers) + safeParseInt(domainStats.compromisedEmployees)} total accounts` 
                        : "No compromised accounts found"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Findings Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-1 bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-blue-300">Detailed Security Findings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Detailed stats cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#1E1E35] p-4 rounded-lg border border-indigo-900/30 hover:border-indigo-700/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-red-900/50 flex items-center justify-center text-red-400">
                    <FaLock size={18} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-gray-200 font-medium">Credential Exposure</h4>
                    <p className="text-xs text-gray-400">Leaked emails and passwords</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Employees</span>
                    <span className="text-red-400 font-medium">{domainStats.compromisedEmployees}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Users</span>
                    <span className="text-red-400 font-medium">{domainStats.compromisedUsers}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-indigo-900/30">
                    <div className="text-xs text-gray-400 mb-1">Risk Level</div>
                    <div className="h-1.5 bg-[#2A2A40] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-red-700 w-3/4 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                    <span>Full Analysis</span>
                    <FaAngleRight size={12} />
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#1E1E35] p-4 rounded-lg border border-indigo-900/30 hover:border-indigo-700/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-900/50 flex items-center justify-center text-yellow-400">
                    <FaGlobe size={18} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-gray-200 font-medium">Dark Web Exposure</h4>
                    <p className="text-xs text-gray-400">Mentions in dark forums and marketplaces</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Mentions Status</span>
                    <span className={`font-medium ${domainStats.darkwebMentions === "None" ? "text-green-400" : "text-yellow-400"}`}>
                      {domainStats.darkwebMentions === "None" ? "No mentions" : domainStats.darkwebMentions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Last Detected</span>
                    <span className="text-yellow-400 font-medium">{domainStats.lastMention}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-indigo-900/30">
                    <div className="text-xs text-gray-400 mb-1">Risk Level</div>
                    <div className="h-1.5 bg-[#2A2A40] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-700 w-1/2 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                    <span>Full Analysis</span>
                    <FaAngleRight size={12} />
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#1E1E35] p-4 rounded-lg border border-indigo-900/30 hover:border-indigo-700/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center text-blue-400">
                    <FaBug size={18} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-gray-200 font-medium">Malware Detections</h4>
                    <p className="text-xs text-gray-400">Malicious software targeting your domain</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Malware Logs</span>
                    <span className={`font-medium ${domainStats.malwareLogs === "None" || domainStats.malwareLogs === "N/A" ? "text-green-400" : "text-blue-400"}`}>
                      {domainStats.malwareLogs === "None" || domainStats.malwareLogs === "N/A" ? "None detected" : domainStats.malwareLogs}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Detection Type</span>
                    <span className="text-blue-400 font-medium">
                      {domainStats.malwareLogs === "None" || domainStats.malwareLogs === "N/A" ? "N/A" : "Infostealer"}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-indigo-900/30">
                    <div className="text-xs text-gray-400 mb-1">Risk Level</div>
                    <div className="h-1.5 bg-[#2A2A40] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 w-2/3 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                    <span>Full Analysis</span>
                    <FaAngleRight size={12} />
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#1E1E35] p-4 rounded-lg border border-indigo-900/30 hover:border-indigo-700/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-900/50 flex items-center justify-center text-indigo-400">
                    <FaServer size={18} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-gray-200 font-medium">Infrastructure Security</h4>
                    <p className="text-xs text-gray-400">Domain and server vulnerabilities</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">ASNs Count</span>
                    <span className="text-indigo-400 font-medium">
                      {domainStats.asnsCount === "0" || domainStats.asnsCount === "None" ? "None detected" : domainStats.asnsCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Public Breaches</span>
                    <span className={`font-medium ${domainStats.publicBreaches === "None" ? "text-green-400" : "text-indigo-400"}`}>
                      {domainStats.publicBreaches === "None" ? "None detected" : domainStats.publicBreaches}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-indigo-900/30">
                    <div className="text-xs text-gray-400 mb-1">Risk Level</div>
                    <div className="h-1.5 bg-[#2A2A40] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 w-1/4 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                    <span>Full Analysis</span>
                    <FaAngleRight size={12} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Exposure Timeline Chart - enhanced version */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-1 bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-blue-300">Exposure Timeline</h3>
            </div>
            
            <div className="bg-[#1E1E35] p-5 rounded-lg border border-indigo-900/30">
              <div className="h-64 relative">
                {/* Chart grid lines with labels */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full border-t border-gray-700/30 flex items-center">
                      <span className="text-xs text-gray-500 bg-[#1E1E35] pr-2 -ml-2">{80 - i * 20}</span>
                      <div className="flex-grow"></div>
                    </div>
                  ))}
                </div>
                
                {/* Chart x-axis (months) */}
                <div className="flex justify-between absolute bottom-0 left-0 right-0 text-xs text-gray-400 pt-2 border-t border-gray-700/30">
                  {timelineData.months.map((month, i) => (
                    <div key={i} className="text-center">
                      <div className="h-2 w-0.5 bg-gray-700/30 mx-auto mb-1"></div>
                      {month}
                    </div>
                  ))}
                </div>
                
                {/* Enhanced data visualization */}
                <div className="absolute inset-x-0 bottom-8 top-0">
                  {/* Darkweb data line */}
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="darkwebGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      d={`M0,${100 - (timelineData.darkwebData[0]/50*80)} ${timelineData.darkwebData.map((val, i) => `L${(i/(timelineData.months.length-1))*100},${100 - (val/50*80)}`).join(' ')}`}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5, delay: 1 }}
                      d={`M0,${100 - (timelineData.darkwebData[0]/50*80)} ${timelineData.darkwebData.map((val, i) => `L${(i/(timelineData.months.length-1))*100},${100 - (val/50*80)}`).join(' ')} L100,100 L0,100 Z`}
                      fill="url(#darkwebGradient)"
                    />
                  </svg>
                  
                  {/* Malware data line */}
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="malwareGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      d={`M0,${100 - (timelineData.malwareData[0]/50*80)} ${timelineData.malwareData.map((val, i) => `L${(i/(timelineData.months.length-1))*100},${100 - (val/50*80)}`).join(' ')}`}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5, delay: 1.3 }}
                      d={`M0,${100 - (timelineData.malwareData[0]/50*80)} ${timelineData.malwareData.map((val, i) => `L${(i/(timelineData.months.length-1))*100},${100 - (val/50*80)}`).join(' ')} L100,100 L0,100 Z`}
                      fill="url(#malwareGradient)"
                    />
                  </svg>
                  
                  {/* Data points */}
                  {timelineData.darkwebData.map((val, i) => (
                    <motion.div 
                      key={`darkweb-${i}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 + (i * 0.1) }}
                      className="absolute w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10 transform -translate-x-1/2 -translate-y-1/2 hover:w-4 hover:h-4 transition-all duration-200"
                      style={{ 
                        left: `${(i/(timelineData.months.length-1))*100}%`, 
                        top: `${100 - (val/50*80)}%` 
                      }}
                    >
                      <div className="tooltip-container group relative">
                        <div className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-xs text-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-32 z-10">
                          <div className="font-medium">Dark Web</div>
                          <div className="flex justify-between">
                            <span>{timelineData.months[i]}</span>
                            <span className="text-blue-400">{val} mentions</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {timelineData.malwareData.map((val, i) => (
                    <motion.div 
                      key={`malware-${i}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 + (i * 0.1) }}
                      className="absolute w-3 h-3 bg-pink-500 rounded-full border-2 border-white shadow-lg z-10 transform -translate-x-1/2 -translate-y-1/2 hover:w-4 hover:h-4 transition-all duration-200"
                      style={{ 
                        left: `${(i/(timelineData.months.length-1))*100}%`, 
                        top: `${100 - (val/50*80)}%` 
                      }}
                    >
                      <div className="tooltip-container group relative">
                        <div className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-xs text-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-32 z-10">
                          <div className="font-medium">Malware</div>
                          <div className="flex justify-between">
                            <span>{timelineData.months[i]}</span>
                            <span className="text-pink-400">{val} detections</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Chart legend */}
                <div className="absolute top-0 right-0 flex gap-4 text-xs bg-[#1E1E35] p-2 rounded-bl">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-300">Dark Web Mentions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span className="text-pink-300">Malware Detections</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action buttons at bottom */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-indigo-900/50">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <button
                onClick={onClose}
                className="text-sm text-gray-400 hover:text-gray-300 flex items-center gap-1 transition-colors"
              >
                <span>Close Report</span>
              </button>
              
              <button
                onClick={onScanAnother}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700 text-gray-300 text-sm rounded flex items-center gap-1 transition-colors"
              >
                <FaSync size={12} className="mr-1" /> Scan Another Domain
              </button>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-indigo-800/50 hover:bg-indigo-700/70 text-white text-sm rounded flex items-center gap-1 transition-colors"
              >
                <FaFileDownload size={12} className="mr-1" /> Download PDF Report
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-sm rounded flex items-center gap-1 transition-colors"
              >
                Get Complete Protection Plan
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Ensure overlay displays with higher z-index and is always rendered when conditions are met */}
        {isMounted && (
          <div 
            className={`absolute inset-0 flex items-center justify-center z-[70] pointer-events-auto ${
              blurred && showOverlayMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          >
            <div className="max-w-md p-6 bg-gradient-to-b from-[#1A1A3A] to-[#121232] rounded-xl shadow-2xl border border-indigo-900/50 text-center">
              <FaRadiation size={40} className="mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
                Complete Your Profile
              </h3>
              <p className="text-gray-300 mb-4">
                Please provide your information to view the complete security report and get personalized recommendations.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onReopenUserInfoModal}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
              >
                <FaUserEdit className="mr-1" /> Enter Your Information
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SecurityResultsModal;