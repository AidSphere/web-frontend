import React from 'react';
import { DonorFeedCard } from '../_component';

const donors = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    company: 'ABC Corp',
    price: 500,
    remaining: 125,
    progress: 75,
    note: 'Thank you for your generous donation!',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: 'XYZ Ltd',
    price: 300,
    remaining: 125,
    progress: 50,
    note: 'Every contribution makes a difference!',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    company: 'Global Tech',
    price: 1000,
    remaining: 100,
    progress: 90,
    note: 'Your support is greatly appreciated!',
  },
];

const Home = () => {
  return (
    <div className='flex flex-wrap justify-center p-4'>
      {donors.map((donor) => (
        <DonorFeedCard key={donor.id} {...donor} />
      ))}
    </div>
  );
};

export default Home;
