"use client";
import React from 'react';
import { FaCode, FaUserSecret, FaRocket, FaAngleRight, FaRadiation } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Integrations = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#121221] to-[#0A0A1F] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }} 
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600 to-blue-800 rounded-full filter blur-3xl"
        ></motion.div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07]"></div>
      
      {/* Radar scanning lines in background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
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
            <span>Integration Solutions</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500">
            Powerful Integration Options
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-300">
            Seamlessly incorporate Cyber X Radar&apos;s advanced threat detection into your existing workflow with our flexible integration options.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <FaCode />,
              title: "For Developers",
              description: "Our developer-friendly APIs provide a straightforward way to enhance your application&apos;s security with real-time threat detection capabilities.",
              gradient: "from-blue-600 to-cyan-600"
            },
            {
              icon: <FaUserSecret />,
              title: "For Red Teams",
              description: "Unleash the potential of authentic dark web data in your simulations with actual compromised credentials and attack vectors.",
              gradient: "from-indigo-600 to-purple-600"
            },
            {
              icon: <FaRocket />,
              title: "For Enterprises",
              description: "Comprehensive integration options for large-scale deployments with custom configurations and dedicated support channels.",
              gradient: "from-blue-600 to-indigo-700"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="h-full rounded-xl overflow-hidden bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 border border-indigo-900/30 shadow-xl backdrop-blur-sm relative">
                {/* Top colorful border */}
                <div className={`h-1 w-full bg-gradient-to-r ${item.gradient}`}></div>
                
                <div className="p-8">
                  <div className="mb-6 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-700/30 flex items-center justify-center shadow-lg group-hover:shadow-blue-900/20 transition-all duration-300">
                    <span className="text-blue-400 text-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors line-clamp-3">
                    {item.description}
                  </p>
                  
                  <motion.a 
                    href="#" 
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors"
                  >
                    <span>Learn More</span>
                    <FaAngleRight size={14} />
                  </motion.a>
                </div>
                
                {/* Animated corner highlight */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-500/20 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-medium rounded-lg transition shadow-lg hover:shadow-blue-900/30 flex items-center gap-2 mx-auto"
          >
            <FaRadiation size={14} />
            <span>Explore All Solutions</span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
              opacity: [0.1, 0.3, 0.1],
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
    </section>
  );
};

export default Integrations;
