'use client';

import React, { useState, useId } from 'react';
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
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : success
    ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500'
    : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600';

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
              className="block text-xs font-semibold text-slate-700 tracking-wide uppercase"
            >
              {label}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}
          {labelRight && <span className="text-xs">{labelRight}</span>}
        </div>
      )}

      {/* Input Wrapper */}
      <div className="relative flex items-center">
        {/* Left Icon */}
        {leftIcon && (
          <span className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
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
            'w-full py-3 text-sm rounded-lg bg-white border',
            borderClass,
            paddingLeft,
            paddingRight,
            'text-slate-900 placeholder-slate-400 outline-none transition-colors duration-200 shadow-sm',
            'focus:ring-1',
            disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : '',
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
              className="text-slate-400 hover:text-slate-600 focus:outline-none transition p-0.5 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <FiEyeOff className="w-4.5 h-4.5" />
              ) : (
                <FiEye className="w-4.5 h-4.5" />
              )}
            </button>
          )}

          {!isPassword && error && (
            <FiAlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0" />
          )}
          {!isPassword && success && !error && (
            <FiCheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
          )}
          {rightElement && <span>{rightElement}</span>}
        </span>
      </div>

      {/* Below input: error > success > hint */}
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
      {!error && success && (
        <p className="mt-1.5 text-xs text-emerald-600 font-medium">{success}</p>
      )}
      {!error && !success && hint && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-slate-400 font-medium">
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
