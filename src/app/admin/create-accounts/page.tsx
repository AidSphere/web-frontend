'use client';
import { useState, useEffect } from 'react';
import {
  RadioGroup,
  Radio,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react';

const CreateAccount = () => {
  const [accountType, setAccountType] = useState<string>('patient');
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    email: '',
    birthDate: '',
    gender: '',
    phone: '',
    address1: '',
    address2: '',
    password: '',
    confirmPassword: '',
    diagnosisReport: '',
    medicalHistory: '',
    licenceNumber: '',
    verificationDocuments: '',
  });

  useEffect(() => {
    console.log('Account Type Changed:', accountType);
  }, [accountType]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setFormData({
      fullName: '',
      nic: '',
      email: '',
      birthDate: '',
      gender: '',
      phone: '',
      address1: '',
      address2: '',
      password: '',
      confirmPassword: '',
      diagnosisReport: '',
      medicalHistory: '',
      licenceNumber: '',
      verificationDocuments: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', { ...formData, accountType });
    clearForm();
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-center text-2xl font-bold'>Create Account</h1>

      {/* Radio Button Group */}
      <div className='flex justify-center space-x-7 p-5'>
        <RadioGroup
          orientation='horizontal'
          value={accountType}
          onValueChange={(value) => setAccountType(value)}
        >
          <Radio value='patient'>Patient</Radio>
          <Radio value='donor'>Donor</Radio>
          <Radio value='drug-importer'>Drug Importer</Radio>
        </RadioGroup>
      </div>

      {/* Form */}
      <form
        className='grid w-full max-w-2xl grid-cols-2 gap-5 p-5'
        onSubmit={handleSubmit}
      >
        <Input
          name='fullName'
          label='Full Name'
          size='sm'
          type='text'
          value={formData.fullName}
          onChange={handleChange}
        />
        <Input
          name='nic'
          label='NIC Number'
          size='sm'
          type='text'
          value={formData.nic}
          onChange={handleChange}
        />
        <Input
          name='email'
          label='Email'
          size='sm'
          type='email'
          value={formData.email}
          onChange={handleChange}
        />
        {/* <DateInput name='birthDate' variant='underlined' className='w-full' label='Birth Date' value={formData.birthDate} onChange={handleChange} /> */}
        <Select
          name='gender'
          label='Gender'
          value={formData.gender}
          onChange={handleChange}
        >
          <SelectItem key='male'>Male</SelectItem>
          <SelectItem key='female'>Female</SelectItem>
          <SelectItem key='other'>Other</SelectItem>
        </Select>
        <Input
          name='phone'
          label='Phone Number'
          size='sm'
          type='tel'
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          name='address1'
          label='Address Line 1'
          size='sm'
          type='text'
          value={formData.address1}
          onChange={handleChange}
        />
        <Input
          name='address2'
          label='Address Line 2'
          size='sm'
          type='text'
          value={formData.address2}
          onChange={handleChange}
        />
        <Input
          name='password'
          label='Password'
          size='sm'
          type='password'
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          name='confirmPassword'
          label='Confirm Password'
          size='sm'
          type='password'
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {accountType === 'patient' && (
          <>
            <Input
              name='diagnosisReport'
              label='Upload Diagnosis Report'
              className='col-span-2'
              value={formData.diagnosisReport}
              onChange={handleChange}
            />
            <Textarea
              name='medicalHistory'
              label='Medical History'
              className='col-span-2'
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </>
        )}

        {accountType === 'drug-importer' && (
          <>
            <Input
              name='licenceNumber'
              label='Licence Number'
              className='col-span-2'
              value={formData.licenceNumber}
              onChange={handleChange}
            />
            <Input
              name='verificationDocuments'
              label='Upload Verification Documents'
              className='col-span-2'
              value={formData.verificationDocuments}
              onChange={handleChange}
            />
          </>
        )}

        <div className='col-span-2 flex justify-center gap-5'>
          <Button type='submit' color='success' variant='shadow'>
            Create Account
          </Button>
          <Button
            color='danger'
            variant='shadow'
            type='button'
            onClick={clearForm}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
