'use client';
import { Card, CardBody, Avatar, Chip } from '@heroui/react';
import { Heart } from 'lucide-react';
import React, { useState } from 'react';

interface DonorFeedCardProps {
  name: string;
  email: string;
  company: string;
  price: number;
  personlizedMessage: string;
}

const DonorListCard: React.FC<DonorFeedCardProps> = ({
  name,
  email,
  company,
  price,
  personlizedMessage,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <Card className='w-3/4 rounded-lg bg-gray-900 p-5 text-white shadow-lg'>
      <CardBody className='grid grid-cols-3 gap-5'>
        {/* Left Section - Avatar & Details */}
        <div className='col-span-2 flex gap-4'>
          <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />

          <div className='flex flex-col justify-center gap-2'>
            <h1 className='text-lg font-semibold'>{name}</h1>
            <h1 className='text-sm text-gray-300'>{email}</h1>
            <div className='flex items-center gap-2'>
              <h1 className='text-sm'>{company}</h1>
              <Chip color='secondary' variant='bordered'>
                Company
              </Chip>
            </div>
            <h1 className='text-sm italic text-gray-400'>
              {personlizedMessage}
            </h1>
          </div>
        </div>

        {/* Right Section - Donation Amount */}
        <div className='col-span-1 flex flex-col items-end justify-center'>
          <h1 className='text-lg font-bold'>LKR {price}</h1>
          <Heart
            size={24}
            fill={isLiked ? 'red' : 'none'}
            className={`cursor-pointer transition-colors ${isLiked ? 'text-red-600' : 'text-red-700'} `}
            onClick={() => setIsLiked(!isLiked)}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default DonorListCard;
