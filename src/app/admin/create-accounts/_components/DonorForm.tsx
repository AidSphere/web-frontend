'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  Button,
  Tooltip,
  Divider,
  addToast,
} from '@heroui/react';
import {
  InfoIcon,
  User,
  Phone,
  MapPin,
  CreditCard,
  Mail,
} from 'lucide-react';
import { useState } from 'react';
import AdminService from '@/service/AdminService';

// Donor schema
const donorSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    nic: z.string()
        .min(1, 'NIC number is required')
        .refine(
            (value) => {
                // Old NIC format: 9 digits followed by 'v' or 'V'
                const oldNicPattern = /^[0-9]{9}[vV]$/;
                // New NIC format: exactly 12 digits
                const newNicPattern = /^[0-9]{12}$/;
                return oldNicPattern.test(value) || newNicPattern.test(value);
            },
            {
                message: 'NIC must be either 9 digits followed by V (e.g., 740990606V) or 12 digits (e.g., 200222503773)'
            }
        ),
    phone: z.string().min(10, 'Valid phone number is required'),
    addressLine1: z.string().min(1, 'Address line 1 is required'),
    addressLine2: z.string().optional(),
    email: z.string().email('Invalid email address'),
    dob: z.string().min(1, 'Date of birth is required'),
});

const DonorForm = ({ onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  // Donor form
  const donorForm = useForm({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nic: '',
      dob: '',
      email: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
    },
  });

  const onDonorSubmit = async (data) => {
    setIsSubmitting(true);
    setServerErrors({});
    
    try {
      // Create donor DTO
      const donorData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        nic: data.nic,
        dob: data.dob,
        address: data.addressLine1 + (data.addressLine2 ? ', ' + data.addressLine2 : ''),
        password: 'DefaultPassword123'
      };

      // Call API to register donor
      const response = await AdminService.createDonor(donorData);
      
      // Show success toast with the message from the API if available
      addToast({
        title: "Success",
        description: response.message || "Donor account created successfully"
      });
      
      // Reset the form after successful submission
      donorForm.reset();
      
    } catch (error) {
      console.error('Error submitting donor form:', error);
      
      // Handle different types of errors
      if (error.status === 409) {
        // Handle duplicate email or NIC - show field-specific errors
        if (error.message.toLowerCase().includes('email')) {
          setServerErrors(prev => ({ ...prev, email: error.message }));
          donorForm.setError('email', { type: 'server', message: error.message });
        } else if (error.message.toLowerCase().includes('nic')) {
          setServerErrors(prev => ({ ...prev, nic: error.message }));
          donorForm.setError('nic', { type: 'server', message: error.message });
        } else {
          addToast({
            title: "Error",
            description: error.message,
            hideIcon: false
          });
        }
      } else if (error.status === 400 || error.status === 422) {
        // Validation errors - display the error message
        addToast({
          title: "Validation Error",
          description: error.message || "Invalid donor information provided"
        });
        
        // If there are field-specific errors in the response, set them on the form
        if (error.data?.errors) {
          Object.entries(error.data.errors).forEach(([field, message]) => {
            if (donorForm.getValues(field) !== undefined) {
              donorForm.setError(field, { type: 'server', message: message as string });
            }
          });
        }
      } else {
        // General error
        addToast({
          title: "Error",
          description: error.message || 'Failed to create donor account'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    donorForm.reset();
    setServerErrors({});
    if (onCancel) onCancel();
  };

  // Helper function to check if a field has a server error
  const hasServerError = (fieldName) => {
    return serverErrors[fieldName] !== undefined;
  };

  // Helper function to get combined error message (from Zod or server)
  const getErrorMessage = (fieldName) => {
    return donorForm.formState.errors[fieldName]?.message || serverErrors[fieldName] || '';
  };

  return (
    <>
      <div className='mb-4 mt-6'>
        <h2 className='mb-2 text-xl font-semibold text-gray-800'>
          Donor Registration
        </h2>
        <p className='mb-4 text-gray-600'>
          Create a donor account to contribute to medical causes, track
          your donations, and see the impact of your generosity.
        </p>
        <Divider className='my-4' />
      </div>

      <form
        className='grid grid-cols-1 gap-6 md:grid-cols-2'
        onSubmit={donorForm.handleSubmit(onDonorSubmit)}
      >
        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <User size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              First Name
            </label>
          </div>
          <Input
            variant='bordered'
            placeholder='Enter your first name'
            {...donorForm.register('firstName')}
            isInvalid={!!donorForm.formState.errors.firstName || hasServerError('firstName')}
            errorMessage={getErrorMessage('firstName')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <User size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Last Name
            </label>
          </div>
          <Input
            variant='bordered'
            placeholder='Enter your last name'
            {...donorForm.register('lastName')}
            isInvalid={!!donorForm.formState.errors.lastName || hasServerError('lastName')}
            errorMessage={getErrorMessage('lastName')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <Mail size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Email
            </label>
          </div>
          <Input
            variant='bordered'
            placeholder='Enter your Email'
            {...donorForm.register('email')}
            isInvalid={!!donorForm.formState.errors.email || hasServerError('email')}
            errorMessage={getErrorMessage('email')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <User size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Date of Birth
            </label>
          </div>
          <Input
            variant='bordered'
            type='date'
            max={new Date().toISOString().split('T')[0]}
            {...donorForm.register('dob')}
            isInvalid={!!donorForm.formState.errors.dob || hasServerError('dob')}
            errorMessage={getErrorMessage('dob')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <CreditCard size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              NIC Number
            </label>
            <Tooltip content='National Identity Card Number'>
              <InfoIcon
                size={14}
                className='cursor-help text-gray-400'
              />
            </Tooltip>
          </div>
          <Input
            variant='bordered'
            placeholder='Enter your NIC number'
            {...donorForm.register('nic')}
            isInvalid={!!donorForm.formState.errors.nic || hasServerError('nic')}
            errorMessage={getErrorMessage('nic')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <Phone size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Phone Number
            </label>
          </div>
          <Input
            variant='bordered'
            placeholder='Enter your phone number'
            {...donorForm.register('phone')}
            isInvalid={!!donorForm.formState.errors.phone || hasServerError('phone')}
            errorMessage={getErrorMessage('phone')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <MapPin size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Address Line 1
            </label>
          </div>
          <Input
            variant='bordered'
            placeholder='Enter your street address'
            {...donorForm.register('addressLine1')}
            isInvalid={!!donorForm.formState.errors.addressLine1 || hasServerError('addressLine1')}
            errorMessage={getErrorMessage('addressLine1')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <MapPin size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Address Line 2 (Optional)
            </label>
          </div>
          <Input
            variant='bordered'
            placeholder='Apartment, suite, unit, etc.'
            {...donorForm.register('addressLine2')}
            isInvalid={!!donorForm.formState.errors.addressLine2 || hasServerError('addressLine2')}
            errorMessage={getErrorMessage('addressLine2')}
            className='w-full'
          />
        </div>

        <div className='mt-4 flex flex-col justify-center gap-4 sm:flex-row md:col-span-2'>
          <Button
            type='submit'
            color='primary'
            variant='shadow'
            className='px-8 py-2 font-medium'
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Creating Account...'
              : 'Create Donor Account'}
          </Button>
          <Button
            type='button'
            variant='bordered'
            className='px-8 py-2'
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default DonorForm;