'use client';
import type React from 'react';
import { useState } from 'react';
import { Card, CardBody, Avatar, Chip } from '@heroui/react';
import { Heart, Calendar, Building, Mail, DollarSign } from 'lucide-react';

interface DonorListCardProps {
  name: string;
  email: string;
  company: string;
  price: number;
  personalizedMessage: string;
  donationDate?: string;
  avatarUrl?: string;
}

const DonorListCard: React.FC<DonorListCardProps> = ({
  name,
  email,
  company,
  price,
  personalizedMessage,
  donationDate = new Date().toISOString(),
  avatarUrl = 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Format the date
  const formattedDate = new Date(donationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className='mx-auto w-full max-w-3xl rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl'>
      <CardBody className='p-5'>
        <div className='flex flex-col justify-between gap-4 md:flex-row'>
          {/* Left Section - Avatar & Details */}
          <div className='flex gap-4'>
            <Avatar src={avatarUrl} className='h-12 w-12' />

            <div className='flex flex-col justify-center gap-1'>
              <h1 className='text-lg font-semibold'>{name}</h1>

              <div className='flex items-center text-sm'>
                <Mail size={14} className='mr-1' />
                <span>{email}</span>
              </div>

              {company && (
                <div className='flex items-center gap-2'>
                  <div className='flex items-center text-sm'>
                    <Building size={14} className='mr-1' />
                    <span>{company}</span>
                  </div>
                  <Chip
                    color='secondary'
                    variant='flat'
                    size='sm'
                    className='h-5'
                  >
                    Company
                  </Chip>
                </div>
              )}

              <div className='mt-1 flex items-center text-xs'>
                <Calendar size={12} className='mr-1' />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Right Section - Message & Donation Amount */}
          <div className='flex flex-col justify-between gap-3 md:items-end'>
            <div className='flex items-center'>
              <DollarSign size={18} className='mr-1 text-primary' />
              <span className='text-lg font-bold'>
                LKR {price.toLocaleString()}
              </span>
            </div>

            <div className='flex items-center justify-end'>
              <Heart
                size={20}
                fill={isLiked ? '#f31260' : 'none'}
                stroke={isLiked ? '#f31260' : 'currentColor'}
                className='cursor-pointer transition-colors duration-200'
                onClick={() => setIsLiked(!isLiked)}
              />
            </div>
          </div>
        </div>

        {/* Message Section */}
        {personalizedMessage && (
          <div className='mt-3 border-t border-gray-800 pt-3'>
            <p className='text-sm italic text-gray-300'>
              {personalizedMessage}
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default DonorListCard;
