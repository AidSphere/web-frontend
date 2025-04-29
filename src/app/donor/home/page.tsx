'use client';
import React, { useState } from 'react';
import { DonorFeedCard } from '../_component';
import { Button } from '@heroui/react';

// Define the donor request type
interface DonationRequest {
  id: number;
  name: string;
  email: string;
  company: string;
  price: number;
  remaining: number;
  progress: number;
  note: string;
  category: string;
  createdAt: string;
  image: string;
}

// Sample data with additional fields
const donationRequests: DonationRequest[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    company: 'ABC Corp',
    price: 500,
    remaining: 125,
    progress: 75,
    note: 'Thank you for your generous donation! This will help me get the medication I need for my treatment.',
    category: 'Medication',
    createdAt: '2023-06-10',
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: 'XYZ Ltd',
    price: 300,
    remaining: 150,
    progress: 50,
    note: 'Every contribution makes a difference! I need this support for my ongoing physical therapy sessions.',
    category: 'Treatment',
    createdAt: '2023-06-12',
    image:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    company: 'Global Tech',
    price: 1000,
    remaining: 100,
    progress: 90,
    note: 'Your support is greatly appreciated! This will help cover the costs of my upcoming surgery.',
    category: 'Surgery',
    createdAt: '2023-06-08',
    image:
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
  },
  {
    id: 4,
    name: 'Emily Wilson',
    email: 'emily@example.com',
    company: 'Health First',
    price: 750,
    remaining: 300,
    progress: 60,
    note: 'Thank you for considering my request. This donation will help me afford my monthly medication.',
    category: 'Medication',
    createdAt: '2023-06-15',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael@example.com',
    company: 'Care Solutions',
    price: 450,
    remaining: 200,
    progress: 55,
    note: "I'm grateful for any help you can provide. This will support my rehabilitation program.",
    category: 'Rehabilitation',
    createdAt: '2023-06-18',
    image:
      'https://images.unsplash.com/photo-1631815588090-d4bfec5b7e7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('progress');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter and sort donation requests
  const filteredRequests = donationRequests
    .filter((request) => {
      // Apply search filter
      const matchesSearch =
        request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.note.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply category filter
      const matchesCategory =
        categoryFilter === 'all' || request.category === categoryFilter;

      // Apply urgency filter
      const matchesUrgency =
        urgencyFilter === 'all' || request.urgency === urgencyFilter;

      // Apply tab filter
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'urgent' && request.urgency === 'high') ||
        (activeTab === 'almost-funded' && request.progress >= 75) ||
        (activeTab === 'recent' &&
          new Date(request.createdAt) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

      return matchesSearch && matchesCategory && matchesUrgency && matchesTab;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === 'progress') {
        return b.progress - a.progress;
      } else if (sortBy === 'urgency') {
        const urgencyValue = { high: 3, medium: 2, low: 1 };
        return urgencyValue[b.urgency] - urgencyValue[a.urgency];
      } else if (sortBy === 'recent') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === 'amount') {
        return b.remaining - a.remaining;
      }
      return 0;
    });

  // Get unique categories for filter dropdown
  const categories = Array.from(
    new Set(donationRequests.map((request) => request.category))
  );

  // Calculate stats
  const totalRequests = donationRequests.length;
  const totalNeeded = donationRequests.reduce(
    (sum, request) => sum + request.remaining,
    0
  );
  const urgentRequests = donationRequests.filter(
    (request) => request.urgency === 'high'
  ).length;

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

      {/* Results count */}
      <div className='mb-4 text-sm text-gray-500'>
        Showing {filteredRequests.length} of {donationRequests.length} donation
        requests
      </div>

      {/* Donation Request Cards */}
      <div className='mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <DonorFeedCard key={request.id} {...request} />
          ))
        ) : (
          <div className='col-span-2 py-12 text-center'>
            <p className='mb-2 text-gray-500'>
              No donation requests found matching your filters.
            </p>
            <Button
              color='primary'
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setUrgencyFilter('all');
                setActiveTab('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
