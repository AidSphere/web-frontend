'use client';
import type React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Progress,
  Chip,
  Tooltip,
  Link,
} from '@heroui/react';
import {
  Heart,
  Calendar,
  Building,
  Mail,
  DollarSign,
  AlertTriangle,
  Eye,
  Clock,
} from 'lucide-react';
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
  category: string;
  urgency: 'low' | 'medium' | 'high';
  createdAt: string;
  image: string;
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
  category,
  urgency,
  createdAt,
  image,
}) => {
  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Calculate amount raised
  const amountRaised = price - remaining;

  // Determine urgency color and label
  const urgencyColor =
    urgency === 'high'
      ? 'danger'
      : urgency === 'medium'
        ? 'warning'
        : 'success';
  const urgencyLabel =
    urgency === 'high'
      ? 'Urgent'
      : urgency === 'medium'
        ? 'Needed'
        : 'Standard';

  // Determine progress color
  const progressColor =
    progress >= 75 ? 'success' : progress >= 40 ? 'warning' : 'primary';

  return (
    <Card className='overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg'>
      <CardBody className='p-0'>
        <div className='relative'>
          {/* Category and Urgency Tags */}
          <div className='absolute left-4 top-4 z-10 flex gap-2'>
            <Chip color='primary' variant='flat' size='sm'>
              {category}
            </Chip>
            <Chip
              color={urgencyColor}
              variant='solid'
              size='sm'
              startContent={<AlertTriangle size={12} />}
            >
              {urgencyLabel}
            </Chip>
          </div>

          {/* Date Tag */}
          <div className='absolute right-4 top-4 z-10'>
            <Chip
              variant='flat'
              size='sm'
              startContent={<Calendar size={12} />}
            >
              {formattedDate}
            </Chip>
          </div>

          {/* Main Image with Overlay Gradient */}
          <div className='relative'>
            <Image
              alt={`${name}'s donation request`}
              className='h-48 w-full object-cover'
              src={image || '/placeholder.svg'}
              removeWrapper
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
          </div>

          {/* Progress Bar Overlay */}
          <div className='absolute bottom-0 left-0 right-0 px-4 pb-4'>
            <Progress
              aria-label='Donation Progress'
              value={progress}
              color={progressColor}
              showValueLabel={true}
              className='h-2'
              valueLabel={`${progress}% Funded`}
            />
          </div>
        </div>

        <div className='p-5'>
          {/* Patient Info */}
          <div className='mb-4'>
            <h2 className='mb-1 text-xl font-semibold'>{name}</h2>
            <div className='flex flex-wrap gap-y-1 text-sm text-gray-500'>
              <div className='mr-4 flex items-center'>
                <Mail size={14} className='mr-1' />
                <span>{email}</span>
              </div>
              {company && (
                <div className='flex items-center'>
                  <Building size={14} className='mr-1' />
                  <span>{company}</span>
                </div>
              )}
            </div>
          </div>

          {/* Donation Details */}
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div className='rounded-lg bg-gray-50 p-3'>
              <p className='mb-1 text-xs text-gray-500'>Total Needed</p>
              <p className='flex items-center text-lg font-semibold'>
                <DollarSign size={16} className='text-primary' />
                LKR {price.toLocaleString()}
              </p>
            </div>
            <div className='rounded-lg bg-gray-50 p-3'>
              <p className='mb-1 text-xs text-gray-500'>Still Needed</p>
              <p className='flex items-center text-lg font-semibold text-danger'>
                <DollarSign size={16} />
                LKR {remaining.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Note */}
          <div className='mb-4'>
            <h3 className='mb-2 flex items-center text-sm font-medium text-gray-700'>
              <Heart size={14} className='mr-1 text-danger' />
              Note to Donors
            </h3>
            <p className='line-clamp-3 text-sm italic text-gray-600'>{note}</p>
          </div>
        </div>
      </CardBody>

      <CardFooter className='flex items-center justify-between bg-gray-50 px-5 py-4'>
        <div className='flex items-center'>
          <Tooltip
            content={`${progress}% funded - LKR ${amountRaised.toLocaleString()} raised so far`}
          >
            <div className='flex items-center text-sm font-medium'>
              <Clock size={16} className='mr-1 text-primary' />
              {remaining === 0 ? (
                <span className='text-success'>Fully Funded!</span>
              ) : (
                <span>
                  {progress < 25
                    ? 'Just Started'
                    : progress < 50
                      ? 'Making Progress'
                      : progress < 75
                        ? 'Getting Close'
                        : 'Almost There!'}
                </span>
              )}
            </div>
          </Tooltip>
        </div>

        <div className='flex gap-2'>
          <Button
            as={Link}
            href={`home/${id}/`}
            variant='flat'
            color='primary'
            startContent={<Eye size={16} />}
            className='font-medium'
          >
            View Donations
          </Button>
          <Button
  color='primary'
  startContent={<Heart size={16} />}
  className='font-medium sponsor-button' // Added specific class
  disabled={remaining === 0}
  data-testid={`sponsor-button-${id}`} // Unique test ID
  data-patient={name} // Additional data attribute
>
  <SponsorFormModal data={{ id, name }}>
    {remaining === 0 ? 'Fully Funded' : 'Sponsor Now'}
  </SponsorFormModal>
</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DonorFeedCard;
