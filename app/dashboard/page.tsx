"use client";

import React from 'react';
import { 
  FaUsers, FaEnvelope, FaKey, FaGlobe, 
  FaArrowUp, FaArrowDown, FaEye, FaShieldAlt 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function DashboardOverview() {
  // Mock data for dashboard
  const stats = [
    { title: 'Total Users', value: '2,854', icon: <FaUsers />, change: '+12%', color: 'blue' },
    { title: 'Messages', value: '348', icon: <FaEnvelope />, change: '+5%', color: 'indigo' },
    { title: 'API Tokens', value: '152', icon: <FaKey />, change: '+18%', color: 'purple' },
    { title: 'Domain Scans', value: '1,258', icon: <FaGlobe />, change: '-3%', color: 'cyan' },
  ];
  
  const recentScans = [
    { domain: 'microsoft.com', score: 92, status: 'Safe', date: '2023-11-15' },
    { domain: 'example.com', score: 48, status: 'Warning', date: '2023-11-14' },
    { domain: 'testdomain.io', score: 22, status: 'Critical', date: '2023-11-14' },
    { domain: 'securesite.net', score: 85, status: 'Safe', date: '2023-11-13' },
    { domain: 'compromised.com', score: 12, status: 'Critical', date: '2023-11-12' },
  ];
  
  const recentMessages = [
    { name: 'John Smith', email: 'john@example.com', type: 'Support', date: '2023-11-15' },
    { name: 'Sarah Johnson', email: 'sarah@company.co', type: 'Sales', date: '2023-11-14' },
    { name: 'Mike Williams', email: 'mike@domain.io', type: 'Partnership', date: '2023-11-13' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
          Dashboard Overview
        </h1>
        <div className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-6 rounded-xl border border-indigo-900/50 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-400 mb-1">{stat.title}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-900/30 text-${stat.color}-400`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                {stat.change.startsWith('+') ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                {stat.change}
              </span>
              <span className="text-xs text-gray-400 ml-2">vs last week</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Domain Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg overflow-hidden"
        >
          <div className="p-4 border-b border-indigo-900/50">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FaGlobe className="text-blue-400" />
              Recent Domain Scans
            </h2>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-400 border-b border-indigo-900/30">
                    <th className="py-2 px-4 text-left">Domain</th>
                    <th className="py-2 px-4 text-left">Score</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan, index) => (
                    <tr key={index} className="border-b border-indigo-900/20 hover:bg-indigo-900/20 transition-colors">
                      <td className="py-3 px-4 text-sm">{scan.domain}</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                scan.score > 70 ? 'bg-green-500' : 
                                scan.score > 40 ? 'bg-yellow-500' : 
                                'bg-red-500'
                              }`}
                              style={{ width: `${scan.score}%` }}
                            ></div>
                          </div>
                          <span>{scan.score}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          scan.status === 'Safe' ? 'bg-green-900/30 text-green-400 border border-green-700/30' :
                          scan.status === 'Warning' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30' :
                          'bg-red-900/30 text-red-400 border border-red-700/30'
                        }`}>
                          {scan.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">{scan.date}</td>
                      <td className="py-3 px-4 text-sm">
                        <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors">
                          <FaEye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View All Domain Scans
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg overflow-hidden"
        >
          <div className="p-4 border-b border-indigo-900/50">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FaEnvelope className="text-indigo-400" />
              Recent Messages
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {recentMessages.map((message, index) => (
                <div key={index} className="p-3 border border-indigo-900/30 rounded-lg hover:bg-indigo-900/20 transition-colors">
                  <div className="flex justify-between">
                    <div className="font-medium">{message.name}</div>
                    <div className="text-xs text-gray-400">{message.date}</div>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{message.email}</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs px-2 py-0.5 bg-indigo-900/30 text-indigo-400 rounded-full border border-indigo-700/30">
                      {message.type}
                    </span>
                    <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                      View Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View All Messages
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Security Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg overflow-hidden"
      >
        <div className="p-4 border-b border-indigo-900/50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaShieldAlt className="text-blue-400" />
            System Security Status
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#121232]/80 rounded-lg border border-indigo-900/30">
              <div className="text-sm text-gray-400 mb-2">API Security</div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl font-bold">96%</div>
                <span className="text-xs text-green-400 flex items-center">
                  <FaArrowUp size={10} className="mr-1" />
                  2%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-[#121232]/80 rounded-lg border border-indigo-900/30">
              <div className="text-sm text-gray-400 mb-2">User Authentication</div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl font-bold">88%</div>
                <span className="text-xs text-red-400 flex items-center">
                  <FaArrowDown size={10} className="mr-1" />
                  3%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-[#121232]/80 rounded-lg border border-indigo-900/30">
              <div className="text-sm text-gray-400 mb-2">Database Security</div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl font-bold">94%</div>
                <span className="text-xs text-green-400 flex items-center">
                  <FaArrowUp size={10} className="mr-1" />
                  1%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
