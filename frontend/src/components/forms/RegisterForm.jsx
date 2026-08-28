'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiShield } from 'react-icons/fi';
import { SiOkta } from 'react-icons/si';
import { TbBrandAzure } from 'react-icons/tb';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
        <Input
          label="Full Name"
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          leftIcon={<FiUser className="w-5 h-5" />}
          error={errors.fullName}
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
          leftIcon={<FiMail className="w-5 h-5" />}
          error={errors.email}
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
            leftIcon={<FiLock className="w-5 h-5" />}
            error={errors.password}
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
            leftIcon={<FiShield className="w-5 h-5" />}
            error={errors.confirmPassword}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={isLoading}
          loadingText="Creating Account..."
          className="mt-2"
        >
          Create Account
        </Button>
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

export default RegisterForm;
