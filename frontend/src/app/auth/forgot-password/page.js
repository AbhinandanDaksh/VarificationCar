import React from 'react';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';

export const metadata = {
  title: 'Reset Password - VeriDrive',
  description: 'Request a password reset link for your VeriDrive account.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
