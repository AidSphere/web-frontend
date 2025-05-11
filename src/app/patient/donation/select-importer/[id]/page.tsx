'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Check, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { QuotationDTO, DrugImporterResponse } from '@/types/quotation';
import {
  DonationRequest,
  fetchDonationRequestById,
  updateDonationRequestDefaultPrice,
} from '@/service/api/patient/donationRequestService';
import {
  getAllQuotationsByRequestId,
  rejectPendingQuotations,
  updateQuotation,
} from '@/service/api/patient/quotationService';
import { getDrugImporterById } from '@/service/api/patient/drugImporterService';
import { useToast } from '@/hooks/use-toast';

export default function DonationRequestQuotations() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const requestId = Number(params.id);

  const [request, setRequest] = useState<DonationRequest | null>(null);
  const [quotations, setQuotations] = useState<QuotationDTO[]>([]);
  const [drugImporters, setDrugImporters] = useState<
    Record<number, DrugImporterResponse>
  >({});
  const [loading, setLoading] = useState(true);
  const [selectedQuotation, setSelectedQuotation] = useState<number | null>(
    null
  );
  const [selecting, setSelecting] = useState<number | null>(null);

  // Fetch donation request data
  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        setLoading(true);
        const requestResponse = await fetchDonationRequestById(requestId);
        setRequest(requestResponse.data);

        const quotationsResponse = await getAllQuotationsByRequestId(requestId);
        // Filter quotations to only show PENDING or ACCEPTED ones
        const filteredQuotations = quotationsResponse.filter(
          (quotation) =>
            quotation.status === 'PENDING' || quotation.status === 'ACCEPTED'
        );
        setQuotations(filteredQuotations);

        // Fetch drug importer details for each quotation
        const importerIds = [
          ...new Set(filteredQuotations.map((q) => q.drugImporterId)),
        ];
        const importersData: Record<number, DrugImporterResponse> = {};

        for (const importerId of importerIds) {
          try {
            const importerResponse = await getDrugImporterById(importerId);
            importersData[importerId] = importerResponse.data;
          } catch (error) {
            console.error(`Failed to fetch importer ${importerId}:`, error);
          }
        }

        setDrugImporters(importersData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load request data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRequestData();
  }, [requestId]);

  const handleSelectQuotation = async (quotation: QuotationDTO) => {
    try {
      setSelecting(quotation.id);

      // Create a local copy with ACCEPTED status
      const updatedQuotation = { ...quotation, status: 'ACCEPTED' };

      // First update the local state immediately to reflect the change
      // This ensures that the UI shows the quotation as accepted right away
      setQuotations((prevQuotations) =>
        prevQuotations.map((q) =>
          q.id === quotation.id ? updatedQuotation : q
        )
      );

      // Mark as selected in local state
      setSelectedQuotation(quotation.id);

      // Calculate discounted price
      const totalPrice = calculateDiscountedPrice(quotation);

      // Make the API calls in sequence
      try {
        // Step 1: Update the quotation status on the server
        console.log('Updating quotation status to ACCEPTED...');
        await updateQuotation(quotation.id, updatedQuotation);
        console.log('Quotation updated successfully');

        // Step 2: Update the default price on the donation request
        console.log('Updating donation request default price...');
        await updateDonationRequestDefaultPrice(requestId, totalPrice);
        console.log('Default price updated successfully');

        // Step 3: Reject all other pending quotations
        console.log('Rejecting pending quotations...');
        await rejectPendingQuotations(requestId);
        console.log('Pending quotations rejected successfully');

        // After all API calls complete successfully, show only the selected quotation
        setQuotations([updatedQuotation]);

        toast({
          description: 'Quotation selected successfully',
        });
      } catch (apiError) {
        console.error('API error during quotation selection:', apiError);
        throw apiError; // Re-throw to be caught by the outer catch block
      }
    } catch (error) {
      console.error('Error in quotation selection process:', error);
      toast({
        title: 'Error',
        description: 'Failed to select quotation. Please try again.',
        variant: 'destructive',
      });

      // On error, refresh the data to ensure consistent state
      try {
        const refreshedQuotations =
          await getAllQuotationsByRequestId(requestId);
        const filteredQuotations = refreshedQuotations.filter(
          (q) => q.status === 'PENDING' || q.status === 'ACCEPTED'
        );
        setQuotations(filteredQuotations);
      } catch (refreshError) {
        console.error('Error refreshing quotation data:', refreshError);
      }
    } finally {
      setSelecting(null);
    }
  };

  const calculateTotalPrice = (quotation: QuotationDTO) => {
    return quotation.medicinePrices.reduce((acc, item) => acc + item.price, 0);
  };

  const calculateDiscountedPrice = (quotation: QuotationDTO) => {
    const total = calculateTotalPrice(quotation);
    return total * (1 - quotation.discount);
  };

  const getDrugImporterName = (id: number) => {
    return drugImporters[id]?.name || `Importer #${id}`;
  };

  if (loading) {
    return (
      <div className='flex h-[80vh] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-3xl font-bold'>
        {request?.title || `Request #${requestId}`}
      </h1>
      <Separator className='mb-6' />

      {quotations.length === 0 ? (
        <div className='py-12 text-center'>
          <p className='text-muted-foreground'>
            No quotations available for this request.
          </p>
        </div>
      ) : (
        <ScrollArea className='h-[calc(100vh-200px)]'>
          <div className='grid gap-6'>
            {quotations.map((quotation) => {
              const totalPrice = calculateTotalPrice(quotation);
              const discountedPrice = calculateDiscountedPrice(quotation);
              const isSelected = selectedQuotation === quotation.id;
              const isSelecting = selecting === quotation.id;
              const isAccepted = quotation.status === 'ACCEPTED';

              return (
                <Card
                  key={quotation.id}
                  className={`transition-all ${isAccepted ? 'border-primary/50 bg-primary/5' : ''}`}
                >
                  <CardHeader className='pb-2'>
                    <CardTitle className='flex items-center justify-between'>
                      <span>
                        {getDrugImporterName(quotation.drugImporterId)}
                      </span>
                      {isAccepted && (
                        <span className='flex items-center gap-1 text-sm font-medium text-primary'>
                          <Check className='h-4 w-4' /> Selected
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='pb-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <p className='text-muted-foreground text-sm'>
                          Created Date
                        </p>
                        <p className='font-medium'>
                          {format(
                            new Date(quotation.createdDate),
                            'MMM dd, yyyy'
                          )}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground text-sm'>
                          Discount
                        </p>
                        <p className='font-medium'>
                          {(quotation.discount * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground text-sm'>
                          Total Price
                        </p>
                        <p className='font-medium'>
                          Rs. {totalPrice.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground text-sm'>
                          Price with Discount
                        </p>
                        <p className='font-medium text-green-600'>
                          Rs. {discountedPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className='w-full'
                      variant={isAccepted ? 'outline' : 'default'}
                      disabled={isSelecting || isSelected || isAccepted}
                      onClick={() => handleSelectQuotation(quotation)}
                    >
                      {isSelecting ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          Processing...
                        </>
                      ) : isAccepted ? (
                        'Quotation Selected'
                      ) : (
                        'Choose Quotation'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
