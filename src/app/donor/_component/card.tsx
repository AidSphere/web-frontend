'use client';
import React from 'react';
import { Button, Card, CardBody, Image } from '@heroui/react';
import { Progress } from '@heroui/react';

interface DonorFeedCardProps {
  name: string;
  email: string;
  company: string;
  price: number;
  remaining: number;
  progress: number;
  note: string;
}

const DonorFeedCard: React.FC<DonorFeedCardProps> = ({
  name,
  email,
  company,
  price,
  remaining,
  progress,
  note,
}) => {
  return (
    <Card isPressable className='m-5 h-72 w-fit overflow-hidden'>
      <CardBody className='p-7'>
        <div className='grid h-full grid-cols-3 gap-5'>
          {/* for the image */}
          <div className='col-span-1'>
            <Image
              alt='Card background'
              className='rounded-xl object-cover'
              src='https://heroui.com/images/hero-card-complete.jpeg'
              width={270}
            />
          </div>
          <div className='col-span-2 grid grid-cols-2 grid-rows-2'>
            <div>
              <h1>{name}</h1>
              <h1>{email}</h1>
              <h1>{company}</h1>
              <h1>Total Cost:{price}</h1>
              <h1 className='mb-1 text-red-500'>
                Remaining Needed:{remaining}
              </h1>
            </div>
            <div>
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
              <h1 className='text-lg font-bold'>Note to Donator</h1>
              <h1>{note}</h1>
            </div>
          </div>
        </div>
        <div className='flex justify-end'>
          <Button className='mr-5'>Sponsor</Button>
          <Button className='mr-5'>View Donation</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default DonorFeedCard;
