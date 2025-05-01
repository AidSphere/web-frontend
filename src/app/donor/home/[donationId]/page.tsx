import React from 'react';
import DonorListCard from '../../_component/donationListItem';

const donors = [
  {
    id: 1,
    name: 'John Doe',
    email: 'yashodha@gmail.com',
    company: 'Global Tech',
    price: 500,
    personlizedMessage:
      'Wishing you strength and a speedy recovery. You are not alone in this journey—stay strong, and know that many people care about you. Sending you my best wishes!',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'kaweesha@gmail.com',
    company: 'XYZ Ltd',
    price: 300,
    personlizedMessage:
      'I hope this small contribution helps in your journey to recovery. Keep believing in yourself and stay strong. Better days are ahead, and you have people rooting for you!',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'kumari@gmail.com',
    company: 'ABC Corp',
    price: 1000,
    personlizedMessage:
      'Your strength and courage are an inspiration to us all. Keep fighting, and know that you are not alone. Wishing you a speedy recovery and better days ahead!',
  },
];

const ViewDonation = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-3'>
      <h1
        className='donation-list-header p-3 text-center text-3xl font-bold'
        id='donation-list-heading'
      >
        Donation List
      </h1>
      {donors.map((donor) => (
        <DonorListCard key={donor.id} {...donor} />
      ))}
    </div>
  );
};

export default ViewDonation;
