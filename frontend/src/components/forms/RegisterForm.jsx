'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiShield, FiEye, FiEyeOff } from 'react-icons/fi';
import { SiOkta } from 'react-icons/si';
import { TbBrandAzure } from 'react-icons/tb';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
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
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulated signup request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert('Registration successful! Welcome to VeriDrive.');
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Something went wrong. Please try again.' });
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
          Create your account
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          Join the most trusted vehicle verification network.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {errors.submit && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md overflow-hidden"
          >
            {errors.submit}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 tracking-wide uppercase mb-2">
            Full Name
          </label>
          <div className="relative flex items-center">
            <FiUser className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full pl-11 pr-4 py-3 text-sm rounded-lg bg-white border ${
                errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
              } text-slate-900 placeholder-slate-400 outline-none transition-colors duration-200 shadow-sm`}
            />
          </div>
          <AnimatePresence>
            {errors.fullName && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1.5 text-xs text-red-500 font-medium overflow-hidden"
              >
                {errors.fullName}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

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
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className={`w-full pl-11 pr-4 py-3 text-sm rounded-lg bg-white border ${
                errors.email ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
              } text-slate-900 placeholder-slate-400 outline-none transition-colors duration-200 shadow-sm`}
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1.5 text-xs text-red-500 font-medium overflow-hidden"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Passwords (Grid layout for Desktop, Stacked on Mobile) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-slate-700 tracking-wide uppercase mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <FiLock className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-11 pr-10 py-3 text-sm rounded-lg bg-white border ${
                  errors.password ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                } text-slate-900 placeholder-slate-400 outline-none transition-colors duration-200 shadow-sm`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none focus:text-slate-600 transition p-1 cursor-pointer flex items-center justify-center"
              >
                {showPassword ? <FiEyeOff className="w-4.5 h-4.5" /> : <FiEye className="w-4.5 h-4.5" />}
              </button>
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium overflow-hidden"
                >
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-700 tracking-wide uppercase mb-2">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <FiShield className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-11 pr-10 py-3 text-sm rounded-lg bg-white border ${
                  errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                } text-slate-900 placeholder-slate-400 outline-none transition-colors duration-200 shadow-sm`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none focus:text-slate-600 transition p-1 cursor-pointer flex items-center justify-center"
              >
                {showConfirmPassword ? <FiEyeOff className="w-4.5 h-4.5" /> : <FiEye className="w-4.5 h-4.5" />}
              </button>
            </div>
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1.5 text-xs text-red-500 font-medium overflow-hidden"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </motion.button>
      </form>

      {/* Login link */}
      <div className="mt-6 text-center text-sm font-medium">
        <span className="text-slate-500">Already have an account? </span>
        <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500 hover:underline transition">
          Login
        </Link>
      </div>

      {/* Enterprise Single Sign-On Section */}
      <div className="mt-8 pt-8 border-t border-slate-100">
        <p className="text-[11px] font-bold text-slate-400 tracking-wider text-center uppercase mb-4">
          Enterprise Single Sign-On
        </p>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => alert('SSO login via Okta initiated.')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition duration-150 text-sm font-medium text-slate-700 bg-white shadow-sm cursor-pointer"
          >
            <SiOkta className="w-5 h-5 text-slate-800" />
            Okta
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => alert('SSO login via Azure AD initiated.')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition duration-150 text-sm font-medium text-slate-700 bg-white shadow-sm cursor-pointer"
          >
            <TbBrandAzure className="w-5 h-5 text-sky-500" />
            Azure AD
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
