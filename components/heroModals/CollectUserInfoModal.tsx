"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCheck, FaSpinner } from 'react-icons/fa';

// Define UserInfoData interface directly in the component
interface UserInfoData {
  name: string;
  email: string;
  phone: string;
}

interface CollectUserInfoModalProps {
  domain: string;
  isOpen: boolean;
  onClose: () => void;
  onCompleted: () => void;
}

const CollectUserInfoModal = ({ domain, isOpen, onClose, onCompleted }: CollectUserInfoModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', phone: '' };
    
    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    
    // Validate phone (optional but must be valid if provided)
    if (phone.trim() && !/^\+?[0-9\s\-()]{8,}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  // Submit user information directly to API
  const submitUserInfo = async (userData: UserInfoData) => {
    try {
      const response = await fetch('https://scan.cyberxradar.com/server/api/scans/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain_name: domain,
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit user data');
      }
      
      const data = await response.json();
      
      if (data.status !== 'success') {
        throw new Error(data.message || 'Failed to submit user data');
      }
      
      return data;
    } catch (error) {
      console.error('Error submitting user data:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitUserInfo({ name, email, phone });
      setSubmitSuccess(true);
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      
      // Auto-close after success
      setTimeout(() => {
        onCompleted(); // This will remove blur and hide the modal
      }, 2000);
    } catch (error) {
      console.error('Error submitting user data:', error);
      setErrors({ 
        ...errors, 
        name: 'Failed to submit data. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a debug log to verify the onClose is called
  const handleClose = () => {
    console.log('CollectUserInfoModal: handleClose called');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4" /* Higher z-index to ensure it's on top */
    >
      <div className="fixed inset-0 bg-black/50" onClick={handleClose}></div> {/* Use handleClose here */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: isOpen ? 1 : 0.9, y: isOpen ? 0 : 20 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 rounded-xl border border-indigo-800/50 shadow-2xl max-w-md w-full overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success state */}
        {submitSuccess ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <FaCheck className="text-green-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-green-400 mb-2">Information Submitted</h3>
            <p className="text-gray-300 mb-6">Thank you for providing your details. Your full scan results are ready to view.</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCompleted}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-medium rounded-md transition-all duration-200 mx-auto"
            >
              View Full Results
            </motion.button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-indigo-900/50">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Complete Your Scan
                </h3>
                {/* Update close button to use handleClose */}
                <button 
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/80 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 mb-6">
                To complete your scan of <span className="text-blue-400 font-medium">{domain}</span> and view the complete results, please provide your contact information below:
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Your Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      className={`w-full pl-10 pr-3 py-3 rounded-md border ${errors.name ? 'border-red-500/50 bg-red-900/10' : 'border-indigo-900/50 bg-[#1A1A2A]'} text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      className={`w-full pl-10 pr-3 py-3 rounded-md border ${errors.email ? 'border-red-500/50 bg-red-900/10' : 'border-indigo-900/50 bg-[#1A1A2A]'} text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Phone Number (Optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-500" />
                    </div>
                    <input
                      type="tel"
                      className={`w-full pl-10 pr-3 py-3 rounded-md border ${errors.phone ? 'border-red-500/50 bg-red-900/10' : 'border-indigo-900/50 bg-[#1A1A2A]'} text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Scan
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Your information is secure and will only be used to deliver scan results. We never share your data with third parties.
              </p>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CollectUserInfoModal;
