import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
        <div>
          <span>VeriDrive © 2026. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-slate-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-slate-600 transition-colors">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:text-slate-600 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
