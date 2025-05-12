"use client";
import React from 'react';
import { FaSearch, FaLock, FaRadiation, FaFileAlt, FaShieldAlt } from "react-icons/fa";
import { RiAlarmWarningLine } from "react-icons/ri";
import { motion } from 'framer-motion';

const tools = [
  {
    icon: <FaSearch className="text-blue-400 text-2xl" />,
    title: "Free Darkweb Report",
    description: "Unlock valuable insights instantly: Receive an immediate comprehensive exposure report for your organization.",
    buttonText: "Get Free Report",
    color: "blue"
  },
  {
    icon: <FaLock className="text-indigo-400 text-2xl" />,
    title: "Email Data Breach Scan",
    description: "Check if your email has been mentioned in data breaches and analyze your organization's exposure.",
    buttonText: "Check Email",
    color: "indigo"
  },
  {
    icon: <RiAlarmWarningLine className="text-cyan-400 text-2xl" />,
    title: "Oracle Breach Check",
    description: "Search your company to see if it was mentioned in the alleged Oracle Cloud breach.",
    buttonText: "Check Company",
    color: "cyan"
  }
];

const FreeTools = () => {
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
    <section id="free-tools" className="py-24 bg-gradient-to-b from-[#121221] to-[#0A0A1F] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-indigo-600 to-blue-800 rounded-full filter blur-3xl translate-y-1/2"
        ></motion.div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07]"></div>
      
      {/* Radar scanning circles in background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full border-2 border-dashed border-blue-500/10"
          ></motion.div>
        </div>
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
            <span>No-Cost Security Tools</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500"
          >
            Free Cyber Security Tools
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg text-gray-300"
          >
            Access our complimentary tools to get valuable insights into your organization&apos;s security posture and exposure risk
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {tools.map((tool, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-8 rounded-xl border border-indigo-900/30 shadow-xl backdrop-blur-sm relative group overflow-hidden"
            >
              {/* Top accent border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                tool.color === 'blue' ? 'from-blue-600 to-blue-500' : 
                tool.color === 'indigo' ? 'from-indigo-600 to-indigo-500' : 
                'from-cyan-600 to-cyan-500'
              } opacity-80`}></div>
              
              {/* Icon with glowing effect */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${
                  tool.color === 'blue' ? 'from-blue-900/50 to-blue-800/50' : 
                  tool.color === 'indigo' ? 'from-indigo-900/50 to-indigo-800/50' : 
                  'from-cyan-900/50 to-cyan-800/50'
                } flex items-center justify-center shadow-lg relative overflow-hidden`}>
                  {/* Shimmering effect */}
                  <motion.div 
                    animate={{ x: ['0%', '100%', '0%'] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror' }}
                    className={`absolute inset-0 bg-gradient-to-r ${
                      tool.color === 'blue' ? 'from-blue-600/0 via-blue-600/20 to-blue-600/0' : 
                      tool.color === 'indigo' ? 'from-indigo-600/0 via-indigo-600/20 to-indigo-600/0' : 
                      'from-cyan-600/0 via-cyan-600/20 to-cyan-600/0'
                    } opacity-50`}
                  ></motion.div>
                  
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                  >
                    {tool.icon}
                  </motion.div>
                </div>
                
                {/* Pulsing ring effect */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`absolute inset-0 rounded-lg border-2 ${
                    tool.color === 'blue' ? 'border-blue-500/20' : 
                    tool.color === 'indigo' ? 'border-indigo-500/20' : 
                    'border-cyan-500/20'
                  }`}
                ></motion.div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-300 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors min-h-[5rem]">
                {tool.description}
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  tool.color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600' : 
                  tool.color === 'indigo' ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600' : 
                  'bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600'
                } text-white shadow-lg hover:shadow-blue-900/30`}
              >
                <FaRadiation size={14} />
                {tool.buttonText}
              </motion.button>
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: '50%', y: '50%' }}
                    animate={{ 
                      x: `${Math.random() * 100}%`, 
                      y: `${Math.random() * 100}%`,
                      opacity: [0, 0.5, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatType: 'loop',
                      delay: i * 0.2
                    }}
                    className={`absolute w-1 h-1 rounded-full ${
                      tool.color === 'blue' ? 'bg-blue-400' : 
                      tool.color === 'indigo' ? 'bg-indigo-400' : 
                      'bg-cyan-400'
                    }`}
                  />
                ))}
              </div>
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
          <div className="bg-gradient-to-b from-[#1A1A3A]/50 to-[#121232]/50 py-6 px-8 rounded-xl border border-indigo-900/20 shadow-xl max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-3">
              <FaFileAlt className="text-blue-400 text-xl" />
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Get a Comprehensive Security Assessment
              </h3>
            </div>
            <p className="text-gray-400 mb-5">
              Our free tools are just the beginning. For a more thorough analysis of your security posture, try our full Cyber X Radar platform.
            </p>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-6 py-3 rounded-md font-medium transition shadow-lg hover:shadow-blue-900/30 flex items-center justify-center gap-2 mx-auto"
            >
              <FaShieldAlt size={14} />
              <span>Request Full Assessment</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
    </section>
  );
};

export default FreeTools;
