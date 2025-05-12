"use client";
import React from 'react';
import { FaExclamationTriangle, FaChartLine, FaShieldAlt, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Statistics = () => {
  const stats = [
    { 
      value: "$10.3 billion",
      label: "Lost to cybercrime in 2022",
      icon: <FaExclamationTriangle />,
      color: "red"
    },
    { 
      value: "3x increase",
      label: "In ransomware attacks since 2020",
      icon: <FaChartLine />,
      color: "yellow"
    },
    { 
      value: "287 days",
      label: "Average time to identify a breach",
      icon: <FaShieldAlt />,
      color: "blue"
    },
    { 
      value: "95%",
      label: "Of breaches caused by human error",
      icon: <FaLock />,
      color: "purple"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0A0A1F] to-[#121221] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-red-600 to-red-800 rounded-full filter blur-3xl translate-y-1/2 translate-x-1/3"
        ></motion.div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07]"></div>
      
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700 to-transparent opacity-30"></div>
      
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
            className="inline-flex items-center gap-2 bg-red-900/30 border border-red-700/30 rounded-full px-4 py-1 mb-6 text-sm font-medium text-red-300"
          >
            <span className="inline-block w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            <span>Alarming Trends</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-300 to-orange-400">
            The Growing Cybersecurity Threat
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-300">
            Since 2020, the amount lost to digital crime has more than doubled, with businesses of all sizes increasingly targeted by sophisticated cyber threats.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/30 shadow-2xl backdrop-blur-sm p-8 relative overflow-hidden"
        >
          {/* Animated scan line */}
          <motion.div 
            initial={{ top: 0 }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-12 bg-gradient-to-b from-blue-500/0 via-blue-500/5 to-blue-500/0 pointer-events-none"
          ></motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  stat.color === 'red' ? 'from-red-900/10 to-red-800/10' :
                  stat.color === 'yellow' ? 'from-yellow-900/10 to-yellow-800/10' :
                  stat.color === 'blue' ? 'from-blue-900/10 to-blue-800/10' :
                  'from-purple-900/10 to-purple-800/10'
                } rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 ${
                  stat.color === 'red' ? 'text-red-500 bg-red-900/20' :
                  stat.color === 'yellow' ? 'text-yellow-500 bg-yellow-900/20' :
                  stat.color === 'blue' ? 'text-blue-500 bg-blue-900/20' :
                  'text-purple-500 bg-purple-900/20'
                }`}>
                  {stat.icon}
                </div>
                
                <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${
                  stat.color === 'red' ? 'text-red-400' :
                  stat.color === 'yellow' ? 'text-yellow-400' :
                  stat.color === 'blue' ? 'text-blue-400' :
                  'text-purple-400'
                }`}>
                  {stat.value}
                </h3>
                
                <p className="text-gray-400">{stat.label}</p>
                
                <motion.div 
                  className={`absolute h-1 w-0 bottom-0 left-0 right-0 mx-auto ${
                    stat.color === 'red' ? 'bg-red-500' :
                    stat.color === 'yellow' ? 'bg-yellow-500' :
                    stat.color === 'blue' ? 'bg-blue-500' :
                    'bg-purple-500'
                  } rounded-full`}
                  whileHover={{ width: '30%' }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-300 max-w-3xl mx-auto"
            >
              <span className="text-red-400 font-semibold">60% of small businesses</span> that suffer a cyber attack go out of business within six months. Protect your organization with Cyber X Radar&apos;s advanced threat detection technology.
            </motion.p>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
    </section>
  );
};

export default Statistics;
