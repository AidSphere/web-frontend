/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Package,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  AlertCircle,
  Send,
  Mail,
  Download,
  Printer,
  MoreHorizontal,
  Search,
  Filter,
  Edit,
  Trash,
  CheckCircle2,
  ChevronDown,
  ShieldAlert,
  Clipboard,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Define TypeScript interfaces
interface Medicine {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: 'Available' | 'Low Stock' | 'Out of Stock';
}

type RequestType = 'clientRequest' | 'donorRequest';
type RequestStatus = 'Pending' | 'Quotation Sent' | 'Accepted' | 'Declined';

interface BillRequest {
  id: string;
  requestDate: string;
  clientName: string;
  email: string;
  phone: string;
  type: RequestType;
  description: string;
  items: number;
  status: RequestStatus;
  notes?: string;
  attachments?: string[];
}

// Collection of bill requests and medicine lists
interface BillRequestCollection {
  [key: string]: BillRequest;
}

interface MedicineListCollection {
  [key: string]: Medicine[];
}

// Sample bill request data
const billRequests: BillRequestCollection = {
  'BR-7842': {
    id: 'BR-7842',
    requestDate: '2025-03-19',
    clientName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    type: 'clientRequest', // Client requesting medicine
    description:
      'Monthly prescription refill for chronic conditions including hypertension, diabetes, and cholesterol management. Patient requires medications for the next 30 days.',
    items: 12,
    status: 'Pending',
    notes:
      'Client has insurance coverage. Priority delivery requested due to low supply at home.',
    attachments: ['prescription.pdf', 'insurance_card.jpg'],
  },
  'BR-7840': {
    id: 'BR-7840',
    requestDate: '2025-03-18',
    clientName: 'Michael Davis',
    email: 'michael.davis@hospital.org',
    phone: '+1 (555) 987-6543',
    type: 'donorRequest', // Donor offering medicine
    description:
      'Hospital bulk donation of cardiac medications. These are unexpired medications from our pharmacy that are in surplus due to a change in our formulary.',
    items: 15,
    status: 'Accepted',
    notes:
      'All medications are in sealed packages with at least 1 year before expiration. Pickup scheduled for March 25th.',
    attachments: ['inventory_list.pdf', 'donation_letter.pdf'],
  },
  'BR-7837': {
    id: 'BR-7837',
    requestDate: '2025-03-16',
    clientName: 'Jennifer Miller',
    email: 'jennifer.miller@clinic.net',
    phone: '+1 (555) 456-7890',
    type: 'donorRequest',
    description:
      'Pain management medications donation from clinic closing down. All medications are properly stored and unexpired.',
    items: 9,
    status: 'Quotation Sent',
    notes:
      "Requires verification of recipient's medical license. Chain of custody documentation needed.",
    attachments: ['medication_list.pdf', 'storage_certification.pdf'],
  },
};

// Sample medicine list data
const medicineLists: MedicineListCollection = {
  'BR-7842': [
    {
      id: 1,
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      quantity: 60,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 2,
      name: 'Lisinopril 10mg',
      category: 'Cardiovascular',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 3,
      name: 'Metformin 1000mg',
      category: 'Diabetes',
      quantity: 60,
      unit: 'Tablets',
      status: 'Low Stock',
    },
    {
      id: 4,
      name: 'Atorvastatin 20mg',
      category: 'Cardiovascular',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 5,
      name: 'Albuterol Inhaler',
      category: 'Respiratory',
      quantity: 2,
      unit: 'Inhalers',
      status: 'Out of Stock',
    },
    {
      id: 6,
      name: 'Omeprazole 20mg',
      category: 'Gastrointestinal',
      quantity: 30,
      unit: 'Capsules',
      status: 'Available',
    },
    {
      id: 7,
      name: 'Levothyroxine 50mcg',
      category: 'Thyroid',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 8,
      name: 'Hydrochlorothiazide 25mg',
      category: 'Cardiovascular',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 9,
      name: 'Sertraline 50mg',
      category: 'Mental Health',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 10,
      name: 'Ibuprofen 800mg',
      category: 'Pain Relief',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 11,
      name: 'Fluticasone Nasal Spray',
      category: 'Allergy',
      quantity: 1,
      unit: 'Bottle',
      status: 'Available',
    },
    {
      id: 12,
      name: 'Vitamin D3 2000IU',
      category: 'Supplements',
      quantity: 90,
      unit: 'Tablets',
      status: 'Available',
    },
  ],
  'BR-7840': [
    {
      id: 1,
      name: 'Atenolol 25mg',
      category: 'Cardiovascular',
      quantity: 500,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 2,
      name: 'Diltiazem 120mg',
      category: 'Cardiovascular',
      quantity: 300,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 3,
      name: 'Clopidogrel 75mg',
      category: 'Cardiovascular',
      quantity: 400,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 4,
      name: 'Nitroglycerin Sublingual',
      category: 'Cardiovascular',
      quantity: 200,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 5,
      name: 'Furosemide 40mg',
      category: 'Cardiovascular',
      quantity: 300,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 6,
      name: 'Amiodarone 200mg',
      category: 'Cardiovascular',
      quantity: 200,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 7,
      name: 'Warfarin 5mg',
      category: 'Cardiovascular',
      quantity: 300,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 8,
      name: 'Digoxin 125mcg',
      category: 'Cardiovascular',
      quantity: 200,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 9,
      name: 'Verapamil 120mg SR',
      category: 'Cardiovascular',
      quantity: 250,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 10,
      name: 'Metoprolol 50mg',
      category: 'Cardiovascular',
      quantity: 400,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 11,
      name: 'Amlodipine 5mg',
      category: 'Cardiovascular',
      quantity: 350,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 12,
      name: 'Pravastatin 40mg',
      category: 'Cardiovascular',
      quantity: 300,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 13,
      name: 'Losartan 50mg',
      category: 'Cardiovascular',
      quantity: 400,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 14,
      name: 'Aspirin 81mg',
      category: 'Cardiovascular',
      quantity: 500,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 15,
      name: 'Carvedilol 25mg',
      category: 'Cardiovascular',
      quantity: 250,
      unit: 'Tablets',
      status: 'Available',
    },
  ],
  'BR-7837': [
    {
      id: 1,
      name: 'Tramadol 50mg',
      category: 'Pain Relief',
      quantity: 200,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 2,
      name: 'Acetaminophen 500mg',
      category: 'Pain Relief',
      quantity: 300,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 3,
      name: 'Naproxen 500mg',
      category: 'Pain Relief',
      quantity: 200,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 4,
      name: 'Diclofenac 75mg',
      category: 'Pain Relief',
      quantity: 150,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 5,
      name: 'Meloxicam 15mg',
      category: 'Pain Relief',
      quantity: 120,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 6,
      name: 'Baclofen 10mg',
      category: 'Muscle Relaxant',
      quantity: 180,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 7,
      name: 'Tizanidine 4mg',
      category: 'Muscle Relaxant',
      quantity: 150,
      unit: 'Tablets',
      status: 'Available',
    },
    {
      id: 8,
      name: 'Lidocaine Patch 5%',
      category: 'Pain Relief',
      quantity: 30,
      unit: 'Patches',
      status: 'Available',
    },
    {
      id: 9,
      name: 'Pregabalin 75mg',
      category: 'Neuropathic Pain',
      quantity: 90,
      unit: 'Capsules',
      status: 'Available',
    },
  ],
};

export default function BillRequestDetail() {
  const router = useRouter();
  const params = useParams();
  const requestId = params.id as string;

  // Get request data or show not found
  const requestData = billRequests[requestId];
  const medicineList = medicineLists[requestId] || [];

  // State for medicine list search
  const [searchMedicine, setSearchMedicine] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Handle back navigation
  const handleBack = (): void => {
    router.back();
  };

  // Get status color
  const getStatusColor = (status: RequestStatus): string => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500';
      case 'Quotation Sent':
        return 'bg-secondary';
      case 'Accepted':
        return 'bg-green-500';
      case 'Declined':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status icon
  const getStatusIcon = (status: RequestStatus) => {
    switch (status) {
      case 'Pending':
        return <Clock className='size-5' />;
      case 'Quotation Sent':
        return <FileText className='size-5' />;
      case 'Accepted':
        return <CheckCircle className='size-5' />;
      case 'Declined':
        return <XCircle className='size-5' />;
      default:
        return <AlertCircle className='size-5' />;
    }
  };

  // Get medicine status color
  const getMedicineStatusColor = (status: Medicine['status']): string => {
    switch (status) {
      case 'Available':
        return 'text-green-500';
      case 'Low Stock':
        return 'text-amber-500';
      case 'Out of Stock':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // Filter medicines based on search and filters
  const filteredMedicines = medicineList.filter((medicine: Medicine) => {
    const matchesSearch = medicine.name
      .toLowerCase()
      .includes(searchMedicine.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || medicine.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'All' || medicine.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for filter dropdown
  const categories: string[] = [
    'All',
    ...Array.from(new Set(medicineList.map((med) => med.category))),
  ];

  // If request not found
  if (!requestData) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center p-4'>
        <AlertCircle className='mb-4 size-16 text-red-500' />
        <h1 className='mb-2 text-2xl font-bold'>Request Not Found</h1>
        <p className='mb-4 text-gray-500'>
          The bill request you&apos;re looking for doesn&apos;t exist or has
          been removed.
        </p>
        <Link href='/importer/bill-requests'>
          <button className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90'>
            <ArrowLeft className='mr-2 size-4' />
            Back to Bill Requests
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Header with back button and actions */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-2'>
          <button
            onClick={handleBack}
            className='inline-flex size-10 items-center justify-center rounded-md border bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <ArrowLeft className='size-5' />
          </button>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              {requestData.id}
            </h1>
            <p className='text-muted-foreground'>
              {requestData.type === 'clientRequest'
                ? 'Client Medicine Request'
                : 'Donor Medicine Offer'}
            </p>
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <Printer className='mr-2 size-4' />
            Print
          </button>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <Download className='mr-2 size-4' />
            Export
          </button>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <Edit className='mr-2 size-4' />
            Edit
          </button>
        </div>
      </div>

      {/* Status badge */}
      <div
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium ${getStatusColor(requestData.status)} w-fit text-white`}
      >
        {getStatusIcon(requestData.status)}
        <span>{requestData.status}</span>
      </div>

      {/* Main content grid */}
      <div className='grid gap-6 md:grid-cols-3'>
        {/* Request details - left column */}
        <div className='space-y-6 md:col-span-1'>
          {/* Client/Donor Info Card */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='border-b px-4 py-3'>
              <h3 className='font-medium'>
                {requestData.type === 'clientRequest'
                  ? 'Client Information'
                  : 'Donor Information'}
              </h3>
            </div>
            <div className='space-y-4 p-4'>
              <div className='flex items-start gap-3'>
                <User className='text-muted-foreground mt-0.5 size-5' />
                <div>
                  <div className='font-medium'>{requestData.clientName}</div>
                  <div className='text-muted-foreground text-sm'>
                    {requestData.email}
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {requestData.phone}
                  </div>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <Calendar className='text-muted-foreground mt-0.5 size-5' />
                <div>
                  <div className='text-muted-foreground text-sm'>
                    Request Date
                  </div>
                  <div className='font-medium'>
                    {new Date(requestData.requestDate).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </div>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <Package className='text-muted-foreground mt-0.5 size-5' />
                <div>
                  <div className='text-muted-foreground text-sm'>
                    Total Items
                  </div>
                  <div className='font-medium'>{requestData.items}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments Card */}
          {requestData.attachments && requestData.attachments.length > 0 && (
            <div
              className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
              style={{ borderRadius: 'var(--radius)' }}
            >
              <div className='border-b px-4 py-3'>
                <h3 className='font-medium'>Attachments</h3>
              </div>
              <div className='p-4'>
                <ul className='space-y-2'>
                  {requestData.attachments.map((file, index) => (
                    <li
                      key={index}
                      className='flex items-center justify-between rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-700'
                    >
                      <div className='flex items-center gap-2'>
                        <FileText className='text-muted-foreground size-4' />
                        <span className='text-sm'>{file}</span>
                      </div>
                      <button className='text-sm font-medium text-blue-500 hover:text-blue-700'>
                        Download
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Notes Card */}
          {requestData.notes && (
            <div
              className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
              style={{ borderRadius: 'var(--radius)' }}
            >
              <div className='border-b px-4 py-3'>
                <h3 className='font-medium'>Notes</h3>
              </div>
              <div className='p-4'>
                <p className='text-muted-foreground text-sm'>
                  {requestData.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Medicine List - right column (wider) */}
        <div className='space-y-6 md:col-span-2'>
          {/* Description Card */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='border-b px-4 py-3'>
              <h3 className='font-medium'>Description</h3>
            </div>
            <div className='p-4'>
              <p className='text-muted-foreground text-sm'>
                {requestData.description}
              </p>
            </div>
          </div>

          {/* Medicine List Card */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='flex items-center justify-between border-b px-4 py-3'>
              <h3 className='font-medium'>Medicine List</h3>
              <div className='text-muted-foreground text-sm'>
                {medicineList.length} items
              </div>
            </div>

            {/* Search and filters */}
            <div className='flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='relative w-full sm:w-64'>
                <Search className='text-muted-foreground absolute left-2.5 top-2.5 size-4' />
                <input
                  type='text'
                  placeholder='Search medicines...'
                  className='w-full rounded-md border bg-white py-2 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800'
                  value={searchMedicine}
                  onChange={(e) => setSearchMedicine(e.target.value)}
                  style={{ borderRadius: 'var(--radius)' }}
                />
              </div>

              <div className='flex gap-2'>
                {/* Category filter */}
                <div className='relative'>
                  <select
                    className='appearance-none rounded-md border bg-white py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800'
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className='text-muted-foreground pointer-events-none absolute right-2.5 top-2.5 size-4' />
                </div>

                {/* Status filter */}
                <div className='relative'>
                  <select
                    className='appearance-none rounded-md border bg-white py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800'
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    <option value='All'>All Statuses</option>
                    <option value='Available'>Available</option>
                    <option value='Low Stock'>Low Stock</option>
                    <option value='Out of Stock'>Out of Stock</option>
                  </select>
                  <Filter className='text-muted-foreground pointer-events-none absolute right-2.5 top-2.5 size-4' />
                </div>
              </div>
            </div>

            {/* Medicines table */}
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead className='bg-gray-50 dark:bg-gray-900/50'>
                  <tr>
                    <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                      Name
                    </th>
                    <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                      Category
                    </th>
                    <th className='px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400'>
                      Quantity
                    </th>
                    <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                      Unit
                    </th>
                    <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {filteredMedicines.length > 0 ? (
                    filteredMedicines.map((medicine: Medicine) => (
                      <tr
                        key={medicine.id}
                        className='border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/20'
                      >
                        <td className='px-4 py-3 align-middle font-medium'>
                          {medicine.name}
                        </td>
                        <td className='text-muted-foreground px-4 py-3 align-middle'>
                          {medicine.category}
                        </td>
                        <td className='px-4 py-3 text-right align-middle'>
                          {medicine.quantity}
                        </td>
                        <td className='text-muted-foreground px-4 py-3 align-middle'>
                          {medicine.unit}
                        </td>
                        <td className='px-4 py-3 align-middle'>
                          <span
                            className={`font-medium ${getMedicineStatusColor(medicine.status)}`}
                          >
                            {medicine.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className='text-muted-foreground px-4 py-6 text-center'
                      >
                        <div className='flex flex-col items-center gap-2'>
                          <Mail className='size-6' />
                          <p>No medicines found matching your filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action buttons card */}
          <div
            className='rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='space-y-4'>
              <h3 className='font-medium'>Actions</h3>

              <div className='flex flex-wrap gap-3'>
                {requestData.status === 'Pending' && (
                  <>
                    <Link
                      href={`/importer/quotations/create?requestId=${requestId}`}
                    >
                      <button
                        className='focuAs-visible:ring-secondary inline-flex items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1'
                        style={{ borderRadius: 'var(--radius)' }}
                      >
                        <Mail className='mr-2 size-4' />
                        Send Quotation
                      </button>
                    </Link>

                    <button
                      className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500'
                      style={{ borderRadius: 'var(--radius)' }}
                    >
                      <CheckCircle2 className='mr-2 size-4' />
                      Accept Request
                    </button>
                    <button
                      className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                      style={{ borderRadius: 'var(--radius)' }}
                    >
                      <Mail className='mr-2 size-4' />
                      Decline Request
                    </button>
                  </>
                )}

                {requestData.status === 'Quotation Sent' && (
                  <>
                    <button
                      className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500'
                      style={{ borderRadius: 'var(--radius)' }}
                    >
                      <Mail className='mr-2 size-4' />
                      Resend Quotation
                    </button>
                    <button
                      className='visible:outline-none inline-flex items-center justify-center whitespace-nowrap rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                      style={{ borderRadius: 'var(--radius)' }}
                    >
                      <Mail className='mr-2 size-4' />
                      Decline Request
                    </button>
                  </>
                )}

                {(requestData.status === 'Accepted' ||
                  requestData.status === 'Declined') && (
                  <button
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary'
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    <Clipboard className='mr-2 size-4' />
                    Generate Report
                  </button>
                )}

                <button
                  className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  <MessageSquare className='mr-2 size-4' />
                  Add Note
                </button>
              </div>

              {/* Warning for declined requests */}
              {requestData.status === 'Declined' && (
                <div className='flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200'>
                  <ShieldAlert className='mt-0.5 size-5 flex-shrink-0' />
                  <div>
                    <p className='font-medium'>
                      This request has been declined
                    </p>
                    <p className='text-sm'>
                      Once a request is declined, it cannot be reopened. You
                      would need to create a new request if needed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
