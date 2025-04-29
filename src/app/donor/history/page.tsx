'use client';
import type React from 'react';
import { useState } from 'react';
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
} from '@heroui/react';
import {
  Search,
  Filter,
  Calendar,
  ArrowUpDown,
  DollarSign,
  Users,
} from 'lucide-react';

// Define the donor type
interface Donor {
  id: number;
  name: string;
  email: string;
  price: number;
  url: string;
  status: boolean;
  date: string; // Added date field
}

// Sample data with dates
const donorsData: Donor[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'yashodha@gmail.com',
    price: 500,
    url: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: true,
    date: '2023-06-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'kaweesha@gmail.com',
    price: 300,
    url: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: false,
    date: '2023-06-14',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'kumari@gmail.com',
    price: 1000,
    url: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: true,
    date: '2023-06-12',
  },
  {
    id: 4,
    name: 'Emily Wilson',
    email: 'emily@gmail.com',
    price: 750,
    url: 'https://randomuser.me/api/portraits/women/4.jpg',
    status: true,
    date: '2023-06-10',
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael@gmail.com',
    price: 250,
    url: 'https://randomuser.me/api/portraits/men/5.jpg',
    status: false,
    date: '2023-06-08',
  },
  {
    id: 6,
    name: 'Sarah Johnson',
    email: 'sarah@gmail.com',
    price: 600,
    url: 'https://randomuser.me/api/portraits/women/6.jpg',
    status: true,
    date: '2023-06-05',
  },
  {
    id: 7,
    name: 'David Lee',
    email: 'david@gmail.com',
    price: 850,
    url: 'https://randomuser.me/api/portraits/men/7.jpg',
    status: true,
    date: '2023-06-03',
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    email: 'lisa@gmail.com',
    price: 420,
    url: 'https://randomuser.me/api/portraits/women/8.jpg',
    status: false,
    date: '2023-05-30',
  },
  {
    id: 9,
    name: 'James Wilson',
    email: 'james@gmail.com',
    price: 1200,
    url: 'https://randomuser.me/api/portraits/men/9.jpg',
    status: true,
    date: '2023-05-28',
  },
  {
    id: 10,
    name: 'Olivia Martinez',
    email: 'olivia@gmail.com',
    price: 330,
    url: 'https://randomuser.me/api/portraits/women/10.jpg',
    status: false,
    date: '2023-05-25',
  },
];

const DonationHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'success' | 'failed'
  >('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and sort donors
  const filteredDonors = donorsData
    .filter((donor) => {
      // Apply search filter
      const matchesSearch =
        donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply status filter
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'success' && donor.status) ||
        (statusFilter === 'failed' && !donor.status);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by price
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

  // Calculate total donation amount
  const totalDonationAmount = donorsData.reduce(
    (sum, donor) => sum + donor.price,
    0
  );

  // Calculate successful donations
  const successfulDonations = donorsData.filter((donor) => donor.status).length;

  // Pagination
  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const currentDonors = filteredDonors.slice(
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

  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <div className='mb-8 text-center'>
        <h1 className='mb-2 text-3xl font-bold text-gray-800'>
          Donation History
        </h1>
        <p className='text-gray-500'>Track all donations and their status</p>
      </div>

      {/* Summary Cards */}
      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card className='border-none bg-gradient-to-r from-success-50 to-success-100'>
          <CardBody className='flex items-center p-4'>
            <div className='mr-4 rounded-full bg-success-200 p-3'>
              <DollarSign size={24} className='text-success' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Total Amount</p>
              <h3 className='text-2xl font-bold'>
                LKR {totalDonationAmount.toLocaleString()}
              </h3>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className='mb-6 flex flex-col gap-4 md:flex-row'>
        <div className='flex-1'>
          <Input
            placeholder='Search by name or email'
            value={searchQuery}
            onChange={handleSearchChange}
            startContent={<Search size={18} />}
            className='w-full'
          />
        </div>
        <div className='flex gap-2'>
          <Dropdown>
            <DropdownTrigger>
              <Button variant='flat' startContent={<Filter size={18} />}>
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
              >
                All
              </DropdownItem>
              <DropdownItem
                key='success'
                onClick={() => handleStatusFilterChange('success')}
              >
                Success
              </DropdownItem>
              <DropdownItem
                key='failed'
                onClick={() => handleStatusFilterChange('failed')}
              >
                Failed
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Button
            variant='flat'
            startContent={<ArrowUpDown size={18} />}
            onClick={toggleSortOrder}
          >
            Amount: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className='mb-4 text-sm text-gray-500'>
        Showing {currentDonors.length} of {filteredDonors.length} donations
      </div>

      {/* Donation Cards */}
      <div className='mb-6 space-y-4'>
        {currentDonors.length > 0 ? (
          currentDonors.map((donor) => (
            <DonorHistoryCard key={donor.id} {...donor} />
          ))
        ) : (
          <div className='py-8 text-center'>
            <p className='text-gray-500'>
              No donations found matching your filters.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mt-8 flex justify-center'>
          <Pagination
            total={totalPages}
            initialPage={1}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
