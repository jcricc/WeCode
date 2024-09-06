'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in app directory
import { supabase } from '../lib/supabase';
import DropdownMenu from './DropdownMenu';

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUser();
  }, []);

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center shadow-lg">
      <Link href="/" className="flex items-center">
        <Image src="/wecode-logo.svg" alt="WeCode Logo" width={32} height={32} className="h-8 mr-4" />
        <h1 className="text-xl font-bold">WeCode</h1>
      </Link>
      <nav className="flex space-x-4">
        <Link href="/" className="hover:underline mt-2">
          Home
        </Link>
        <Link href="/courses" className="hover:underline mt-2">
          Courses
        </Link>
        <Link href="/about" className="hover:underline mt-2">
          About Us
        </Link>
        <Link href="/pricing" className="hover:underline mt-2">
          Pricing
        </Link>
        <Link href="/contact" className="hover:underline mt-2">
          Contact
        </Link>
        {!isLoggedIn ? (
          <>
            <Link href="/auth/signup" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
              Sign Up
            </Link>
            <Link href="/auth/login" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
              Login
            </Link>
          </>
        ) : (
          <DropdownMenu />
        )}
      </nav>
    </header>
  );
};

export default Header;

