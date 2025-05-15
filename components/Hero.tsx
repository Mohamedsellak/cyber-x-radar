"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShieldAlt, FaLock, FaBug, FaInfoCircle, FaChartLine, FaExclamationTriangle, FaAngleRight, FaGlobe, FaRegCheckCircle, FaRadiation, FaServer, FaUserShield, FaSync, FaFileDownload } from 'react-icons/fa';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import CollectUserInfoModal from './HeroModals/CollectUserInfoModal';

// Define the API response type
interface DomainStatisticsResponse {
  Severity: string;
  malwareLogs: string;
  publicBreaches: string;
  darkwebMentions: string;
  compromisedEmployees: string;
  compromisedUsers: string;
  lastMention: string;
  asnsCount: string;
}

const Hero = () => {
  const [domain, setDomain] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [securityScore, setSecurityScore] = useState(65);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [scanCount, setScanCount] = useState(Math.floor(Math.random() * 10) + 20);
  const radarRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // New state for API response data
  const [domainStats, setDomainStats] = useState<DomainStatisticsResponse | null>(null);
  const [showTestResults, setShowTestResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  
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

  const validateDomain = (domain: string) => {
    const pattern = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/;
    return pattern.test(domain);
  };

  // Function to fetch domain statistics from API
  const fetchDomainStatistics = async (domainName: string) => {
    try {
      // Make the actual API call (this will update the UI once data arrives)
      const response = await fetch(
        `https://scan.cyberxradar.com/api-proxy.php?domain=${domainName}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle error response case
      if (data.status === "error") {
        setError(data.message || "Failed to fetch security data. Try another domain.");
        setIsSubmitting(false);
        if (radarRef.current) {
          radarRef.current.classList.remove('active-scan');
        }
        return null;
      }
      
      setDomainStats(data);
      
      // Generate security score based on severity
      if (data.Severity === "High") {
        setSecurityScore(Math.floor(Math.random() * 20) + 10); // 10-30
      } else if (data.Severity === "Medium") {
        setSecurityScore(Math.floor(Math.random() * 20) + 40); // 40-60
      } else {
        setSecurityScore(Math.floor(Math.random() * 20) + 70); // 70-90
      }
      
      // Show user info modal after 2 seconds
      setTimeout(() => {
        setShowUserInfoModal(true);
      }, 2000);
      
      return data;
    } catch (error) {
      console.error("Error fetching domain statistics:", error);
      setError("Failed to fetch security data. Please try again.");
      setIsSubmitting(false);
      if (radarRef.current) {
        radarRef.current.classList.remove('active-scan');
      }
      return null;
    }
  };

  // Function to submit user information
  const submitUserInfo = async (userData: { name: string; email: string; phone: string }) => {
    try {
      const response = await fetch('http://localhost/cyber-x-radar/server/api/scans/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain_name: domain,
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit user data');
      }
      
      const data = await response.json();
      
      if (data.status !== 'success') {
        throw new Error(data.message || 'Failed to submit user data');
      }
      
      return data;
    } catch (error) {
      console.error('Error submitting user data:', error);
      throw error;
    }
  };

  // Function called when user info submission is completed
  const handleUserInfoCompleted = () => {
    setShowUserInfoModal(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowSuccessMessage(false);
    setShowTestResults(false);
    setIsModalOpen(false);
    
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
    
    // Fetch domain statistics
    fetchDomainStatistics(domain).then((data) => {
      setIsSubmitting(false);
      
      if (radarRef.current) {
        radarRef.current.classList.remove('active-scan');
      }
      
      // Only proceed if we have valid data (not error)
      if (data) {
        setShowSuccessMessage(true);
        
        // Open the modal to show results
        setIsModalOpen(true);
        setShowTestResults(true);
        
        // Hide success message after a few seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };
  
  // Generate monthly data points for the exposure timeline chart
  const generateTimelineData = () => {
    const months = [
      "2023-07", "2023-10", "2024-01", "2024-04", 
      "2024-07", "2024-10", "2025-01"
    ];
    
    const darkwebData = months.map(() => Math.floor(Math.random() * 50));
    const malwareData = months.map(() => Math.floor(Math.random() * 40));
    
    return { months, darkwebData, malwareData };
  };
  
  const timelineData = generateTimelineData();

  // Stats data
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

  // Helper function to safely parse numerical values
  const safeParseInt = (value: string): number => {
    if (!value || value === "None") return 0;
    return parseInt(value) || 0;
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
                
                <form onSubmit={handleSubmit}>
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
                        onChange={(e) => {
                          setDomain(e.target.value);
                          if (error) setError('');
                        }}
                        aria-label="Domain name"
                      />
                      {/* ...existing input field code... */}
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
          
          {/* right side content */}
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
                        className="bg-gradient-to-b from-[#333333] to-[#2A2A2A] hover:from-[#383838] hover:to-[#2D2D2D] p-4 rounded-md border border-gray-700/30 shadow-lg transition-all duration-300 cursor-pointer group/item relative overflow-hidden"
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
                            <div className="text-2xl font-bold group-hover/item:text-blue-400 transition-colors">{item.count}</div>
                            <span className="text-xs text-gray-400 group-hover/item:text-gray-300 transition-colors">{item.detail}</span>
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
                      View Full Report <FaAngleRight size={16} />
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
      
      {/* Add a special CSS classes for custom animations */}
      {/* <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes radar-ping {
          0% { transform: scale(0.5); opacity: 1; }
          70%, 100% { transform: scale(2); opacity: 0; }
        }
        
        .group-hover\\:animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        .radar-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,62,115,0.6) 0%, rgba(13,41,73,0.4) 50%, rgba(10,10,31,0.2) 100%);
          overflow: hidden;
        }
        
        .radar-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(13,41,73,0.2) 0%, rgba(10,10,31,0.1) 100%);
        }
        
        .radar-sweep {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          clip-path: polygon(50% 50%, 100% 50%, 100% 0, 0 0, 0 50%);
          background: linear-gradient(90deg, rgba(56,189,248,0.1) 0%, rgba(99,102,241,0.4) 100%);
        }
        
        .active-scan .radar-sweep {
          animation: radar-sweep 1.5s linear infinite;
        }
        
        .radar-ping {
          animation: radar-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          border: 2px solid #38bdf8;
          border-radius: 50%;
        }
      `}</style> */}
      
      {/* User Info Collection Modal */}
      <AnimatePresence>
        {showUserInfoModal && domainStats && (
          <CollectUserInfoModal 
            domain={domain}
            isOpen={showUserInfoModal}
            onClose={() => setShowUserInfoModal(false)}
            onSubmit={submitUserInfo}
            onCompleted={handleUserInfoCompleted}
          />
        )}
      </AnimatePresence>
      
      {/* Security Test Results Modal */}
      <AnimatePresence>
        {isModalOpen && showTestResults && domainStats && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 rounded-xl border border-indigo-800/50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
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
                      onClick={() => setIsModalOpen(false)}
                      className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/80 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Modal Content with scrollable area */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
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
                      onClick={() => setIsModalOpen(false)}
                      className="text-sm text-gray-400 hover:text-gray-300 flex items-center gap-1 transition-colors"
                    >
                      <span>Close Report</span>
                    </button>
                    
                    <button
                      onClick={() => setShowTestResults(false)}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
