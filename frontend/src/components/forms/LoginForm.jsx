'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiShield, FiAlertCircle } from 'react-icons/fi';
import { SiOkta } from 'react-icons/si';
import { TbBrandAzure } from 'react-icons/tb';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid business email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulated sign in request
      await new Promise((resolve) => setTimeout(resolve, 1400));
      alert('Login successful! Welcome to VeriDrive.');
      setFormData({ email: '', password: '', rememberMe: false });
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Invalid credentials. Please verify and try again.' });
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

      {/* Main Glass Card */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-[#EDE0DA] shadow-[0_12px_45px_-8px_rgba(110,65,50,0.1)] p-8 sm:p-10 transition-all duration-300 hover:shadow-[0_18px_55px_-8px_rgba(110,65,50,0.14)]">
        
        {/* Header Section with Soft Blush Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0ED] border border-[#F3DDD5] text-[#8A5343] text-xs font-semibold tracking-wide uppercase mb-3.5 shadow-xs">
            <FiShield className="w-3.5 h-3.5 text-[#965A48]" />
            <span>Secure Access</span>
          </div>
          <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#2E1F1A] leading-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-[#7C6660] font-medium">
            Sign in to access your VeriDrive fleet & vehicle verification portal.
          </p>
        </div>

        {/* Global Error Banner */}
        <AnimatePresence mode="wait">
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              className="mb-6 p-3.5 bg-[#FDF2F0] border border-[#F5C7BF] text-[#A63C2E] text-xs sm:text-sm font-medium rounded-xl flex items-center gap-2.5 overflow-hidden shadow-xs"
            >
              <FiAlertCircle className="w-4 h-4 text-[#A63C2E] shrink-0" />
              <span>{errors.submit}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Address */}
          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@dealership.com"
            leftIcon={<FiMail className="w-4.5 h-4.5 text-[#9E8781]" />}
            error={errors.email}
            inputClassName="border-[#E5D7D1] text-[#2E1F1A] placeholder-[#B5A19B] focus:border-[#965A48] focus:ring-[#965A48]/20"
          />

          {/* Password */}
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••••••"
            leftIcon={<FiLock className="w-4.5 h-4.5 text-[#9E8781]" />}
            error={errors.password}
            inputClassName="border-[#E5D7D1] text-[#2E1F1A] placeholder-[#B5A19B] focus:border-[#965A48] focus:ring-[#965A48]/20"
            labelRight={
              <Link
                href="/auth/forgot-password"
                className="text-xs font-semibold text-[#965A48] hover:text-[#783F30] hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            }
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label htmlFor="rememberMe" className="inline-flex items-center gap-2.5 cursor-pointer select-none group">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-[#D9C8C1] text-[#965A48] focus:ring-[#965A48]/30 focus:ring-offset-0 transition-colors cursor-pointer accent-[#965A48]"
              />
              <span className="text-xs font-semibold text-[#6E5751] group-hover:text-[#2E1F1A] transition-colors">
                Remember this device
              </span>
            </label>
          </div>

          {/* Submit Button (Warm Rose-Brown Gradient) */}
          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={isLoading}
            loadingText="Signing In..."
            rightIcon={!isLoading && <FiArrowRight className="w-4 h-4" />}
            className="mt-2 bg-gradient-to-r from-[#965A48] via-[#854B3A] to-[#6E3C2D] hover:from-[#854B3A] hover:to-[#5A2E21] text-white shadow-md shadow-[#854B3A]/25 active:scale-[0.99] transition-all duration-200 cursor-pointer"
          >
            Sign In
          </Button>
        </form>

        {/* Register link */}
        <div className="mt-6 text-center text-sm font-medium">
          <span className="text-[#87726C]">Don&apos;t have an account? </span>
          <Link
            href="/auth/register"
            className="font-semibold text-[#965A48] hover:text-[#783F30] hover:underline transition-colors"
          >
            Create an account
          </Link>
        </div>

        {/* Enterprise Single Sign-On Section */}
        <div className="mt-8 pt-6 border-t border-[#EDE0DA]">
          <div className="relative flex justify-center text-xs uppercase mb-5">
            <span className="bg-white px-3 text-[11px] font-bold tracking-wider text-[#A38E88]">
              Enterprise Single Sign-On
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => alert('SSO login via Okta initiated.')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#EBDCD6] bg-[#FCFAF9] hover:bg-[#F8EFEB] active:bg-[#F2E5E0] text-[#4A352F] text-xs font-semibold shadow-xs transition-all hover:border-[#DEC5BC] cursor-pointer"
            >
              <SiOkta className="w-4 h-4 text-[#2E1F1A]" />
              <span>Okta</span>
            </button>
            <button
              type="button"
              onClick={() => alert('SSO login via Azure AD initiated.')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#EBDCD6] bg-[#FCFAF9] hover:bg-[#F8EFEB] active:bg-[#F2E5E0] text-[#4A352F] text-xs font-semibold shadow-xs transition-all hover:border-[#DEC5BC] cursor-pointer"
            >
              <TbBrandAzure className="w-4.5 h-4.5 text-[#0078D4]" />
              <span>Azure AD</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;

