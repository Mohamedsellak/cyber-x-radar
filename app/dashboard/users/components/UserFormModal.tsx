"use client";

import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaEdit, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

interface UserFormModalProps {
  user: User | null;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSave: (userData: any) => void;
}

export default function UserFormModal({ user, mode, onClose, onSave }: UserFormModalProps) {
  const [formData, setFormData] = useState({
    id: user?.id || 0,
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset form when user changes
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        password: '' // Don't populate password for security
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (mode === 'add' && !formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Failed to save user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 rounded-xl border border-indigo-900/50 shadow-2xl w-full max-w-lg"
      >
        <div className="p-6 border-b border-indigo-900/50 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {mode === 'add' ? (
              <>
                <FaUserPlus className="text-blue-400" />
                Add New Admin
              </>
            ) : (
              <>
                <FaEdit className="text-blue-400" />
                Edit Admin
              </>
            )}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-[#121232]/70 border ${errors.name ? 'border-red-500' : 'border-indigo-900/50'} rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-[#121232]/70 border ${errors.email ? 'border-red-500' : 'border-indigo-900/50'} rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password {mode === 'edit' && <span className="text-gray-500 text-xs">(Leave blank to keep current password)</span>}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-[#121232]/70 border ${errors.password ? 'border-red-500' : 'border-indigo-900/50'} rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-indigo-900/50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                mode === 'add' ? 'Create Admin' : 'Save Changes'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
