'use client';
import React, { useState, useEffect } from 'react';
import DonorHistoryCard from '../_component/donationItem';
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Pagination,
  Card,
  CardBody,
  Spinner,
  Chip,
} from '@heroui/react';
import {
  Search,
  Filter,
  ArrowUpDown,
  DollarSign,
  AlertCircle,
  RefreshCw,
  CreditCard,
  CheckCircle,
  XCircle,
  Calendar,
} from 'lucide-react';
import DonorService, { DonationHistory } from '@/service/DonorService';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const DonationHistoryPage = () => {
  const [donations, setDonations] = useState<DonationHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'success' | 'failed'
  >('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  const fetchDonationHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await DonorService.getDonorDonationHistory();
      
      // Log the response to debug
      console.log('Donation history response:', response);
      
      // Check if response is successful and data is an array
      if (response && response.data && Array.isArray(response.data)) {
        setDonations(response.data);
      } else if (response && response.data) {
        // Handle case where data is not an array
        console.warn('Donation history data is not an array:', response.data);
        setDonations([]);
        setError('Received unexpected data format from server');
      } else {
        // Handle case where no data is returned
        setDonations([]);
        setError('Failed to fetch donation history');
      }
    } catch (err: any) {
      console.error('Error fetching donation history:', err);
      
      // Handle different error cases
      if (err.response) {
        // Server responded with an error status
        if (err.response.status === 401 || err.response.status === 403) {
          setError('Your session has expired. Please log in again.');
        } else if (err.response.status === 500) {
          setError('The server encountered an error. Please try again later.');
        } else {
          setError(`Error (${err.response.status}): ${err.response.data?.message || 'Failed to fetch donation history'}`);
        }
      } else if (err.request) {
        // Request was made but no response was received
        setError('Could not reach the server. Please check your internet connection.');
      } else {
        // Something else caused the error
        setError('An error occurred while fetching your donation history');
      }
      
      // Always ensure donations is an array
      setDonations([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort donations
  const filteredDonations = donations
    .filter((donation) => {
      // Apply search filter - search by ID as we don't have name/email in the API data
      const matchesSearch =
        searchQuery === '' ||
        donation.id.toString().includes(searchQuery) ||
        (donation.message && donation.message.toLowerCase().includes(searchQuery.toLowerCase()));

      // Apply status filter
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'success' && donation.status) ||
        (statusFilter === 'failed' && !donation.status);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by amount
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    });

  // Calculate total donation amount
  const totalDonationAmount = donations.reduce(
    (sum, donation) => sum + (donation.status ? donation.amount : 0),
    0
  );

  // Calculate successful and failed donations
  const successfulDonations = donations.filter((donation) => donation.status).length;
  const failedDonations = donations.filter((donation) => !donation.status).length;

  // Pagination
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const currentDonations = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleStatusFilterChange = (status: 'all' | 'success' | 'failed') => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Get most recent donation date
  const getLatestDonationDate = () => {
    if (donations.length === 0) return null;
    
    const dates = donations
      .filter(d => d.date)
      .map(d => new Date(d.date!).getTime());
    
    if (dates.length === 0) return null;
    
    const latestDate = new Date(Math.max(...dates));
    return formatDistanceToNow(latestDate, { addSuffix: true });
  };

  const latestDonationDate = getLatestDonationDate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <div className='mb-8 text-center'>
        <h1 className='mb-2 text-3xl font-bold text-gray-800'>
          Donation History
        </h1>
        <p className='text-gray-500'>Track all your donations and their status</p>
      </div>

      {error ? (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center p-4 mb-4 text-red-500 bg-red-100 rounded-full">
            <AlertCircle size={24} />
          </div>
          <p className="text-lg text-danger mb-4">{error}</p>
          <Button 
            color="primary"
            startContent={<RefreshCw size={16} />}
            onClick={fetchDonationHistory}
          >
            Try Again
          </Button>
        </div>
      ) : donations.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center p-6 mb-6 text-gray-400 bg-gray-100 rounded-full">
            <CreditCard size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Donations Yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            You haven't made any donations yet. Start making a difference today by helping those in need.
          </p>
          <Button 
            color="primary"
            size="lg"
            as="a"
            href="/donor/home"
            className="font-medium"
          >
            Browse Donation Requests
          </Button>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
            {/* Total Amount Card */}
            <Card className='border-none bg-gradient-to-r from-green-50 to-green-100 overflow-hidden shadow-sm'>
              <CardBody className='flex items-center p-4'>
                <div className='mr-4 rounded-full bg-green-500/10 p-3'>
                  <DollarSign size={24} className='text-green-600' />
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Total Donated</p>
                  <h3 className='text-2xl font-bold text-gray-800'>
                    LKR {totalDonationAmount.toLocaleString()}
                  </h3>
                  {latestDonationDate && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      Last donation {latestDonationDate}
                    </p>
                  )}
                </div>
              </CardBody>
            </Card>
            
            {/* Success Rate Card */}
            <Card className='border-none bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden shadow-sm'>
              <CardBody className='flex items-center p-4'>
                <div className='mr-4 rounded-full bg-blue-500/10 p-3'>
                  <CheckCircle size={24} className='text-blue-600' />
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Successful Donations</p>
                  <h3 className='text-2xl font-bold text-gray-800'>
                    {successfulDonations} <span className="text-sm font-normal text-gray-500">of {donations.length}</span>
                  </h3>
                  <div className="mt-1">
                    <Chip size="sm" color="success" variant="flat">
                      {Math.round((successfulDonations / donations.length) * 100)}% Success Rate
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            {/* Failed Donations Card */}
            <Card className='border-none bg-gradient-to-r from-amber-50 to-amber-100 overflow-hidden shadow-sm'>
              <CardBody className='flex items-center p-4'>
                <div className='mr-4 rounded-full bg-amber-500/10 p-3'>
                  <XCircle size={24} className='text-amber-600' />
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Failed Transactions</p>
                  <h3 className='text-2xl font-bold text-gray-800'>
                    {failedDonations}
                  </h3>
                  {failedDonations > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      These payments were not processed
                    </p>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className='mb-6 flex flex-col gap-4 md:flex-row'>
            <div className='flex-1'>
              <Input
                placeholder='Search by donation ID or message'
                value={searchQuery}
                onChange={handleSearchChange}
                startContent={<Search size={18} className="text-gray-400" />}
                className='w-full rounded-lg border-gray-200 focus:border-primary'
              />
            </div>
            <div className='flex flex-wrap gap-2'>
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant='flat' 
                    startContent={<Filter size={18} />}
                    className={cn(
                      'border border-gray-200',
                      statusFilter !== 'all' ? 'bg-primary/10 text-primary' : ''
                    )}
                  >
                    Status:{' '}
                    {statusFilter === 'all'
                      ? 'All'
                      : statusFilter === 'success'
                        ? 'Success'
                        : 'Failed'}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Status filter options'>
                  <DropdownItem
                    key='all'
                    onClick={() => handleStatusFilterChange('all')}
                    startContent={statusFilter === 'all' ? <CheckCircle size={16} className="text-primary" /> : null}
                  >
                    All
                  </DropdownItem>
                  <DropdownItem
                    key='success'
                    onClick={() => handleStatusFilterChange('success')}
                    startContent={statusFilter === 'success' ? <CheckCircle size={16} className="text-primary" /> : null}
                  >
                    Success
                  </DropdownItem>
                  <DropdownItem
                    key='failed'
                    onClick={() => handleStatusFilterChange('failed')}
                    startContent={statusFilter === 'failed' ? <CheckCircle size={16} className="text-primary" /> : null}
                  >
                    Failed
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button
                variant='flat'
                startContent={<ArrowUpDown size={18} />}
                className={cn(
                  'border border-gray-200',
                  'transition-colors hover:bg-gray-100'
                )}
                onClick={toggleSortOrder}
              >
                Amount: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
              </Button>
            </div>
          </div>

          {/* Results count and empty state */}
          {filteredDonations.length === 0 ? (
            <div className='py-10 text-center'>
              <div className="inline-flex items-center justify-center p-4 mb-4 text-gray-400 bg-gray-100 rounded-full">
                <Search size={24} />
              </div>
              <p className='text-gray-500 mb-4'>
                No donations found matching your filters.
              </p>
              <Button 
                color="primary" 
                variant="flat" 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className='mb-4 text-sm text-gray-500'>
                Showing {currentDonations.length} of {filteredDonations.length} donations
              </div>

              {/* Donation Cards */}
              <div className='mb-6 space-y-4'>
                {currentDonations.map((donation) => (
                  <DonorHistoryCard key={donation.id} donation={donation} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='mt-8 flex justify-center'>
                  <Pagination
                    total={totalPages}
                    initialPage={1}
                    page={currentPage}
                    onChange={setCurrentPage}
                    classNames={{
                      item: "bg-white hover:bg-gray-100",
                      cursor: "bg-primary text-white font-medium",
                    }}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DonationHistoryPage;
