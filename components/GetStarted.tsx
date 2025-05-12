"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaRadiation, FaRocket, FaFileAlt, FaUsers } from 'react-icons/fa';

const steps = [
  {
    number: 1,
    title: "Get Your Free Report",
    description: "Get a free instant report summarizing your organization's exposed secrets with our non-disruptive approach.",
    icon: <FaFileAlt className="text-3xl text-blue-400" />,
    color: "blue"
  },
  {
    number: 2,
    title: "Talk To Our Team",
    description: "Experience Cyber X Radar firsthand by scheduling a demo with our technical team and discover its features.",
    icon: <FaUsers className="text-3xl text-indigo-400" />,
    color: "indigo"
  },
  {
    number: 3,
    title: "Setup and Launch",
    description: "Within few minutes we'll setup your instance and provide real-time feeds regarding your organization's exposure.",
    icon: <FaRocket className="text-3xl text-cyan-400" />,
    color: "cyan"
  }
];

const GetStarted = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
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
    <section className="py-24 bg-gradient-to-b from-[#0A0A1F] to-[#121221] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full filter blur-3xl"
        ></motion.div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07]"></div>
      
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
            <span>Simple Onboarding</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500"
          >
            Get Started In 3 Steps
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg text-gray-300"
          >
            In the blink of an eye, you can check out your organization&apos;s exposure from an adversary perspective with Cyber X Radar&apos;s advanced security platform.
          </motion.p>
        </motion.div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/30 to-blue-500/20 transform -translate-y-1/2 z-0"></div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-8">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }} 
                    transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${
                      step.color === 'blue' ? 'from-blue-500/30 to-blue-600/30' : 
                      step.color === 'indigo' ? 'from-indigo-500/30 to-indigo-600/30' : 
                      'from-cyan-500/30 to-cyan-600/30'
                    } flex items-center justify-center relative shadow-lg`}
                  >
                    <div className="absolute inset-1 rounded-full bg-[#1A1A3A] flex items-center justify-center">
                      {step.icon}
                    </div>
                    
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border border-indigo-400/30">
                      {step.number}
                    </div>
                    
                    {/* Animated ring */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      className="absolute inset-0 rounded-full border-2 border-blue-500/20"
                    ></motion.div>
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-xs">
                  {step.description}
                </p>
                
                <motion.div 
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover:w-24 transition-all duration-300"
                ></motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-blue-900/30 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <FaRadiation className="text-blue-300" size={16} />
            <span>Start Your Protection Now</span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
    </section>
  );
};

export default GetStarted;
