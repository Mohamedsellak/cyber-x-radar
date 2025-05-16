"use client";
import React from 'react';
import { FaShieldAlt, FaServer, FaRadiation, FaArrowRight, FaHandshake } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { motion } from 'framer-motion';

const partnerships = [
  {
    icon: <MdBusinessCenter className="text-blue-400 text-2xl" />,
    title: "MSPs Partnership",
    description: "Discover new avenues for growth and fortify your security offerings through the Cyber X Radar Partnership Program.",
    tags: ["Growth", "Revenue", "Security"],
    color: "blue"
  },
  {
    icon: <FaShieldAlt className="text-indigo-400 text-2xl" />,
    title: "Offensive Security",
    description: "Fortify network security with our concise cybersecurity use cases and threat insights for red team operations.",
    tags: ["Red Team", "Penetration Testing", "Threat Intelligence"],
    color: "indigo"
  },
  {
    icon: <FaServer className="text-cyan-400 text-2xl" />,
    title: "Data Partnership (API)",
    description: "Unlock the power of dark web intelligence with Cyber X Radar's Data API integration for enhanced cybersecurity.",
    tags: ["API", "Integration", "Real-time"],
    color: "cyan"
  }
];

const Partnership = () => {
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
    <section id="partnership" className="py-24 bg-gradient-to-b from-[#121221] to-[#0A0A1F] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-600 to-blue-800 rounded-full filter blur-3xl translate-y-1/2 translate-x-1/3"
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
              duration: 30,
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
            <span>Strategic Alliances</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500"
          >
            Partnership Opportunities
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg text-gray-300"
          >
            Join forces with Cyber X Radar to enhance your security offerings and deliver exceptional value to your clients
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {partnerships.map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="h-full bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-8 rounded-xl border border-indigo-900/30 shadow-xl backdrop-blur-sm relative group overflow-hidden"
            >
              {/* Top accent border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                item.color === 'blue' ? 'from-blue-600 to-blue-500' : 
                item.color === 'indigo' ? 'from-indigo-600 to-indigo-500' : 
                'from-cyan-600 to-cyan-500'
              } opacity-80`}></div>
              
              {/* Icon with glowing effect */}
              <div className="mb-6 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-700/30 flex items-center justify-center shadow-lg group-hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.7 }}
                  className="relative z-10"
                >
                  {item.icon}
                </motion.div>
              </div>
              
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                {item.description}
              </p>
              
              <div className="mb-6 flex flex-wrap gap-2">
                {item.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="bg-blue-900/30 text-blue-300 text-xs rounded-full px-3 py-1 border border-blue-700/30">
                    {tag}
                  </div>
                ))}
              </div>
              
              <motion.button 
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                onClick={() => window.location.href = "/contact"}
              >
                <span>Learn More</span>
                <FaArrowRight size={12} />
              </motion.button>
              
              {/* Animated corner effect */}
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-blue-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom CTA section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur-xl"></div>
          
          <div className="relative p-8 md:p-10 bg-gradient-to-b from-[#1A1A3A]/60 to-[#121232]/60 rounded-xl border border-indigo-900/30 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 flex justify-center">
                <div className="relative w-32 h-32">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500/30"
                  ></motion.div>
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-600/30 to-indigo-600/30 flex items-center justify-center">
                    <FaHandshake className="text-blue-400 text-4xl" />
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                  Become a Partner
                </h3>
                <p className="text-gray-300">
                  Join our network of cybersecurity partners and access exclusive resources and support.
                </p>
              </div>
              
              <div className="md:col-span-1 flex flex-col md:items-end">
                <motion.a 
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-900/30 transition-all duration-300 mx-auto md:mx-0 flex items-center gap-2"
                >
                  <FaRadiation size={14} />
                  <span>Learn About Partnership</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
    </section>
  );
};

export default Partnership;
