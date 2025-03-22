import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup,
  Radio,
} from '@heroui/react';
import { useForm, Controller } from 'react-hook-form';

export default function SponsorFormModal({
  children,
  data,
}: {
  children: React.ReactNode;
  data: { [key: string]: any };
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
      patientName: '',
      message: '',
      visibility: '',
      anonymous: false,
    },
  });

  const onSubmit = (formData: any) => {
    console.log('Form Data:', formData);
    // Handle form submission logic here
  };

  return (
    <>
      <div
        onClick={onOpen}
        style={{ display: 'inline-block', cursor: 'pointer' }}
      >
        {children}
      </div>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop='opaque'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                <h2>Sponsor a Patient</h2>
              </ModalHeader>
              <ModalBody>
                <form
                  className='flex flex-col gap-4'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <Input
                      type='text'
                      id='amount'
                      variant='underlined'
                      placeholder='Enter amount'
                      {...register('amount', {
                        required: 'Amount is required',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Amount must be a number',
                        },
                      })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                        errors.amount ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.amount && (
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.amount.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      type='text'
                      id='patientName'
                      variant='underlined'
                      placeholder='Enter patient name'
                      {...register('patientName', {
                        required: 'Patient name is required',
                      })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                        errors.patientName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.patientName && (
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.patientName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      id='message'
                      variant='underlined'
                      placeholder='Write your message here'
                      {...register('message', {
                        required: 'Message is required',
                      })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                        errors.message ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.message && (
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Controller
                      name='visibility'
                      control={control}
                      rules={{ required: 'Please select a visibility option' }}
                      render={({ field }) => (
                        <RadioGroup
                          label='Select your favorite city'
                          {...field}
                        >
                          <Radio
                            description='Other Donators Also able to see your message'
                            value='public'
                          >
                            Public
                          </Radio>
                          <Radio
                            description='Only the Patient can see the message'
                            value='private'
                          >
                            Private
                          </Radio>
                        </RadioGroup>
                      )}
                    />
                    {errors.visibility && (
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.visibility.message}
                      </p>
                    )}
                  </div>
                  <div className='flex items-center'>
                    <input
                      id='anonymous'
                      type='checkbox'
                      {...register('anonymous')}
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    />
                    <label
                      htmlFor='anonymous'
                      className='ml-3 block text-sm font-medium'
                    >
                      Donate Anonymously
                    </label>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <Button color='success' variant='ghost' type='submit'>
                      Pay
                    </Button>
                    <Button
                      color='success'
                      variant='ghost'
                      onPress={onClose}
                      type='button'
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
