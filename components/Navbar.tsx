"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaShieldAlt, FaRadiation, FaUserShield, FaLock, FaChartLine, FaTools, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  
  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Menu animation variants
  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };
  
  return (
    <motion.nav 
      initial={{ opacity: 1 }} // Changed from y: -100 to prevent hiding initially
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${scrolled ? 'bg-[#0A0A1F]/90 backdrop-blur-md' : 'bg-[#0A0A1F]'} sticky top-0 z-50 transition-all duration-300`}
    >
      {/* Top decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 1 }} // Changed from opacity: 0 to be visible initially
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 flex-shrink-0">
                {/* Radar animation in logo */}
                <div className="radar-container">
                  <div className="radar-background rounded-full"></div>
                  <motion.div 
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="radar-sweep"
                  ></motion.div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaRadiation size={14} className="text-blue-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Cyber X Radar
                </span>
                <span className="text-xs text-gray-400">Advanced Threat Detection</span>
              </div>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.div 
            initial={{ opacity: 1 }} // Changed from opacity: 0 to be visible initially
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center space-x-6"
          >
            {[
              { href: "#services", label: "Services", icon: <FaShieldAlt className="text-blue-400 mr-1" size={12} /> },
              { href: "#free-tools", label: "Free Tools", icon: <FaTools className="text-blue-400 mr-1" size={12} /> },
              { href: "#partnership", label: "Partnership", icon: <FaLock className="text-blue-400 mr-1" size={12} /> },
              { href: "#about", label: "About", icon: <FaUserShield className="text-blue-400 mr-1" size={12} /> },
              { href: "/api", label: "API Docs", icon: <FaChartLine className="text-blue-400 mr-1" size={12} /> },
              { href: "/contact", label: "Contact", icon: <FaEnvelope className="text-blue-400 mr-1" size={12} /> },
            ].map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`group relative text-gray-300 hover:text-blue-400 transition font-medium flex items-center text-sm`}
                onClick={() => setActiveLink(link.href)}
              >
                <span className="flex items-center">
                  {link.icon} {link.label}
                </span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full ${activeLink === link.href ? 'w-full' : ''}`}></span>
              </Link>
            ))}
          </motion.div>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Login Button - Enhanced */}
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                href="/login"
                className="flex items-center justify-center gap-1.5 text-sm font-medium border border-indigo-500/80 bg-[#1A1A3A]/60 hover:bg-indigo-600/30 text-blue-400 hover:text-blue-200 py-1.5 px-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-blue-500/20 relative"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></span>
                <FaSignInAlt size={14} className="transform transition-transform hover:rotate-12" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button 
                className="text-gray-300 hover:text-blue-400 focus:outline-none p-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaTimes size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaBars size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
          
          {/* Action Buttons - Now contains both Login and Start Scanning */}
          <motion.div 
            initial={{ opacity: 1, scale: 1 }} // Changed from opacity: 0, scale: 0.9 to be visible initially
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex items-center gap-3"
          >
            {/* Start Scanning Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-6 py-2.5 rounded-full font-medium transition shadow-lg hover:shadow-blue-900/30 flex items-center gap-2"
            >
              <FaRadiation size={14} className="animate-spin-slow" />
              <span>Start Scanning</span>
            </motion.button>
            
            {/* Enhanced Login Button with better hover effect */}
            <Link 
              href="/login"
              className="relative group overflow-hidden flex items-center gap-2.5 text-sm font-medium border border-indigo-600/50 bg-indigo-900/20 hover:bg-indigo-800/30 text-blue-300 hover:text-blue-200 py-2.5 px-5 rounded-full transition-all duration-300 shadow-sm hover:shadow-blue-900/30 hover:border-indigo-500/80"
            >
              {/* Animated glow effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-indigo-400/10 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-all duration-1000 ease-in-out rounded-full"></span>
              
              {/* Icon with pulse effect */}
              <span className="relative z-10 flex items-center justify-center w-5 h-5">
                <span className="absolute inset-0 rounded-full bg-blue-500/20 group-hover:animate-pulse"></span>
                <FaSignInAlt size={14} className="text-blue-400 group-hover:text-blue-300 transition-colors transform group-hover:scale-110 duration-300" />
              </span>
              
              {/* Text with subtle hover effect */}
              <span className="relative z-10 transition-all duration-300 group-hover:tracking-wider">
                Login
              </span>
              
              {/* Subtle dot indicator */}
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400/70 group-hover:bg-blue-300 animate-pulse"></span>
            </Link>
          </motion.div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden mt-4 pb-4 border-t border-indigo-900/30 overflow-hidden"
            >
              <div className="flex flex-col space-y-4 mt-4">
                {[
                  { href: "#services", label: "Services", icon: <FaShieldAlt size={14} /> },
                  { href: "#free-tools", label: "Free Tools", icon: <FaTools size={14} /> },
                  { href: "#partnership", label: "Partnership", icon: <FaLock size={14} /> },
                  { href: "#about", label: "About", icon: <FaUserShield size={14} /> },
                  { href: "/api", label: "API Docs", icon: <FaChartLine size={14} /> },
                  { href: "/contact", label: "Contact", icon: <FaEnvelope size={14} /> },
                  { href: "/login", label: "Login", icon: <FaSignInAlt size={14} /> }
                ].map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-blue-400 transition font-medium flex items-center gap-2 py-2 border-b border-indigo-900/10"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveLink(link.href);
                      }}
                    >
                      <span className="text-blue-500">{link.icon}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants}>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white w-full py-3 rounded-full font-medium transition shadow-lg hover:shadow-blue-900/30 mt-4 flex items-center justify-center gap-2"
                  >
                    <FaRadiation size={14} />
                    <span>Start Scanning</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated dots for cyber effect */}
      <div className="absolute left-0 -bottom-1 w-full h-[1px] flex justify-between">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="h-1 w-1 rounded-full bg-blue-500 opacity-25"
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
      
      {/* Add custom animation for the radiation icon */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
