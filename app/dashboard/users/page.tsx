"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaUserPlus, FaSearch, FaEdit, 
  FaTrash, FaSyncAlt, FaUser
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import UserFormModal from './components/UserFormModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// Define interface for user form data
interface UserFormData {
  id: number;
  name: string;
  email: string;
  password: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formModalMode, setFormModalMode] = useState<'add' | 'edit'>('add');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial data fetch
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get the auth token
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token not found');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch('https://scan.cyberxradar.com/server/api/users/get.php', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setUsers(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  // Create/Update user
  const handleSaveUser = async (userData: UserFormData) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const isEdit = formModalMode === 'edit';
      const url = 'https://scan.cyberxradar.com/server/api/users/' + (isEdit ? 'update.php' : 'create.php');
      
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Refresh the user list
        fetchUsers();
        setIsFormModalOpen(false);
      } else {
        alert(data.message || `Failed to ${isEdit ? 'update' : 'create'} user`);
      }
    } catch (err) {
      console.error(`Error ${formModalMode === 'edit' ? 'updating' : 'creating'} user:`, err);
      alert('Failed to connect to the server');
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(`https://scan.cyberxradar.com/server/api/users/delete.php?id=${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Remove the user from state
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      } else {
        alert(data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to connect to the server');
    } finally {
      setIsDeleting(false);
    }
  };

  // Add new user
  const handleAddUser = () => {
    setSelectedUser(null);
    setFormModalMode('add');
    setIsFormModalOpen(true);
  };

  // Edit user
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormModalMode('edit');
    setIsFormModalOpen(true);
  };

  // Show delete confirmation
  const showDeleteConfirmation = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Filter and search users
  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
        <div className="flex gap-2">
          <button
            onClick={fetchUsers}
            className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
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
      
      {/* Loading state */}
      {isLoading && (
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-indigo-900/50 shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading users...</p>
        </div>
      )}
      
      {/* Error state */}
      {error && !isLoading && (
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 rounded-xl border border-red-900/50 shadow-lg p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Users table */}
      {!isLoading && !error && (
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
                    <td className="py-3 px-4 text-gray-400 text-sm">{user.created_at}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{user.updated_at || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="p-1 text-blue-400 hover:text-blue-300 transition-colors" 
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        
                        <button 
                          onClick={() => showDeleteConfirmation(user)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
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
      )}
      
      {/* User stats */}
      {!isLoading && !error && (
        <div className="bg-gradient-to-b from-[#1A1A3A]/80 to-[#121232]/80 p-4 rounded-xl border border-indigo-900/50 shadow-lg">
          <div className="text-sm text-gray-400 mb-1">Total Admin Users</div>
          <div className="text-2xl font-bold">{users.length}</div>
        </div>
      )}
      
      {/* User form modal */}
      <AnimatePresence>
        {isFormModalOpen && (
          <UserFormModal
            user={selectedUser}
            mode={formModalMode}
            onClose={() => setIsFormModalOpen(false)}
            onSave={handleSaveUser}
          />
        )}
      </AnimatePresence>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {isDeleteModalOpen && userToDelete && (
          <DeleteConfirmationModal
            userName={userToDelete.name}
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteUser}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
