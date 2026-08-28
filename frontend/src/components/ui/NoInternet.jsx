'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiWifiOff, FiRefreshCw } from 'react-icons/fi';
import Button from '@/components/ui/Button';

/**
 * NoInternet Component
 *
 * Two usage modes:
 *
 * 1. WRAPPER MODE (recommended):
 *    Wrap your page/content — automatically shows offline UI when network drops.
 *    <NoInternet>
 *      <YourPageContent />
 *    </NoInternet>
 *
 * 2. STANDALONE MODE:
 *    Render it directly as a full-page offline screen.
 *    <NoInternet standalone />
 *
 * Props:
 * - children     : ReactNode   — Content to show when online (wrapper mode)
 * - standalone   : boolean     — Renders as a standalone full page (default: false)
 * - onRetry      : function    — Custom retry handler (default: window.location.reload)
 */

const OfflineUI = ({ onRetry }) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    await new Promise((r) => setTimeout(r, 1000));
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
    setIsRetrying(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-md text-center"
      >
        {/* Animated WiFi Icon */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-100 mb-6 mx-auto">
          <FiWifiOff className="w-9 h-9 text-slate-400" />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-2xl animate-ping bg-slate-200 opacity-50" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          No Internet Connection
        </h1>
        <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">
          It looks like you&apos;re offline. Please check your network connection and try again.
        </p>

        <div className="mt-8">
          <Button
            variant="primary"
            leftIcon={<FiRefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />}
            onClick={handleRetry}
            isLoading={isRetrying}
            loadingText="Reconnecting..."
          >
            Try Again
          </Button>
        </div>

        <p className="mt-6 text-xs text-slate-400 font-medium">
          VeriDrive requires an internet connection to verify vehicles.
        </p>
      </motion.div>
    </div>
  );
};

const NoInternet = ({ children, standalone = false, onRetry }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Standalone mode — always renders offline UI
  if (standalone) {
    return <OfflineUI onRetry={onRetry} />;
  }

  // Wrapper mode — shows children when online, offline UI when not
  return (
    <AnimatePresence mode="wait">
      {isOnline ? (
        <motion.div
          key="online"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="offline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <OfflineUI onRetry={onRetry} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoInternet;
