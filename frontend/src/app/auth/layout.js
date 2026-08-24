import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FiShield } from 'react-icons/fi';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Reusable Navbar */}
      <Navbar />


      {/*  Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
          
          {/* Left Column: Children Form */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            {children}
          </div>

          {/* Right Column: Showcase Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6 max-w-[480px] mx-auto lg:mx-0 w-full">
            
            {/* Card 1: Enterprise Security */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <FiShield className="w-5.5 h-5.5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Enterprise Security
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 font-medium leading-relaxed">
                    Bank-grade encryption and automated vehicle history verification protocols for every account.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Join 5,000+ Dealerships */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <Image
                  src="/vehicle_verification_showcase.jpg"
                  alt="Vehicle Verification Facility"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900">
                  Join 5,000+ Dealerships
                </h3>
                <p className="mt-1 text-sm text-slate-500 font-medium leading-relaxed">
                  The industry standard for rapid vehicle identity and state-of-repair verification.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
