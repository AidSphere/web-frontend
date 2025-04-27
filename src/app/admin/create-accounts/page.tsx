'use client';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Button,
  Divider,
  Tooltip,
} from '@heroui/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  InfoIcon,
  Upload,
  User,
  Phone,
  MapPin,
  Lock,
  FileText,
  CreditCard,
} from 'lucide-react';

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

// Donor schema
const donorSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  nic: z.string().min(1, 'NIC number is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
});

// Drug Importer schema
const drugImporterSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  nic: z.string().min(1, 'NIC number is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  licenceNumber: z.string().min(1, 'Licence number is required'),
  licenceUpload: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Licence upload is required'),
});

const CreateAccount = () => {
  const [activeTab, setActiveTab] = useState('patient');
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

  // Donor form
  const donorForm = useForm({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nic: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
    },
  });

  // Drug Importer form
  const drugImporterForm = useForm({
    resolver: zodResolver(drugImporterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nic: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      licenceNumber: '',
    },
  });

  // Form submission handlers
  const onPatientSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Patient form:', data);
      // Show success message or redirect
    } catch (error) {
      console.error('Error submitting patient form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDonorSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Donor form:', data);
      // Show success message or redirect
    } catch (error) {
      console.error('Error submitting donor form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDrugImporterSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Drug Importer form:', data);
      // Show success message or redirect
    } catch (error) {
      console.error('Error submitting drug importer form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset the form based on active tab
    if (activeTab === 'patient') {
      patientForm.reset();
    } else if (activeTab === 'donor') {
      donorForm.reset();
    } else {
      drugImporterForm.reset();
    }
  };

  return (
    <div className='flex w-full flex-col rounded-xl bg-gradient-to-b from-gray-50 to-white p-6 shadow-sm'>
      <div className='mb-8 text-center'>
        <h1 className='mb-2 text-3xl font-bold text-gray-800'>
          Create Your Account
        </h1>
        <p className='mx-auto max-w-2xl text-gray-600'>
          Join our healthcare platform to connect with patients, donors, and
          medical suppliers. Select your account type below to get started.
        </p>
      </div>

      <Card className='mx-auto w-full max-w-4xl shadow-md'>
        <CardBody>
          <Tabs
            aria-label='Account Creation Forms'
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
            classNames={{
              tabList: 'gap-2 w-full relative rounded-xl p-1 bg-gray-100',
              cursor: 'bg-white shadow-md',
              tab: 'max-w-fit px-4 h-10 font-medium',
              tabContent: 'group-data-[selected=true]:text-primary',
            }}
          >
            <Tab
              key='patient'
              title={
                <div className='flex items-center gap-2'>
                  <User size={18} />
                  <span>Patient</span>
                </div>
              }
            >
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
            </Tab>

            <Tab
              key='donor'
              title={
                <div className='flex items-center gap-2'>
                  <User size={18} />
                  <span>Donor</span>
                </div>
              }
            >
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
                    isInvalid={!!donorForm.formState.errors.firstName}
                    errorMessage={donorForm.formState.errors.firstName?.message}
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
                    isInvalid={!!donorForm.formState.errors.lastName}
                    errorMessage={donorForm.formState.errors.lastName?.message}
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
                    isInvalid={!!donorForm.formState.errors.nic}
                    errorMessage={donorForm.formState.errors.nic?.message}
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
                    isInvalid={!!donorForm.formState.errors.phone}
                    errorMessage={donorForm.formState.errors.phone?.message}
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
                    isInvalid={!!donorForm.formState.errors.addressLine1}
                    errorMessage={
                      donorForm.formState.errors.addressLine1?.message
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
                    {...donorForm.register('addressLine2')}
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
            </Tab>

            <Tab
              key='drugImporter'
              title={
                <div className='flex items-center gap-2'>
                  <User size={18} />
                  <span>Drug Importer</span>
                </div>
              }
            >
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
                    isInvalid={!!drugImporterForm.formState.errors.firstName}
                    errorMessage={
                      drugImporterForm.formState.errors.firstName?.message
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
                    {...drugImporterForm.register('lastName')}
                    isInvalid={!!drugImporterForm.formState.errors.lastName}
                    errorMessage={
                      drugImporterForm.formState.errors.lastName?.message
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
                    {...drugImporterForm.register('nic')}
                    isInvalid={!!drugImporterForm.formState.errors.nic}
                    errorMessage={
                      drugImporterForm.formState.errors.nic?.message
                    }
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
                    isInvalid={!!drugImporterForm.formState.errors.phone}
                    errorMessage={
                      drugImporterForm.formState.errors.phone?.message
                    }
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
                    isInvalid={!!drugImporterForm.formState.errors.addressLine1}
                    errorMessage={
                      drugImporterForm.formState.errors.addressLine1?.message
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
                    {...drugImporterForm.register('addressLine2')}
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
                    isInvalid={
                      !!drugImporterForm.formState.errors.licenceNumber
                    }
                    errorMessage={
                      drugImporterForm.formState.errors.licenceNumber?.message
                    }
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
                    isInvalid={
                      !!drugImporterForm.formState.errors.licenceUpload
                    }
                    errorMessage={
                      drugImporterForm.formState.errors.licenceUpload?.message
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
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <div className='mt-8 text-center text-sm text-gray-500'>
        <p className='mt-2'>
          By creating an account, you agree to our{' '}
          <a href='/terms' className='text-primary hover:underline'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='/privacy' className='text-primary hover:underline'>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
