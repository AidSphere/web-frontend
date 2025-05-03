'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/app/patient/components/ImageUploader';
import PdfUploader from '@/app/patient/components/PdfUploader';
import { BasicInfoSchema } from '@/app/patient/_types/donation-request-types';
import BasicInfoInput from '@/app/patient/components/BasicInfoInput';
import { Form } from '@/components/ui/form';
import { uploadImages, uploadPdfs, uploadImage } from '@/lib/utils/uploadUtils';
import {
  fetchDonationRequestById,
  updateDonationRequest,
} from '@/service/api/patient/donationRequestService';
import { Loader2 } from 'lucide-react';
import ExistingImageDisplay from '@/app/patient/donation/components/ExistingImageDisplay';

// Create a schema for the complete form
const DonationRequestSchema = BasicInfoSchema.extend({
  imageFiles: z.array(z.instanceof(File)).optional(),
  pdfFiles: z.array(z.any()).optional(),
  prescriptionUrl: z.instanceof(File).optional(),
  notes: z.string().optional(),
});

type DonationRequestFormValues = z.infer<typeof DonationRequestSchema>;

export default function EditDonationRequestPage() {
  const [activeTab, setActiveTab] = useState('prescription');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingDocuments, setExistingDocuments] = useState<string[]>([]);
  const [existingPrescriptionUrl, setExistingPrescriptionUrl] =
    useState<string>('');
  const [newPrescriptionFile, setNewPrescriptionFile] = useState<File | null>(
    null
  );
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const requestId = parseInt(params.id, 10);

  const form = useForm<DonationRequestFormValues>({
    resolver: zodResolver(DonationRequestSchema),
    defaultValues: {
      requestName: '',
      description: '',
      expectedDate: new Date(),
      items: [{ medicine: '', amount: '', unit: '' }],
      imageFiles: [],
      pdfFiles: [],
      prescriptionUrl: undefined,
      notes: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!requestId) {
      toast({
        title: 'Error',
        description: 'Donation request ID is missing',
        variant: 'destructive',
      });
      router.push('/patient/donation/requests');
      return;
    }

    const fetchDonationRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetchDonationRequestById(requestId);
        const request = response.data;

        if (!request || request.status !== 'PENDING') {
          toast({
            title: 'Error',
            description: 'Donation request not found',
            variant: 'destructive',
          });
          router.push('/patient/donation');
          return;
        }

        // Store the existing images and documents
        setExistingImages(request.images || []);
        setExistingDocuments(request.documents || []);
        setExistingPrescriptionUrl(request.prescriptionUrl); // Store prescription URLs

        // Pre-populate the form with existing data
        form.reset({
          requestName: request.title,
          description: request.description,
          expectedDate: new Date(request.expectedDate),
          items: request.prescribedMedicines.map((med) => ({
            medicine: med.medicine,
            amount: med.amount.toString(),
            unit: med.unit,
          })),
          notes: '',
          // We can't populate file inputs with existing files, but we can display existing file URLs
        });
      } catch (error) {
        console.error('Error fetching donation request:', error);
        toast({
          title: 'Error',
          description: 'Failed to load donation request data.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonationRequest();
  }, [requestId, form, toast, router]);

  const onSubmit = async (data: DonationRequestFormValues) => {
    if (!requestId) return;

    setIsSubmitting(true);
    try {
      let uploadedImageUrls: string[] = [];
      let uploadedPdfUrls: string[] = [];
      let newPrescriptionUrl = existingPrescriptionUrl;

      // Upload Images to Cloudinary if they exist
      if (data.imageFiles && data.imageFiles.length > 0) {
        uploadedImageUrls = await uploadImages(
          data.imageFiles,
          'donation-images'
        );
      }

      // Upload PDFs to Cloudinary if they exist
      if (data.pdfFiles && data.pdfFiles.length > 0) {
        uploadedPdfUrls = await uploadPdfs(data.pdfFiles, 'donation-pdfs');
      }

      // Upload new prescription if provided
      if (data.prescriptionUrl) {
        newPrescriptionUrl = await uploadImage(
          data.prescriptionUrl,
          'donation-prescriptions'
        );
      }

      const formData = {
        title: data.requestName,
        description: data.description,
        expectedDate: data.expectedDate.toISOString().split('T')[0],
        prescribedMedicines: data.items.map((item) => ({
          medicine: item.medicine,
          amount: item.amount,
          unit: item.unit,
        })),
        // Combine existing and new images/documents
        images: [...existingImages, ...uploadedImageUrls],
        documents: [...existingDocuments, ...uploadedPdfUrls],
        prescriptionUrl: newPrescriptionUrl, // Use new prescription URL if uploaded, otherwise use existing
        notes: data.notes || '',
        patientId: '4',
      };

      const response = await updateDonationRequest(Number(requestId), formData);

      toast({
        title: 'Donation request updated',
        description: `Request for ${data.requestName} updated successfully.`,
      });

      router.push('/patient/donation/requests');
    } catch (error) {
      console.error('Error updating donation request:', error);
      toast({
        title: 'Error',
        description: 'Failed to update donation request. Please try again.',
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

  if (isLoading) {
    return (
      <div className='flex h-[70vh] w-full items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-primary' />
        <span className='ml-2'>Loading donation request...</span>
      </div>
    );
  }

  return (
    <div className='container py-1'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='mx-auto w-full max-w-4xl'>
            <CardHeader>
              <CardTitle className='text-2xl'>Edit Donation Request</CardTitle>
            </CardHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className='px-6'>
                <TabsList className='grid w-full grid-cols-3 bg-primary-50'>
                  <TabsTrigger value='prescription'>Basic Info</TabsTrigger>
                  <TabsTrigger
                    disabled={activeTab === 'prescription'}
                    value='images'
                  >
                    Related Images
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={
                      activeTab === 'prescription' || activeTab === 'images'
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

                  {/* Display existing prescription if available */}
                  {existingPrescriptionUrl && (
                    <div className='mb-4'>
                      <h3 className='mb-2 text-sm font-medium'>
                        Current Prescription
                      </h3>
                      <div className='rounded-md border bg-gray-50 p-2'>
                        <img
                          src={existingPrescriptionUrl}
                          alt='Current Prescription'
                          className='max-h-32 object-contain'
                        />
                        <p className='mt-1 text-xs text-gray-500'>
                          Upload a new image to replace this prescription
                        </p>
                      </div>
                    </div>
                  )}

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

                  {/* Add the ExistingImageDisplay component */}
                  <ExistingImageDisplay
                    images={existingImages}
                    title='Currently uploaded images'
                  />

                  <ImageUploader
                    name='imageFiles'
                    control={form.control}
                    label='Upload Additional Medical Images'
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
                    Related documents for verification
                  </h2>
                  <p className='mb-4 text-sm text-gray-500'>
                    Upload relevant medical documents, verification documents
                    such as previous records, lab reports, or referrals.
                  </p>

                  {/* Display existing document links */}
                  {existingDocuments.length > 0 && (
                    <div className='mb-6'>
                      <h3 className='mb-2 text-sm font-medium'>
                        Currently uploaded documents
                      </h3>
                      <ul className='list-disc space-y-1 pl-5'>
                        {existingDocuments.map((docUrl, index) => (
                          <li key={index}>
                            <a
                              href={docUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-sm text-primary hover:underline'
                            >
                              Document {index + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <p className='mt-2 text-xs text-gray-500'>
                        These are your existing uploaded documents. New uploads
                        will be added to this collection.
                      </p>
                    </div>
                  )}

                  <PdfUploader
                    name='pdfFiles'
                    control={form.control}
                    label='Upload Additional Medical Documents'
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
                      {isSubmitting ? 'Updating...' : 'Update Donation Request'}
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
