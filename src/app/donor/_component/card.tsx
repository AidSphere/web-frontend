'use client';
import React, { useState } from 'react';
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import {
  Heart,
  Calendar,
  Building,
  DollarSign,
  AlertTriangle,
  Eye,
  Clock,
  FileText,
  List,
  File,
  ExternalLink,
  X,
} from 'lucide-react';
import SponsorFormModal from '../home/_components/sponsorformModel';
import type { DonationRequest, PrescribedMedicine } from '@/service/DonorService';

interface DonorFeedCardProps {
  donation: DonationRequest;
  onDonationSuccess?: () => void;
}

const DonorFeedCard: React.FC<DonorFeedCardProps> = ({
  donation,
  onDonationSuccess
}) => {
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  
  const {
    requestId,
    title,
    description,
    hospitalName,
    defaultPrice,
    remainingPrice,
    createdAt,
    expectedDate,
    images,
    documents,
    prescribedMedicines,
    prescriptionUrl
  } = donation;

  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Calculate progress
  const amountRaised = defaultPrice - remainingPrice;
  const progress = Math.round((amountRaised / defaultPrice) * 100);

  // Determine urgency based on expected date
  const daysUntilExpected = Math.ceil(
    (new Date(expectedDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );
  const urgency = daysUntilExpected <= 7 ? 'high' : daysUntilExpected <= 14 ? 'medium' : 'low';

  // Determine urgency color and label
  const urgencyColor = urgency === 'high' ? 'danger' : urgency === 'medium' ? 'warning' : 'success';
  const urgencyLabel = urgency === 'high' ? 'Urgent' : urgency === 'medium' ? 'Needed' : 'Standard';

  // Function to get file name from URL
  const getFileName = (url: string): string => {
    try {
      const urlParts = new URL(url).pathname.split('/');
      return urlParts[urlParts.length - 1];
    } catch (e) {
      // If URL parsing fails, return the last part of the path
      const parts = url.split('/');
      return parts[parts.length - 1];
    }
  };

  // Function to open document in new tab
  const openDocument = (url: string) => {
    window.open(url, '_blank');
  };

  // All documents including prescription
  const allDocuments = [
    ...(prescriptionUrl ? [{ type: 'Prescription', url: prescriptionUrl }] : []),
    ...(documents?.map(url => ({ type: 'Medical Document', url })) || [])
  ];

  return (
    <div>
      <Card className='overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg'>
        <CardBody className='p-0'>
          <div className='relative'>
            {/* Urgency Tags */}
            <div className='absolute left-4 top-4 z-10 flex gap-2'>
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
                alt={title}
                className='h-48 w-full object-cover'
                src={images && images.length > 0 ? images[0] : '/placeholder.svg'}
                removeWrapper
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
            </div>

            {/* Progress Bar Overlay - Now removed from here */}
          </div>

          {/* Dedicated Progress Section - New */}
          <div className='bg-gray-50 px-5 py-3'>
            <div className='flex items-center justify-between mb-1'>
              <p className='text-sm font-medium text-gray-700'>Funding Progress</p>
              <p className='text-sm font-medium text-green-600'>{progress}%</p>
            </div>
            <div className='h-3 w-full overflow-hidden rounded-full bg-gray-200'>
              <div 
                className='h-full rounded-full bg-green-500 transition-all duration-500 ease-in-out' 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className='flex items-center justify-between mt-1 text-xs text-gray-500'>
              <span>LKR {amountRaised.toLocaleString()} raised</span>
              <span>LKR {defaultPrice.toLocaleString()} goal</span>
            </div>
          </div>

          <div className='p-5'>
            {/* Request Info */}
            <div className='mb-4'>
              <h2 className='mb-1 text-xl font-semibold'>{title}</h2>
              <div className='flex flex-wrap gap-y-1 text-sm text-gray-500'>
                <div className='flex items-center'>
                  <Building size={14} className='mr-1' />
                  <span>{hospitalName}</span>
                </div>
              </div>
            </div>

            {/* Donation Details */}
            <div className='mb-4 grid grid-cols-2 gap-4'>
              <div className='rounded-lg bg-gray-50 p-3'>
                <p className='mb-1 text-xs text-gray-500'>Total Needed</p>
                <p className='flex items-center text-lg font-semibold'>
                  <DollarSign size={16} className='text-primary' />
                  LKR {defaultPrice.toLocaleString()}
                </p>
              </div>
              <div className='rounded-lg bg-gray-50 p-3'>
                <p className='mb-1 text-xs text-gray-500'>Still Needed</p>
                <p className='flex items-center text-lg font-semibold text-danger'>
                  <DollarSign size={16} />
                  LKR {remainingPrice.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className='mb-4'>
              <h3 className='mb-2 flex items-center text-sm font-medium text-gray-700'>
                <Heart size={14} className='mr-1 text-danger' />
                Description
              </h3>
              <p className='line-clamp-3 text-sm text-gray-600'>{description}</p>
            </div>

            {/* Medicines */}
            {prescribedMedicines && prescribedMedicines.length > 0 && (
              <div className='mb-4'>
                <h3 className='mb-2 flex items-center text-sm font-medium text-gray-700'>
                  <List size={14} className='mr-1 text-primary' />
                  Prescribed Medicines
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {prescribedMedicines.slice(0, 3).map((med, index) => (
                    <Chip key={index} variant='flat' size='sm' className='bg-gray-100'>
                      {med.medicine} ({med.amount})
                    </Chip>
                  ))}
                  {prescribedMedicines.length > 3 && (
                    <Chip variant='flat' size='sm' className='bg-gray-100'>
                      +{prescribedMedicines.length - 3} more
                    </Chip>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardBody>

        <CardFooter className='flex items-center justify-between bg-gray-50 px-5 py-4'>
          <div className='flex items-center gap-2'>
            {allDocuments.length > 0 && (
              <Tooltip content='View Documents'>
                <Button
                  isIconOnly
                  variant='light'
                  size='sm'
                  className='text-gray-500 hover:text-primary'
                  onClick={() => setIsDocumentsModalOpen(true)}
                >
                  <FileText size={16} />
                </Button>
              </Tooltip>
            )}
          </div>

          <div className='flex gap-2'>
            <Button
              as={Link}
              href={`/donor/home/${requestId}`}
              variant='flat'
              color='primary'
              startContent={<Eye size={16} />}
              className='font-medium'
            >
              View Details
            </Button>
            <Button
              color='primary'
              startContent={<Heart size={16} />}
              className='font-medium'
              disabled={remainingPrice === 0}
            >
              <SponsorFormModal 
                data={{ id: requestId, name: title }}
                onSuccess={onDonationSuccess}
              >
                {remainingPrice === 0 ? 'Fully Funded' : 'Sponsor Now'}
              </SponsorFormModal>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Documents Modal */}
      <Modal 
        isOpen={isDocumentsModalOpen} 
        onClose={() => setIsDocumentsModalOpen(false)}
        className="z-50"
      >
        <ModalContent>
          <ModalHeader className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Documents</h3>
            <Button
              isIconOnly
              variant="light"
              className="text-gray-500"
              onClick={() => setIsDocumentsModalOpen(false)}
            >
              <X size={20} />
            </Button>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                The following documents have been uploaded to support this donation request:
              </p>
              
{allDocuments.map((doc, index) => (
  <div key={index} className="p-3 rounded-lg bg-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-700">{doc.type}</p>
      <p className="text-xs text-gray-500">{getFileName(doc.url)}</p>
    </div>
    <Button
      variant="light"
      size="sm"
      startContent={<ExternalLink size={16} />}
      onClickCapture={() => openDocument(doc.url)}
    >
      Open
    </Button>
  </div>
))}

            </div>
          </ModalBody>
          <ModalFooter>
            <p className="text-xs text-gray-500 w-full text-center">
              Documents are PDF files that contain medical reports and other relevant information.
            </p>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DonorFeedCard;
