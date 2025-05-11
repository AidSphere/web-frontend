'use client';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
} from '@heroui/react';
import { useState } from 'react';
import { User } from 'lucide-react';
import { PatientForm, DonorForm, DrugImporterForm } from './_components';

const CreateAccount = () => {
  const [activeTab, setActiveTab] = useState('patient');

  const handleCancel = () => {
    // This is a shared cancel handler if needed
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
            onSelectionChange={(key) => setActiveTab(key.toString())}
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
              <PatientForm onCancel={handleCancel} />
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
              <DonorForm onCancel={handleCancel} />
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
              <DrugImporterForm onCancel={handleCancel} />
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
