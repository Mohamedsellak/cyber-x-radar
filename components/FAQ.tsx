"use client";
import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle, FaRadiation, FaShieldAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Who&apos;s Behind Cyber X Radar?",
    answer: "Our team came from a purely technical background with an average of 10 years of hands-on offensive security experience. We&apos;ve worked with governmental, financial, and other entities to provide TIBER (threat intelligence-based ethical red-teaming) services, among others."
  },
  {
    question: "Can I Monitor Any Assets Through My Account?",
    answer: "No! Due to the nature of data that Cyber X Radar modules can expose, we&apos;re very restrictive when verifying the assets under your authority to ensure ethical use of our platform."
  },
  {
    question: "Will Cyber X Radar Disrupt My Business?",
    answer: "No, unless you requested a manual verification and addition of active reconnaissance (which our team does very carefully), Cyber X Radar works completely passively and does not interact with your assets."
  },
  {
    question: "Can Other Clients Access My Data?",
    answer: "No, every client gets a dedicated instance that can&apos;t, under any circumstances, interact with other clients&apos; data. Your security and privacy are our top priorities."
  },
  {
    question: "How Often Is Cyber X Radar Updated?",
    answer: "Our threat intelligence database is updated in real-time, with new vulnerabilities, breaches, and dark web exposures being added as they are discovered by our advanced monitoring systems."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-[#0A0A1F] to-[#121221] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-purple-600 to-indigo-800 rounded-full filter blur-3xl -translate-y-1/2"
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
            <span>Common Questions</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg text-gray-300 mb-6"
          >
            Everything you need to know about Cyber X Radar&apos;s security platform and how it protects your organization
          </motion.p>
          
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Animated radar scan effect */}
            <div className="absolute inset-0 -top-12 -left-12 w-full h-full opacity-30 pointer-events-none">
              <div className="relative w-1/2 h-1/2">
                <div className="absolute top-0 left-0 w-full h-full rounded-full border border-blue-500/30"></div>
                <motion.div
                  className="absolute top-0 left-0 w-full h-full rounded-full"
                  style={{ background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.5) 60%, rgba(59, 130, 246, 0) 100%)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="max-w-3xl mx-auto relative">
          {/* Diagonal line decoration */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0"></div>
          
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="mb-6"
            >
              <motion.button
                whileHover={{ x: 5 }}
                className="w-full text-left px-6 py-5 focus:outline-none flex justify-between items-center bg-gradient-to-r from-[#1A1A3A]/80 to-[#121232]/80 rounded-t-xl border border-indigo-900/30 shadow-lg backdrop-blur-sm"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center gap-3">
                  <FaQuestionCircle className="text-blue-400 text-lg flex-shrink-0" />
                  <h3 className="text-lg font-bold text-gray-100 group-hover:text-white">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-blue-900/30 w-8 h-8 rounded-full flex items-center justify-center text-blue-400 flex-shrink-0"
                >
                  <FaChevronDown />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-[#1A1A3A]/40 border-x border-b border-indigo-900/30 rounded-b-xl"
                  >
                    <div className="p-6 text-gray-300">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-b from-[#1A1A3A]/50 to-[#121232]/50 py-6 px-8 rounded-xl border border-indigo-900/20 shadow-xl max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mb-3">
              Still Have Questions?
            </h3>
            <p className="text-gray-400 mb-5">
              Our team is ready to answer any additional questions you might have about our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-6 py-3 rounded-md font-medium transition shadow-lg hover:shadow-blue-900/30 flex items-center justify-center gap-2"
              >
                <FaShieldAlt size={14} />
                <span>Contact Support</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-transparent border border-blue-500/30 hover:bg-blue-900/20 text-blue-300 px-6 py-3 rounded-md font-medium transition shadow-lg flex items-center justify-center gap-2"
              >
                <FaRadiation size={14} />
                <span>View Documentation</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
    </section>
  );
};

export default FAQ;
