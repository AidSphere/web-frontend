'use client';
import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Chip } from '@heroui/react';
import { Avatar } from '@heroui/react';

interface DonorFeedCardProps {
  name: string;
  email: string;
  price: number;
}

const DonorHistoryCard: React.FC<DonorFeedCardProps> = ({
  name,
  email,
  price,
}) => {
  return (
    <Card isPressable className='w-3/4'>
      <CardBody className='grid grid-cols-3'>
        <div className='col-span-1'>
          <div className='flex grid-cols-3 flex-row gap-3'>
            <div>
              <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
            </div>
            <div>
              <h1>{name}</h1>
              <h1>{email}</h1>
            </div>
          </div>
        </div>
        <div className='col-span-1 flex items-center justify-center'>
          <h1>LKR {price}</h1>
        </div>
        <div className='col-span-1 flex items-center justify-center'>
          <div className='flex gap-4'>
            <Chip variant='flat' color='success'>
              Success
            </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DonorHistoryCard;
