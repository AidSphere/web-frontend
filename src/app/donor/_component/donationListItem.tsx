'use client';
import type React from 'react';
import { useState } from 'react';
import { Card, CardBody, Avatar, Chip } from '@heroui/react';
import { Heart, Calendar, Building, Mail, DollarSign } from 'lucide-react';
import { DonationByRequestId } from '@/service/DonorService';

interface DonorListCardProps {
  donation: DonationByRequestId;
}

const DonorListCard: React.FC<DonorListCardProps> = ({ donation }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { donorName, donatedAmount, donationMessage, donationDate, donationRequestTitle } = donation;

  // Format the date if available
  const formattedDate = donationDate 
    ? new Date(donationDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Recently';

  // Generate avatar from name
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${donorName}`;

  return (
    <Card className='mx-auto w-full max-w-3xl rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl'>
      <CardBody className='p-5'>
        <div className='flex flex-col justify-between gap-4 md:flex-row'>
          {/* Left Section - Avatar & Details */}
          <div className='flex gap-4'>
            <Avatar src={avatarUrl} className='h-12 w-12' />

            <div className='flex flex-col justify-center gap-1'>
              <h1 className='text-lg font-semibold'>{donorName}</h1>

              <div className='flex items-center text-sm'>
                <Building size={14} className='mr-1' />
                <span>{donationRequestTitle}</span>
              </div>

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
                LKR {donatedAmount.toLocaleString()}
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
        {donationMessage && (
          <div className='mt-3 border-t border-gray-100 pt-3'>
            <p className='text-sm italic text-gray-600'>
              "{donationMessage}"
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default DonorListCard;
