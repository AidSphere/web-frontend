'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, QrCode } from 'lucide-react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react';
import Image from 'next/image';

// Define TypeScript interfaces for our data
interface DonationItem {
  medicine: string;
  amount: string;
}

interface Importer {
  importerId: string;
  importerName: string;
  acceptedPrice: string;
  eta: string;
}

interface Donation {
  donationId: string;
  patientId: string;
  requestName: string;
  expectedDate: string;
  description: string;
  status: string;
  qrCodeUrl: string;
  createdAt: string;
  updatedAt: string;
  items: DonationItem[];
  importer: Importer;
}

// Mock dataset
const mockDonations: Donation[] = [
  {
    donationId: 'd1a2b3c4',
    patientId: 'p12345',
    requestName: ' Urgent Chemotherapy',
    expectedDate: '2025-04-10',
    description: 'Need chemotherapy medication for my second cycle.',
    status: 'Approved',
    qrCodeUrl: 'https://example.com/qrcode/d1a2b3c4',
    createdAt: '2025-03-20',
    updatedAt: '2025-03-21',
    items: [
      { medicine: 'Cisplatin', amount: '2 vials' },
      { medicine: 'Doxorubicin', amount: '1 vial' },
    ],
    importer: {
      importerId: 'imp001',
      importerName: 'MediPharm Suppliers',
      acceptedPrice: 'Rs. 1200',
      eta: '2025-04-08',
    },
  },
  {
    donationId: 'e5f6g7h8',
    patientId: 'p67890',
    requestName: 'Cancer Surgery',
    expectedDate: '2025-05-01',
    description:
      'Financial aid required for surgery and post-recovery expenses.',
    status: 'Approved',
    qrCodeUrl: 'https://example.com/qrcode/e5f6g7h8',
    createdAt: '2025-03-18',
    updatedAt: '2025-03-22',
    items: [
      { medicine: 'General Anesthesia', amount: '1 unit' },
      { medicine: 'Pain Relief Medication', amount: '5 packs' },
    ],
    importer: {
      importerId: 'imp002',
      importerName: 'HealthCare Suppliers',
      acceptedPrice: 'Rs. 9800',
      eta: '2025-04-28',
    },
  },
];

// Helper function to determine progress stage
const getProgressStage = (donation: Donation): number => {
  if (donation.status === 'Approved') return 2;
  if (donation.status === 'Pending') return 1;
  return 0;
};

export default function DonationDetailsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const params = useParams(); // Unwrap params
  const { id } = params as { id: string }; // Type assertion

  // Find the donation with the matching ID
  const donation = mockDonations.find((d) => d.donationId === id);

  // If no matching donation is found, return a 404 page
  if (!donation) {
    notFound();
  }

  // Determine the current progress stage (0-3)
  const progressStage = getProgressStage(donation);

  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='p-4 md:p-6'>
      <Link
        href='/patient/donation/ongoing'
        className='mb-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-white hover:bg-primary-600'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        back
      </Link>

      {/* Basic Info Card */}
      <div className='mb-6 rounded-lg border p-6 shadow-md'>
        <div className='flex flex-col items-start justify-between md:flex-row md:items-center'>
          <div className='mb-4 space-y-2 md:mb-0'>
            <h1 className='text-2xl font-bold'>{donation.requestName}</h1>
            <p className='text-gray-600'>ID: {donation.donationId}</p>
            <p className='text-gray-600'>
              Expected Date: {formatDate(donation.expectedDate)}
            </p>
            <p className='text-gray-600'>
              Status:{' '}
              <span
                className={
                  donation.status === 'Approved'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }
              >
                {donation.status}
              </span>
            </p>
            <p className='mt-2 text-gray-700'>{donation.description}</p>
          </div>
          <span className='flex flex-col items-end gap-2'>
            <Button
              onPress={onOpen}
              className='rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-600'
            >
              <QrCode className='mr-2 h-4 w-4' />
              Show QR
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      QR code for the donation
                    </ModalHeader>
                    <ModalBody>
                      <p className='mb-8 mt-4 text-center'>
                        Scan the QR code to verify authenticity
                      </p>
                      <div className='flex flex-col items-center justify-center rounded border-s p-10 shadow-sm'>
                        <Image
                          loading='lazy'
                          alt='qr code for request'
                          src={
                            'https://api.qrserver.com/v1/create-qr-code/?data=23b3423j34h234nn3k423&amp;size=100x100'
                          }
                          height={180}
                          width={180}
                        />
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className='rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-600'
                        onPress={onClose}
                      >
                        Print
                      </Button>
                      <Button color='danger' variant='light' onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Button className='rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-600'>
              Share in Social Media
            </Button>
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className='mb-6 rounded-lg border p-6 shadow-md'>
        <h2 className='mb-4 text-xl font-semibold'>Donation Progress</h2>
        <div className='relative w-full text-lg font-bold'>
          <div className='mb-6 h-6 w-full rounded-full bg-gray-200'>
            <div
              className='h-6 rounded-full bg-primary'
              style={{ width: `${(progressStage / 4) * 100}%` }}
            ></div>
          </div>
          <div className='absolute bottom-6 right-1 text-gray-700'>
            Rs. 500 / {donation.importer.acceptedPrice}
          </div>
        </div>

        {/* Timeline */}
        <div className='relative'>
          {/* Vertical line */}
          <div className='absolute bottom-0 left-4 top-4 w-0.5 bg-gray-200'></div>

          {/* Timeline items */}
          <div className='space-y-16'>
            {/* Drug importer selected */}
            <div className='flex items-center'>
              <div
                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${progressStage >= 1 ? 'bg-primary' : 'bg-gray-300'}`}
              ></div>
              <div className='ml-6 text-lg'>Drug importer selected</div>
            </div>

            {/* Donation collecting started */}
            <div className='flex items-center'>
              <div
                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${progressStage >= 2 ? 'bg-primary' : 'bg-gray-300'}`}
              ></div>
              <div className='ml-6 text-lg'>Donation collecting started</div>
            </div>

            {/* Confirm order */}
            <div className='flex items-center'>
              <div
                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${progressStage >= 3 ? 'bg-primary' : 'bg-gray-300'}`}
              ></div>
              <div className='ml-6 text-lg'>Confirm order</div>
            </div>

            {/* Arrival */}
            <div className='flex items-center'>
              <div
                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${progressStage >= 4 ? 'bg-primary' : 'bg-gray-300'}`}
              ></div>
              <div className='ml-6 text-lg'>Arrival</div>
            </div>
          </div>
        </div>
      </div>

      {/* Medication Items */}
      <div className='mb-6 rounded-lg border bg-primary-50/40 p-6 shadow-md'>
        <h2 className='mb-4 text-xl font-semibold'>Medication Items</h2>
        <ul className='space-y-2'>
          {donation.items.map((item, index) => (
            <li key={index} className='flex justify-between border-b pb-2'>
              <span className='font-medium'>{item.medicine}</span>
              <span>{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Importer Details */}
      <div className='rounded-lg border bg-primary-50/60 p-6 shadow-md'>
        <h2 className='mb-4 text-xl font-semibold'>Importer Information</h2>
        <div className='space-y-2'>
          <p>
            <span className='font-medium'>Name:</span>{' '}
            {donation.importer.importerName}
          </p>
          <p>
            <span className='font-medium'>ID:</span>{' '}
            {donation.importer.importerId}
          </p>
          <p>
            <span className='font-medium'>Accepted Price:</span>{' '}
            {donation.importer.acceptedPrice}
          </p>
          <p>
            <span className='font-medium'>Estimated Arrival:</span>{' '}
            {formatDate(donation.importer.eta)}
          </p>
        </div>
      </div>
    </div>
  );
}
