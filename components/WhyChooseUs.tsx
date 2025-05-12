"use client";
import React from 'react';
import { FaCheckCircle, FaShieldAlt, FaRadiation, FaUserShield, FaRocket, FaSearchDollar } from "react-icons/fa";
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaShieldAlt className="text-blue-400 text-xl" />,
    title: "Sharp Precision Beyond Automation",
    description: "Our unique blend of automation and human intelligence ensures unparalleled coverage and sharp precision in threat detection."
  },
  {
    icon: <FaUserShield className="text-indigo-400 text-xl" />,
    title: "Offensive Security Driven",
    description: "With extensive experience in offensive security, our team understands how adversaries think and operate to protect your assets."
  },
  {
    icon: <FaRadiation className="text-cyan-400 text-xl" />,
    title: "Complete Digital Footprint",
    description: "Our platform employs multiple modules to cover both your human and digital assets' exposure across the deep and dark web."
  },
  {
    icon: <FaSearchDollar className="text-blue-400 text-xl" />,
    title: "Deep Investigation",
    description: "Our expert team investigates and reaches out to potential threat actors, actively searching for records related to your organization."
  },
  {
    icon: <FaRocket className="text-indigo-400 text-xl" />,
    title: "Continuous Innovation",
    description: "We utilize cutting-edge technologies and services, constantly evolving to enhance your proactive fight against threat actors."
  }
];

const WhyChooseUs = () => {
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
    <section className="py-24 bg-gradient-to-b from-[#0A0A1F] to-[#121221] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600 to-blue-800 rounded-full filter blur-3xl"
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
            <span>Our Advantage</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500"
          >
            Why Choose Cyber X Radar
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg text-gray-300"
          >
            Get comprehensive cybersecurity protection with our industry-leading threat detection and mitigation platform
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="h-full bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-8 rounded-xl border border-indigo-900/30 hover:border-indigo-700/50 shadow-xl backdrop-blur-sm relative group overflow-hidden"
            >
              {/* Top accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-80"></div>
              
              {/* Animated highlight effect */}
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="mb-6 w-14 h-14 rounded-lg bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-700/30 flex items-center justify-center shadow-lg group-hover:shadow-blue-900/20 transition-all duration-300">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10"
                  >
                    {feature.icon}
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-300 transition-colors flex items-center">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
                
                {/* Animated corner decoration */}
                <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-blue-500/20 to-transparent"
                  ></motion.div>
                </div>
                
                {/* Check icon */}
                <div className="absolute bottom-6 right-6">
                  <FaCheckCircle className="text-blue-500/40 group-hover:text-blue-500/70 transition-colors text-lg" />
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* CTA Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="h-full bg-gradient-to-r from-blue-700/80 to-indigo-700/80 p-8 rounded-xl flex flex-col items-center justify-center text-center border border-blue-500/30 shadow-xl backdrop-blur-sm hover:shadow-blue-900/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Animated particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
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
                  className="absolute w-1 h-1 bg-blue-300 rounded-full"
                />
              ))}
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <FaRadiation className="text-white text-2xl" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-white">Get Free Exposure Report</h3>
              
              <p className="text-blue-100 mb-6">
                Receive a comprehensive report for your domain covering dark web exposure, vulnerabilities, and breach data
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-800 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-white/20 flex items-center justify-center gap-2 mx-auto"
              >
                <FaShieldAlt size={14} className="text-indigo-600" />
                <span>Request Report</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Stats row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-10 lg:gap-20"
        >
          {[
            { value: "98.7%", label: "Threat Detection Rate" },
            { value: "24/7", label: "Continuous Monitoring" },
            { value: "5M+", label: "Credentials Protected" },
            { value: "10min", label: "Average Response Time" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
    </section>
  );
};

export default WhyChooseUs;
