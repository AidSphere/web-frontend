import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react';

export default function ViewRequestModel({
  children,
  data,
}: {
  children: React.ReactNode;
  data: { [key: string]: any };
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                <h2>{data.name}</h2>
              </ModalHeader>
              <ModalBody>
                <p>{data.email}</p>
              </ModalBody>
              <ModalFooter>
                <Button color='success' variant='ghost' onPress={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
