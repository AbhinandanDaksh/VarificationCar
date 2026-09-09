'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="relative w-full max-w-[500px]"
    >
      {/* Light Pink & Warm Mocha Ambient Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#F7D4CC]/70 via-[#F8E8E2]/50 to-[#DEC6BC]/60 rounded-[32px] blur-2xl opacity-90 pointer-events-none" />

      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-[#EDE0DA] shadow-[0_12px_45px_-8px_rgba(110,65,50,0.1)] p-8 sm:p-10 transition-all duration-300 hover:shadow-[0_18px_55px_-8px_rgba(110,65,50,0.14)]">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#2E1F1A] leading-tight">
            Reset password
          </h2>
          <p className="mt-2 text-sm text-[#7C6660] font-medium">
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
              <div className="p-4 bg-[#F2F8F4] border-l-4 border-emerald-500 text-emerald-800 text-sm rounded-r-md">
                We have sent a password reset link to <strong className="font-semibold">{email}</strong>. Please check your inbox.
              </div>
              <Link
                href="/auth/login"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#965A48] via-[#854B3A] to-[#6E3C2D] hover:from-[#854B3A] hover:to-[#5A2E21] text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Address */}
              <Input
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="name@company.com"
                leftIcon={<FiMail className="w-4.5 h-4.5 text-[#9E8781]" />}
                error={error}
                inputClassName="border-[#E5D7D1] text-[#2E1F1A] placeholder-[#B5A19B] focus:border-[#965A48] focus:ring-[#965A48]/20"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isLoading}
                loadingText="Sending Link..."
                className="mt-2 bg-gradient-to-r from-[#965A48] via-[#854B3A] to-[#6E3C2D] hover:from-[#854B3A] hover:to-[#5A2E21] text-white shadow-md shadow-[#854B3A]/25 active:scale-[0.99] transition-all duration-200 cursor-pointer"
              >
                Send Reset Link
              </Button>

              {/* Back to Login link */}
              <div className="text-center text-sm font-medium pt-2">
                <Link 
                  href="/auth/login" 
                  className="text-[#965A48] hover:text-[#783F30] hover:underline transition flex items-center justify-center gap-1.5"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordForm;
