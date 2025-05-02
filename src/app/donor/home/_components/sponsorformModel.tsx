import React, { useState } from 'react';
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
  Textarea,
  Divider,
  Checkbox,
  Alert,
} from '@heroui/react';
import { useForm, Controller } from 'react-hook-form';
import { Heart, DollarSign, Eye, EyeOff, CreditCard, AlertCircle, XCircle } from 'lucide-react';
import DonorService from '@/service/DonorService';
import { toast } from '@/hooks/use-toast';

interface SponsorFormData {
  donationRequestId: number;
  donationAmount: number;
  donationMessage: string;
  donationMessageVisibility: boolean;
  anonymous: boolean;
}

export default function SponsorFormModal({
  children,
  data,
  onSuccess,
}: {
  children: React.ReactNode;
  data: { id: number; name: string };
  onSuccess?: () => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<SponsorFormData>({
    defaultValues: {
      donationRequestId: data.id,
      donationAmount: 0,
      donationMessage: '',
      donationMessageVisibility: true, // public by default
      anonymous: false,
    },
  });

  const onSubmit = async (formData: SponsorFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Prepare payload for API
      const payload = {
        donationRequestId: data.id,
        donationStatus: true,
        donationAmount: formData.donationAmount,
        donationMessage: formData.donationMessage,
        donationMessageVisibility: formData.donationMessageVisibility
      };
      
      // Call the donation API
      const response = await DonorService.makeDonation({
        ...payload
      });
      
      if (response.success) {
        toast({
          title: 'Donation Successful',
          description: 'Thank you for your generous contribution!',
          variant: 'success'
        });
        reset();
        onOpenChange(false);
        
        // Call the onSuccess callback to refetch cards if provided
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 300);
        }
      } else {
        setError(response.message || 'There was an error processing your donation. Please try again.');
      }
    } catch (err) {
      console.error('Donation error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError(null);
    reset();
    onOpenChange(false);
  };

  return (
    <>
      <div onClick={onOpen} style={{ display: 'inline-block', cursor: 'pointer' }}>
        {children}
      </div>
      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open && onSuccess) {
            // If closing and we have onSuccess callback, call it
            setTimeout(() => {
              onSuccess();
            }, 300);
          }
          onOpenChange(open);
        }}
        backdrop="blur"
        placement="center"
        classNames={{
          base: "rounded-lg shadow-xl",
          header: "border-b pb-3",
          footer: "border-t pt-3",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center">
                  <Heart className="text-danger mr-2" size={20} />
                  <h2 className="text-xl font-semibold">
                    Sponsor {data.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-500">
                  Your contribution will make a significant difference in someone's life
                </p>
              </ModalHeader>
              <Divider />
              <ModalBody>
                {error && (
                  <Alert className="mb-4 bg-red-50 text-red-800 border border-red-200" variant="flat">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={18} className="text-red-600" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  </Alert>
                )}

                <form id="donation-form" className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  {/* Hidden field for donation request ID */}
                  <input 
                    type="hidden" 
                    {...register('donationRequestId')} 
                    value={data.id} 
                  />
                  
                  {/* Donation Amount */}
                  <div className="space-y-2">
                    <label htmlFor="donationAmount" className="block text-sm font-medium">
                      Donation Amount (LKR)
                    </label>
                    <Controller
                      name="donationAmount"
                      control={control}
                      rules={{ 
                        required: 'Amount is required',
                        min: {
                          value: 100,
                          message: 'Minimum donation amount is LKR 100'
                        }
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="donationAmount"
                          type="number"
                          placeholder="Enter donation amount"
                          startContent={<DollarSign size={16} className="text-primary" />}
                          className={`${errors.donationAmount ? 'border-danger' : ''}`}
                          value={field.value.toString()}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      )}
                    />
                    {errors.donationAmount && (
                      <p className="text-danger text-sm">{errors.donationAmount.message}</p>
                    )}
                  </div>
                  
                  {/* Donation Message */}
                  <div className="space-y-2">
                    <label htmlFor="donationMessage" className="block text-sm font-medium">
                      Leave a Message (Optional)
                    </label>
                    <Controller
                      name="donationMessage"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="donationMessage"
                          placeholder="Write an encouraging message to the patient..."
                          minRows={3}
                          maxRows={5}
                          className="resize-none"
                        />
                      )}
                    />
                  </div>
                  
                  {/* Message Visibility */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Message Visibility
                    </label>
                    <Controller
                      name="donationMessageVisibility"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <RadioGroup 
                          {...field}
                          orientation="horizontal" 
                          value={value ? "public" : "private"}
                          onValueChange={(v) => onChange(v === "public")}
                        >
                          <Radio
                            value="public"
                            startContent={<Eye size={16} className="text-green-500" />}
                            description="Other donors can see your message"
                          >
                            Public
                          </Radio>
                          <Radio
                            value="private"
                            startContent={<EyeOff size={16} className="text-gray-500" />}
                            description="Only the patient can see your message"
                          >
                            Private
                          </Radio>
                        </RadioGroup>
                      )}
                    />
                  </div>
                  
                  {/* Anonymous Donation */}
                  <div className="pt-2">
                    <Controller
                      name="anonymous"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          isSelected={value}
                          onValueChange={onChange}
                          size="md"
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">Donate Anonymously</span>
                            <span className="text-xs text-gray-500">Your name will not be shown with your donation</span>
                          </div>
                        </Checkbox>
                      )}
                    />
                  </div>
                </form>
              </ModalBody>
              <Divider />
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={handleClose}
                  startContent={<XCircle size={16} />}
                >
                  Cancel
                </Button>
                <Button
                  form="donation-form"
                  type="submit"
                  color="success"
                  startContent={<CreditCard size={16} />}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                >
                  Proceed to Payment
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
