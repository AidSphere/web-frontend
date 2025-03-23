'use client';
import { Tabs, Tab, Card, CardBody, Input, Button } from '@heroui/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

// Patient schema
const patientSchema = z
  .object({
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
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

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

// Drug Importer schema
const drugImporterSchema = z
  .object({
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
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const CreateAccount = () => {
  const [activeTab, setActiveTab] = useState('patient');

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
      password: '',
      confirmPassword: '',
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
      password: '',
      confirmPassword: '',
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
      password: '',
      confirmPassword: '',
    },
  });

  // Form submission handlers
  const onPatientSubmit = (data) => console.log('Patient form:', data);
  const onDonorSubmit = (data) => console.log('Donor form:', data);
  const onDrugImporterSubmit = (data) =>
    console.log('Drug Importer form:', data);

  return (
    <div className='flex w-full flex-col'>
      <Tabs
        aria-label='Account Creation Forms'
        selectedKey={activeTab}
        onSelectionChange={setActiveTab}
      >
        <Tab key='patient' title='Patient'>
          <h1 className='m-5 text-center text-2xl font-bold'>
            Patient Account Creation
          </h1>
          <form
            className='grid grid-cols-2 gap-4'
            onSubmit={patientForm.handleSubmit(onPatientSubmit)}
          >
            <div className='flex flex-col'>
              <Input
                label='First Name'
                variant='faded'
                {...patientForm.register('firstName')}
                isInvalid={!!patientForm.formState.errors.firstName}
                errorMessage={patientForm.formState.errors.firstName?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Last Name'
                variant='faded'
                {...patientForm.register('lastName')}
                isInvalid={!!patientForm.formState.errors.lastName}
                errorMessage={patientForm.formState.errors.lastName?.message}
              />
            </div>
            {/* Continue with other fields similarly */}
            <div className='flex flex-col'>
              <Input
                label='NIC Number'
                variant='faded'
                {...patientForm.register('nic')}
                isInvalid={!!patientForm.formState.errors.nic}
                errorMessage={patientForm.formState.errors.nic?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Phone Number'
                variant='faded'
                {...patientForm.register('phone')}
                isInvalid={!!patientForm.formState.errors.phone}
                errorMessage={patientForm.formState.errors.phone?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Address Line 1'
                variant='faded'
                {...patientForm.register('addressLine1')}
                isInvalid={!!patientForm.formState.errors.addressLine1}
                errorMessage={
                  patientForm.formState.errors.addressLine1?.message
                }
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Address Line 2'
                variant='faded'
                {...patientForm.register('addressLine2')}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='NIC Upload'
                variant='faded'
                type='file'
                {...patientForm.register('nicUpload')}
                isInvalid={!!patientForm.formState.errors.nicUpload}
                errorMessage={patientForm.formState.errors.nicUpload?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Diagnose Report Upload'
                type='file'
                variant='faded'
                {...patientForm.register('diagnoseReport')}
                isInvalid={!!patientForm.formState.errors.diagnoseReport}
                errorMessage={
                  patientForm.formState.errors.diagnoseReport?.message
                }
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Password'
                variant='faded'
                type='password'
                {...patientForm.register('password')}
                isInvalid={!!patientForm.formState.errors.password}
                errorMessage={patientForm.formState.errors.password?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Re-Enter Password'
                variant='faded'
                type='password'
                {...patientForm.register('confirmPassword')}
                isInvalid={!!patientForm.formState.errors.confirmPassword}
                errorMessage={
                  patientForm.formState.errors.confirmPassword?.message
                }
              />
            </div>
            <div className='col-span-2 flex flex-row justify-center gap-3'>
              <Button type='submit' variant='shadow' className='col-span-2'>
                Create Account
              </Button>
              <Button type='button' variant='shadow' className='col-span-2'>
                Cancel
              </Button>
            </div>
          </form>
        </Tab>

        <Tab key='donor' title='Donor'>
          <h1 className='m-5 text-center text-2xl font-bold'>
            Donor Account Creation
          </h1>
          <form
            className='grid grid-cols-2 gap-4'
            onSubmit={donorForm.handleSubmit(onDonorSubmit)}
          >
            <div className='flex flex-col'>
              <Input
                label='First Name'
                variant='faded'
                {...donorForm.register('firstName')}
                isInvalid={!!donorForm.formState.errors.firstName}
                errorMessage={donorForm.formState.errors.firstName?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Last Name'
                variant='faded'
                {...donorForm.register('lastName')}
                isInvalid={!!donorForm.formState.errors.lastName}
                errorMessage={donorForm.formState.errors.lastName?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='NIC Number'
                variant='faded'
                {...donorForm.register('nic')}
                isInvalid={!!donorForm.formState.errors.nic}
                errorMessage={donorForm.formState.errors.nic?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Phone Number'
                variant='faded'
                {...donorForm.register('phone')}
                isInvalid={!!donorForm.formState.errors.phone}
                errorMessage={donorForm.formState.errors.phone?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Address Line 1'
                variant='faded'
                {...donorForm.register('addressLine1')}
                isInvalid={!!donorForm.formState.errors.addressLine1}
                errorMessage={donorForm.formState.errors.addressLine1?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Address Line 2'
                variant='faded'
                {...donorForm.register('addressLine2')}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Password'
                variant='faded'
                type='password'
                {...donorForm.register('password')}
                isInvalid={!!donorForm.formState.errors.password}
                errorMessage={donorForm.formState.errors.password?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Re-Enter Password'
                variant='faded'
                type='password'
                {...donorForm.register('confirmPassword')}
                isInvalid={!!donorForm.formState.errors.confirmPassword}
                errorMessage={
                  donorForm.formState.errors.confirmPassword?.message
                }
              />
            </div>
            <div className='col-span-2 flex flex-row justify-center gap-3'>
              <Button type='submit' variant='shadow' className='col-span-2'>
                Create Account
              </Button>
              <Button type='button' variant='shadow' className='col-span-2'>
                Cancel
              </Button>
            </div>
          </form>
        </Tab>

        <Tab key='drugImporter' title='Drug Importer'>
          <h1 className='m-5 text-center text-2xl font-bold'>
            Drug Importer Account Creation
          </h1>
          <form
            className='grid grid-cols-2 gap-4'
            onSubmit={drugImporterForm.handleSubmit(onDrugImporterSubmit)}
          >
            <div className='flex flex-col'>
              <Input
                label='First Name'
                variant='faded'
                {...drugImporterForm.register('firstName')}
                isInvalid={!!drugImporterForm.formState.errors.firstName}
                errorMessage={
                  drugImporterForm.formState.errors.firstName?.message
                }
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Last Name'
                variant='faded'
                {...drugImporterForm.register('lastName')}
                isInvalid={!!drugImporterForm.formState.errors.lastName}
                errorMessage={
                  drugImporterForm.formState.errors.lastName?.message
                }
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='NIC Number'
                variant='faded'
                {...drugImporterForm.register('nic')}
                isInvalid={!!drugImporterForm.formState.errors.nic}
                errorMessage={drugImporterForm.formState.errors.nic?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Phone Number'
                variant='faded'
                {...drugImporterForm.register('phone')}
                isInvalid={!!drugImporterForm.formState.errors.phone}
                errorMessage={drugImporterForm.formState.errors.phone?.message}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Address Line 1'
                variant='faded'
                {...drugImporterForm.register('addressLine1')}
                isInvalid={!!drugImporterForm.formState.errors.addressLine1}
                errorMessage={
                  drugImporterForm.formState.errors.addressLine1?.message
                }
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Address Line 2'
                variant='faded'
                {...drugImporterForm.register('addressLine2')}
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Licence Number'
                variant='faded'
                {...drugImporterForm.register('licenceNumber')}
                isInvalid={!!drugImporterForm.formState.errors.licenceNumber}
                errorMessage={
                  drugImporterForm.formState.errors.licenceNumber?.message
                }
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Licence Upload'
                variant='faded'
                type='file'
                {...drugImporterForm.register('licenceUpload')}
                isInvalid={!!drugImporterForm.formState.errors.licenceUpload}
                errorMessage={
                  drugImporterForm.formState.errors.licenceUpload?.message
                }
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Password'
                variant='faded'
                type='password'
                {...drugImporterForm.register('password')}
                isInvalid={!!drugImporterForm.formState.errors.password}
                errorMessage={
                  drugImporterForm.formState.errors.password?.message
                }
              />
            </div>
            <div className='flex flex-col'>
              <Input
                label='Re-Enter Password'
                variant='faded'
                type='password'
                {...drugImporterForm.register('confirmPassword')}
                isInvalid={!!drugImporterForm.formState.errors.confirmPassword}
                errorMessage={
                  drugImporterForm.formState.errors.confirmPassword?.message
                }
              />
            </div>
            <div className='col-span-2 flex flex-row justify-center gap-3'>
              <Button type='submit' variant='shadow' className='col-span-2'>
                Create Account
              </Button>
              <Button type='button' variant='shadow' className='col-span-2'>
                Cancel
              </Button>
            </div>
          </form>
        </Tab>
      </Tabs>
    </div>
  );
};

export default CreateAccount;
