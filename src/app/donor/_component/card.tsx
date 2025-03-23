'use client';
import React from 'react';
import { Button, Card, CardBody, Image, Link } from '@heroui/react';
import { Progress } from '@heroui/react';
import SponsorFormModal from '../home/_components/sponsorformModel';

interface DonorFeedCardProps {
  id: number;
  name: string;
  email: string;
  company: string;
  price: number;
  remaining: number;
  progress: number;
  note: string;
}

const DonorFeedCard: React.FC<DonorFeedCardProps> = ({
  id,
  name,
  email,
  company,
  price,
  remaining,
  progress,
  note,
}) => {
  return (
    <Card
      isPressable
      className='m-5 h-fit w-fit rounded-3xl bg-gray-900 text-white shadow-xl'
    >
      <CardBody className='p-5'>
        <div className='grid h-full grid-cols-3 gap-2'>
          <div className='col-span-1'>
            <Image
              alt='Card background'
              className='rounded-xl object-cover'
              src='https://heroui.com/images/hero-card-complete.jpeg'
              width={270}
            />
          </div>
          {/* Right Section - Details */}
          <div className='col-span-2 grid grid-cols-2 grid-rows-2'>
            <div className='space-y-1'>
              <h1 className='text-lg font-semibold'>{name}</h1>
              <h1 className='text-sm text-gray-300'>{email}</h1>
              <h1 className='text-sm'>{company}</h1>
              <h1 className='text-sm'>Total Cost: {price}</h1>
              <h1 className='text-sm text-red-500'>
                Remaining Needed: {remaining}
              </h1>
            </div>
            <div className='flex justify-end'>
              <Progress
                aria-label='Progress'
                className='max-w-md'
                color='success'
                showValueLabel={true}
                size='md'
                value={progress}
              />
            </div>
            <div className='col-span-2 flex flex-col'>
              <h1 className='text-sm font-semibold text-gray-400'>
                Note to Donor
              </h1>
              <h1 className='text-md mt-1 italic text-gray-300'>{note}</h1>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className='flex justify-end'>
          <Button className='mr-5 rounded-md bg-gray-600 text-white'>
            <SponsorFormModal data={{ id, name }}>Sponsor</SponsorFormModal>
          </Button>
          <Button className='mr-5 rounded-md bg-gray-600 text-white'>
            <Link href={`home/${id}/`}>View Donation</Link>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default DonorFeedCard;
