'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in app directory
import { supabase } from '../lib/supabase';

const DropdownMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-orange-500 text-white py-2 px-4 rounded"
      >
        Account
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
          <a href="/account/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Account Settings</a>
          <a href="/account/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</a>
          <a href="/account/billing" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Billing</a>
          <a href="/account/support" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Support</a>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
