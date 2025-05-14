"use client";

import React, { useState, useEffect } from 'react';
import { FaRadiation, FaEnvelope, FaBuilding, FaUserAlt, FaComment, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type InquiryType = 'Sales' | 'Support' | 'Partnership';

interface FormData {
  name: string;
  email: string;
  inquiryType: InquiryType;
  company: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    inquiryType: 'Sales',
    company: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Add state to track client-side rendering for hydration-safe animations
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true after component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        inquiryType: 'Sales',
        company: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0A1F] to-[#121221] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }} 
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', delay: 2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-700 to-blue-500 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/3"
        ></motion.div>
      </div>
      
      {/* Cyber-themed grid pattern overlay */}
      <motion.div 
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07] pointer-events-none"
      ></motion.div>
      
      {/* Radar scanning circle in background */}
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
            className="w-full h-full rounded-full border-2 border-dashed border-blue-500/20"
          ></motion.div>
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border-2 border-dashed border-blue-500/10"
          ></motion.div>
        </div>
      </div>
      
      {/* Client-side only floating particles to prevent hydration errors */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div 
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-30"
              initial={{ 
                x: `${i * 6.5}%`, 
                y: `${i * 6}%`,
                scale: 0.5 + ((i % 5) * 0.1),
                opacity: 0.3
              }}
              animate={{ 
                y: [`${i * 6}%`, `${(i * 6) - 20}%`, `${i * 6}%`], 
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 10 + (i % 5),
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      )}
      
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
      
      {/* Contact Form Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl w-full relative perspective-1000 z-20"
      >
        {/* Enhanced glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-xl filter blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700 animate-pulse pointer-events-none"></div>
        
        <div className="relative">
          {/* Card highlight edge */}
          <div className="absolute inset-0 rounded-xl overflow-hidden z-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
          </div>
          
          <div className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 p-8 rounded-xl shadow-2xl border border-indigo-900/50 backdrop-blur-sm relative overflow-hidden z-10">
            {/* Top accent border */}
            <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-gradient-to-r from-blue-600/0 via-blue-600 to-blue-600/0"
              ></motion.div>
            </div>
            
            {/* Header */}
            <div className="text-center mb-8 relative">
              <div className="flex justify-center mb-4">
                <div className="relative w-16 h-16">
                  <div className="radar-container">
                    <div className="radar-background rounded-full"></div>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="radar-sweep"
                    ></motion.div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaEnvelope size={28} className="text-blue-400" />
                  </div>
                </div>
              </div>
              
              <motion.h2 
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-300% mb-2"
              >
                Send Us A Message
              </motion.h2>
              <p className="text-gray-400 text-sm">
                Get in touch with our team for any inquiries or support
              </p>
              
              {/* Decorative element */}
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto mt-3"></div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="relative group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-400 transition-colors duration-200 pointer-events-none">
                      <FaUserAlt size={16} />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      aria-label="Your name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-md border border-indigo-900/50 bg-[#1A1A2A]/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-inner focus:shadow-blue-900/20 relative z-10"
                    />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden">
                      <motion.div 
                        className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" 
                        animate={{ x: ['-100%', '400%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                  
                  {/* Error message */}
                  <AnimatePresence>
                    {errors.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 flex items-center"
                      >
                        <FaExclamationTriangle className="mr-1" size={12} />
                        {errors.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Email Field */}
                <div className="relative group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-400 transition-colors duration-200 pointer-events-none">
                      <FaEnvelope size={16} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-label="Your email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-md border border-indigo-900/50 bg-[#1A1A2A]/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-inner focus:shadow-blue-900/20 relative z-10"
                    />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden">
                      <motion.div 
                        className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" 
                        animate={{ x: ['-100%', '400%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                  
                  {/* Error message */}
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 flex items-center"
                      >
                        <FaExclamationTriangle className="mr-1" size={12} />
                        {errors.email}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Inquiry Type */}
                <div className="relative group">
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-300 mb-1">
                    Inquiry type <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-3 rounded-md border border-indigo-900/50 bg-[#1A1A2A]/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-inner focus:shadow-blue-900/20 appearance-none relative z-10"
                    >
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                      <option value="Partnership">Partnership</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden">
                      <motion.div 
                        className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" 
                        animate={{ x: ['-100%', '400%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Company Field */}
                <div className="relative group">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                    Company
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-400 transition-colors duration-200 pointer-events-none">
                      <FaBuilding size={16} />
                    </div>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      aria-label="Company name"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-md border border-indigo-900/50 bg-[#1A1A2A]/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-inner focus:shadow-blue-900/20 relative z-10"
                    />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden">
                      <motion.div 
                        className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" 
                        animate={{ x: ['-100%', '400%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message Field */}
              <div className="relative group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-500 group-hover:text-blue-400 transition-colors duration-200 pointer-events-none">
                    <FaComment size={16} />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    aria-label="Write your message"
                    placeholder="Write your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-md border border-indigo-900/50 bg-[#1A1A2A]/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-inner focus:shadow-blue-900/20 relative z-10 resize-none"
                  />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden">
                    <motion.div 
                      className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" 
                      animate={{ x: ['-100%', '400%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                  </div>
                </div>
                
                {/* Error message */}
                <AnimatePresence>
                  {errors.message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-xs mt-1 flex items-center"
                    >
                      <FaExclamationTriangle className="mr-1" size={12} />
                      {errors.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Status messages */}
              <AnimatePresence>
                {submitError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="p-3 bg-red-900/30 border border-red-700/30 text-red-400 rounded-md flex items-center gap-2"
                  >
                    <FaExclamationTriangle size={16} />
                    <p>{submitError}</p>
                  </motion.div>
                )}
                
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="p-3 bg-green-900/30 border border-green-700/30 text-green-400 rounded-md flex items-center gap-2"
                  >
                    <FaCheck size={16} />
                    <p>Your message has been sent successfully! We'll get back to you soon.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Submit Button */}
              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-20"
                >
                  {/* Button background with gradient */}
                  <motion.div 
                    animate={{ 
                      background: isSubmitting ? 
                        'linear-gradient(to right, #3b82f6, #4f46e5)' : 
                        ['linear-gradient(to right, #3b82f6, #4f46e5)', 'linear-gradient(to right, #2563eb, #4338ca)', 'linear-gradient(to right, #3b82f6, #4f46e5)'] 
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    className="absolute inset-0 transition-all duration-200 group-hover:brightness-110 pointer-events-none"
                    aria-hidden="true"
                  ></motion.div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 pointer-events-none" aria-hidden="true">
                    <motion.div 
                      className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12" 
                      animate={{ x: ['-100%', '400%'] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    ></motion.div>
                  </div>
                  
                  {/* Button text and icon */}
                  {isSubmitting ? (
                    <div className="relative flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-center">
                      <FaRadiation className="mr-2" />
                      Send Message
                    </div>
                  )}
                </motion.button>
              </div>
            </form>
            
            {/* Other Contact Methods - Fixed responsive layout */}
            <div className="mt-8 pt-6 border-t border-indigo-900/30">
              <h3 className="text-gray-300 text-sm font-medium mb-4">Other ways to reach us:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-3 bg-[#1A1A2A]/50 rounded-lg border border-indigo-900/30 flex items-center">
                  <div className="w-8 h-8 flex-shrink-0 bg-blue-900/50 rounded-full flex items-center justify-center mr-3">
                    <FaEnvelope className="text-blue-400" size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="text-sm text-blue-400 truncate">support@cyberxradar.com</div>
                  </div>
                </div>
                <div className="p-3 bg-[#1A1A2A]/50 rounded-lg border border-indigo-900/30 flex items-center">
                  <div className="w-8 h-8 flex-shrink-0 bg-indigo-900/50 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="text-sm text-indigo-400 truncate">+1 (888) CYBER-XR</div>
                  </div>
                </div>
                <div className="p-3 bg-[#1A1A2A]/50 rounded-lg border border-indigo-900/30 flex items-center sm:col-span-2 lg:col-span-1">
                  <div className="w-8 h-8 flex-shrink-0 bg-cyan-900/50 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Live Chat</div>
                    <div className="text-sm text-cyan-400 truncate">Available 24/7</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative elements */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center opacity-20 pointer-events-none">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
      </motion.div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
      
      {/* Add animations */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        
        .bg-300% {
          background-size: 300% 100%;
        }
        
        .radar-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,62,115,0.6) 0%, rgba(13,41,73,0.4) 50%, rgba(10,10,31,0.2) 100%);
          overflow: hidden;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.1), inset 0 0 20px rgba(59, 130, 246, 0.1);
        }
        
        .radar-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(13,41,73,0.2) 0%, rgba(10,10,31,0.1) 100%);
        }
        
        .radar-sweep {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          clip-path: polygon(50% 50%, 100% 50%, 100% 0, 0 0, 0 50%);
          background: linear-gradient(90deg, rgba(56,189,248,0.1) 0%, rgba(99,102,241,0.4) 100%);
          filter: drop-shadow(0 0 8px rgba(56,189,248,0.3));
        }
      `}</style>
    </div>
  );
}
