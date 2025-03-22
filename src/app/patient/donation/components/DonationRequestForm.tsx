'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/app/patient/components/ImageUploader';
import PdfUploader from '@/app/patient/components/PdfUploader';
import { DonationRequestSchema } from '@/app/patient/_types/donation-request-types';

// Import the PrescriptionInput component
import BasicInfoInput from '@/app/patient/components/BasicInfoInput';
import { Form } from '@/components/ui/form';

// Create a schema for the complete form
const medicalRecordSchema = DonationRequestSchema.extend({
  imageFiles: z.array(z.any()).optional(),
  pdfFiles: z.array(z.any()).optional(),
  notes: z.string().optional(),
});

type DonationRequestFormValues = z.infer<typeof medicalRecordSchema>;

export default function DonationRequestForm() {
  const [activeTab, setActiveTab] = useState('prescription');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<DonationRequestFormValues>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      requestName: '',
      description: '',
      expectedDate: new Date(),
      items: [{ medicine: '', amount: '' }],
      imageFiles: [],
      pdfFiles: [],
      notes: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: DonationRequestFormValues) => {
    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Submitted medical record:', data);

      // Create FormData for file uploads
      const formData = new FormData();

      // Add patient information
      formData.append('requestName', data.requestName);
      formData.append('description', data.description);
      formData.append('expectedDate', data.expectedDate.toISOString());

      // Add prescription items
      data.items.forEach((item, index) => {
        formData.append(`items[${index}][medicine]`, item.medicine);
        formData.append(`items[${index}][amount]`, item.amount);
      });

      // Add images
      if (data.imageFiles && data.imageFiles.length > 0) {
        data.imageFiles.forEach((file, index) => {
          formData.append(`images`, file);
        });
      }

      // Add PDFs with titles
      if (data.pdfFiles && data.pdfFiles.length > 0) {
        data.pdfFiles.forEach((item, index) => {
          formData.append(`files[${index}][file]`, item.file);
          formData.append(`files[${index}][title]`, item.title);
        });
      }

      // Add notes
      if (data.notes) {
        formData.append('notes', data.notes);
      }

      // Here you would send the formData to your API
      // const response = await fetch('/api/medical-records', {
      //   method: 'POST',
      //   body: formData,
      // })

      toast({
        title: 'Medical record submitted',
        description: `Record for ${data.requestName} submitted successfully.`,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit medical record. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update the goToNextTab function to validate fields before proceeding
  const goToNextTab = async () => {
    if (activeTab === 'prescription') {
      // Validate patient information and prescription items before proceeding
      const isValid = await form.trigger([
        'requestName',
        'description',
        'expectedDate',
        'items',
      ]);
      if (isValid) {
        setActiveTab('images');
      }
    } else if (activeTab === 'images') {
      // No required validation for images, so just proceed
      setActiveTab('documents');
    }
  };

  const goToPrevTab = () => {
    if (activeTab === 'documents') setActiveTab('images');
    else if (activeTab === 'images') setActiveTab('prescription');
  };

  return (
    <div className='container py-1'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='mx-auto w-full max-w-4xl'>
            <CardHeader>
              <CardTitle className='text-2xl'>
                Donation Request Submission
              </CardTitle>
            </CardHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className='px-6'>
                <TabsList className='grid w-full grid-cols-3 bg-primary-50'>
                  <TabsTrigger value='prescription'>Basic Info</TabsTrigger>
                  <TabsTrigger
                    disabled={activeTab == 'prescription'}
                    value='images'
                  >
                    Related Images
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={
                      activeTab == 'prescription' || activeTab == 'images'
                    }
                    value='documents'
                  >
                    Documents
                  </TabsTrigger>
                </TabsList>
              </div>

              <CardContent className='p-6'>
                <TabsContent value='prescription' className='mt-0 space-y-6'>
                  {/* Prescription Input Section */}
                  <BasicInfoInput control={form.control} />

                  <div className='flex justify-end'>
                    <Button type='button' onClick={goToNextTab}>
                      Next: Images
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value='images' className='mt-0 space-y-6'>
                  <h2 className='mb-4 text-xl font-semibold'>Related Images</h2>
                  <p className='mb-4 text-sm text-gray-500'>
                    Upload relevant images to be shown in donation request.
                  </p>

                  <ImageUploader
                    name='imageFiles'
                    control={form.control}
                    label='Upload Medical Images'
                    maxFiles={6}
                    maxSize={10 * 1024 * 1024} // 10MB
                    acceptedFormats={[
                      'image/jpeg',
                      'image/png',
                      'image/webp',
                      'image/dicom',
                    ]}
                  />

                  <div className='flex justify-between'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={goToPrevTab}
                    >
                      Back: Prescription
                    </Button>
                    <Button type='button' onClick={goToNextTab}>
                      Next: Documents
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value='documents' className='mt-0 space-y-6'>
                  <h2 className='mb-4 text-xl font-semibold'>
                    Related documemts for verification
                  </h2>
                  <p className='mb-4 text-sm text-gray-500'>
                    Upload relevant medical documents, verification documents
                    such as previous records, lab reports, or referrals.
                  </p>

                  <PdfUploader
                    name='pdfFiles'
                    control={form.control}
                    label='Upload Medical Documents'
                    maxFiles={5}
                    maxSize={15 * 1024 * 1024} // 15MB
                  />

                  <div className='mt-6'>
                    <label
                      htmlFor='notes'
                      className='mb-1 block text-sm font-medium text-gray-700'
                    >
                      Additional Notes
                    </label>
                    <textarea
                      id='notes'
                      rows={4}
                      className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary'
                      placeholder='Add any additional information or context...'
                      {...form.register('notes')}
                    ></textarea>
                  </div>

                  <div className='flex justify-between'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={goToPrevTab}
                    >
                      Back: Images
                    </Button>
                    <Button type='submit' disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Medical Record'}
                    </Button>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </form>
      </Form>
    </div>
  );
}
