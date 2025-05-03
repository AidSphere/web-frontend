'use client';
import React, { useState, useEffect } from 'react';
import { DonorFeedCard } from '../_component';
import { Button, Input, Spinner } from '@heroui/react';
import DonorService, { DonationRequest } from '@/service/DonorService';
import { Search } from 'lucide-react';

const Home = () => {
  const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonationRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await DonorService.getPatientAcceptedDonationRequests();
      
      if (response.success && response.data) {
        setDonationRequests(response.data);
      } else {
        setError('Failed to fetch donation requests');
      }
    } catch (err) {
      console.error('Error fetching donation requests:', err);
      setError('An error occurred while fetching donation requests');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationRequests();
  }, []);

  // Filter donation requests based on search query
  const filteredRequests = donationRequests.filter((request) => {
    const matchesSearch =
      searchQuery === '' ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.hospitalName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Calculate stats
  const totalRequests = donationRequests.length;
  const totalNeeded = donationRequests.reduce(
    (sum, request) => sum + request.remainingPrice,
    0
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='mx-auto max-w-7xl px-4 py-8'>
      <div className='mb-8 text-center'>
        <h1 className='mb-2 text-3xl font-bold text-gray-800'>
          Donation Requests
        </h1>
        <p className='mx-auto max-w-2xl text-gray-500'>
          Browse through verified donation requests from patients in need. Your
          contribution can make a significant difference in someone's life.
        </p>
      </div>

      {/* Search */}
      <div className='mb-6'>
        <Input
          placeholder="Search by title, description, or hospital..."
          value={searchQuery}
          onChange={handleSearchChange}
          startContent={<Search size={18} className="text-gray-400" />}
          className="max-w-md mx-auto"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-danger mb-4">{error}</p>
          <Button 
            color="primary"
            onClick={fetchDonationRequests}
          >
            Retry
          </Button>
        </div>
      ) : (
        <>
          {/* Results count */}
          <div className='mb-4 text-sm text-gray-500'>
            Showing {filteredRequests.length} of {donationRequests.length} donation requests
          </div>

          {/* Donation Request Cards */}
          <div className='mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <DonorFeedCard 
                  key={request.requestId} 
                  donation={request} 
                  onDonationSuccess={fetchDonationRequests}
                />
              ))
            ) : (
              <div className='col-span-2 py-12 text-center'>
                <p className='mb-2 text-gray-500'>
                  No donation requests found matching your search.
                </p>
                <Button
                  color='primary'
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
