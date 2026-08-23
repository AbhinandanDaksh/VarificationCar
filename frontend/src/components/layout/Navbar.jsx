import React from 'react';
import Link from 'next/link';
import { FiShield } from 'react-icons/fi';

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center transition-colors group-hover:bg-indigo-100">
              <FiShield className="w-5.5 h-5.5 text-indigo-600" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Veri<span className="text-indigo-600">Drive</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/features"
              className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        <div>
          <Link
            href="/support"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition"
          >
            Support
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
