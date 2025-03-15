'use client';
import { useState, useEffect } from 'react';
import {
  RadioGroup,
  Radio,
  Button,
  Input,
  DateInput,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react';

const CreateAccount = () => {
  const [accountType, setAccountType] = useState<string>('patient');

  useEffect(() => {
    console.log('Account Type Changed:', accountType);
  }, [accountType]);

  return (
    <div className='flex flex-col items-center p-5'>
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

      {/* Render forms based on account type */}
      <form className='grid w-full max-w-2xl grid-cols-2 gap-5 p-5'>
        <Input label='Full Name' size='sm' type='text' />
        <Input label='NIC Number' size='sm' type='text' />
        <Input label='Email' size='sm' type='email' />
        <DateInput variant='underlined' className='w-full' label='Birth Date' />
        <Select label='Gender'>
          <SelectItem key='male'>Male</SelectItem>
          <SelectItem key='female'>Female</SelectItem>
          <SelectItem key='other'>Other</SelectItem>
        </Select>
        <Input label='Phone Number' size='sm' type='tel' />
        <Input label='Address Line 1' size='sm' type='text' />
        <Input label='Address Line 2' size='sm' type='text' />
        <Input label='Password' size='sm' type='password' />
        <Input label='Confirm Password' size='sm' type='password' />

        {accountType === 'patient' && (
          <>
            <Input label='Upload Diagnosis Report' className='col-span-2' />
            <Textarea label='Medical History' className='col-span-2' />
          </>
        )}

        {accountType === 'drug-importer' && (
          <>
            <Input label='Licence Number' className='col-span-2' />
            <Input
              label='Upload Verification Documents'
              className='col-span-2'
            />
          </>
        )}

        <div className='col-span-2 flex justify-center gap-5'>
          <Button color='success' variant='shadow'>
            Create Account
          </Button>
          <Button color='danger' variant='shadow'>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
