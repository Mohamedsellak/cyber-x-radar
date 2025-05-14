"use client";

import { useState, useEffect } from 'react';
import { FaLock, FaUserShield, FaRadiation } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Authentication logic would go here
      console.log('Logging in with:', { email, password, rememberMe });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard on success
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0A1F] to-[#121221] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Advanced hexagon network pattern overlay - make non-interactive */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2) rotate(0)">
              <polygon points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.4,43.7 12.4,29.2" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.2"/>
              <polygon points="24.8,0 37.3,7.3 37.3,21.7 24.8,29 12.4,21.7 12.4,7.3" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.2"/>
              <polygon points="0,22 12.4,29.2 12.4,43.7 0,50.9 -12.4,43.7 -12.4,29.2" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.2"/>
              <polygon points="49.7,22 62.1,29.2 62.1,43.7 49.7,50.9 37.3,43.7 37.3,29.2" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>
      
      {/* Digital circuit board lines - make non-interactive */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="scale(2) rotate(0)">
              <path d="M0 50h50v-10h10v-30h40" fill="none" stroke="#3B82F6" strokeWidth="0.5" />
              <path d="M0 20h30v30h-10v30h80" fill="none" stroke="#3B82F6" strokeWidth="0.5" />
              <path d="M20 0v30h30v30h50" fill="none" stroke="#3B82F6" strokeWidth="0.5" />
              <circle cx="20" cy="30" r="2" fill="#3B82F6" opacity="0.5"/>
              <circle cx="50" cy="40" r="2" fill="#3B82F6" opacity="0.5"/>
              <circle cx="70" cy="20" r="2" fill="#3B82F6" opacity="0.5"/>
              <circle cx="30" cy="80" r="2" fill="#3B82F6" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
      
      {/* Enhanced background effects - make non-interactive */}
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
        
        {/* Client-side only particles - Fix for hydration mismatch */}
        {isClient && (
          <>
            {/* Advanced particle system - ensure non-interactive */}
            <div className="particle-system absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div 
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-30"
                  initial={{ 
                    x: `${i * 3.33}%`, 
                    y: `${(i * 7) % 100}%`, 
                    scale: 0.5 + ((i % 5) * 0.1),
                    opacity: 0.3
                  }}
                  animate={{ 
                    y: [`${(i * 7) % 100}%`, `${((i * 7) % 100) - 20}%`, `${(i * 7) % 100}%`], 
                    opacity: [0.1, 0.5, 0.1],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 10 + (i % 5),
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
            
            {/* Animated security data stream - ensure non-interactive */}
            <div className="data-stream absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`stream-${i}`}
                  className="absolute bg-blue-400 h-px"
                  style={{ 
                    left: `${i * 5}%`,
                    width: `${100 + (i * 5)}px`,
                    top: `${(i * 5) % 100}%`,
                    opacity: 0.2 + ((i % 10) * 0.02)
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 8 + (i % 5),
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Cyber-themed grid pattern overlay - make non-interactive */}
      <motion.div 
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07] pointer-events-none"
      ></motion.div>
      
      {/* Radar scanning circle in background - ensure non-interactive */}
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
          
          {/* Add multiple radar rings with different speeds */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              animate={{ scale: [1, 1.1 + (i * 0.1), 1] }}
              transition={{ 
                duration: 8 + (i * 2), 
                repeat: Infinity, 
                repeatType: 'reverse',
                delay: i * 1.5
              }}
              className="absolute inset-0 rounded-full border border-blue-500/10"
            ></motion.div>
          ))}
          
          {/* Client-side only blips */}
          {isClient && (
            <>
              {/* Digital radar "blips" */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`blip-${i}`}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 0,
                    scale: 0.5
                  }}
                  animate={{ 
                    x: `${Math.cos(Math.PI * 2 * (i / 6)) * 40}%`,
                    y: `${Math.sin(Math.PI * 2 * (i / 6)) * 40}%`,
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.5, 0.5]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full blur-[1px]"
                ></motion.div>
              ))}
            </>
          )}
        </div>
      </div>
      
      {/* Floating particles effect - client-side only render */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div 
              key={`float-${i}`}
              className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-30"
              initial={{ 
                x: `${i * 6.5}%`, 
                y: `${(i * 6) % 100}%`, 
                scale: 0.5 + ((i % 5) * 0.1),
                opacity: 0.3
              }}
              animate={{ 
                y: [`${(i * 6) % 100}%`, `${((i * 6) % 100) - 20}%`, `${(i * 6) % 100}%`], 
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
      
      {/* Top decorative elements - ensure non-interactive */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30"></div>
        <div className="flex justify-between px-4 h-10 opacity-30">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`bar-${i}`}
              initial={{ height: 4 }}
              animate={{ height: [4, 12, 4] }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-px bg-blue-500/50"
            ></motion.div>
          ))}
        </div>
      </div>
      
      {/* Login Card - ensure it's above all decorative elements */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-md w-full relative perspective-1000 z-20"
      >
        {/* Multiple layered glows - ensure non-interactive */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl filter blur-xl opacity-20 animate-pulse pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-600/10 rounded-xl filter blur-3xl opacity-30 animate-pulse animation-delay-1000 pointer-events-none"></div>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-xl opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="relative">
          {/* Card highlight edge - ensure non-interactive */}
          <div className="absolute inset-0 rounded-xl overflow-hidden z-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
          </div>
          
          <div className="bg-gradient-to-b from-[#1A1A3A]/95 to-[#121232]/95 p-8 rounded-xl shadow-2xl border border-indigo-900/50 backdrop-blur-sm relative overflow-hidden z-10">
            {/* Top accent border - ensure non-interactive */}
            <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-gradient-to-r from-blue-600/0 via-blue-600 to-blue-600/0"
              ></motion.div>
            </div>
            
            {/* Background pattern - ensure non-interactive */}
            <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
            
            {/* Improved radar in header - ensure it's accessible */}
            <div className="flex justify-center mb-8 relative">
              <div className="relative w-24 h-24 pointer-events-none">
                {/* Enhanced glow around radar */}
                <div className="absolute inset-0 rounded-full blur-md bg-blue-500/20 animate-pulse"></div>
                
                <div className="radar-container relative">
                  <div className="radar-background rounded-full"></div>
                  
                  {/* Multiple radar sweeps for more dynamic effect */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="radar-sweep"
                  ></motion.div>
                  
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                      background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0) 100%)',
                      transform: 'rotate(180deg)'
                    }}
                  ></motion.div>
                  
                  {/* Radar data dots */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      initial={{ 
                        opacity: 0,
                        x: '50%',
                        y: '50%'
                      }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        x: `${50 + 35 * Math.cos(Math.PI * 2 * (i/8))}%`,
                        y: `${50 + 35 * Math.sin(Math.PI * 2 * (i/8))}%`
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <FaUserShield size={32} className="text-blue-400 drop-shadow-lg" />
                  </motion.div>
                </div>
                
                {/* Enhanced pulsing rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                    className="absolute inset-0 rounded-full border border-blue-500/20"
                  ></motion.div>
                ))}
              </div>
            </div>
            
            {/* Enhanced header text */}
            <div className="text-center mb-8 relative">
              <motion.h2 
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-300% mb-2"
              >
                Admin Control Panel
              </motion.h2>
              <p className="text-gray-400 text-sm">
                Secure authentication required to access system controls
              </p>
              
              {/* Decorative element */}
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto mt-3"></div>
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mb-6 p-3 bg-red-900/30 border border-red-700/30 text-red-400 rounded-md flex items-center gap-2"
                >
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-red-900/50 flex items-center justify-center">
                    <FaLock className="text-red-400" />
                  </div>
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <form className="space-y-6 relative z-20" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Email input field - improve focus and hover states */}
                <div className="relative group">
                  {/* Background/focus effect - ensure non-interactive */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-400 transition-all duration-200 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-label="Admin email address"
                    className="w-full pl-12 pr-4 py-4 rounded-md border border-indigo-900/50 bg-[#1A1A2A]/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-inner focus:shadow-blue-900/20 relative z-10"
                    placeholder="Admin email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  
                  {/* Shimmer effect - ensure non-interactive */}
                  <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 overflow-hidden">
                    <motion.div 
                      className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" 
                      animate={{ x: ['-100%', '400%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                  </div>
                  
                  {/* Active typing indicator - ensure non-interactive */}
                  {email && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    </div>
                  )}
                </div>
                
                {/* Password input field - improve focus and hover states */}
                <div className="relative group">
                  {/* Background/focus effect - ensure non-interactive */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-400 transition-all duration-200 pointer-events-none">
                    <FaLock size={18} aria-hidden="true" />
                  </div>
                  
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    aria-label="Admin password"
                    className="w-full pl-12 pr-4 py-4 rounded-md border border-indigo-900/50 bg-[#1A1A2A]/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-inner focus:shadow-blue-900/20 relative z-10"
                    placeholder="Admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                  {/* Shimmer effect - ensure non-interactive */}
                  <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 overflow-hidden">
                    <motion.div 
                      className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" 
                      animate={{ x: ['-100%', '400%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                  </div>
                  
                  {/* Active typing indicator - ensure non-interactive */}
                  {password && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced remember me checkbox - improve focus states */}
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    aria-label="Remember this device"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-[#121232] relative z-10"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  
                  {/* Focus state - ensure non-interactive */}
                  <motion.div 
                    animate={{ opacity: rememberMe ? 1 : 0 }}
                    className="absolute w-4 h-4 rounded pointer-events-none"
                    style={{ boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.5)' }}
                    aria-hidden="true"
                  ></motion.div>
                  
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                    Remember this device
                  </label>
                  
                  {/* Selected animation - ensure non-interactive */}
                  <AnimatePresence>
                    {rememberMe && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute left-0 top-0 w-4 h-4 flex items-center justify-center pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="absolute inset-0.5 bg-blue-500 rounded-sm"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Enhanced button - improve focus and hover states */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  aria-label={isLoading ? "Authenticating..." : "Access Admin Panel"}
                  className="relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-20"
                >
                  {/* Button background gradient - ensure non-interactive */}
                  <motion.div 
                    animate={{ 
                      background: isLoading ? 
                        'linear-gradient(to right, #3b82f6, #4f46e5)' : 
                        ['linear-gradient(to right, #3b82f6, #4f46e5)', 'linear-gradient(to right, #2563eb, #4338ca)', 'linear-gradient(to right, #3b82f6, #4f46e5)'] 
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    className="absolute inset-0 transition-all duration-200 group-hover:brightness-110 pointer-events-none"
                    aria-hidden="true"
                  ></motion.div>
                  
                  {/* Shimmer effect - ensure non-interactive */}
                  <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 pointer-events-none" aria-hidden="true">
                    <motion.div 
                      className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12" 
                      animate={{ x: ['-100%', '400%'] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    ></motion.div>
                  </div>
                  
                  {/* Button text and icon */}
                  {isLoading ? (
                    <div className="relative flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <motion.span
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Authenticating...
                      </motion.span>
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                        aria-hidden="true"
                      >
                        <FaRadiation className="text-white" />
                      </motion.div>
                      Access Admin Panel
                    </div>
                  )}
                </motion.button>
              </div>
            </form>
            
            {/* Security info banner */}
            <div className="mt-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-indigo-900/10 rounded-md pointer-events-none"></div>
              <div className="border border-blue-900/30 rounded-md px-4 py-3 relative">
                <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
                  <div className="relative w-3 h-3 flex-shrink-0 pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-blue-600/30"></div>
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-blue-600/30"
                    ></motion.div>
                    <div className="absolute inset-0.5 rounded-full bg-blue-400 animate-pulse"></div>
                  </div>
                  <motion.span 
                    animate={{ opacity: [1, 0.8, 1] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror' }}
                    className="font-medium text-blue-400"
                  >
                    SECURE ACCESS POINT
                  </motion.span>
                </div>
                <p className="text-xs text-gray-400">
                  This login portal is protected with enterprise-grade encryption. All connection attempts are monitored and logged for security purposes.
                </p>
              </div>
            </div>
            
            {/* Bottom decorative elements */}
            <div className="mt-6 flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500/50 pointer-events-none"
                ></motion.div>
                <span className="group relative">
                  Protected by Cyber X Radar
                  <span className="absolute left-0 -bottom-5 w-full h-0.5 bg-blue-500/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-blue-500/50 pointer-events-none"></div>
                <span>v3.5.8</span>
                <div className="h-1 w-1 rounded-full bg-blue-500/50 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative elements - ensure non-interactive */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center opacity-20 pointer-events-none">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
        
        {/* Security scan lines - ensure non-interactive */}
        <motion.div 
          initial={{ top: '-100%' }}
          animate={{ top: ['100%', '-10%'] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'loop', repeatDelay: 5 }}
          className="absolute inset-x-0 h-[1px] bg-blue-500/20 z-10 pointer-events-none"
          aria-hidden="true"
        ></motion.div>
      </motion.div>
      
      {/* Bottom decorative line - ensure non-interactive */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-700 to-transparent opacity-30 pointer-events-none"></div>
      
      {/* Add enhanced animations and accessibility */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .bg-300% {
          background-size: 300% 100%;
        }
        
        .group-hover\\:animate-shimmer {
          animation: shimmer 1.5s infinite;
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
        
        /* Make sure decorative elements don't interfere with interaction */
        .pointer-events-none {
          pointer-events: none !important;
        }
        
        /* Improve focus visibility for keyboard users */
        button:focus, input:focus, a:focus {
          outline: 2px solid rgba(59, 130, 246, 0.6);
          outline-offset: 2px;
        }
        
        /* Make form elements accessible above decorative elements */
        form, input, button, a {
          position: relative;
          z-index: 20;
        }
      `}</style>
    </div>
  );
}
