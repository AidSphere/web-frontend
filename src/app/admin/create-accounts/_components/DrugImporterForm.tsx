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
  Upload,
  User,
  Phone,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { useState } from 'react';
import AdminService from '@/service/AdminService';

// Drug Importer schema
const drugImporterSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  nic: z.string().min(5, 'NIC number must be at least 5 characters').max(20, 'NIC number cannot exceed 20 characters'),
  phone: z.string().min(10, 'Valid phone number is required')
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Phone number format is not valid'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  licenceNumber: z.string().min(1, 'Licence number is required'),
  website: z.string().optional()
    .refine(val => !val || /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/.test(val), 
      { message: 'Invalid website URL format' }),
  additionalText: z.string().max(1000, 'Additional text cannot exceed 1000 characters').optional(),
  licenceUpload: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Licence upload is required'),
});

const DrugImporterForm = ({ onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  // Drug Importer form
  const drugImporterForm = useForm({
    resolver: zodResolver(drugImporterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      nic: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      licenceNumber: '',
      website: '',
      additionalText: '',
    },
  });

  const onDrugImporterSubmit = async (data) => {
    setIsSubmitting(true);
    setServerErrors({});
    
    try {
      // Upload license document
      const licenseFile = data.licenceUpload[0];
      //const licenseProofUrl = await AdminService.uploadFile(licenseFile, 'importer-license');

      // Create drug importer DTO
      const drugImporterData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.addressLine1 + (data.addressLine2 ? ', ' + data.addressLine2 : ''),
        licenseNumber: data.licenceNumber,
        website: data.website || '',
        nic: data.nic,
        additionalText: data.additionalText || '',
        // Set fake values for URL fields (not visible in UI)
        licenseProofUrl: "https://example.com/licenses/12345",
        nicotineProofUrl: "https://example.com/documents/54321"
      };

      // Call API to register drug importer
      const response = await AdminService.createDrugImporter(drugImporterData);
      
      // Check if the operation was successful based on the success flag
      if (response.success) {
        // Show success toast with the message from the API if available
        addToast({
          title: "Success",
          description: response.message || "Drug Importer account created successfully"
        });
        
        // Reset the form after successful submission
        drugImporterForm.reset();
      } else {
        // Handle error response
        console.warn('Error creating drug importer:', response.message);
        
        // Handle different types of errors
        if (response.status === 409) {
          // Handle duplicate data - show field-specific errors
          if (response.message.toLowerCase().includes('email')) {
            setServerErrors(prev => ({ ...prev, email: response.message }));
          } else if (response.message.toLowerCase().includes('nic')) {
            setServerErrors(prev => ({ ...prev, nic: response.message }));
          } else {
            addToast({
              title: "Error",
              description: response.message,
              hideIcon: false
            });
          }
        } else if (response.status === 400 || response.status === 422) {
          // Validation errors - display the error message
          addToast({
            title: "Validation Error",
            description: response.message || "Invalid drug importer information provided"
          });
          
          // If there are field-specific errors in the response, set them on the form
          if (response.data?.errors) {
            Object.entries(response.data.errors).forEach(([field, message]) => {
              if (drugImporterForm.getValues(field) !== undefined) {
                drugImporterForm.setError(field, { type: 'server', message: message as string });
              }
            });
          }
        } else {
          // General error
          addToast({
            title: "Error",
            description: response.message || 'Failed to create drug importer account'
          });
        }
      }
    } catch (error) {
      // This catch block should rarely be reached now that errors are handled in the service
      console.error('Unexpected error in drug importer form submission:', error);
      addToast({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    drugImporterForm.reset();
    setServerErrors({});
    if (onCancel) onCancel();
  };

  // Helper function to check if a field has a server error
  const hasServerError = (fieldName) => {
    return serverErrors[fieldName] !== undefined;
  };

  // Helper function to get combined error message (from Zod or server)
  const getErrorMessage = (fieldName) => {
    return drugImporterForm.formState.errors[fieldName]?.message || serverErrors[fieldName] || '';
  };

  return (
    <>
      <div className='mb-4 mt-6'>
        <h2 className='mb-2 text-xl font-semibold text-gray-800'>
          Drug Importer Registration
        </h2>
        <p className='mb-4 text-gray-600'>
          Create a drug importer account to manage your pharmaceutical
          inventory, track shipments, and connect with healthcare
          providers.
        </p>
        <Divider className='my-4' />
      </div>

      <form
        className='grid grid-cols-1 gap-6 md:grid-cols-2'
        onSubmit={drugImporterForm.handleSubmit(onDrugImporterSubmit)}
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
            {...drugImporterForm.register('firstName')}
            isInvalid={!!drugImporterForm.formState.errors.firstName || hasServerError('firstName')}
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
            {...drugImporterForm.register('lastName')}
            isInvalid={!!drugImporterForm.formState.errors.lastName || hasServerError('lastName')}
            errorMessage={getErrorMessage('lastName')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <User size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Email
            </label>
          </div>
          <Input
            variant='bordered'
            type='email'
            placeholder='Enter your email address'
            {...drugImporterForm.register('email')}
            isInvalid={!!drugImporterForm.formState.errors.email || hasServerError('email')}
            errorMessage={getErrorMessage('email')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <CreditCard size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Password
            </label>
            <Tooltip content='Minimum 8 characters required'>
              <InfoIcon
                size={14}
                className='cursor-help text-gray-400'
              />
            </Tooltip>
          </div>
          <Input
            variant='bordered'
            type='password'
            placeholder='Enter your password'
            {...drugImporterForm.register('password')}
            isInvalid={!!drugImporterForm.formState.errors.password || hasServerError('password')}
            errorMessage={getErrorMessage('password')}
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
            {...drugImporterForm.register('nic')}
            isInvalid={!!drugImporterForm.formState.errors.nic || hasServerError('nic')}
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
            {...drugImporterForm.register('phone')}
            isInvalid={!!drugImporterForm.formState.errors.phone || hasServerError('phone')}
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
            {...drugImporterForm.register('addressLine1')}
            isInvalid={!!drugImporterForm.formState.errors.addressLine1 || hasServerError('addressLine1')}
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
            {...drugImporterForm.register('addressLine2')}
            isInvalid={!!drugImporterForm.formState.errors.addressLine2 || hasServerError('addressLine2')}
            errorMessage={getErrorMessage('addressLine2')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <CreditCard size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Licence Number
            </label>
            <Tooltip content='Your pharmaceutical import licence number'>
              <InfoIcon
                size={14}
                className='cursor-help text-gray-400'
              />
            </Tooltip>
          </div>
          <Input
            variant='bordered'
            placeholder='Enter your licence number'
            {...drugImporterForm.register('licenceNumber')}
            isInvalid={!!drugImporterForm.formState.errors.licenceNumber || hasServerError('licenceNumber')}
            errorMessage={getErrorMessage('licenceNumber')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <Upload size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Licence Upload
            </label>
            <Tooltip content='Upload a scanned copy of your pharmaceutical import licence'>
              <InfoIcon
                size={14}
                className='cursor-help text-gray-400'
              />
            </Tooltip>
          </div>
          <Input
            type='file'
            variant='bordered'
            {...drugImporterForm.register('licenceUpload')}
            isInvalid={!!drugImporterForm.formState.errors.licenceUpload || hasServerError('licenceUpload')}
            errorMessage={getErrorMessage('licenceUpload')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <InfoIcon size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Website (Optional)
            </label>
          </div>
          <Input
            variant='bordered'
            placeholder='Enter your company website'
            {...drugImporterForm.register('website')}
            isInvalid={!!drugImporterForm.formState.errors.website || hasServerError('website')}
            errorMessage={getErrorMessage('website')}
            className='w-full'
          />
        </div>

        <div className='space-y-1 md:col-span-2'>
          <div className='flex items-center gap-1'>
            <InfoIcon size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Additional Information (Optional)
            </label>
          </div>
          <Input
            component="textarea"
            variant='bordered'
            placeholder='Enter any additional information'
            rows={3}
            {...drugImporterForm.register('additionalText')}
            isInvalid={!!drugImporterForm.formState.errors.additionalText || hasServerError('additionalText')}
            errorMessage={getErrorMessage('additionalText')}
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
              : 'Create Drug Importer Account'}
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

export default DrugImporterForm;