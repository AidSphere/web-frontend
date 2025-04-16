"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import ThemeToggle from '@/components/ui/ThemeToggle';

/**
 * Password Reset Page
 * 
 * This page is accessed via the reset link sent to the user's email
 * Allows users to set a new password after verification
 */
const PasswordResetPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [error, setError] = useState('');

  // Check password strength
  const checkPasswordStrength = (password:string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
    return strength;
  };

  // Handle password change
  const handlePasswordChange = (e: { target: { value: any; }; }) => {
    const password = e.target.value;
    setNewPassword(password);
    checkPasswordStrength(password);
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (passwordStrength < 3) {
      setError('Please use a stronger password');
      return;
    }
    
    setIsResetting(true);
    
    // Here you would implement password reset logic
    // Example: await resetPassword(token, newPassword);
    
    setTimeout(() => {
      setIsResetting(false);
      setIsReset(true);
    }, 1500);
  };

  return (
    <div className="flex h-screen">
        {/* Theme toggle positioned in the top right */}
    <div className="absolute top-4 right-4 z-50">
      <ThemeToggle />
    </div>
 
      
      <div className="w-full  flex items-center justify-center p-5">
        <Card className="w-full max-w-md p-6 shadow-lg border-sidebar-border">
          {!isReset ? (
            <>
              <div className="text-center mb-6">
                <div className="mx-auto size-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <FaShieldAlt className="text-secondary size-8" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Create New Password
                </h1>
                <p className="mt-2 text-foreground/70">
                  Your password must be at least 8 characters and include a mix of letters, numbers, and symbols.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New Password Field */}
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="text-sm font-medium text-foreground/80">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="size-5 text-foreground/40" />
                    </div>
                    <Input 
                      id="newPassword" 
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="px-10 bg-background focus:border-primary"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="size-5 text-foreground/40" />
                      ) : (
                        <FaEye className="size-5 text-foreground/40" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  <div className="mt-2">
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          passwordStrength === 1 ? 'bg-red-500' : 
                          passwordStrength === 2 ? 'bg-yellow-500' : 
                          passwordStrength === 3 ? 'bg-green-500' : 
                          passwordStrength === 4 ? 'bg-green-600' : ''
                        }`}
                        style={{ width: `${passwordStrength * 25}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1 text-foreground/70">
                      {passwordStrength === 0 && 'Enter a password'}
                      {passwordStrength === 1 && 'Weak password'}
                      {passwordStrength === 2 && 'Moderate password'}
                      {passwordStrength === 3 && 'Strong password'}
                      {passwordStrength === 4 && 'Very strong password'}
                    </p>
                  </div>
                </div>
                
                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="size-5 text-foreground/40" />
                    </div>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={`pl-10 bg-background focus:border-primary ${
                        confirmPassword && confirmPassword !== newPassword 
                          ? 'border-red-500 focus:ring-red-500' 
                          : ''
                      }`}
                      placeholder="Confirm new password"
                    />
                  </div>
                  
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>
                
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="shrink-0">
                        <svg className="size-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-600 text-white" 
                  size="lg"
                  disabled={isResetting}
                >
                  {isResetting ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto size-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FaCheckCircle className="text-green-600 size-8" />
              </div>
              <h2 className="text-xl font-bold text-green-600">Password Reset Successfully!</h2>
              <p className="text-foreground/70">
                Your password has been reset successfully. You can now log in with your new password.
              </p>
              
              <Link href="/auth/login" passHref>
                <Button 
                  className="w-full bg-primary hover:bg-primary-600 text-white mt-4" 
                  size="lg"
                >
                  Continue to Login
                </Button>
              </Link>
            </div>
          )}
          
          <div className="text-center mt-6">
            <Link href="/login" className="text-sm text-primary hover:text-primary-600">
              Remember your password? Back to Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PasswordResetPage;