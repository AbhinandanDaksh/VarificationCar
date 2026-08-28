'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
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
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulated sign in request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert('Login successful! Welcome back.');
      setFormData({ email: '', password: '', rememberMe: false });
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Invalid email or password. Please try again.' });
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
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          Sign in to access your VeriDrive account.
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
        {/* Email Address */}
        <Input
          label="Email Address"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@company.com"
          leftIcon={<FiMail className="w-5 h-5" />}
          error={errors.email}
        />

        {/* Password */}
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          leftIcon={<FiLock className="w-5 h-5" />}
          error={errors.password}
          labelRight={
            <Link
              href="/auth/forgot-password"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition"
            >
              Forgot Password?
            </Link>
          }
        />

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
          />
          <label htmlFor="rememberMe" className="ml-2 text-xs font-semibold text-slate-600 select-none cursor-pointer">
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={isLoading}
          loadingText="Signing In..."
        >
          Sign In
        </Button>
      </form>

      {/* Register link */}
      <div className="mt-6 text-center text-sm font-medium">
        <span className="text-slate-500">Don&apos;t have an account? </span>
        <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-500 hover:underline transition">
          Sign Up
        </Link>
      </div>

      {/* Enterprise Single Sign-On Section */}
      <div className="mt-8 pt-8 border-t border-slate-100">
        <p className="text-[11px] font-bold text-slate-400 tracking-wider text-center uppercase mb-4">
          Enterprise Single Sign-On
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<SiOkta className="w-5 h-5 text-slate-800" />}
            onClick={() => alert('SSO login via Okta initiated.')}
          >
            Okta
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<TbBrandAzure className="w-5 h-5 text-sky-500" />}
            onClick={() => alert('SSO login via Azure AD initiated.')}
          >
            Azure AD
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
