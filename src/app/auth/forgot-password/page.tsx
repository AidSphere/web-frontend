"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useRouter } from 'next/navigation';

/**
 * Forgot Password Page
 * 
 * Allows users to request a password reset by entering their email address
 */
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would implement password reset request logic
    // Example: await requestPasswordReset(email);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  // Navigate to verification success with the PASSWORD_RESET type
  const navigateToVerification = () => {
    router.push('/auth/verification?type=PASSWORD_RESET');
  };

  return (
    <div className='relative min-h-screen'>
      {/* Theme toggle positioned in the top right */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    
      <div className="w-full mt-32 flex items-center justify-center p-5">
        
        <Card className="w-full max-w-md p-6 shadow-lg border-sidebar-border">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-6">
                <div className="mx-auto size-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <FaLock className="text-secondary size-8" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Forgot Your Password?
                </h1>
                <p className="mt-2 text-foreground/70">
                  Enter your email address and we&apos;ll send you instructions to reset your password.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="size-5 text-foreground/40" />
                    </div>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-background focus:border-primary"
                      placeholder="Your registered email"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-600 text-white" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto size-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <FaEnvelope className="text-secondary size-8" />
              </div>
              <h2 className="text-xl font-bold text-secondary">Check Your Email</h2>
              <p className="text-foreground/70">
                We&apos;ve sent password reset instructions to:
              </p>
              <p className="font-medium text-foreground">{email}</p>
              <div className="rounded-lg border border-sidebar-border bg-background/50 p-4 mt-4">
                <p className="text-sm text-foreground/70">
                  Please check your inbox and follow the link in the email to reset your password. The link will expire in 30 minutes.
                </p>
              </div>
              <Button 
                onClick={navigateToVerification}
                className="w-full bg-primary hover:bg-primary-600 text-white" 
                size="lg"
              >
                Verify
              </Button>
              <Button 
                onClick={() => setIsSubmitted(false)} 
                variant="outline" 
                className="mt-4"
              >
                Didn&apos;t receive the email? Try again
              </Button>
            </div>
          )}
          
          <div className="text-center mt-6">
            <Link href="/auth/login" className="inline-flex items-center text-sm text-primary hover:text-primary-600">
              <FaArrowLeft className="mr-2 size-3" />
              Back to Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;