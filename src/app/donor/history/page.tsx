import React from 'react';
import DonorHistoryCard from '../_component/donationItem';

const donors = [
  {
    id: 1,
    name: 'John Doe',
    email: 'yashodha@gmail.com',
    price: 500,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'kaweesha@gmail.com',
    price: 300,
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'kumari@gmail.com',
    price: 1000,
  },
];

const donationHistory = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-3'>
      <h1 className='p-3 text-center text-3xl font-bold'>Donation History</h1>
      {donors.map((donor) => (
        <DonorHistoryCard key={donor.id} {...donor} />
      ))}
    </div>
  );
};

export default donationHistory;
