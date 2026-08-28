'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';
import Button from '@/components/ui/Button';

/**
 * Reusable ErrorPage Component
 *
 * Props:
 * - statusCode   : number | string  — e.g. 404, 500  (default: 'Error')
 * - title        : string           — Main heading
 * - message      : string           — Description text
 * - onRetry      : function         — If provided, shows a "Try Again" button
 * - retryLabel   : string           — Label for retry button  (default: 'Try Again')
 * - homeHref     : string           — href for "Go Home" button  (default: '/')
 * - showHomeBtn  : boolean          — Show/hide "Go Home" button  (default: true)
 * - icon         : ReactElement     — Custom icon  (default: FiAlertTriangle)
 */

const ErrorPage = ({
  statusCode = 'Error',
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again later.',
  onRetry,
  retryLabel = 'Try Again',
  homeHref = '/',
  showHomeBtn = true,
  icon,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-md text-center"
      >
        {/* Status Code Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-50 mb-6 mx-auto">
          {icon ?? <FiAlertTriangle className="w-9 h-9 text-red-500" />}
        </div>

        {typeof statusCode === 'number' && (
          <p className="text-[72px] font-extrabold tracking-tight text-slate-100 leading-none select-none -mb-2">
            {statusCode}
          </p>
        )}

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-2">
          {title}
        </h1>
        <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <Button
              variant="primary"
              leftIcon={<FiRefreshCw className="w-4 h-4" />}
              onClick={onRetry}
            >
              {retryLabel}
            </Button>
          )}
          {showHomeBtn && (
            <a href={homeHref}>
              <Button
                variant={onRetry ? 'outline' : 'primary'}
                leftIcon={<FiHome className="w-4 h-4" />}
                fullWidth
              >
                Go to Home
              </Button>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
