'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Email Address is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call for forgot password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-[500px] bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-10 transition-shadow duration-300 hover:shadow-md"
    >
      <div className="mb-8">
        <h2 className="text-[28px] font-bold tracking-tight text-slate-900 leading-tight">
          Reset password
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm rounded-r-md">
              We have sent a password reset link to <strong className="font-semibold">{email}</strong>. Please check your inbox.
            </div>
            <Link
              href="/auth/login"
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 tracking-wide uppercase mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <FiMail className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="name@company.com"
                  className={`w-full pl-11 pr-4 py-3 text-sm rounded-lg bg-white border ${
                    error ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                  } text-slate-900 placeholder-slate-400 outline-none transition-colors duration-200 shadow-sm`}
                />
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1.5 text-xs text-red-500 font-medium overflow-hidden"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </motion.button>

            {/* Back to Login link */}
            <div className="text-center text-sm font-medium pt-2">
              <Link 
                href="/auth/login" 
                className="text-slate-500 hover:text-slate-900 transition flex items-center justify-center gap-1.5"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </div>
          </form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForgotPasswordForm;
