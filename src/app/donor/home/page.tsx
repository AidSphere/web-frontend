'use client';
import React, { useState, useEffect } from 'react';
import { DonorFeedCard } from '../_component';
import { Button, Input, Spinner } from '@heroui/react';
import DonorService, { DonationRequest } from '@/service/DonorService';
import { Search, AlertCircle, RefreshCw } from 'lucide-react';

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
      
      console.log('API Response:', response); // Log the response for debugging
      
      // Check for both standard and alternative response formats
      if ((response.status === 0 || response.success === true) && Array.isArray(response.data)) {
        // Success - we have data as an array
        setDonationRequests(response.data);
      } else if (response.data && Array.isArray(response.data)) {
        // Alternative success format - data is directly available
        setDonationRequests(response.data);
      } else if (response && Array.isArray(response)) {
        // Direct array response
        setDonationRequests(response);
      } else {
        // Message shown in the UI should match the error message in the screenshot
        setError('Failed to fetch donation requests');
        console.error('Unexpected API response format:', response);
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
      request.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Calculate stats
  const totalRequests = donationRequests.length;
  const totalNeeded = donationRequests.reduce(
    (sum, request) => sum + (request.remainingPrice || 0),
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
          <div className="inline-flex items-center justify-center p-4 mb-4 text-red-500 bg-red-100 rounded-full">
            <AlertCircle size={24} />
          </div>
          <p className="text-danger mb-4">{error}</p>
          <Button 
            color="primary"
            startContent={<RefreshCw size={16} />}
            onClick={fetchDonationRequests}
          >
            Try Again
          </Button>
        </div>
      ) : donationRequests.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No donation requests are available at the moment.</p>
          <Button 
            color="primary"
            onClick={fetchDonationRequests}
          >
            Refresh
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
