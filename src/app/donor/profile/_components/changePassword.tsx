'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@heroui/react';
import { useState } from 'react';
import { Lock } from 'lucide-react';

const ChangePasswordModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModel = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    // Handle password change logic here
    closeModel();
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <Modal isOpen={isOpen} onClose={closeModel}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            Change Password
          </ModalHeader>
          <ModalBody>
            <Input
              label='Current Password'
              placeholder='Enter your current password'
              type='password'
              startContent={<Lock size={16} />}
              className='mb-4'
            />
            <Input
              label='New Password'
              placeholder='Enter your new password'
              type='password'
              startContent={<Lock size={16} />}
              className='mb-4'
            />
            <Input
              label='Confirm New Password'
              placeholder='Confirm your new password'
              type='password'
              startContent={<Lock size={16} />}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='flat' onPress={closeModel}>
              Close
            </Button>
            <Button color='primary' onPress={handleSubmit}>
              Change Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
