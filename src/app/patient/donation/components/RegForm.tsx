'use client';
import { Button } from '@heroui/button';
import { Form } from '@heroui/react';
import { Input, Textarea } from '@heroui/react';
import { Select, SelectItem } from '@heroui/react';
import { DatePicker } from '@heroui/react';
import { RadioGroup, Radio } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardBody } from '@heroui/react';
import Image from 'next/image';
import { PatientFormData, patientSchema } from '../../_types/regFormTypes';
import React from 'react';
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
} from '@internationalized/date';
import { z } from 'zod';

// Form Values Type inferred from zod schema
type FormValues = z.infer<typeof patientSchema>;

export default function CreatePatientForm() {
  const [showSuccess, setShowSuccess] = React.useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: parseAbsoluteToLocal(new Date().toISOString()),
      // currentAddress: '',
      // email: '',
      // phoneNumber: '',
    },
  });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setShowSuccess(true);
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: FormValues) => {
    console.log('Submitted Data');
    console.log(data);
  };

  return (
    <div>
      {!showSuccess ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-3 flex w-full flex-col gap-4'>
            <Controller
              control={control}
              name='firstName'
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  maxLength={50}
                  isRequired
                  errorMessage={error?.message}
                  validationBehavior='aria'
                  isInvalid={invalid}
                  label='First Name'
                  labelPlacement='outside'
                  placeholder=' '
                  className='font-semibold'
                />
              )}
            />
            <Controller
              control={control}
              name='lastName'
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  maxLength={50}
                  isRequired
                  errorMessage={error?.message}
                  validationBehavior='aria'
                  isInvalid={invalid}
                  label='Last Name'
                  labelPlacement='outside'
                  placeholder=' '
                  className='font-semibold'
                />
              )}
            />
            <Controller
              control={control}
              name='dateOfBirth'
              render={({ field, fieldState: { invalid, error } }) => (
                <DatePicker
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  label='Date of Birth'
                  labelPlacement='outside'
                  granularity='day'
                  className='font-semibold'
                  maxValue={today(getLocalTimeZone())}
                />
              )}
            />
            <Controller
              control={control}
              name='gender'
              render={({ field, fieldState: { invalid, error } }) => (
                <RadioGroup
                  {...field}
                  validationBehavior='aria'
                  label='Gender'
                  errorMessage={error?.message}
                  orientation='horizontal'
                  isRequired
                  isInvalid={invalid}
                  size='sm'
                  className='font-semibold'
                >
                  <Radio value='Male'>Male</Radio>
                  <Radio value='Female'>Female</Radio>
                  <Radio value='Other'>Other</Radio>
                </RadioGroup>
              )}
            />
            <Controller
              control={control}
              name='phoneNumber'
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  maxLength={15}
                  isRequired
                  errorMessage={error?.message}
                  validationBehavior='aria'
                  isInvalid={invalid}
                  label='Phone Number'
                  labelPlacement='outside'
                  placeholder='+1234567890'
                  className='font-semibold'
                />
              )}
            />
            <Controller
              control={control}
              name='email'
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  type='email'
                  errorMessage={error?.message}
                  validationBehavior='aria'
                  isInvalid={invalid}
                  label='Email (Optional)'
                  labelPlacement='outside'
                  placeholder='example@mail.com'
                  className='font-semibold'
                />
              )}
            />
            <Controller
              control={control}
              name='permanentAddress'
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  type='text'
                  isRequired
                  errorMessage={error?.message}
                  validationBehavior='aria'
                  isInvalid={invalid}
                  label='Permanent Address'
                  labelPlacement='outside'
                  placeholder=' '
                  className='font-semibold'
                />
              )}
            />
            <Controller
              control={control}
              name='currentAddress'
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  errorMessage={error?.message}
                  validationBehavior='aria'
                  isInvalid={invalid}
                  label='Current Address (Optional)'
                  labelPlacement='outside'
                  placeholder=' '
                  className='font-semibold'
                />
              )}
            />
            <Controller
              control={control}
              name='profileImage'
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  type='file'
                  accept='image/png, image/jpeg'
                  isRequired
                  errorMessage={error?.message}
                  validationBehavior='aria'
                  isInvalid={invalid}
                  label='Profile Image'
                  labelPlacement='outside'
                  className='font-semibold'
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              )}
            />
            <Controller
              control={control}
              name='governmentIdType'
              render={({ field, fieldState: { invalid, error } }) => (
                <Select
                  {...field}
                  validationBehavior='aria'
                  isRequired
                  errorMessage={error?.message}
                  isInvalid={invalid}
                  label='Government ID Type'
                  labelPlacement='outside'
                  placeholder='Select ID Type'
                  className='font-semibold'
                >
                  <SelectItem key='NIC' textValue='NIC'>
                    NIC
                  </SelectItem>
                  <SelectItem
                    key='BIRTH_CERTIFICATE'
                    textValue='Birth Certificate'
                  >
                    Birth Certificate
                  </SelectItem>
                  <SelectItem key='PASSPORT' textValue='Passport'>
                    Passport
                  </SelectItem>
                </Select>
              )}
            />
            <Controller
              control={control}
              name='governmentIdNumber'
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  maxLength={20}
                  isRequired
                  errorMessage={error?.message}
                  validationBehavior='aria'
                  isInvalid={invalid}
                  label='Government ID Number'
                  labelPlacement='outside'
                  placeholder=' '
                  className='font-semibold'
                />
              )}
            />
            <Controller
              control={control}
              name='governmentIdDocument'
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  type='file'
                  accept='image/png, image/jpeg, application/pdf'
                  isRequired
                  errorMessage={error?.message}
                  validationBehavior='aria'
                  isInvalid={invalid}
                  label='Government ID Document'
                  labelPlacement='outside'
                  className='font-semibold'
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              )}
            />
            <Button
              variant='solid'
              color='primary'
              type='submit'
              size='md'
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Submitting' : 'Create'}
            </Button>
          </div>
        </Form>
      ) : (
        <Card className='min-h-[400px]'>
          <CardBody className='flex justify-center'>
            <div className='text-center'>
              <Image
                alt='success'
                src='/success.svg'
                width={150}
                height={150}
              />
              <h2 className='text-xl font-semibold'>
                Patient Registered Successfully
              </h2>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
