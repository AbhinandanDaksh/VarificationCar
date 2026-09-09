import React from 'react';
import Link from 'next/link';
import { FiShield } from 'react-icons/fi';

const Navbar = () => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-[#EDE0DA] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[#FAF0ED] border border-[#F3DDD5] flex items-center justify-center transition-colors group-hover:bg-[#F5E2DC]">
              <FiShield className="w-5 h-5 text-[#965A48]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#2E1F1A]">
              Veri<span className="text-[#965A48]">Drive</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/features"
              className="text-sm font-semibold text-[#7C6660] hover:text-[#2E1F1A] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-[#7C6660] hover:text-[#2E1F1A] transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        <div>
          <Link
            href="/support"
            className="text-sm font-semibold text-[#965A48] hover:text-[#783F30] hover:underline transition"
          >
            Support
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
