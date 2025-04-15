/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  SendHorizontal,
  PlusCircle,
  MinusCircle,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  XCircle,
  Edit,
  Trash,
  AlertCircle,
  InfoIcon,
  DollarSign,
  FileText,
  Package,
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

interface MedicineWithPrice extends Medicine {
  price: number;
  selected: boolean;
  notes: string;
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

// Sample bill request data
const billRequests: Record<string, BillRequest> = {
  'BR-7842': {
    id: 'BR-7842',
    requestDate: '2025-03-19',
    clientName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    type: 'clientRequest',
    description:
      'Monthly prescription refill for chronic conditions including hypertension, diabetes, and cholesterol management. Patient requires medications for the next 30 days.',
    items: 12,
    status: 'Pending',
    notes:
      'Client has insurance coverage. Priority delivery requested due to low supply at home.',
    attachments: ['prescription.pdf', 'insurance_card.jpg'],
  },
};

// Sample medicine list data with prices added
const medicinesWithPrices: Record<string, MedicineWithPrice[]> = {
  'BR-7842': [
    {
      id: 1,
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      quantity: 60,
      unit: 'Tablets',
      status: 'Available',
      price: 24.99,
      selected: true,
      notes: '',
    },
    {
      id: 2,
      name: 'Lisinopril 10mg',
      category: 'Cardiovascular',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
      price: 12.5,
      selected: true,
      notes: '',
    },
    {
      id: 3,
      name: 'Metformin 1000mg',
      category: 'Diabetes',
      quantity: 60,
      unit: 'Tablets',
      status: 'Low Stock',
      price: 18.75,
      selected: true,
      notes: 'Limited stock available. Consider alternative dosage.',
    },
    {
      id: 4,
      name: 'Atorvastatin 20mg',
      category: 'Cardiovascular',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
      price: 22.99,
      selected: true,
      notes: '',
    },
    {
      id: 5,
      name: 'Albuterol Inhaler',
      category: 'Respiratory',
      quantity: 2,
      unit: 'Inhalers',
      status: 'Out of Stock',
      price: 45.0,
      selected: false,
      notes: 'Currently out of stock. Expected to be available in 2 weeks.',
    },
    {
      id: 6,
      name: 'Omeprazole 20mg',
      category: 'Gastrointestinal',
      quantity: 30,
      unit: 'Capsules',
      status: 'Available',
      price: 15.25,
      selected: true,
      notes: '',
    },
    {
      id: 7,
      name: 'Levothyroxine 50mcg',
      category: 'Thyroid',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
      price: 10.5,
      selected: true,
      notes: '',
    },
    {
      id: 8,
      name: 'Hydrochlorothiazide 25mg',
      category: 'Cardiovascular',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
      price: 8.99,
      selected: true,
      notes: '',
    },
    {
      id: 9,
      name: 'Sertraline 50mg',
      category: 'Mental Health',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
      price: 14.75,
      selected: true,
      notes: '',
    },
    {
      id: 10,
      name: 'Ibuprofen 800mg',
      category: 'Pain Relief',
      quantity: 30,
      unit: 'Tablets',
      status: 'Available',
      price: 7.5,
      selected: true,
      notes: '',
    },
    {
      id: 11,
      name: 'Fluticasone Nasal Spray',
      category: 'Allergy',
      quantity: 1,
      unit: 'Bottle',
      status: 'Available',
      price: 28.99,
      selected: true,
      notes: '',
    },
    {
      id: 12,
      name: 'Vitamin D3 2000IU',
      category: 'Supplements',
      quantity: 90,
      unit: 'Tablets',
      status: 'Available',
      price: 12.25,
      selected: true,
      notes: '',
    },
  ],
};

// Additional medicines that could be added to the quotation
const availableMedicines: MedicineWithPrice[] = [
  {
    id: 101,
    name: 'Amlodipine 5mg',
    category: 'Cardiovascular',
    quantity: 30,
    unit: 'Tablets',
    status: 'Available',
    price: 11.5,
    selected: false,
    notes: '',
  },
  {
    id: 102,
    name: 'Losartan 50mg',
    category: 'Cardiovascular',
    quantity: 30,
    unit: 'Tablets',
    status: 'Available',
    price: 16.75,
    selected: false,
    notes: '',
  },
  {
    id: 103,
    name: 'Gabapentin 300mg',
    category: 'Neurology',
    quantity: 60,
    unit: 'Capsules',
    status: 'Available',
    price: 22.99,
    selected: false,
    notes: '',
  },
  {
    id: 104,
    name: 'Escitalopram 10mg',
    category: 'Mental Health',
    quantity: 30,
    unit: 'Tablets',
    status: 'Available',
    price: 18.25,
    selected: false,
    notes: '',
  },
  {
    id: 105,
    name: 'Montelukast 10mg',
    category: 'Respiratory',
    quantity: 30,
    unit: 'Tablets',
    status: 'Available',
    price: 24.5,
    selected: false,
    notes: '',
  },
];

export default function PrepareQuotationPage() {
  const router = useRouter();
  const params = useParams();
  const requestId = params.id as string;

  // Get request data
  const requestData = billRequests[requestId];

  // State for medicines in quotation
  const [quotationItems, setQuotationItems] = useState<MedicineWithPrice[]>(
    medicinesWithPrices[requestId] || []
  );

  // State for additional medications
  const [additionalItems, setAdditionalItems] =
    useState<MedicineWithPrice[]>(availableMedicines);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showAddMedicines, setShowAddMedicines] = useState<boolean>(false);

  // State for quotation details
  const [quotationNotes, setQuotationNotes] = useState<string>('');
  const [validityDays, setValidityDays] = useState<number>(30);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // Calculate quotation summary
  const calculateSummary = () => {
    const selectedItems = quotationItems.filter((item) => item.selected);
    const subtotal = selectedItems.reduce(
      (total, item) => total + item.price,
      0
    );
    const discount = (subtotal * discountPercentage) / 100;
    const total = subtotal - discount;

    return {
      itemCount: selectedItems.length,
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const summary = calculateSummary();

  // Get unique categories for filter dropdown
  const categories: string[] = [
    'All',
    ...Array.from(
      new Set(
        [...quotationItems, ...additionalItems].map((med) => med.category)
      )
    ),
  ];

  // Handle back navigation
  const handleBack = (): void => {
    router.back();
  };

  // Handle medicine selection toggle
  const handleSelectMedicine = (medicineId: number): void => {
    setQuotationItems((prev) =>
      prev.map((item) =>
        item.id === medicineId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Handle price change
  const handlePriceChange = (medicineId: number, newPrice: string): void => {
    const price = parseFloat(newPrice) || 0;
    setQuotationItems((prev) =>
      prev.map((item) => (item.id === medicineId ? { ...item, price } : item))
    );
  };

  // Handle notes change
  const handleNotesChange = (medicineId: number, notes: string): void => {
    setQuotationItems((prev) =>
      prev.map((item) => (item.id === medicineId ? { ...item, notes } : item))
    );
  };

  // Handle item deletion from quotation
  const handleDeleteItem = (medicineId: number): void => {
    setQuotationItems((prev) => prev.filter((item) => item.id !== medicineId));
  };

  // Handle adding a medicine to the quotation
  const handleAddMedicine = (medicine: MedicineWithPrice): void => {
    // Check if already in the quotation
    if (!quotationItems.some((item) => item.id === medicine.id)) {
      setQuotationItems((prev) => [...prev, { ...medicine, selected: true }]);
      // Remove from additional items list
      setAdditionalItems((prev) =>
        prev.filter((item) => item.id !== medicine.id)
      );
    }
  };

  // Filter medicines based on search and category filter
  const filteredAdditionalItems = additionalItems.filter((medicine) => {
    const matchesSearch = medicine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || medicine.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handle sending the quotation
  const handleSendQuotation = (): void => {
    // In a real application, you would send the quotation data to the server here
    alert('Quotation sent successfully!');
    router.push(`/importer/bill-requests/${requestId}`);
  };

  // Handle saving as draft
  const handleSaveDraft = (): void => {
    // In a real application, you would save the draft to the server here
    alert('Quotation saved as draft!');
  };

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
              Prepare Quotation
            </h1>
            <p className='text-muted-foreground'>
              {requestData.id} - {requestData.clientName}
            </p>
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <button
            onClick={handleSaveDraft}
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <Save className='mr-2 size-4' />
            Save as Draft
          </button>
          <button
            onClick={handleSendQuotation}
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <SendHorizontal className='mr-2 size-4' />
            Send Quotation
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className='grid gap-6 md:grid-cols-3'>
        {/* Left column */}
        <div className='space-y-6 md:col-span-2'>
          {/* Client Info */}
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
            <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2'>
              <div>
                <p className='text-muted-foreground text-sm'>Name</p>
                <p className='font-medium'>{requestData.clientName}</p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Email</p>
                <p className='font-medium'>{requestData.email}</p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Phone</p>
                <p className='font-medium'>{requestData.phone}</p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Request Date</p>
                <p className='font-medium'>
                  {new Date(requestData.requestDate).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Quotation Medicines List */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='flex items-center justify-between border-b px-4 py-3'>
              <h3 className='font-medium'>Medicine List</h3>
              <button
                onClick={() => setShowAddMedicines(!showAddMedicines)}
                className='inline-flex items-center text-sm text-primary hover:text-primary/80'
              >
                {showAddMedicines ? 'Hide' : 'Add Medicines'}
                <PlusCircle className='ml-1 size-4' />
              </button>
            </div>

            {/* Medicine table */}
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead className='bg-gray-50 dark:bg-gray-900/50'>
                  <tr>
                    <th className='w-12 px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                      <span className='sr-only'>Select</span>
                    </th>
                    <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                      Name
                    </th>
                    <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                      Category
                    </th>
                    <th className='px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400'>
                      Quantity
                    </th>
                    <th className='px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400'>
                      Unit
                    </th>
                    <th className='px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400'>
                      Price ($)
                    </th>
                    <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                      Status
                    </th>
                    <th className='px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {quotationItems.length > 0 ? (
                    quotationItems.map((medicine) => (
                      <tr
                        key={medicine.id}
                        className='border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/20'
                      >
                        <td className='px-4 py-3 text-center align-middle'>
                          <input
                            type='checkbox'
                            checked={medicine.selected}
                            onChange={() => handleSelectMedicine(medicine.id)}
                            className={`size-4 rounded border-gray-300 text-primary focus:ring-primary ${medicine.status === 'Out of Stock' ? 'opacity-50' : ''}`}
                            disabled={medicine.status === 'Out of Stock'}
                          />
                        </td>
                        <td className='px-4 py-3 align-middle font-medium'>
                          {medicine.name}
                        </td>
                        <td className='text-muted-foreground px-4 py-3 align-middle'>
                          {medicine.category}
                        </td>
                        <td className='px-4 py-3 text-center align-middle'>
                          {medicine.quantity}
                        </td>
                        <td className='text-muted-foreground px-4 py-3 text-center align-middle'>
                          {medicine.unit}
                        </td>
                        <td className='px-4 py-3 align-middle'>
                          <div className='flex items-center justify-center'>
                            <span className='mr-1 text-gray-500 dark:text-gray-400'>
                              $
                            </span>
                            <input
                              type='number'
                              value={medicine.price}
                              onChange={(e) =>
                                handlePriceChange(medicine.id, e.target.value)
                              }
                              step='0.01'
                              min='0'
                              className='w-16 rounded-md border px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-primary'
                              style={{ borderRadius: 'var(--radius)' }}
                            />
                          </div>
                        </td>
                        <td className='px-4 py-3 align-middle'>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              medicine.status === 'Available'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : medicine.status === 'Low Stock'
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}
                          >
                            {medicine.status}
                          </span>
                        </td>
                        <td className='px-4 py-3 align-middle'>
                          <div className='flex items-center justify-center gap-2'>
                            <button
                              onClick={() => {
                                const notes = prompt(
                                  'Enter notes for this item:',
                                  medicine.notes
                                );
                                if (notes !== null) {
                                  handleNotesChange(medicine.id, notes);
                                }
                              }}
                              className='text-gray-500 hover:text-primary'
                              title='Add notes'
                            >
                              <Edit className='size-4' />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(medicine.id)}
                              className='text-gray-500 hover:text-red-500'
                              title='Remove item'
                            >
                              <Trash className='size-4' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className='text-muted-foreground px-4 py-6 text-center'
                      >
                        <div className='flex flex-col items-center gap-2'>
                          <Package className='size-6' />
                          <p>No medicines added to quotation yet.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Notes for selected items */}
            {quotationItems.some((item) => item.notes) && (
              <div className='border-t p-4'>
                <h4 className='mb-2 font-medium'>Item Notes</h4>
                <ul className='space-y-2'>
                  {quotationItems
                    .filter((item) => item.notes)
                    .map((item) => (
                      <li
                        key={`note-${item.id}`}
                        className='flex items-start gap-2'
                      >
                        <InfoIcon className='text-muted-foreground mt-0.5 size-4 shrink-0' />
                        <div>
                          <span className='font-medium'>{item.name}:</span>
                          <span className='text-muted-foreground ml-1'>
                            {item.notes}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Add Medicines Section */}
            {showAddMedicines && (
              <div className='border-t'>
                <div className='border-b p-4'>
                  <h4 className='mb-3 font-medium'>Add Additional Medicines</h4>
                  <div className='flex gap-2'>
                    <div className='relative flex-1'>
                      <Search className='text-muted-foreground absolute left-2.5 top-2.5 size-4' />
                      <input
                        type='text'
                        placeholder='Search medicines...'
                        className='w-full rounded-md border bg-white py-2 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ borderRadius: 'var(--radius)' }}
                      />
                    </div>
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
                  </div>
                </div>
                <div className='max-h-60 overflow-y-auto'>
                  <table className='w-full text-sm'>
                    <thead className='sticky top-0 bg-gray-50 dark:bg-gray-900/50'>
                      <tr>
                        <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                          Name
                        </th>
                        <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                          Category
                        </th>
                        <th className='px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400'>
                          Price ($)
                        </th>
                        <th className='px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400'>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y'>
                      {filteredAdditionalItems.length > 0 ? (
                        filteredAdditionalItems.map((medicine) => (
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
                            <td className='px-4 py-3 text-center align-middle'>
                              ${medicine.price.toFixed(2)}
                            </td>
                            <td className='px-4 py-3 text-right align-middle'>
                              <button
                                onClick={() => handleAddMedicine(medicine)}
                                className='inline-flex items-center text-primary hover:text-primary/80'
                              >
                                <PlusCircle className='mr-1 size-4' />
                                Add
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className='text-muted-foreground px-4 py-6 text-center'
                          >
                            <p>No additional medicines found.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Quotation Notes */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='border-b px-4 py-3'>
              <h3 className='font-medium'>Quotation Notes</h3>
            </div>
            <div className='p-4'>
              <textarea
                value={quotationNotes}
                onChange={(e) => setQuotationNotes(e.target.value)}
                placeholder='Add any additional notes or terms for this quotation...'
                className='min-h-24 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-primary'
                style={{ borderRadius: 'var(--radius)' }}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Right column - Summary */}
        <div className='space-y-6'>
          {/* Quotation Summary */}
          <div
            className='sticky top-4 rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='border-b px-4 py-3'>
              <h3 className='font-medium'>Quotation Summary</h3>
            </div>
            <div className='p-4'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Selected Items:</span>
                  <span className='font-medium'>{summary.itemCount}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Subtotal:</span>
                  <span className='font-medium'>${summary.subtotal}</span>
                </div>

                {/* Discount input */}
                <div>
                  <div className='mb-1 flex items-center justify-between'>
                    <label htmlFor='discount' className='text-muted-foreground'>
                      Discount (%):
                    </label>
                    <div className='w-20'>
                      <input
                        id='discount'
                        type='number'
                        min='0'
                        max='100'
                        value={discountPercentage}
                        onChange={(e) =>
                          setDiscountPercentage(
                            Math.min(
                              100,
                              Math.max(0, parseFloat(e.target.value) || 0)
                            )
                          )
                        }
                        className='w-full rounded-md border px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-primary'
                        style={{ borderRadius: 'var(--radius)' }}
                      />
                    </div>
                  </div>
                  {discountPercentage > 0 && (
                    <div className='text-right text-sm text-green-600 dark:text-green-400'>
                      -${summary.discount}
                    </div>
                  )}
                </div>

                <div className='h-px bg-gray-200 dark:bg-gray-700'></div>

                <div className='flex items-center justify-between'>
                  <span className='font-medium'>Total:</span>
                  <span className='text-xl font-bold'>${summary.total}</span>
                </div>

                {/* Validity period */}
                <div>
                  <div className='mb-1 flex items-center justify-between'>
                    <label htmlFor='validity' className='text-muted-foreground'>
                      Validity (days):
                    </label>
                    <div className='w-20'>
                      <input
                        id='validity'
                        type='number'
                        min='1'
                        max='90'
                        value={validityDays}
                        onChange={(e) =>
                          setValidityDays(
                            Math.min(
                              90,
                              Math.max(1, parseInt(e.target.value) || 30)
                            )
                          )
                        }
                        className='w-full rounded-md border px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-primary'
                        style={{ borderRadius: 'var(--radius)' }}
                      />
                    </div>
                  </div>
                </div>

                <div className='flex items-center rounded-md border border-primary/20 bg-primary/5 p-3 text-sm'>
                  <InfoIcon className='mr-2 size-4 shrink-0 text-primary' />
                  <p>
                    This quotation will be valid until{' '}
                    {new Date(
                      Date.now() + validityDays * 24 * 60 * 60 * 1000
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className='border-t p-4'>
              <button
                onClick={handleSendQuotation}
                disabled={summary.itemCount === 0}
                className={`flex w-full items-center justify-center rounded-md px-4 py-2 font-medium text-white ${
                  summary.itemCount === 0
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-primary hover:bg-primary/90'
                }`}
                style={{ borderRadius: 'var(--radius)' }}
              >
                <SendHorizontal className='mr-2 size-4' />
                Send Quotation
              </button>
              {summary.itemCount === 0 && (
                <p className='mt-2 text-center text-xs text-red-500'>
                  Please select at least one item to include in the quotation.
                </p>
              )}
            </div>
          </div>

          {/* Tips Card */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='border-b px-4 py-3'>
              <h3 className='font-medium'>Tips</h3>
            </div>
            <div className='p-4'>
              <ul className='space-y-3 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle className='mt-0.5 size-4 shrink-0 text-green-500' />
                  <span>
                    You can add notes to medicines that are low in stock or
                    unavailable.
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle className='mt-0.5 size-4 shrink-0 text-green-500' />
                  <span>
                    Add alternative medicines from the &quot;Add Medicines&quot;
                    section.
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle className='mt-0.5 size-4 shrink-0 text-green-500' />
                  <span>
                    Set expiration date for the quotation to encourage timely
                    decisions.
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle className='mt-0.5 size-4 shrink-0 text-green-500' />
                  <span>
                    Save as draft if you need to finalize details later.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
