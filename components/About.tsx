"use client";
import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import { FaRadiation, FaShieldAlt, FaLock, FaBug, FaGlobe, FaServer } from 'react-icons/fa';

const About = () => {
  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#121221] to-[#0A0A1F] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full filter blur-3xl -translate-x-1/2"
        ></motion.div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07]"></div>
      
      {/* Radar scanning circle in background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full rounded-full border-2 border-dashed border-blue-500/20"
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
            <span>Advanced Cyber Security Solution</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500"
          >
            How Cyber X Radar Protects You
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed"
          >
            Cyber X Radar is meticulously engineered to safeguard your digital infrastructure with comprehensive visibility into breached credentials and vulnerabilities. Our AI-powered platform continuously scans the dark web and monitors breach databases, allowing you to <span className="text-blue-300 font-medium">proactively identify</span> and <span className="text-blue-300 font-medium">neutralize threats</span> before they impact your organization.
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative group perspective-1000">
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-xl filter blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700 animate-pulse"></div>
              
              {/* Card design pattern */}
              <div className="absolute inset-0 rounded-xl opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
              
              <motion.div 
                whileHover={{ y: -5, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative rounded-xl overflow-hidden border border-indigo-900/50 bg-gradient-to-b from-[#1A1A3A] to-[#121232] shadow-2xl backdrop-blur-sm"
              >
                <div className="bg-[#151530] px-4 py-3 flex items-center border-b border-indigo-900/50">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="mx-auto text-sm font-medium text-gray-300 flex items-center">
                    <span className="animate-pulse mr-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>  
                    <span className="flex items-center gap-2">
                      <FaRadiation size={14} className="text-blue-400" />
                      Radar Intelligence Dashboard
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <Image 
                    src="/risk-overview.svg" 
                    alt=''
                    // alt="Cyber Risk Overview" 
                    width={600} 
                    height={400} 
                    className="w-full" 
                  />
                  
                  {/* Animated scan line */}
                  <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-8 bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 pointer-events-none"
                  ></motion.div>
                  
                  {/* Data points */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute w-3 h-3 rounded-full bg-blue-500/50"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                      }}
                    ></motion.div>
                  ))}
                </div>
                
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2 text-white text-sm font-medium shadow-lg flex items-center gap-2">
                  <FaShieldAlt className="text-white" size={12} />
                  Advanced Threat Analytics
                </div>
              </motion.div>
              
              {/* Badge */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-5 -left-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-3 shadow-xl rotate-[-3deg] hover:rotate-0 transition-all duration-300 z-10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-inner">
                    <FaRadiation size={14} />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">Real-time Protection</p>
                    <p className="text-blue-200 text-xs">Always monitoring</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="md:w-1/2 flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Complete Defense For Your Digital Assets
            </h3>
            
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              {[
                {
                  icon: <FaGlobe />,
                  title: "Dark Web Monitoring",
                  description: "Continuously scan darknet forums, marketplaces, and data dumps for your compromised assets"
                },
                {
                  icon: <FaLock />,
                  title: "Breach Detection & Alerting",
                  description: "Receive instant notifications when your data appears in known breaches"
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Attack Surface Mapping",
                  description: "Comprehensive visibility into your external-facing digital footprint"
                },
                {
                  icon: <FaBug />,
                  title: "Brand Protection",
                  description: "Monitor for domain spoofing, brand abuse, and impersonation attempts"
                },
                {
                  icon: <FaServer />,
                  title: "Supply Chain Monitoring",
                  description: "Extend protection to third-party vendors and partners in your ecosystem"
                }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  variants={itemVariants}
                  className="flex items-start gap-4 group"
                >
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg w-10 h-10 min-w-10 flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-blue-300 group-hover:text-blue-400 transition-colors duration-300 flex items-center">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-blue-900/30 w-fit flex items-center gap-2"
            >
              <FaRadiation size={14} />
              <span>Start Your Protection Today</span>
            </motion.button>
          </motion.div>
        </div>
        
        {/* Stats section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-6 rounded-xl backdrop-blur-sm border border-indigo-800/30 shadow-2xl"
        >
          {[
            { value: "5.2M+", label: "Credentials Protected" },
            { value: "98.7%", label: "Detection Accuracy" },
            { value: "3,600+", label: "Clients Worldwide" },
            { value: "24/7", label: "Continuous Monitoring" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h4 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                {stat.value}
              </h4>
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
    </section>
  );
};

export default About;
