'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/90 shadow-md border-b border-blue-100 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center h-16" onClick={closeMenu}>
            <img 
              src="/images/logo.png" 
              alt="ConneKtX Logo" 
              className="h-8 sm:h-10 md:h-12 w-auto max-h-14 inline-block mr-2" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link 
              href="/" 
              className="text-blue-700 hover:text-blue-500 font-semibold transition-colors duration-200 px-2 py-1 rounded-md hover:bg-blue-50"
            >
              Home
            </Link>
            <Link 
              href="/blogs" 
              className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200 px-2 py-1 rounded-md hover:bg-blue-50"
            >
              Blogs
            </Link>
            <Link 
              href="/categories" 
              className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200 px-2 py-1 rounded-md hover:bg-blue-50"
            >
              Categories
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-6 h-6 flex flex-col justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-blue-600 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-0.5' : ''
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-blue-600 transition-all duration-300 mt-1 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-blue-600 transition-all duration-300 mt-1 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/95 ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 space-y-2 border-t border-blue-100">
            <Link
              href="/"
              onClick={closeMenu}
              className="block px-4 py-3 text-blue-700 hover:text-blue-500 font-semibold transition-colors duration-200 hover:bg-blue-50 rounded-md mx-2"
            >
              Home
            </Link>
            <Link
              href="/blogs"
              onClick={closeMenu}
              className="block px-4 py-3 text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200 hover:bg-blue-50 rounded-md mx-2"
            >
              Blogs
            </Link>
            <Link
              href="/categories"
              onClick={closeMenu}
              className="block px-4 py-3 text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200 hover:bg-blue-50 rounded-md mx-2"
            >
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}