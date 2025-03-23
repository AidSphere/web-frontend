import React from 'react';
import DonorHistoryCard from '../_component/donationItem';

const donors = [
  {
    id: 1,
    name: 'John Doe',
    email: 'yashodha@gmail.com',
    price: 500,
    url: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'kaweesha@gmail.com',
    price: 300,
    url: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: false,
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'kumari@gmail.com',
    price: 1000,
    url: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: true,
  },
  {
    id: 4,
    name: 'Emily Wilson',
    email: 'emily@gmail.com',
    price: 750,
    url: 'https://randomuser.me/api/portraits/women/4.jpg',
    status: true,
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael@gmail.com',
    price: 250,
    url: 'https://randomuser.me/api/portraits/men/5.jpg',
    status: false,
  },
  {
    id: 6,
    name: 'Sarah Johnson',
    email: 'sarah@gmail.com',
    price: 600,
    url: 'https://randomuser.me/api/portraits/women/6.jpg',
    status: true,
  },
  {
    id: 7,
    name: 'David Lee',
    email: 'david@gmail.com',
    price: 850,
    url: 'https://randomuser.me/api/portraits/men/7.jpg',
    status: true,
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    email: 'lisa@gmail.com',
    price: 420,
    url: 'https://randomuser.me/api/portraits/women/8.jpg',
    status: false,
  },
  {
    id: 9,
    name: 'James Wilson',
    email: 'james@gmail.com',
    price: 1200,
    url: 'https://randomuser.me/api/portraits/men/9.jpg',
    status: true,
  },
  {
    id: 10,
    name: 'Olivia Martinez',
    email: 'olivia@gmail.com',
    price: 330,
    url: 'https://randomuser.me/api/portraits/women/10.jpg',
    status: false,
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
