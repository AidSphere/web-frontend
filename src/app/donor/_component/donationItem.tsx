'use client';
import type React from 'react';
import { Card, CardBody, Chip, Avatar, Button, Tooltip } from '@heroui/react';
import {
  Calendar,
  DollarSign,
  Mail,
  ExternalLink,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface DonorHistoryCardProps {
  id: number;
  name: string;
  email: string;
  price: number;
  url: string;
  status: boolean;
  date: string;
}

const DonorHistoryCard: React.FC<DonorHistoryCardProps> = ({
  id,
  name,
  email,
  price,
  url,
  status,
  date,
}) => {
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className='w-full transition-shadow duration-300 hover:shadow-md'>
      <CardBody className='p-0'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-12'>
          {/* Status indicator - vertical bar on the left */}
          <div
            className={`hidden md:col-span-1 md:block ${
              status ? 'bg-success-100' : 'bg-danger-100'
            } flex items-center justify-center`}
          >
            {status ? (
              <CheckCircle className='text-success' size={24} />
            ) : (
              <XCircle className='text-danger' size={24} />
            )}
          </div>

          {/* Donor info */}
          <div className='col-span-1 flex items-center p-4 md:col-span-5 md:p-5'>
            <Avatar
              src={url}
              className='mr-4 h-12 w-12 text-large'
              isBordered
              color={status ? 'success' : 'danger'}
            />
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <h3 className='font-semibold text-gray-800'>{name}</h3>
                <Chip
                  variant='flat'
                  color={status ? 'success' : 'danger'}
                  size='sm'
                  className='md:hidden'
                >
                  {status ? 'Success' : 'Failed'}
                </Chip>
              </div>
              <div className='mt-1 flex items-center text-sm text-gray-500'>
                <Mail size={14} className='mr-1' />
                <span>{email}</span>
              </div>
            </div>
          </div>

          {/* Donation amount */}
          <div className='col-span-1 flex items-center px-4 pb-4 md:col-span-2 md:p-5'>
            <div className='flex items-center'>
              <DollarSign size={18} className='mr-1 text-primary' />
              <span className='font-semibold text-gray-800'>
                LKR {price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Date */}
          <div className='col-span-1 flex items-center px-4 pb-4 md:col-span-2 md:p-5'>
            <div className='flex items-center text-gray-500'>
              <Calendar size={16} className='mr-1' />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Actions */}
          <div className='col-span-1 flex items-center justify-end px-4 pb-4 md:col-span-2 md:p-5'>
            <Tooltip content='View donation details'>
              <Button
                isIconOnly
                variant='light'
                className='text-gray-500 hover:text-primary'
                aria-label='View donation details'
              >
                <ExternalLink size={18} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DonorHistoryCard;
