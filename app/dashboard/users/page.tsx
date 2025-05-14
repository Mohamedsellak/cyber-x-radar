"use client";

import React, { useState } from 'react';
import { 
  FaUsers, FaUserPlus, FaSearch, FaEdit, 
  FaTrash, FaCheck, FaTimes, FaUser
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserManagement() {
  // Mock users data
  const initialUsers: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@cyberxradar.com', createdAt: '2023-10-15 08:30:42', updatedAt: '2023-11-15 10:22:10' },
    { id: 2, name: 'John Smith', email: 'john@example.com', createdAt: '2023-11-01 14:22:10', updatedAt: '2023-11-14 14:22:10' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah@company.co', createdAt: '2023-11-05 09:45:33', updatedAt: '2023-11-13 09:45:33' },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Filter and search users
  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Add new user
  const handleAddUser = () => {
    setSelectedUser(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  // Edit user
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // Delete user
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    setConfirmDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center gap-2">
            <FaUsers className="text-blue-400" />
            Admin Users
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage administrator accounts</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddUser}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaUserPlus />
          Add New Admin
        </motion.button>
      </div>
      
      {/* Search */}
      <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 pl-10 pr-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Users table */}
      <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-indigo-900/30">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-left">Updated At</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-indigo-900/20 hover:bg-indigo-900/20 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <FaUser size={14} />
                    </div>
                    {user.name}
                  </td>
                  <td className="py-3 px-4 text-gray-400">{user.email}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{user.createdAt}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{user.updatedAt}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-1 text-blue-400 hover:text-blue-300 transition-colors" 
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>
                      
                      {confirmDeleteId === user.id ? (
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            title="Confirm"
                          >
                            <FaCheck size={16} />
                          </button>
                          <button 
                            onClick={() => setConfirmDeleteId(null)}
                            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                            title="Cancel"
                          >
                            <FaTimes size={16} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setConfirmDeleteId(user.id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-400">No users found matching your search</p>
          </div>
        )}
      </div>
      
      {/* User stats */}
      <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
        <div className="text-sm text-gray-400 mb-1">Total Admin Users</div>
        <div className="text-2xl font-bold">{users.length}</div>
      </div>
      
      {/* User form modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              <div className="p-6 border-b border-indigo-900/50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {modalMode === 'add' ? (
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
              </div>
              
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={selectedUser?.name || ''}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={selectedUser?.email || ''}
                    />
                  </div>
                  
                  {modalMode === 'add' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        className="bg-[#121232]/70 border border-indigo-900/50 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </form>
              </div>
              
              <div className="p-6 border-t border-indigo-900/50 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg"
                >
                  {modalMode === 'add' ? 'Create Admin' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
