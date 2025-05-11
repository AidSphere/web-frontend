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
import { DonationHistory } from '@/service/DonorService';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DonorHistoryCardProps {
  donation: DonationHistory;
}

const DonorHistoryCard: React.FC<DonorHistoryCardProps> = ({ donation }) => {
  const { id, amount, message, date, status } = donation;
  
  // Format the date if available, showing relative time if recent
  const formattedDate = date 
    ? new Date(date).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000) // If less than a week old
      ? formatDistanceToNow(new Date(date), { addSuffix: true })
      : format(new Date(date), 'PPP') // Mon, Jan 1, 2025
    : 'Recently';

  // Custom avatar background color based on donation ID
  const avatarColorIndex = (id % 5) + 1;
  const avatarBgClass = `bg-gradient-to-br ${getAvatarGradient(avatarColorIndex)}`;

  return (
    <Card className='w-full overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]'>
      <CardBody className='p-0'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-12'>
          {/* Status indicator - vertical bar on the left */}
          <div
            className={cn(
              'hidden md:block md:col-span-1',
              status 
                ? 'bg-gradient-to-b from-green-50 to-green-100 border-r border-green-200' 
                : 'bg-gradient-to-b from-red-50 to-red-100 border-r border-red-200',
              'flex items-center justify-center'
            )}
          >
            {status ? (
              <CheckCircle className='text-green-500' size={24} />
            ) : (
              <XCircle className='text-red-500' size={24} />
            )}
          </div>

          {/* Donation ID and Status */}
          <div className='col-span-1 flex items-center p-4 md:col-span-5 md:p-5'>
            <div className={cn('rounded-full h-12 w-12 flex items-center justify-center text-white font-bold mr-4', avatarBgClass)}>
              {`#${id}`}
            </div>
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <h3 className='font-semibold text-gray-800'>
                  Donation #{id}
                </h3>
                <Chip
                  variant='flat'
                  color={status ? 'success' : 'danger'}
                  size='sm'
                  className={cn(
                    'md:hidden',
                    status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  )}
                >
                  {status ? 'Successful' : 'Failed'}
                </Chip>
              </div>
              {message && (
                <div className='mt-1 text-sm text-gray-600 italic'>
                  "{message}"
                </div>
              )}
              <div className='mt-1 flex items-center text-xs text-gray-500'>
                <Calendar size={14} className='mr-1 opacity-70' />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Donation amount */}
          <div className='col-span-1 flex items-center px-4 pb-4 md:col-span-2 md:p-5'>
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500 mb-1'>Amount</span>
              <div className='flex items-center'>
                <DollarSign size={16} className={status ? 'text-green-500' : 'text-gray-400'} />
                <span className={cn(
                  'font-semibold',
                  status ? 'text-gray-800' : 'text-gray-500'
                )}>
                  LKR {amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Status badge for larger screens */}
          <div className='hidden md:flex md:col-span-2 md:p-5 items-center'>
            <Chip
              variant='flat'
              size='sm'
              className={cn(
                'px-3 py-1',
                status 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              )}
            >
              {status ? 'Payment Successful' : 'Payment Failed'}
            </Chip>
          </div>

          {/* Actions */}
          <div className='col-span-1 flex items-center justify-end px-4 pb-4 md:col-span-2 md:p-5'>
            <Tooltip content='View details'>
              <Button
                isIconOnly
                variant='light'
                className='text-gray-500 hover:text-primary hover:bg-gray-100'
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

// Helper function to get gradient class based on index
function getAvatarGradient(index: number): string {
  const gradients = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-amber-400 to-amber-600',
    'from-teal-400 to-teal-600'
  ];
  return gradients[index % gradients.length];
}

export default DonorHistoryCard;
