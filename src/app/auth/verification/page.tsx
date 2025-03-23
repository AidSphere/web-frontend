'use client';

import { useState, useEffect } from 'react';

export default function EmailVerificationPage() {
  const [email, setEmail] = useState('your@email.com');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Get email from localStorage or URL params in a real app
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleResendEmail = () => {
    setIsLoading(true);
    // Simulate API call to resend verification email
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4'>
      <div className='w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg'>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center p-8'>
            <div className='h-10 w-10 animate-spin rounded-full border-b-2 border-black'></div>
            <p className='mt-4 text-center text-gray-500'>
              Processing your request...
            </p>
          </div>
        ) : (
          <>
            <div className='flex flex-col items-center gap-3 p-6 pb-0'>
              <div className='rounded-full bg-gray-100 p-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-black'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <h1 className='text-center text-2xl font-bold'>
                Check Your Email
              </h1>
            </div>
            <div className='flex flex-col items-center px-6 py-4 text-center'>
              <p className='mb-4 text-gray-700'>
                We've sent an activation link to:
              </p>
              <p className='mb-4 text-lg font-semibold text-black'>{email}</p>
              <p className='text-sm text-gray-500'>
                Please check your inbox and click on the verification link to
                activate your account. If you don't see the email, check your
                spam folder.
              </p>
            </div>
            <div className='border-t border-gray-200'></div>
            <div className='flex flex-col gap-3 p-6'>
              <p className='text-center text-sm text-gray-500'>
                Didn't receive the email?
              </p>
              <button
                onClick={handleResendEmail}
                className='flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 font-medium text-black transition-colors hover:bg-gray-200'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                  />
                </svg>
                Resend Verification Email
              </button>
              <a
                href='/'
                className='w-full rounded-md px-4 py-2 text-center font-medium text-gray-600 transition-colors hover:text-black'
              >
                Back to Home
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
