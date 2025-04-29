'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@heroui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Current password must be at least 6 characters long'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (formData: ChangePasswordFormValues) => {
    console.log('Form Data:', formData);
    // Handle password change logic here
    reset(); // Reset form after submission
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
              <ModalHeader>Change Password</ModalHeader>
              <ModalBody>
                <form
                  className='flex flex-col gap-4'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <Input
                      type='password'
                      placeholder='Current Password'
                      {...register('currentPassword')}
                    />
                    {errors.currentPassword && (
                      <p className='text-red-500'>
                        {errors.currentPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      type='password'
                      placeholder='New Password'
                      {...register('newPassword')}
                    />
                    {errors.newPassword && (
                      <p className='text-red-500'>
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      type='password'
                      placeholder='Confirm Password'
                      {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                      <p className='text-red-500'>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div className='flex justify-end gap-2'>
                    <Button type='submit'>Change Password</Button>
                    <Button
                      onPress={() => {
                        reset();
                        onClose();
                      }}
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
