'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Button Component
 *
 * Props:
 * - children        : Button label / content
 * - type            : 'button' | 'submit' | 'reset'  (default: 'button')
 * - variant         : 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'  (default: 'primary')
 * - size            : 'sm' | 'md' | 'lg'  (default: 'md')
 * - isLoading       : boolean — shows spinner and disables button
 * - loadingText     : string shown while loading  (default: 'Loading...')
 * - disabled        : boolean
 * - leftIcon        : React element shown before label
 * - rightIcon       : React element shown after label
 * - fullWidth       : boolean — makes button 100% width
 * - onClick         : click handler
 * - className       : extra Tailwind classes for overrides
 */

const variantStyles = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white shadow-sm hover:shadow focus:ring-indigo-600',
  secondary:
    'bg-slate-100 hover:bg-slate-200 disabled:bg-slate-100 text-slate-700 shadow-sm hover:shadow focus:ring-slate-400',
  outline:
    'bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50 text-slate-700 shadow-sm focus:ring-slate-400',
  ghost:
    'bg-transparent hover:bg-slate-100 disabled:opacity-50 text-slate-600 focus:ring-slate-400',
  danger:
    'bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white shadow-sm hover:shadow focus:ring-red-600',
};

const sizeStyles = {
  sm: 'py-2 px-3.5 text-xs gap-1.5',
  md: 'py-3 px-4 text-sm gap-2',
  lg: 'py-3.5 px-5 text-base gap-2',
};

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-current shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText = 'Loading...',
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onClick,
  className = '',
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.01 } : {}}
      whileTap={!isDisabled ? { scale: 0.99 } : {}}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center font-semibold rounded-lg transition duration-200',
        'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed',
        variantStyles[variant] ?? variantStyles.primary,
        sizeStyles[size] ?? sizeStyles.md,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;
