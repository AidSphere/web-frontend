'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  Button,
  Tooltip,
  Divider,
  toast,
} from '@heroui/react';
import {
  InfoIcon,
  Upload,
  User,
  Phone,
  MapPin,
  FileText,
  CreditCard,
} from 'lucide-react';
import { useState } from 'react';
import AdminService from '@/service/AdminService';

// Patient schema
const patientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  nic: z.string().min(1, 'NIC number is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  nicUpload: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'NIC upload is required'),
  diagnoseReport: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Diagnose report is required'),
});

const PatientForm = ({ onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Patient form
  const patientForm = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nic: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
    },
  });

  const onPatientSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Upload NIC document
      const nicFile = data.nicUpload[0];
      const nicDocumentUrl = await AdminService.uploadFile(nicFile, 'patient-nic');

      // Upload diagnose report
      const diagnoseFile = data.diagnoseReport[0];
      const diagnoseReportUrl = await AdminService.uploadFile(diagnoseFile, 'patient-diagnose');

      // Create patient DTO
      const patientData = {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(), // This should be captured from the form
        gender: 'MALE', // This should be captured from the form
        phoneNumber: data.phone,
        email: 'patient@example.com', // This should be captured from the form
        permanentAddress: data.addressLine1 + (data.addressLine2 ? ', ' + data.addressLine2 : ''),
        currentAddress: data.addressLine1 + (data.addressLine2 ? ', ' + data.addressLine2 : ''),
        profileImageUrl: '', // Optional
        governmentIdType: 'NIC', // This should be a dropdown in the form
        governmentIdNumber: data.nic,
        governmentIdDocumentUrl: nicDocumentUrl
      };

      // Call API to register patient
      const response = await AdminService.createPatient(patientData);
      
      // Show success toast
      toast.success("Patient account created successfully");
      patientForm.reset();
      
    } catch (error) {
      console.error('Error submitting patient form:', error);
      
      // Show error toast
      toast.error(error.response?.data?.message || 'Failed to create patient account');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    patientForm.reset();
    if (onCancel) onCancel();
  };

  return (
    <>
      <div className='mb-4 mt-6'>
        <h2 className='mb-2 text-xl font-semibold text-gray-800'>
          Patient Registration
        </h2>
        <p className='mb-4 text-gray-600'>
          Create a patient account to access medical services, track
          your treatments, and connect with healthcare providers.
        </p>
        <Divider className='my-4' />
      </div>

      <form
        className='grid grid-cols-1 gap-6 md:grid-cols-2'
        onSubmit={patientForm.handleSubmit(onPatientSubmit)}
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
            {...patientForm.register('firstName')}
            isInvalid={!!patientForm.formState.errors.firstName}
            errorMessage={
              patientForm.formState.errors.firstName?.message
            }
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
            {...patientForm.register('lastName')}
            isInvalid={!!patientForm.formState.errors.lastName}
            errorMessage={
              patientForm.formState.errors.lastName?.message
            }
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
            {...patientForm.register('nic')}
            isInvalid={!!patientForm.formState.errors.nic}
            errorMessage={patientForm.formState.errors.nic?.message}
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
            {...patientForm.register('phone')}
            isInvalid={!!patientForm.formState.errors.phone}
            errorMessage={patientForm.formState.errors.phone?.message}
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
            {...patientForm.register('addressLine1')}
            isInvalid={!!patientForm.formState.errors.addressLine1}
            errorMessage={
              patientForm.formState.errors.addressLine1?.message
            }
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
            {...patientForm.register('addressLine2')}
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <Upload size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              NIC Upload
            </label>
            <Tooltip content='Upload a scanned copy or clear photo of your National Identity Card'>
              <InfoIcon
                size={14}
                className='cursor-help text-gray-400'
              />
            </Tooltip>
          </div>
          <Input
            type='file'
            variant='bordered'
            {...patientForm.register('nicUpload')}
            isInvalid={!!patientForm.formState.errors.nicUpload}
            errorMessage={
              patientForm.formState.errors.nicUpload?.message
            }
            className='w-full'
          />
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-1'>
            <FileText size={16} className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>
              Diagnose Report
            </label>
            <Tooltip content='Upload your most recent medical diagnosis report'>
              <InfoIcon
                size={14}
                className='cursor-help text-gray-400'
              />
            </Tooltip>
          </div>
          <Input
            type='file'
            variant='bordered'
            {...patientForm.register('diagnoseReport')}
            isInvalid={!!patientForm.formState.errors.diagnoseReport}
            errorMessage={
              patientForm.formState.errors.diagnoseReport?.message
            }
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
              : 'Create Patient Account'}
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

export default PatientForm;