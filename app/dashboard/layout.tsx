"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  FaRadiation, FaTachometerAlt, FaUsers, FaEnvelope, 
  FaKey, FaGlobe, FaBars, FaTimes,
  FaSignOutAlt, FaBell, FaSearch, FaCog, FaUser
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Simplified navigation items based on data models
  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Admin Users', href: '/dashboard/users', icon: <FaUsers /> },
    { name: 'Contact Messages', href: '/dashboard/contacts', icon: <FaEnvelope /> },
    { name: 'API Tokens', href: '/dashboard/tokens', icon: <FaKey /> },
    { name: 'Scan History', href: '/dashboard/scans', icon: <FaGlobe /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A1F] to-[#121221] text-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-[#1A1A3A]/90 border border-indigo-900/50 rounded-lg shadow-lg backdrop-blur-sm"
        >
          {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 border-r border-indigo-900/50 shadow-xl">
              {renderSidebarContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className={`fixed top-0 left-0 bottom-0 z-30 hidden lg:block transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 border-r border-indigo-900/50 shadow-xl">
          {renderSidebarContent()}
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top header */}
        <header className="sticky top-0 z-20 bg-[#1A1A3A]/80 backdrop-blur-md border-b border-indigo-900/50 shadow-md">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="hidden lg:block text-gray-400 hover:text-white"
              >
                <FaBars size={20} />
              </button>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaBell size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
              </div>
              <div className="relative">
                <FaCog size={20} className="text-gray-400 hover:text-white cursor-pointer" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <FaUser size={14} />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium">Admin User</div>
                  <div className="text-xs text-gray-400">Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );

  function renderSidebarContent() {
    return (
      <>
        <div className="p-4">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-3 py-2"
          >
            <div className="relative w-8 h-8 flex-shrink-0">
              <div className="radar-container rounded-full">
                <div className="radar-background rounded-full"></div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="radar-sweep"
                ></motion.div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaRadiation size={14} className="text-blue-400" />
              </div>
            </div>
            {(sidebarOpen || mobileMenuOpen) && (
              <div>
                <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Cyber X Radar
                </div>
                <div className="text-xs text-gray-400">Admin Dashboard</div>
              </div>
            )}
          </Link>
        </div>

        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' 
                        : 'text-gray-400 hover:text-white hover:bg-[#1E1E3A]'
                    }`}
                  >
                    <span className={`text-lg ${isActive ? 'text-blue-400' : ''}`}>{item.icon}</span>
                    {(sidebarOpen || mobileMenuOpen) && (
                      <span>{item.name}</span>
                    )}
                    {isActive && sidebarOpen && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-indigo-900/50 pt-4">
            <Link
              href="/logout"
              className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <FaSignOutAlt />
              {(sidebarOpen || mobileMenuOpen) && (
                <span>Logout</span>
              )}
            </Link>
          </div>
        </div>
        
        <style jsx>{`
          .radar-container {
            position: relative;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(16,62,115,0.6) 0%, rgba(13,41,73,0.4) 50%, rgba(10,10,31,0.2) 100%);
            overflow: hidden;
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
          }
        `}</style>
      </>
    );
  }
}
