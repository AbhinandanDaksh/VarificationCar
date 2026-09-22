'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiShield, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { registerUser, clearError, clearSuccess } from '@/store/auth';

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, registerSuccess, successMessage } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearSuccess());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation logic
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    dispatch(registerUser({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    }));
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0ED] border border-[#F3DDD5] text-[#8A5343] text-xs font-semibold tracking-wide uppercase mb-3.5 shadow-xs">
            <FiShield className="w-3.5 h-3.5 text-[#965A48]" />
            <span>Join Network</span>
          </div>
          <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#2E1F1A] leading-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-[#7C6660] font-medium">
            Join the most trusted vehicle verification network.
          </p>
        </div>

        {/* Global Error Banner */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-3.5 bg-[#FDF2F0] border border-[#F5C7BF] text-[#A63C2E] text-xs sm:text-sm font-medium rounded-xl flex items-center gap-2.5 overflow-hidden shadow-xs"
            >
              <FiAlertCircle className="w-4 h-4 text-[#A63C2E] shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Success Banner */}
        <AnimatePresence mode="wait">
          {registerSuccess && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-3.5 bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs sm:text-sm font-medium rounded-xl flex items-center gap-2.5 overflow-hidden shadow-xs"
            >
              <FiCheckCircle className="w-4 h-4 text-[#166534] shrink-0" />
              <span>{successMessage || 'Account created successfully! Please verify your email.'}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <Input
            label="Full Name"
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            leftIcon={<FiUser className="w-4.5 h-4.5 text-[#9E8781]" />}
            error={formErrors.fullName}
            inputClassName="border-[#E5D7D1] text-[#2E1F1A] placeholder-[#B5A19B] focus:border-[#965A48] focus:ring-[#965A48]/20"
          />

          {/* Email Address */}
          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            leftIcon={<FiMail className="w-4.5 h-4.5 text-[#9E8781]" />}
            error={formErrors.email}
            inputClassName="border-[#E5D7D1] text-[#2E1F1A] placeholder-[#B5A19B] focus:border-[#965A48] focus:ring-[#965A48]/20"
          />

          {/* Passwords (Grid layout for Desktop, Stacked on Mobile) */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Password */}
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              leftIcon={<FiLock className="w-4.5 h-4.5 text-[#9E8781]" />}
              error={formErrors.password}
              inputClassName="border-[#E5D7D1] text-[#2E1F1A] placeholder-[#B5A19B] focus:border-[#965A48] focus:ring-[#965A48]/20"
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              leftIcon={<FiShield className="w-4.5 h-4.5 text-[#9E8781]" />}
              error={formErrors.confirmPassword}
              inputClassName="border-[#E5D7D1] text-[#2E1F1A] placeholder-[#B5A19B] focus:border-[#965A48] focus:ring-[#965A48]/20"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={loading}
            loadingText="Creating Account..."
            className="mt-2 bg-gradient-to-r from-[#965A48] via-[#854B3A] to-[#6E3C2D] hover:from-[#854B3A] hover:to-[#5A2E21] text-white shadow-md shadow-[#854B3A]/25 active:scale-[0.99] transition-all duration-200 cursor-pointer"
          >
            Create Account
          </Button>
        </form>

        {/* Login link */}
        <div className="mt-6 text-center text-sm font-medium">
          <span className="text-[#87726C]">Already have an account? </span>
          <Link href="/auth/login" className="font-semibold text-[#965A48] hover:text-[#783F30] hover:underline transition-colors">
            Login
          </Link>
        </div>

        {/* Enterprise Single Sign-On Section */}
        {/* <div className="mt-8 pt-6 border-t border-[#EDE0DA]">
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
        </div> */}
      </div>
    </motion.div>
  );
};

export default RegisterForm;
