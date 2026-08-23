import React from 'react';
import LoginForm from '@/components/forms/LoginForm';

export const metadata = {
  title: 'Login - VeriDrive',
  description: 'Sign in to your VeriDrive account to access the vehicle verification network.',
};

export default function LoginPage() {
  return <LoginForm />;
}
