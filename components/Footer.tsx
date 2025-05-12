"use client";
import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaGithub, FaRadiation, FaShieldAlt, FaAngleRight, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Dark Web Monitoring", href: "#" },
        { name: "Breaches Monitoring", href: "#" },
        { name: "Attack Surface Mapping", href: "#" },
        { name: "Brand Protection", href: "#" },
        { name: "Supply Chain Monitoring", href: "#" }
      ]
    },
    {
      title: "Free Tools",
      links: [
        { name: "Free Darkweb Report", href: "#" },
        { name: "Email Data Breach Scan", href: "#" },
        { name: "Oracle Breach Check", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Partnership", href: "#" },
        { name: "Contact", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Privacy Policy", href: "#" }
      ]
    }
  ];
  
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#121221] to-[#0A0A1F] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div 
          initial={{ opacity: 0.05 }}
          animate={{ opacity: [0.05, 0.1, 0.05] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full filter blur-3xl translate-y-1/2 translate-x-1/3"
        ></motion.div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.05]"></div>
      
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 flex-shrink-0">
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
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Cyber X Radar
                </span>
                <span className="text-xs text-gray-400">Advanced Threat Detection</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Proactively fight cybercrime with our state-of-the-art security platform and threat intelligence capabilities.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <FaTwitter size={16} />, href: "#" },
                { icon: <FaLinkedinIn size={16} />, href: "#" },
                { icon: <FaFacebookF size={16} />, href: "#" },
                { icon: <FaGithub size={16} />, href: "#" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  whileHover={{ y: -5, backgroundColor: '#3B82F6' }}
                  href={social.href} 
                  className="w-9 h-9 rounded-full bg-[#1A1A3A] flex items-center justify-center text-gray-300 hover:text-white border border-indigo-900/30 transition-all duration-300 shadow-lg"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {footerLinks.map((column, colIndex) => (
            <motion.div key={colIndex} variants={itemVariants}>
              <h4 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-blue-300 transition-colors duration-300 inline-block group flex items-center"
                    >
                      <FaAngleRight className="mr-2 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Contact info bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="py-6 px-8 rounded-xl bg-gradient-to-r from-[#1A1A3A]/40 to-[#121232]/40 border border-indigo-900/20 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 backdrop-blur-sm"
        >
          {[
            { icon: <FaEnvelope className="text-blue-400" />, title: "Email Us", content: "contact@cyberxradar.com" },
            { icon: <FaMapMarkerAlt className="text-blue-400" />, title: "Location", content: "Cyber Security Tower, Digital Ave." },
            { icon: <FaPhone className="text-blue-400" />, title: "Call Us", content: "+1 (888) CYBER-XR" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1A3A] border border-indigo-900/30 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h5 className="text-sm text-gray-400">{item.title}</h5>
                <p className="text-white font-medium">{item.content}</p>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Newsletter form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="py-6 px-8 rounded-xl bg-gradient-to-r from-[#1A1A3A]/60 to-[#121232]/60 border border-indigo-900/30 mb-12 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1">
              <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 mb-1">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm">
                Subscribe to our newsletter for security updates and insights.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-3 bg-[#1A1A3A]/70 border border-indigo-900/30 rounded-md text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full"
                />
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-md font-medium shadow-lg hover:shadow-blue-900/30 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <FaShieldAlt size={14} />
                  <span>Subscribe</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-indigo-900/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Cyber X Radar. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors text-sm">Cookie Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors text-sm">GDPR</a>
          </div>
        </div>
      </div>
      
      {/* Custom signature */}
      <div className="bg-[#0A0A1A] py-3 text-center text-xs text-gray-600">
        <div className="container mx-auto px-4">
          Cyber X Radar | Securing Digital Infrastructure
        </div>
      </div>
    </footer>
  );
};

export default Footer;
