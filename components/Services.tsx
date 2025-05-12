"use client";
import React, { useState } from 'react';
import { FaUserSecret, FaNetworkWired, FaCodeBranch, FaQuestion, FaChevronRight, FaRadiation, FaShieldAlt,FaBolt } from "react-icons/fa";
import { MdMonitor, MdDomain } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced services with additional properties
const services = [
  {
    icon: <FaUserSecret className="text-blue-500 text-2xl" />,
    title: "Dark Web Monitoring",
    description: "Gain comprehensive visibility into your organization's exposure on the dark web through a 24/7 monitoring service.",
    link: "#",
    featured: true,
    stats: "3.2B+ records monitored",
    color: "blue"
  },
  {
    icon: <MdMonitor className="text-blue-500 text-2xl" />,
    title: "Breaches Monitoring",
    description: "Stay ahead of the curve with our continuous monitoring service that scans the latest breached web services.",
    link: "#",
    featured: false,
    stats: "24/7 real-time alerts",
    color: "indigo"
  },
  {
    icon: <FaNetworkWired className="text-blue-500 text-2xl" />,
    title: "Attack Surface Mapping",
    description: "Our attack surface mapping service offers a comprehensive overview of your exposed digital assets and services.",
    link: "#"
  },
  {
    icon: <MdDomain className="text-blue-500 text-2xl" />,
    title: "Brand Protection",
    description: "Protect your organization from brand impersonation, social media impersonation, and phishing with our advanced brand protection services.",
    link: "#"
  },
  {
    icon: <FaCodeBranch className="text-blue-500 text-2xl" />,
    title: "Supply Chain Monitoring",
    description: "Extend your risk protection by monitoring your vendors' exposure on the dark web, ensuring the security of your supply chain.",
    link: "#"
  },
  {
    icon: <FaQuestion className="text-blue-500 text-2xl" />,
    title: "Got a Special Request?",
    description: "Unlock valuable insights instantly: Receive a comprehensive exposure report for your organization at no cost.",
    link: "#"
  }
];

const Services = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  
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
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-gradient-to-b from-[#121221] to-[#0A0A1F] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full filter blur-3xl"
        ></motion.div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07]"></div>
      
      {/* Radar scanning circles in background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full rounded-full border-2 border-dashed border-blue-500/10"
          ></motion.div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
              opacity: [0.1, 0.5, 0.1],
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
      
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-700/30 rounded-full px-4 py-1 mb-6 text-sm font-medium text-blue-300"
          >
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span>Advanced Security Solutions</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500"
          >
            Comprehensive Protection Services
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg text-gray-300"
          >
            Our suite of advanced cybersecurity services provides continuous monitoring and protection against emerging threats in the digital landscape.
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredService(index)}
              onHoverEnd={() => setHoveredService(null)}
              className="h-full rounded-xl overflow-hidden bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 border border-indigo-900/30 p-6 shadow-xl backdrop-blur-sm group relative"
            >
              {/* Animated highlight effect */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredService === index ? 0.1 : 0,
                  background: `radial-gradient(circle at 50% 50%, ${
                    service.color === 'blue' ? '#3B82F6' : 
                    service.color === 'indigo' ? '#6366F1' : 
                    service.color === 'purple' ? '#8B5CF6' : 
                    service.color === 'cyan' ? '#06B6D4' : '#3B82F6'
                  }, transparent)`
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none"
              />
              
              {/* Top accent border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                service.color === 'blue' ? 'from-blue-600 to-cyan-600' : 
                service.color === 'indigo' ? 'from-indigo-600 to-purple-600' : 
                service.color === 'purple' ? 'from-purple-600 to-fuchsia-600' : 
                'from-blue-600 to-indigo-600'
              } opacity-80`}></div>
              
              {/* Featured badge if applicable */}
              {service.featured && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
                  <motion.span 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-1"
                  >
                    <FaBolt size={10} /> Premium
                  </motion.span>
                </div>
              )}
              
              <div className="relative z-10">
                <div className="mb-6 w-14 h-14 rounded-lg bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-700/30 flex items-center justify-center shadow-lg group-hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    animate={hoveredService === index ? { x: '100%' } : { x: '-100%' }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                    className="text-blue-400 text-2xl relative z-10"
                  >
                    {service.icon}
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  {service.title}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={hoveredService === index ? { scale: 1, rotate: [0, 15, 0] } : { scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaShieldAlt className="text-blue-400 text-sm" />
                  </motion.div>
                </h3>
                
                <AnimatePresence mode="wait">
                  {hoveredService === index ? (
                    <motion.div
                      key="hovered"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mb-1"
                    >
                      <div className="flex items-center gap-2 text-xs font-medium text-blue-400 mb-3">
                        <div className="w-4 h-4 rounded-full bg-blue-400/20 flex items-center justify-center">
                          <FaRadiation size={8} className="text-blue-400" />
                        </div>
                        {service.stats}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <motion.a 
                    href={service.link} 
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Explore Service <FaChevronRight className="ml-2 text-sm" />
                  </motion.a>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={hoveredService === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center"
                  >
                    <FaShieldAlt className="text-blue-400 text-xs" />
                  </motion.div>
                </div>
              </div>
              
              {/* Interactive particles effect on hover */}
              <AnimatePresence>
                {hoveredService === index && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        initial={{ 
                          x: '50%', 
                          y: '50%', 
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{ 
                          x: `${Math.random() * 100}%`, 
                          y: `${Math.random() * 100}%`, 
                          opacity: [0, 0.5, 0],
                          scale: [0, 1, 0.5]
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
          >
            <FaShieldAlt />
            <span>View All Security Services</span>
          </motion.div>
        </motion.div>
        
        {/* Enhanced feature highlight banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="mt-24 relative overflow-hidden rounded-xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 backdrop-blur-sm"></div>
          <motion.div 
            className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-no-repeat bg-center opacity-5 group-hover:opacity-10 transition-opacity duration-500"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
          
          {/* New dot pattern decoration */}
          <div className="absolute top-0 left-0 right-0 flex justify-between px-4">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -5 }}
                animate={{ y: [-5, 0, -5] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                className="w-1 h-1 bg-blue-500 opacity-50 rounded-full"
              />
            ))}
          </div>
          
          <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/4 flex justify-center">
              <div className="relative w-24 h-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500/30"
                ></motion.div>
                <div className="absolute inset-2 rounded-full bg-blue-900/50 flex items-center justify-center">
                  <FaRadiation className="text-blue-400 text-4xl" />
                </div>
              </div>
            </div>
            
            <div className="md:w-2/4 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                24/7 Continuous Monitoring
              </h3>
              <p className="text-gray-300">
                Our advanced radar system constantly scans for threats and vulnerabilities, providing real-time protection for your digital assets.
              </p>
            </div>
            
            <div className="md:w-1/4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 font-medium transition-all duration-300 flex items-center gap-2"
              >
                <span>Learn About Our Technology</span>
                <FaChevronRight />
              </motion.button>
            </div>
            
            {/* Add pulsing radar animation to make it more dynamic */}
            <div className="absolute w-32 h-32 -bottom-16 -left-16 opacity-10">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-500/30"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-500/20"
                animate={{ scale: [1, 2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
    </section>
  );
};

export default Services;
