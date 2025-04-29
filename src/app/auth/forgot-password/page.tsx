'use client';
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
      <div className='absolute right-4 top-4 z-50'>
        <ThemeToggle />
      </div>

      <div className='mt-32 flex w-full items-center justify-center p-5'>
        <Card className='w-full max-w-md border-sidebar-border p-6 shadow-lg'>
          {!isSubmitted ? (
            <>
              <div className='mb-6 text-center'>
                <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-secondary/10'>
                  <FaLock className='size-8 text-secondary' />
                </div>
                <h1 className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold text-transparent'>
                  Forgot Your Password?
                </h1>
                <p className='text-foreground/70 mt-2'>
                  Enter your email address and we&apos;ll send you instructions
                  to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <label
                    htmlFor='email'
                    className='text-foreground/80 text-sm font-medium'
                  >
                    Email Address
                  </label>
                  <div className='relative'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <FaEnvelope className='text-foreground/40 size-5' />
                    </div>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className='bg-background pl-10 focus:border-primary'
                      placeholder='Your registered email'
                    />
                  </div>
                </div>

                <Button
                  type='submit'
                  className='w-full bg-primary text-white hover:bg-primary-600'
                  size='lg'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
              </form>
            </>
          ) : (
            <div className='space-y-4 text-center'>
              <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-secondary/10'>
                <FaEnvelope className='size-8 text-secondary' />
              </div>
              <h2 className='text-xl font-bold text-secondary'>
                Check Your Email
              </h2>
              <p className='text-foreground/70'>
                We&apos;ve sent password reset instructions to:
              </p>
              <p className='font-medium text-foreground'>{email}</p>
              <div className='bg-background/50 mt-4 rounded-lg border border-sidebar-border p-4'>
                <p className='text-foreground/70 text-sm'>
                  Please check your inbox and follow the link in the email to
                  reset your password. The link will expire in 30 minutes.
                </p>
              </div>
              <Button
                onClick={navigateToVerification}
                className='w-full bg-primary text-white hover:bg-primary-600'
                size='lg'
              >
                Verify
              </Button>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant='outline'
                className='mt-4'
              >
                Didn&apos;t receive the email? Try again
              </Button>
            </div>
          )}

          <div className='mt-6 text-center'>
            <Link
              href='/auth/login'
              className='inline-flex items-center text-sm text-primary hover:text-primary-600'
            >
              <FaArrowLeft className='mr-2 size-3' />
              Back to Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
