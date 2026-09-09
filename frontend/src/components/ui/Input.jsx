'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

/**
 * Reusable Input Component
 *
 * Props:
 * - label        : string          — Label text above the input
 * - id           : string          — Input id (auto-generated if not provided)
 * - name         : string          — Input name attribute
 * - type         : string          — 'text' | 'email' | 'password' | 'number' | 'tel' | etc.  (default: 'text')
 * - value        : string
 * - onChange     : function
 * - placeholder  : string
 * - leftIcon     : ReactElement    — Icon rendered inside left of input
 * - rightElement : ReactElement    — Custom element on the right (overrides password toggle)
 * - error        : string          — Error message; turns border red
 * - success      : string          — Success message; turns border green
 * - hint         : string          — Neutral helper text below input
 * - disabled     : boolean
 * - required     : boolean
 * - className    : string          — Extra classes on the wrapper div
 * - inputClassName : string        — Extra classes on the <input> element
 * - labelRight   : ReactElement    — Element rendered to the right of the label (e.g. "Forgot password?" link)
 */

const Input = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  leftIcon,
  rightElement,
  error,
  success,
  hint,
  disabled = false,
  required = false,
  className = '',
  inputClassName = '',
  labelRight,
  ...rest
}) => {
  const autoId = useId();
  const inputId = id ?? autoId;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

  // Border color based on state
  const borderClass = error
    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
    : success
    ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20'
    : 'border-[#EDE0DA] focus:border-[#965A48] focus:ring-[#965A48]/20';

  // Padding adjustments based on icons
  const paddingLeft = leftIcon ? 'pl-11' : 'pl-4';
  const paddingRight = isPassword || rightElement || error || success ? 'pr-11' : 'pr-4';

  return (
    <div className={`w-full ${className}`}>
      {/* Label Row */}
      {(label || labelRight) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label
              htmlFor={inputId}
              className="block text-xs font-semibold text-[#5A4540] tracking-wide uppercase"
            >
              {label}
              {required && <span className="text-rose-500 ml-0.5">*</span>}
            </label>
          )}
          {labelRight && <span className="text-xs">{labelRight}</span>}
        </div>
      )}

      {/* Input Wrapper */}
      <div className="relative flex items-center">
        {/* Left Icon */}
        {leftIcon && (
          <span className="absolute left-3.5 text-[#9E8781] pointer-events-none flex items-center">
            {leftIcon}
          </span>
        )}

        {/* Input */}
        <input
          id={inputId}
          name={name}
          type={resolvedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={[
            'w-full py-3 text-sm rounded-xl bg-white border',
            borderClass,
            paddingLeft,
            paddingRight,
            'text-[#2E1F1A] placeholder-[#B5A19B] outline-none transition-all duration-200 shadow-xs',
            'focus:ring-2',
            disabled ? 'opacity-50 cursor-not-allowed bg-stone-50' : '',
            inputClassName,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />

        {/* Right Side: password toggle → status icon → custom rightElement */}
        <span className="absolute right-3.5 flex items-center gap-1">
          {isPassword && !rightElement && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((p) => !p)}
              className="text-[#9E8781] hover:text-[#5A4540] focus:outline-none transition p-0.5 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <FiEyeOff className="w-4.5 h-4.5" />
              ) : (
                <FiEye className="w-4.5 h-4.5" />
              )}
            </button>
          )}

          <AnimatePresence mode="wait">
            {!isPassword && error && (
              <motion.span
                key="error-icon"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                <FiAlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
              </motion.span>
            )}
            {!isPassword && success && !error && (
              <motion.span
                key="success-icon"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                <FiCheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
              </motion.span>
            )}
          </AnimatePresence>
          {rightElement && <span>{rightElement}</span>}
        </span>
      </div>

      {/* Smooth animated error > success > hint below input */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="input-error"
            id={`${inputId}-error`}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1.5 text-xs text-rose-500 font-medium overflow-hidden"
          >
            {error}
          </motion.p>
        ) : success ? (
          <motion.p
            key="input-success"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1.5 text-xs text-emerald-600 font-medium overflow-hidden"
          >
            {success}
          </motion.p>
        ) : hint ? (
          <motion.p
            key="input-hint"
            id={`${inputId}-hint`}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1.5 text-xs text-[#9E8781] font-medium overflow-hidden"
          >
            {hint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Input;
