"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaApple, FaGoogle, FaAmazon, FaMicrosoft, FaGlobe, FaShieldAlt, FaServer, FaDatabase, FaLock } from 'react-icons/fa';

// Enhanced partners array with additional cybersecurity companies and custom styling
const partners = [
  {
    name: "Microsoft",
    icon: <FaMicrosoft size={36} className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />,
    gradient: "group-hover:from-blue-500/20 group-hover:to-blue-600/20"
  },
  {
    name: "Google",
    icon: <FaGoogle size={36} className="text-gray-400 group-hover:text-red-400 transition-colors duration-300" />,
    gradient: "group-hover:from-red-500/20 group-hover:to-yellow-500/20"
  },
  {
    name: "Apple",
    icon: <FaApple size={36} className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300" />,
    gradient: "group-hover:from-gray-500/20 group-hover:to-gray-600/20"
  },
  {
    name: "Amazon",
    icon: <FaAmazon size={36} className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />,
    gradient: "group-hover:from-orange-500/20 group-hover:to-yellow-600/20"
  },
  {
    name: "SecureNet",
    icon: <FaGlobe size={36} className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />,
    gradient: "group-hover:from-cyan-500/20 group-hover:to-blue-600/20"
  },
  {
    name: "CyberShield",
    icon: <FaShieldAlt size={36} className="text-gray-400 group-hover:text-indigo-400 transition-colors duration-300" />,
    gradient: "group-hover:from-indigo-500/20 group-hover:to-purple-600/20"
  },
  {
    name: "ServerGuard",
    icon: <FaServer size={36} className="text-gray-400 group-hover:text-emerald-400 transition-colors duration-300" />,
    gradient: "group-hover:from-emerald-500/20 group-hover:to-green-600/20"
  },
  {
    name: "DataFort",
    icon: <FaDatabase size={36} className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />,
    gradient: "group-hover:from-blue-500/20 group-hover:to-indigo-600/20"
  }
];

const AsSeenOn = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 150 }
    }
  };

  return (
    <section className="py-14 bg-gradient-to-b from-[#121221] to-[#0A0A1F] border-y border-indigo-900/30 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div 
          initial={{ opacity: 0.05 }}
          animate={{ opacity: [0.05, 0.1, 0.05] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/2 left-1/2 w-[800px] h-[200px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-full filter blur-3xl"
        ></motion.div>
      </div>
      
      {/* Digital circuit pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.03]"></div>
      
      {/* Animated scanning line */}
      <motion.div 
        initial={{ left: "-10%" }}
        animate={{ left: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent pointer-events-none"
      ></motion.div>
      
      {/* Decorative cyber elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center"
            >
              <FaLock size={14} className="text-blue-400" />
            </motion.div>
            <h3 className="text-blue-400 text-sm font-medium uppercase tracking-wider">
              Trusted By Industry Leaders
            </h3>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center"
            >
              <FaShieldAlt size={14} className="text-blue-400" />
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-400 text-sm"
          >
            Cyber X Radar provides enterprise-grade security solutions trusted by leading technology companies worldwide
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-10 md:gap-12"
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.1 }}
              className="relative group"
            >
              <div className="h-20 w-20 flex items-center justify-center rounded-xl backdrop-blur-sm bg-[#1A1A3A]/20 border border-indigo-900/20 transition-all duration-300 group-hover:border-blue-500/30 group-hover:shadow-md group-hover:shadow-blue-500/10">
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-300 ${partner.gradient}`}></div>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="relative z-10">
                  {partner.icon}
                </motion.div>
              </div>
              
              {/* Animated dots underneath */}
              <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      delay: i * 0.3,
                      repeatType: "reverse"
                    }}
                    className="w-1 h-1 rounded-full bg-blue-400"
                  ></motion.div>
                ))}
              </div>
              
              <span className="sr-only">{partner.name}</span>
              
              {/* Tooltip on hover */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-[#1A1A3A] text-xs text-blue-300 rounded whitespace-nowrap border border-blue-500/20 pointer-events-none"
              >
                {partner.name}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-900/10 border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <p className="text-gray-400 text-xs">
              Safeguarding over 15,000 organizations across 120+ countries
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AsSeenOn;
