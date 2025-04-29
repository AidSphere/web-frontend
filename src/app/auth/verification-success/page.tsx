'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useSearchParams } from 'next/navigation';

/**
 * Unified Success Page
 *
 * A flexible component that handles multiple success scenarios:
 * - ACCOUNT_ACTIVATION: After account is activated
 * - EMAIL_VERIFICATION: After email is verified with a code
 * - PASSWORD_RESET: After password has been reset
 *
 * @param {Object} props
 * @param {('ACCOUNT_ACTIVATION'|'EMAIL_VERIFICATION'|'PASSWORD_RESET')} props.type - The type of success page to display
 */
const SuccessPage = ({
  type: propType,
}: {
  type: 'ACCOUNT_ACTIVATION' | 'EMAIL_VERIFICATION' | 'PASSWORD_RESET';
}) => {
  // Get type from URL query parameters if not passed as prop
  const searchParams = useSearchParams();
  const urlType = searchParams.get('type');
  const type = propType || urlType || 'ACCOUNT_ACTIVATION';

  // Configuration based on type
  const config = {
    ACCOUNT_ACTIVATION: {
      title: 'Verification Successful!',
      description:
        'Your email has been verified and your account is now active. You can now access the medical portal.',
      alertTitle: 'Account activated',
      alertMessage:
        'Your medical practitioner account has been successfully activated. You now have full access to the AidSphere Medical Portal.',
      buttonText: 'Continue to Login',
      buttonRedirect: '/auth/login',
      helpText: 'Need help getting started?',
      helpLinkText: 'View our user guide',
      helpLinkHref: '/support',
    },
    EMAIL_VERIFICATION: {
      title: 'Email Verified!',
      description:
        'Your email address has been successfully verified. Thank you for confirming your identity.',
      alertTitle: 'Email verification complete',
      alertMessage:
        'Your email address is now verified. This helps ensure the security of your account and enables all communication features.',
      buttonText: 'Continue to Dashboard',
      buttonRedirect: '/dashboard',
      helpText: 'Want to update your notification preferences?',
      helpLinkText: 'Manage settings',
      helpLinkHref: '/settings/notifications',
    },
    PASSWORD_RESET: {
      title: 'Password Reset Verification Successful!',
      description:
        'Your password has been successfully reset. You can now log in to your account with your new password.',
      alertTitle: 'Password updated',
      alertMessage:
        'Your password has been successfully changed. Your account is now secure with the new credentials you provided.',
      buttonText: 'Reset Password',
      buttonRedirect: '/auth/reset-password',
      helpText: 'Having trouble signing in?',
      helpLinkText: 'Contact support',
      helpLinkHref: '/support',
    },
  };

  // Get the appropriate configuration
  const currentConfig = config[type] || config.ACCOUNT_ACTIVATION;

  return (
    <div className='flex h-screen'>
      {/* Theme toggle positioned in the top right */}
      <div className='absolute right-4 top-4 z-50'>
        <ThemeToggle />
      </div>
      <div className='flex w-full items-center justify-center p-5'>
        <Card className='w-full max-w-md border-sidebar-border p-6 shadow-lg'>
          <div className='mb-6 text-center'>
            <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100'>
              <FaCheckCircle className='size-8 text-green-600' />
            </div>
            <h1 className='text-2xl font-bold text-green-600'>
              {currentConfig.title}
            </h1>
            <p className='text-foreground/70 mt-2'>
              {currentConfig.description}
            </p>
          </div>

          <div className='space-y-4'>
            <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
              <div className='flex items-start'>
                <div className='shrink-0'>
                  <FaCheckCircle className='size-5 text-green-400' />
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-green-800'>
                    {currentConfig.alertTitle}
                  </h3>
                  <div className='mt-2 text-sm text-green-700'>
                    <p>{currentConfig.alertMessage}</p>
                  </div>
                </div>
              </div>
            </div>

            <Link href={currentConfig.buttonRedirect} passHref>
              <Button
                className='mt-4 w-full bg-primary text-white hover:bg-primary-600'
                size='lg'
              >
                {currentConfig.buttonText}{' '}
                <FaArrowRight className='ml-2 size-4' />
              </Button>
            </Link>

            <div className='text-foreground/70 mt-6 text-center text-sm'>
              <p>{currentConfig.helpText}</p>
              <Link
                href={currentConfig.helpLinkHref}
                className='mt-1 font-medium text-primary hover:text-primary-600'
              >
                {currentConfig.helpLinkText}
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SuccessPage;
