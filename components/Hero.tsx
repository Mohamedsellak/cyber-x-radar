"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaShieldAlt, FaLock, FaBug, FaInfoCircle, FaChartLine, FaGlobe, FaRadiation, FaServer, FaUserShield, FaSearch, FaExclamationTriangle, FaRegCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import CollectUserInfoModal from './heroModals/CollectUserInfoModal';
import SecurityResultsModal from './heroModals/SecurityResultsModal';

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

const Hero = () => {
  const [domain, setDomain] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [securityScore, setSecurityScore] = useState(65);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [scanCount, setScanCount] = useState(20); // Start with a fixed value
  const [blurResults, setBlurResults] = useState(false);
  const radarRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // State for API response data
  const [domainStats, setDomainStats] = useState<DomainStatisticsResponse | null>(null);
  const [showTestResults, setShowTestResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [userClosedInfoModal, setUserClosedInfoModal] = useState(false);
  
  // Update scan count periodically to simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setScanCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Animate radar effect
  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        rotate: [0, 360],
        transition: {
          duration: 4,
          ease: "linear",
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [controls]);

  // This will only run in the browser, after hydration is complete
  useEffect(() => {
    setScanCount(Math.floor(Math.random() * 10) + 20);
    setIsClient(true);
  }, []);

  const validateDomain = (domain: string) => {
    const pattern = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/;
    return pattern.test(domain);
  };

  // Function to handle domain form submission
  const handleDomainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset all states to their initial values
    setError('');
    setShowSuccessMessage(false);
    setShowTestResults(false);
    setIsModalOpen(false);
    setBlurResults(false);
    setUserClosedInfoModal(false);
    
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }
    
    if (!validateDomain(domain)) {
      setError('Please enter a valid domain name');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate radar scanning animation
    if (radarRef.current) {
      radarRef.current.classList.add('active-scan');
    }
    
    try {
      // Make API call
      const response = await fetch(
        `https://localhost/cyber-x-radar/server/api/api-proxy.php?domain=${domain}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle error response case
      if (data.status === "error") {
        throw new Error(data.message || "Failed to fetch security data. Try another domain.");
      }
      
      // Generate security score based on severity
      let score = 65;
      if (data.Severity === "High") {
        score = Math.floor(Math.random() * 20) + 10; // 10-30
      } else if (data.Severity === "Medium") {
        score = Math.floor(Math.random() * 20) + 40; // 40-60
      } else {
        score = Math.floor(Math.random() * 20) + 70; // 70-90
      }
      
      // Update state with API results
      setSecurityScore(score);
      setDomainStats(data);
      setShowSuccessMessage(true);
      
      // First show results without blur
      setIsModalOpen(true);
      setShowTestResults(true);
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Log for debugging
      console.log('Initial modal state set: no blur');
      
      // Hide success message after a few seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      
      // After 2 seconds, apply blur and show user info modal
      // Use a separate function to ensure it runs in a new call stack
      const timer = setTimeout(() => {
        console.log('Applying blur and showing user info modal');
        setBlurResults(true);
        
        // Small delay before showing the modal for better UX
        setTimeout(() => {
          setShowUserInfoModal(true);
        }, 100);
      }, 2000);
      
      // Clean up timer if component unmounts
      return () => clearTimeout(timer);
      
    } catch (error) {
      console.error("Error in domain scan:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch security data. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      if (radarRef.current) {
        radarRef.current.classList.remove('active-scan');
      }
    }
  };

  // Fix user info completion handler
  const handleUserInfoCompleted = () => {
    console.log('User info completed - removing blur');
    setShowUserInfoModal(false);
    setBlurResults(false); // Remove blur when user completes the form
    setUserClosedInfoModal(false);
  };

  // Fix user info modal close handler with debug logs
  const handleCloseUserInfoModal = () => {
    console.log('User info modal closed - showing overlay message');
    setShowUserInfoModal(false);
    setUserClosedInfoModal(true); // This MUST be set to true when modal is closed
    
    // Add a console log to verify the state change
    setTimeout(() => {
      console.log('userClosedInfoModal state is now:', userClosedInfoModal);
    }, 100);
  };

  // Function to reopen user info modal
  const handleReopenUserInfoModal = () => {
    console.log('Reopening user info modal');
    setShowUserInfoModal(true);
    setUserClosedInfoModal(false);
  };

  // Function to close all modals and reset scan
  const handleCloseAllModals = () => {
    setIsModalOpen(false);
    setShowUserInfoModal(false);
    setShowTestResults(false);
  };

  // Handle scan another domain action
  const handleScanAnother = () => {
    setIsModalOpen(false);
    setShowTestResults(false);
    setDomainStats(null);
    setDomain('');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Stats data for the UI
  const securityStats = [
    { 
      title: 'Exposed Credentials', 
      count: 12, 
      status: 'Critical', 
      icon: '🔑',
      detail: 'Including admin accounts',
      color: 'red' 
    },
    { 
      title: 'Data Breaches', 
      count: 3, 
      status: 'Warning', 
      icon: '🛡️',
      detail: 'Affecting 2.3k records',
      color: 'yellow'
    },
    { 
      title: 'Dark Web Mentions', 
      count: 8, 
      status: 'Moderate', 
      icon: '🌐',
      detail: 'Increased 32% this month',
      color: 'blue'
    }
  ];

  // Add specific function to handle modal blur
  const handleModalBlur = () => {
    if (isClient) {
      return blurResults && userClosedInfoModal;
    }
    return false; // Default to false on server to prevent hydration mismatch
  };

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-[#0A0A1F] to-[#121221] text-white relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }} 
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', delay: 2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-700 to-purple-500 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/3"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }} 
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', delay: 4 }}
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-600 rounded-full filter blur-3xl"
        ></motion.div>
      </div>
      
      {/* Cyber-themed grid pattern overlay */}
      <motion.div 
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07]"
      ></motion.div>
      
      {/* Radar scanning lines animation in background */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px]">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full rounded-full border-2 border-dashed border-blue-500/20"
          ></motion.div>
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border-2 border-dashed border-blue-500/10"
          ></motion.div>
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
              delay: 4
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border-2 border-dashed border-blue-500/5"
          ></motion.div>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-30"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [0, -20, 0], 
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 5 + 10,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Cyber circuit lines at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40"></div>
      <div className="absolute top-1 left-[20%] w-[1px] h-10 bg-blue-500/20"></div>
      <div className="absolute top-1 left-[40%] w-[1px] h-6 bg-blue-500/20"></div>
      <div className="absolute top-1 left-[60%] w-[1px] h-14 bg-blue-500/20"></div>
      <div className="absolute top-1 left-[80%] w-[1px] h-8 bg-blue-500/20"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left side content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-7/12"
          >
            <div className="mb-12">
              {/* Cyber X Radar logo and brand badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  {/* Radar animation in logo */}
                  <div ref={radarRef} className="radar-container">
                    <div className="radar-background rounded-full"></div>
                    <motion.div 
                      animate={controls}
                      className="radar-sweep"
                    ></motion.div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaRadiation size={20} className="text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                    Cyber X Radar
                  </h2>
                  <p className="text-xs text-gray-400">Advanced Threat Detection Platform</p>
                </div>
              </motion.div>
              
              {/* Decorative badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-700/30 rounded-full px-4 py-1 mb-6 text-sm font-medium text-blue-300"
              >
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span>Real-Time Cyber Defense System</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
              >
                <span className="block mb-2">Total Visibility Into</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 leading-tight">Your Digital Footprint</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-blue-300 font-medium">Security Intelligence At Scale</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
              >
                <span className="font-semibold text-blue-300">Cyber X Radar</span> constantly monitors the dark web, breach databases, and identifies vulnerabilities—giving you a <span className="italic">360° view</span> of your digital risk exposure. <span className="underline decoration-blue-500 decoration-2">Protect what matters most</span> with our advanced threat intelligence platform.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative max-w-xl mb-8 bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-6 rounded-xl backdrop-blur-sm border border-indigo-800/30 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl"></div>
                
                {/* Enhanced form header title design */}
                <div className="mb-6 relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600"></div>
                  <h3 className="text-blue-300 font-semibold flex items-center gap-2 text-lg mb-1">
                    <div className="h-8 w-8 rounded-full bg-blue-900/50 flex items-center justify-center shadow-inner">
                      <FaRadiation className="text-blue-400" />
                    </div>
                    <span>GET FREE INSTANT TESTS ON</span>
                  </h3>
                  <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300 pl-10">
                    YOUR SECURITY POSTURE
                  </p>
                </div>
                
                <form onSubmit={handleDomainSubmit}>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="relative flex-grow group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
                        <FaSearch size={16} />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your domain name (e.g., example.com)"
                        className="w-full pl-12 pr-10 py-4 rounded-md border border-indigo-900/50 bg-[#1A1A2A] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-lg shadow-black/20 group-hover:shadow-blue-900/20"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        aria-label="Domain name"
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit" 
                      className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-medium rounded-md transition-all duration-200 whitespace-nowrap flex items-center justify-center shadow-lg shadow-blue-900/20 disabled:opacity-70 relative overflow-hidden group"
                      disabled={isSubmitting}
                    >
                      <span className="absolute w-full h-full -left-full top-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-5 w-5 relative">
                            <div className="radar-ping absolute inset-0 rounded-full"></div>
                            <FaRadiation size={20} className="animate-pulse" />
                          </div>
                          Scanning...
                        </>
                      ) : (
                        <>
                          <FaRadiation className="mr-2" /> Scan Domain
                        </>
                      )}
                    </motion.button>
                  </div>
                  
                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="mt-2 text-red-400 flex items-center gap-2 text-sm bg-red-900/20 py-2 px-3 rounded-md border border-red-800/30"
                      >
                        <FaExclamationTriangle size={14} />
                        {error}
                      </motion.div>
                    )}
                    
                    {showSuccessMessage && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="mt-2 text-green-400 flex items-center gap-2 text-sm bg-green-900/20 py-2 px-3 rounded-md border border-green-800/30"
                      >
                        <FaRegCheckCircle size={14} />
                        Scan completed successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex mt-4 text-xs text-gray-400 items-center gap-2 flex-wrap">
                    <span className="bg-gray-800/50 px-2 py-1 rounded-md">Popular:</span>
                    {["google.com", "microsoft.com", "amazon.com", "f.com"].map((example, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setDomain(example)}
                        className="px-2 py-1 rounded-md hover:bg-blue-900/30 hover:text-blue-300 transition-colors text-gray-300 border border-indigo-700/30"
                      >
                        {example}
                      </motion.button>
                    ))}
                  </div>
                </form>
                
                <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaInfoCircle className="text-blue-400" size={14} />
                    <span>Secure analysis with no data storage</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>{scanCount} scans running now</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Features list */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-wrap items-center gap-4 mb-12"
              >
                <span className="text-gray-400 text-sm">What Cyber X Radar detects:</span>
                {[
                  "Leaked Credentials", 
                  "Data Breaches", 
                  "Dark Web Exposure", 
                  "Database Vulnerabilities",
                  "Domain Vulnerabilities"
                ].map((item, i) => (
                  <span key={i} className="text-xs text-blue-300 flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    {item}
                  </span>
                ))}
              </motion.div>
              
              {/* Security Platform Features */}
              <div className="border-t border-indigo-900/30 pt-8 mb-10">
                <h4 className="text-gray-300 text-sm uppercase font-semibold tracking-wider mb-5">Security Platform Features</h4>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:flex md:flex-wrap gap-4"
                >
                  {[
                    { icon: <FaShieldAlt size={18} />, text: "Real-time Monitoring" },
                    { icon: <FaLock size={18} />, text: "Data Protection" },
                    { icon: <FaBug size={18} />, text: "Breach Detection" },
                    { icon: <FaChartLine size={18} />, text: "Threat Intelligence" },
                    { icon: <FaGlobe size={18} />, text: "Global Coverage" },
                    { icon: <FaUserShield size={18} />, text: "Identity Protection" },
                    { icon: <FaServer size={18} />, text: "Infrastructure Scanning" }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -2, x: 3 }}
                      className="flex items-center gap-3 text-gray-300 bg-[#151530]/70 rounded-full px-4 py-2 border border-indigo-900/30 hover:border-blue-700/30 hover:bg-[#151538] transition-all duration-300"
                    >
                      <span className="text-blue-500">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Trusted by industry leaders */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block h-3 w-3 bg-blue-500 rounded-full"></span>
                    <h4 className="text-gray-300 text-sm uppercase font-semibold tracking-wider">Trusted by industry leaders</h4>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    {/* Replace static SVG references with dynamic Icon components */}
                    <div className="h-10 min-w-[100px] flex items-center justify-center bg-[#1A1A3A]/60 px-4 rounded-md border border-indigo-900/30 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                      <FaShieldAlt size={20} className="text-blue-400 mr-2" />
                      <span className="text-gray-300 text-sm font-medium">SecureShield</span>
                    </div>
                    
                    <div className="h-10 min-w-[100px] flex items-center justify-center bg-[#1A1A3A]/60 px-4 rounded-md border border-indigo-900/30 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                      <FaLock size={20} className="text-blue-400 mr-2" />
                      <span className="text-gray-300 text-sm font-medium">CyberGuard</span>
                    </div>
                    
                    <div className="h-10 min-w-[100px] flex items-center justify-center bg-[#1A1A3A]/60 px-4 rounded-md border border-indigo-900/30 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                      <FaServer size={20} className="text-blue-400 mr-2" />
                      <span className="text-gray-300 text-sm font-medium">NetDefend</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:flex h-12 border-r border-indigo-900/40 mx-2"></div>
                
                <div className="flex gap-3 items-center text-gray-400 text-sm">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-indigo-900/50 border-2 border-[#0A0A1F] flex items-center justify-center text-xs font-medium">
                        {['JD', 'MK', 'AS'][i]}
                      </div>
                    ))}
                  </div>
                  <span>Join <span className="text-blue-400 font-medium">1,290+</span> companies using Cyber X Radar</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right side content: Security Stats Dashboard */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="lg:w-5/12 lg:-mt-20"
          >
            <div className="relative group perspective-1000">
              {/* Enhanced animated card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-xl filter blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700 animate-pulse"></div>
              
              {/* Card design pattern */}
              <div className="absolute inset-0 rounded-xl opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative rounded-lg shadow-2xl border border-indigo-900/50 bg-gradient-to-b from-[#1A1A3A] to-[#121232] overflow-hidden backdrop-blur-sm"
              >
                <div className="bg-[#151530] px-4 py-3 flex items-center border-b border-indigo-900/50">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="mx-auto text-sm font-medium text-gray-300 flex items-center">
                    <span className="animate-pulse mr-2 inline-block h-2 w-2 rounded-full bg-red-500"></span>  
                    <span className="flex items-center gap-2">
                      <FaRadiation size={14} className="text-blue-400" />
                      Cyber X Radar Scan Results
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-8 flex items-center gap-6">
                    {/* Enhanced interactive radial progress indicator */}
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gray-800/50 shadow-inner"></div>
                      <motion.svg 
                        className="w-full h-full relative z-10" 
                        viewBox="0 0 100 100"
                        initial={{ rotate: -90 }}
                        animate={{ rotate: -90 }}
                      >
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={securityScore > 70 ? "#10B981" : securityScore > 40 ? "#FBBF24" : "#EF4444"} />
                            <stop offset="100%" stopColor={securityScore > 70 ? "#059669" : securityScore > 40 ? "#D97706" : "#B91C1C"} />
                          </linearGradient>
                        </defs>
                        <circle className="text-[#3A3A3A]" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                        <motion.circle 
                          className="transition-all duration-1000"
                          strokeWidth="8" 
                          strokeDasharray="264"
                          initial={{ strokeDashoffset: 264 }}
                          animate={{ strokeDashoffset: 264 - (securityScore / 100 * 264) }} 
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          strokeLinecap="round" 
                          stroke="url(#scoreGradient)" 
                          fill="transparent" 
                          r="42" 
                          cx="50" 
                          cy="50" 
                        />
                        <text x="50" y="45" textAnchor="middle" className="text-2xl font-bold fill-current text-white">{securityScore}%</text>
                        <text x="50" y="65" textAnchor="middle" className="text-xs fill-current text-gray-400">Security</text>
                      </motion.svg>
                      
                      {/* Decorative pulse rings */}
                      <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 animate-ping-slow rounded-full bg-blue-500/10 backdrop-blur-sm"></div>
                        <div className="absolute inset-2 animate-ping-slow animation-delay-500 rounded-full bg-blue-500/5 backdrop-blur-sm"></div>
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-300 text-lg">Security Score</h3>
                        <div className={`py-1 px-3 ${securityScore > 70 ? 'bg-green-900/40 border-green-700/50 text-green-400' : 
                          securityScore > 40 ? 'bg-yellow-900/40 border-yellow-700/50 text-yellow-400' : 
                          'bg-red-900/40 border-red-700/50 text-red-400'} rounded-full border transition-colors duration-500 shadow-inner`}>
                          <span className="text-sm font-semibold">
                            {securityScore > 70 ? 'Low Risk' : securityScore > 40 ? 'Medium Risk' : 'High Risk'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        {securityScore > 70 ? 'Your domain has good security posture' : 
                        securityScore > 40 ? 'Your domain has some security vulnerabilities' : 
                        'Your domain is at significant risk of compromise'}
                      </p>
                      <div className="h-2 bg-[#3A3A3A] rounded-full overflow-hidden shadow-inner">
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
                  </div>
                  
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {securityStats.map((item, index) => (
                      <motion.div 
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-gradient-to-b from-[#080f28] to-[#100742] hover:from-[#383838] hover:to-[#2D2D2D] p-4 rounded-md border border-gray-700/30 shadow-lg transition-all duration-300 cursor-pointer group/item relative overflow-hidden"
                      >
                        {/* Accent border */}
                        <div className={`absolute left-0 top-0 w-1 h-full ${
                          item.status === 'Critical' ? 'bg-red-500' :
                          item.status === 'Warning' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}></div>
                        
                        <div className="pl-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xl" aria-hidden="true">{item.icon}</span>
                              <span className="text-gray-300 font-medium">{item.title}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              item.status === 'Critical' ? 'bg-red-900/70 text-red-300 border border-red-700/50' :
                              item.status === 'Warning' ? 'bg-yellow-900/70 text-yellow-300 border border-yellow-700/50' :
                              'bg-blue-900/70 text-blue-300 border border-blue-700/50'
                            }`}>{item.status}</span>
                          </div>
                          <div className="flex items-end justify-between">
                            <div className="text-2xl font-bold group-hover:item:text-blue-400 transition-colors">{item.count}</div>
                            <span className="text-xs text-gray-400 group-hover:item:text-gray-300 transition-colors">{item.detail}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <div className="mt-8 flex gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-grow px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-medium rounded-md transition-all duration-200 shadow-lg hover:shadow-blue-900/30 flex items-center justify-center gap-2"
                    >
                      View Full Report <FaRadiation size={16} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.5 }}
                      className="px-3 py-3 bg-gray-700/50 hover:bg-gray-700 text-white rounded-md transition-all duration-200 flex items-center justify-center shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              
              {/* Enhanced floating badge with animation */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-5 -right-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-3 shadow-xl rotate-3 hover:rotate-0 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-inner">
                    <FaRadiation size={14} />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">Cyber X Protected</p>
                    <p className="text-blue-200 text-xs">Updated 5 mins ago</p>
                  </div>
                </div>
              </motion.div>
              
              {/* New floating stats badge */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-3 -left-3 bg-[#1A1A3A] rounded-lg py-1 px-2 shadow-xl border border-indigo-900/50"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-green-400 text-xs font-medium">Live Radar Active</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent"></div>
      
      {/* User Info Collection Modal - Higher z-index than results modal */}
      <AnimatePresence>
        {isClient && showUserInfoModal && domainStats && (
          <CollectUserInfoModal 
            domain={domain}
            isOpen={showUserInfoModal}
            onClose={handleCloseUserInfoModal}
            onCompleted={handleUserInfoCompleted}
          />
        )}
      </AnimatePresence>
      
      {/* Security Test Results Modal */}
      <AnimatePresence>
        {isClient && isModalOpen && showTestResults && domainStats && (
          <SecurityResultsModal 
            domain={domain}
            isOpen={isModalOpen && showTestResults}
            domainStats={domainStats}
            securityScore={securityScore}
            onClose={handleCloseAllModals}
            onScanAnother={handleScanAnother}
            blurred={blurResults}
            onReopenUserInfoModal={handleReopenUserInfoModal}
            showOverlayMessage={userClosedInfoModal} // Make sure this is correct
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
