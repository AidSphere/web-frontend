'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Donor schema
const donorSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    nic: z.string().min(1, 'NIC number is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    addressLine1: z.string().min(1, 'Address line 1 is required'),
    addressLine2: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const DonorRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Donor form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nic: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Form submission handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Replace with your actual API call
      console.log('Donor form data:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setRegistrationSuccess(true);
      reset();
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black p-4'>
        <div className='w-full max-w-md rounded-lg p-8 text-center shadow-lg'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full p-3'>
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
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <h2 className='mb-2 text-2xl font-bold text-black'>
            Registration Successful!
          </h2>
          <p className='mb-6 text-gray-700'>
            Thank you for registering as a donor. Please check your email for
            verification.
          </p>
          <button
            onClick={() => setRegistrationSuccess(false)}
            className='w-full rounded-md bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-gray-800'
          >
            Register Another Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg'>
        <div className='bg-black px-4 py-6 sm:px-6'>
          <h1 className='text-center text-2xl font-bold text-white'>
            Donor Account Registration
          </h1>
        </div>

        <div className='p-6'>
          <form
            className='grid grid-cols-1 gap-6 md:grid-cols-2'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-col'>
              <label
                htmlFor='firstName'
                className='mb-1 block text-sm font-medium text-gray-700'
              >
                First Name
              </label>
              <input
                id='firstName'
                type='text'
                className={`w-full rounded-md border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                placeholder='Enter your first name'
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='lastName'
                className='mb-1 block text-sm font-medium text-gray-700'
              >
                Last Name
              </label>
              <input
                id='lastName'
                type='text'
                className={`w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                placeholder='Enter your last name'
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='nic'
                className='mb-1 block text-sm font-medium text-gray-700'
              >
                NIC Number
              </label>
              <input
                id='nic'
                type='text'
                className={`w-full rounded-md border ${errors.nic ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                placeholder='Enter your NIC number'
                {...register('nic')}
              />
              {errors.nic && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.nic.message}
                </p>
              )}
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='phone'
                className='mb-1 block text-sm font-medium text-gray-700'
              >
                Phone Number
              </label>
              <input
                id='phone'
                type='tel'
                className={`w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                placeholder='Enter your phone number'
                {...register('phone')}
              />
              {errors.phone && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='addressLine1'
                className='mb-1 block text-sm font-medium text-gray-700'
              >
                Address Line 1
              </label>
              <input
                id='addressLine1'
                type='text'
                className={`w-full rounded-md border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                placeholder='Enter your address'
                {...register('addressLine1')}
              />
              {errors.addressLine1 && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.addressLine1.message}
                </p>
              )}
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='addressLine2'
                className='mb-1 block text-sm font-medium text-gray-700'
              >
                Address Line 2 (Optional)
              </label>
              <input
                id='addressLine2'
                type='text'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500'
                placeholder='Enter additional address details'
                {...register('addressLine2')}
              />
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='password'
                className='mb-1 block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                className={`w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                placeholder='Enter your password'
                {...register('password')}
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='confirmPassword'
                className='mb-1 block text-sm font-medium text-gray-700'
              >
                Confirm Password
              </label>
              <input
                id='confirmPassword'
                type='password'
                className={`w-full rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                placeholder='Re-enter your password'
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className='mt-4 flex flex-col justify-center gap-4 sm:flex-row md:col-span-2'>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`rounded-md px-6 py-2 font-medium text-white ${
                  isSubmitting
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-black hover:bg-gray-800'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center'>
                    <svg
                      className='-ml-1 mr-2 h-4 w-4 animate-spin text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
              <button
                type='button'
                disabled={isSubmitting}
                onClick={() => reset()}
                className='rounded-md bg-gray-200 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
              >
                Cancel
              </button>
            </div>
          </form>

          <div className='mt-6 text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <a
              href='/auth/'
              className='font-medium text-black hover:text-gray-700'
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRegistration;
