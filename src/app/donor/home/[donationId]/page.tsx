'use client';
import React, { useState, useEffect } from 'react';
import DonorListCard from '../../_component/donationListItem';
import DonorService, { DonationByRequestId } from '@/service/DonorService';
import { Spinner, Button } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: {
    donationId: string;
  };
}

const ViewDonation = ({ params }: PageProps) => {
  const [donations, setDonations] = useState<DonationByRequestId[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const donationId = parseInt(params.donationId, 10);

  useEffect(() => {
    const fetchDonations = async () => {
      if (isNaN(donationId)) {
        setError('Invalid donation ID');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await DonorService.getDonationsByRequestId(donationId);
        
        if (response.success && response.data) {
          setDonations(response.data);
        } else {
          setError(response.message || 'Failed to fetch donations');
        }
      } catch (err) {
        console.error('Error fetching donations:', err);
        setError('An error occurred while fetching donations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, [donationId]);

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-danger mb-4">{error}</p>
        <Button 
          color="primary"
          onClick={handleBack}
          startContent={<ArrowLeft size={16} />}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col items-center justify-center gap-4 py-8'>
      <div className="w-full max-w-3xl px-4 mb-2">
        <Button 
          variant="light" 
          color="primary" 
          onClick={handleBack}
          startContent={<ArrowLeft size={16} />}
        >
          Back to Donations
        </Button>
      </div>
      
      <h1 className='p-3 text-center text-3xl font-bold'>Donation List</h1>
      
      {donations.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No donations found for this request.</p>
      ) : (
        <div className="w-full max-w-3xl px-4 space-y-4">
          {donations.map((donation, index) => (
            <DonorListCard key={index} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewDonation;
