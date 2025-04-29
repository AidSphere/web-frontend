'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Printer,
  Download,
  Edit,
  Mail,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Package,
  Clock,
  CalendarDays,
  User,
  PhoneCall,
  AtSign,
  DollarSign,
  ShoppingCart,
  Truck,
  AlertTriangle,
  CreditCard,
  Calendar,
  CheckCircle,
  BarChart4,
  AlertCircle,
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
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

type QuotationStatus =
  | 'Draft'
  | 'Sent'
  | 'Accepted'
  | 'Rejected'
  | 'Expired'
  | 'Paid'
  | 'Delivered';

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: 'Credit Card' | 'Bank Transfer' | 'Cash' | 'Insurance';
  status: 'Pending' | 'Completed' | 'Failed';
  reference?: string;
}

interface Delivery {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface Quotation {
  id: string;
  requestId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  createdDate: string;
  expiryDate: string;
  status: QuotationStatus;
  medicines: Medicine[];
  subtotal: number;
  discount: number;
  total: number;
  notes?: string;
  terms?: string;
  payment?: Payment;
  delivery?: Delivery;
}

// Sample quotation data
const quotationsData: Record<string, Quotation> = {
  'QT-1001': {
    id: 'QT-1001',
    requestId: 'BR-7842',
    clientName: 'John Smith',
    clientEmail: 'john.smith@example.com',
    clientPhone: '+1 (555) 123-4567',
    createdDate: '2025-03-20',
    expiryDate: '2025-04-19',
    status: 'Accepted',
    medicines: [
      {
        id: 1,
        name: 'Amoxicillin 500mg',
        category: 'Antibiotics',
        quantity: 60,
        unit: 'Tablets',
        unitPrice: 0.42,
        totalPrice: 25.2,
      },
      {
        id: 2,
        name: 'Lisinopril 10mg',
        category: 'Cardiovascular',
        quantity: 30,
        unit: 'Tablets',
        unitPrice: 0.38,
        totalPrice: 11.4,
      },
      {
        id: 3,
        name: 'Metformin 1000mg',
        category: 'Diabetes',
        quantity: 60,
        unit: 'Tablets',
        unitPrice: 0.31,
        totalPrice: 18.6,
        notes: 'Low stock, may need to split into partial delivery',
      },
      {
        id: 4,
        name: 'Atorvastatin 20mg',
        category: 'Cardiovascular',
        quantity: 30,
        unit: 'Tablets',
        unitPrice: 0.76,
        totalPrice: 22.8,
      },
      {
        id: 6,
        name: 'Omeprazole 20mg',
        category: 'Gastrointestinal',
        quantity: 30,
        unit: 'Capsules',
        unitPrice: 0.48,
        totalPrice: 14.4,
      },
      {
        id: 7,
        name: 'Levothyroxine 50mcg',
        category: 'Thyroid',
        quantity: 30,
        unit: 'Tablets',
        unitPrice: 0.35,
        totalPrice: 10.5,
      },
      {
        id: 8,
        name: 'Hydrochlorothiazide 25mg',
        category: 'Cardiovascular',
        quantity: 30,
        unit: 'Tablets',
        unitPrice: 0.28,
        totalPrice: 8.4,
      },
      {
        id: 9,
        name: 'Sertraline 50mg',
        category: 'Mental Health',
        quantity: 30,
        unit: 'Tablets',
        unitPrice: 0.47,
        totalPrice: 14.1,
      },
      {
        id: 10,
        name: 'Ibuprofen 800mg',
        category: 'Pain Relief',
        quantity: 30,
        unit: 'Tablets',
        unitPrice: 0.25,
        totalPrice: 7.5,
      },
      {
        id: 11,
        name: 'Fluticasone Nasal Spray',
        category: 'Allergy',
        quantity: 1,
        unit: 'Bottle',
        unitPrice: 28.9,
        totalPrice: 28.9,
      },
      {
        id: 12,
        name: 'Vitamin D3 2000IU',
        category: 'Supplements',
        quantity: 90,
        unit: 'Tablets',
        unitPrice: 0.14,
        totalPrice: 12.6,
      },
      {
        id: 20,
        name: 'Amlodipine 5mg',
        category: 'Cardiovascular',
        quantity: 30,
        unit: 'Tablets',
        unitPrice: 0.31,
        totalPrice: 9.3,
      },
    ],
    subtotal: 184.7,
    discount: 9.23,
    total: 175.47,
    notes:
      'Client has insurance that covers 80% of medication costs. Please prepare all documentation for insurance claim.',
    terms:
      'Payment due within 30 days of acceptance. Delivery will be scheduled upon payment confirmation.',
    payment: {
      id: 'PAY-5042',
      date: '2025-03-22',
      amount: 175.47,
      method: 'Insurance',
      status: 'Completed',
      reference: 'INS-8754-XYZ',
    },
  },
  'QT-999': {
    id: 'QT-999',
    requestId: 'BR-7837',
    clientName: 'Jennifer Miller',
    clientEmail: 'jennifer.miller@clinic.net',
    clientPhone: '+1 (555) 456-7890',
    createdDate: '2025-03-18',
    expiryDate: '2025-04-17',
    status: 'Paid',
    medicines: [
      {
        id: 101,
        name: 'Tramadol 50mg',
        category: 'Pain Relief',
        quantity: 120,
        unit: 'Tablets',
        unitPrice: 0.45,
        totalPrice: 54.0,
      },
      {
        id: 102,
        name: 'Acetaminophen 500mg',
        category: 'Pain Relief',
        quantity: 200,
        unit: 'Tablets',
        unitPrice: 0.12,
        totalPrice: 24.0,
      },
      {
        id: 103,
        name: 'Naproxen 500mg',
        category: 'Pain Relief',
        quantity: 100,
        unit: 'Tablets',
        unitPrice: 0.36,
        totalPrice: 36.0,
      },
      {
        id: 104,
        name: 'Diclofenac 75mg',
        category: 'Pain Relief',
        quantity: 60,
        unit: 'Tablets',
        unitPrice: 0.58,
        totalPrice: 34.8,
      },
      {
        id: 105,
        name: 'Meloxicam 15mg',
        category: 'Pain Relief',
        quantity: 60,
        unit: 'Tablets',
        unitPrice: 0.67,
        totalPrice: 40.2,
      },
      {
        id: 106,
        name: 'Lidocaine Patch 5%',
        category: 'Pain Relief',
        quantity: 30,
        unit: 'Patches',
        unitPrice: 3.85,
        totalPrice: 115.5,
      },
      {
        id: 107,
        name: 'Pregabalin 75mg',
        category: 'Neuropathic Pain',
        quantity: 90,
        unit: 'Capsules',
        unitPrice: 1.89,
        totalPrice: 170.1,
      },
      {
        id: 108,
        name: 'Baclofen 10mg',
        category: 'Muscle Relaxant',
        quantity: 90,
        unit: 'Tablets',
        unitPrice: 0.48,
        totalPrice: 43.2,
      },
      {
        id: 109,
        name: 'Tizanidine 4mg',
        category: 'Muscle Relaxant',
        quantity: 90,
        unit: 'Tablets',
        unitPrice: 0.62,
        totalPrice: 55.8,
      },
    ],
    subtotal: 573.6,
    discount: 57.36,
    total: 516.24,
    notes:
      'Clinic closing donation - special handling required for controlled substances.',
    terms:
      'Due to the nature of the medications, proper chain of custody documentation is required.',
    payment: {
      id: 'PAY-5039',
      date: '2025-03-20',
      amount: 516.24,
      method: 'Bank Transfer',
      status: 'Completed',
      reference: 'WIRE-78954123',
    },
    delivery: {
      id: 'DEL-3024',
      date: '2025-03-23',
      status: 'Shipped',
      trackingNumber: 'UPS-1Z999AA10123456784',
      estimatedDelivery: '2025-03-25',
    },
  },
  'QT-998': {
    id: 'QT-998',
    requestId: 'BR-7832',
    clientName: 'Daniel White',
    clientEmail: 'daniel.white@example.com',
    clientPhone: '+1 (555) 789-4561',
    createdDate: '2025-03-17',
    expiryDate: '2025-04-16',
    status: 'Rejected',
    medicines: [
      {
        id: 201,
        name: 'Escitalopram 10mg',
        category: 'Mental Health',
        quantity: 30,
        unit: 'Tablets',
        unitPrice: 0.65,
        totalPrice: 19.5,
      },
      {
        id: 202,
        name: 'Fluoxetine 20mg',
        category: 'Mental Health',
        quantity: 30,
        unit: 'Capsules',
        unitPrice: 0.48,
        totalPrice: 14.4,
      },
      {
        id: 203,
        name: 'Bupropion XL 150mg',
        category: 'Mental Health',
        quantity: 30,
        unit: 'Tablets',
        unitPrice: 1.25,
        totalPrice: 37.5,
      },
      {
        id: 204,
        name: 'Venlafaxine ER 75mg',
        category: 'Mental Health',
        quantity: 30,
        unit: 'Capsules',
        unitPrice: 0.95,
        totalPrice: 28.5,
      },
      {
        id: 205,
        name: 'Mirtazapine 15mg',
        category: 'Mental Health',
        quantity: 30,
        unit: 'Tablets',
        unitPrice: 0.75,
        totalPrice: 22.5,
      },
    ],
    subtotal: 122.4,
    discount: 0,
    total: 122.4,
    notes:
      'Client rejected due to finding another supplier with insurance coverage.',
    terms: 'Payment due within 14 days of acceptance.',
  },
};

export default function QuotationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const quotationId = params.id as string;

  // State for handling payment processing
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<Payment['method']>('Credit Card');
  const [paymentReference, setPaymentReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // State for handling delivery
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  // Get quotation data
  const quotation = quotationsData[quotationId];

  // Handle back navigation
  const handleBack = (): void => {
    router.back();
  };

  // Handle processing payment
  const handleProcessPayment = (): void => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      // In a real app, you would update the quotation status through an API call
      alert('Payment processed successfully!');
      // Refresh the page or update the state
      router.refresh();
    }, 1500);
  };

  // Handle shipping
  const handleShipOrder = (): void => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsShippingModalOpen(false);
      // In a real app, you would update the quotation status through an API call
      alert('Order has been marked as shipped!');
      // Refresh the page or update the state
      router.refresh();
    }, 1500);
  };

  // If quotation not found
  if (!quotation) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center p-4'>
        <AlertCircle className='mb-4 size-16 text-red-500' />
        <h1 className='mb-2 text-2xl font-bold'>Quotation Not Found</h1>
        <p className='mb-4 text-gray-500'>
          The quotation you're looking for doesn't exist or has been removed.
        </p>
        <Link href='/importer/quotations'>
          <button className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90'>
            <ArrowLeft className='mr-2 size-4' />
            Back to Quotations
          </button>
        </Link>
      </div>
    );
  }

  // Get status badge color
  const getStatusColor = (status: QuotationStatus): string => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-500';
      case 'Sent':
        return 'bg-blue-500';
      case 'Accepted':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Expired':
        return 'bg-amber-500';
      case 'Paid':
        return 'bg-purple-500';
      case 'Delivered':
        return 'bg-teal-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status icon
  const getStatusIcon = (status: QuotationStatus) => {
    switch (status) {
      case 'Draft':
        return <FileText className='size-4' />;
      case 'Sent':
        return <Mail className='size-4' />;
      case 'Accepted':
        return <CheckCircle2 className='size-4' />;
      case 'Rejected':
        return <XCircle className='size-4' />;
      case 'Expired':
        return <Clock className='size-4' />;
      case 'Paid':
        return <DollarSign className='size-4' />;
      case 'Delivered':
        return <Package className='size-4' />;
      default:
        return <AlertCircle className='size-4' />;
    }
  };

  // Calculate totals
  const totalItems = quotation.medicines.reduce(
    (sum, medicine) => sum + medicine.quantity,
    0
  );

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
              Quotation {quotation.id}
            </h1>
            <p className='text-muted-foreground'>
              Request ID: {quotation.requestId}
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
            Download PDF
          </button>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <Mail className='mr-2 size-4' />
            Resend
          </button>
        </div>
      </div>

      {/* Status badge */}
      <div
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium ${getStatusColor(quotation.status)} w-fit text-white`}
      >
        {getStatusIcon(quotation.status)}
        <span>{quotation.status}</span>
      </div>

      {/* Main content grid */}
      <div className='grid gap-6 md:grid-cols-3'>
        {/* Left column - Client info and summary */}
        <div className='space-y-6 md:col-span-1'>
          {/* Client Info Card */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='border-b px-4 py-3'>
              <h3 className='font-medium'>Client Information</h3>
            </div>
            <div className='space-y-4 p-4'>
              <div className='flex items-start gap-3'>
                <User className='text-muted-foreground mt-0.5 size-5' />
                <div>
                  <div className='font-medium'>{quotation.clientName}</div>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <AtSign className='text-muted-foreground mt-0.5 size-5' />
                <div>
                  <div className='text-sm'>{quotation.clientEmail}</div>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <PhoneCall className='text-muted-foreground mt-0.5 size-5' />
                <div>
                  <div className='text-sm'>{quotation.clientPhone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quotation Details Card */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='border-b px-4 py-3'>
              <h3 className='font-medium'>Quotation Details</h3>
            </div>
            <div className='space-y-4 p-4'>
              <div className='flex items-start gap-3'>
                <Calendar className='text-muted-foreground mt-0.5 size-5' />
                <div>
                  <div className='text-muted-foreground text-sm'>
                    Created Date
                  </div>
                  <div className='font-medium'>
                    {new Date(quotation.createdDate).toLocaleDateString(
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
                <CalendarDays className='text-muted-foreground mt-0.5 size-5' />
                <div>
                  <div className='text-muted-foreground text-sm'>
                    Expiry Date
                  </div>
                  <div className='font-medium'>
                    {new Date(quotation.expiryDate).toLocaleDateString(
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
                <ShoppingCart className='text-muted-foreground mt-0.5 size-5' />
                <div>
                  <div className='text-muted-foreground text-sm'>
                    Total Items
                  </div>
                  <div className='font-medium'>
                    {totalItems} items ({quotation.medicines.length} products)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info Card */}
          {quotation.payment && (
            <div
              className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
              style={{ borderRadius: 'var(--radius)' }}
            >
              <div className='border-b px-4 py-3'>
                <h3 className='font-medium'>Payment Information</h3>
              </div>
              <div className='space-y-4 p-4'>
                <div className='flex items-start gap-3'>
                  <CreditCard className='text-muted-foreground mt-0.5 size-5' />
                  <div>
                    <div className='text-muted-foreground text-sm'>
                      Payment Method
                    </div>
                    <div className='font-medium'>
                      {quotation.payment.method}
                    </div>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Calendar className='text-muted-foreground mt-0.5 size-5' />
                  <div>
                    <div className='text-muted-foreground text-sm'>
                      Payment Date
                    </div>
                    <div className='font-medium'>
                      {new Date(quotation.payment.date).toLocaleDateString(
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
                  <DollarSign className='text-muted-foreground mt-0.5 size-5' />
                  <div>
                    <div className='text-muted-foreground text-sm'>Amount</div>
                    <div className='font-medium'>
                      ${quotation.payment.amount.toFixed(2)}
                    </div>
                  </div>
                </div>

                {quotation.payment.reference && (
                  <div className='flex items-start gap-3'>
                    <FileText className='text-muted-foreground mt-0.5 size-5' />
                    <div>
                      <div className='text-muted-foreground text-sm'>
                        Reference
                      </div>
                      <div className='font-medium'>
                        {quotation.payment.reference}
                      </div>
                    </div>
                  </div>
                )}

                <div className='flex items-start gap-3'>
                  <CheckCircle className='mt-0.5 size-5 text-green-500' />
                  <div>
                    <div className='text-sm font-medium text-green-500'>
                      Payment {quotation.payment.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Info Card */}
          {quotation.delivery && (
            <div
              className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
              style={{ borderRadius: 'var(--radius)' }}
            >
              <div className='border-b px-4 py-3'>
                <h3 className='font-medium'>Delivery Information</h3>
              </div>
              <div className='space-y-4 p-4'>
                <div className='flex items-start gap-3'>
                  <Calendar className='text-muted-foreground mt-0.5 size-5' />
                  <div>
                    <div className='text-muted-foreground text-sm'>
                      Shipping Date
                    </div>
                    <div className='font-medium'>
                      {new Date(quotation.delivery.date).toLocaleDateString(
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
                  <Truck className='text-muted-foreground mt-0.5 size-5' />
                  <div>
                    <div className='text-muted-foreground text-sm'>Status</div>
                    <div className='font-medium'>
                      {quotation.delivery.status}
                    </div>
                  </div>
                </div>

                {quotation.delivery.trackingNumber && (
                  <div className='flex items-start gap-3'>
                    <Package className='text-muted-foreground mt-0.5 size-5' />
                    <div>
                      <div className='text-muted-foreground text-sm'>
                        Tracking Number
                      </div>
                      <div className='font-medium'>
                        {quotation.delivery.trackingNumber}
                      </div>
                    </div>
                  </div>
                )}

                {quotation.delivery.estimatedDelivery && (
                  <div className='flex items-start gap-3'>
                    <CalendarDays className='text-muted-foreground mt-0.5 size-5' />
                    <div>
                      <div className='text-muted-foreground text-sm'>
                        Estimated Delivery
                      </div>
                      <div className='font-medium'>
                        {new Date(
                          quotation.delivery.estimatedDelivery
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <a
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center text-primary hover:underline'
                >
                  <ExternalLink className='mr-1 size-4' />
                  Track Package
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right column - Medicines list and notes */}
        <div className='space-y-6 md:col-span-2'>
          {/* Quotation Summary Card */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='flex items-center justify-between border-b px-4 py-3'>
              <h3 className='font-medium'>Quotation Summary</h3>
              <div className='text-muted-foreground text-sm'>
                <span className='font-medium text-primary'>
                  ${quotation.total.toFixed(2)}
                </span>
              </div>
            </div>
            <div className='p-4'>
              <div className='overflow-hidden rounded-md border'>
                <table className='w-full text-sm'>
                  <thead className='bg-gray-50 dark:bg-gray-900/50'>
                    <tr>
                      <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                        Product
                      </th>
                      <th className='px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400'>
                        Quantity
                      </th>
                      <th className='px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400'>
                        Unit Price
                      </th>
                      <th className='px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400'>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y'>
                    {quotation.medicines.map((medicine) => (
                      <tr
                        key={medicine.id}
                        className='border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/20'
                      >
                        <td className='px-4 py-3 align-middle'>
                          <div>
                            <div className='font-medium'>{medicine.name}</div>
                            <div className='text-muted-foreground text-xs'>
                              {medicine.category}
                            </div>
                            {medicine.notes && (
                              <div className='mt-1 text-xs italic text-amber-600 dark:text-amber-400'>
                                {medicine.notes}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className='px-4 py-3 text-center align-middle'>
                          {medicine.quantity} {medicine.unit}
                        </td>
                        <td className='px-4 py-3 text-right align-middle'>
                          ${medicine.unitPrice.toFixed(2)}
                        </td>
                        <td className='px-4 py-3 text-right align-middle font-medium'>
                          ${medicine.totalPrice.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className='bg-gray-50 dark:bg-gray-900/50'>
                    <tr>
                      <td colSpan={2} className='px-4 py-3 align-middle'></td>
                      <td className='px-4 py-3 text-right align-middle font-medium text-gray-500 dark:text-gray-400'>
                        Subtotal:
                      </td>
                      <td className='px-4 py-3 text-right align-middle font-medium'>
                        ${quotation.subtotal.toFixed(2)}
                      </td>
                    </tr>
                    {quotation.discount > 0 && (
                      <tr>
                        <td colSpan={2} className='px-4 py-3 align-middle'></td>
                        <td className='px-4 py-3 text-right align-middle font-medium text-gray-500 dark:text-gray-400'>
                          Discount:
                        </td>
                        <td className='px-4 py-3 text-right align-middle font-medium text-green-600 dark:text-green-400'>
                          -${quotation.discount.toFixed(2)}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan={2} className='px-4 py-3 align-middle'></td>
                      <td className='px-4 py-3 text-right align-middle font-medium text-gray-900 dark:text-gray-100'>
                        Total:
                      </td>
                      <td className='px-4 py-3 text-right align-middle font-bold text-gray-900 dark:text-gray-100'>
                        ${quotation.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Notes Card */}
          {(quotation.notes || quotation.terms) && (
            <div
              className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
              style={{ borderRadius: 'var(--radius)' }}
            >
              <div className='border-b px-4 py-3'>
                <h3 className='font-medium'>Additional Information</h3>
              </div>
              <div className='space-y-4 p-4'>
                {quotation.notes && (
                  <div>
                    <h4 className='mb-2 text-sm font-medium'>Notes</h4>
                    <p className='text-muted-foreground rounded-md bg-gray-50 p-3 text-sm dark:bg-gray-900/30'>
                      {quotation.notes}
                    </p>
                  </div>
                )}

                {quotation.terms && (
                  <div>
                    <h4 className='mb-2 text-sm font-medium'>
                      Terms & Conditions
                    </h4>
                    <p className='text-muted-foreground rounded-md bg-gray-50 p-3 text-sm dark:bg-gray-900/30'>
                      {quotation.terms}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons Card */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='border-b px-4 py-3'>
              <h3 className='font-medium'>Actions</h3>
            </div>
            <div className='p-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                {/* Conditional buttons based on status */}
                {quotation.status === 'Accepted' && !quotation.payment && (
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90'
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    <CreditCard className='mr-2 size-4' />
                    Process Payment
                  </button>
                )}

                {quotation.status === 'Paid' && !quotation.delivery && (
                  <button
                    onClick={() => setIsShippingModalOpen(true)}
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600'
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    <Truck className='mr-2 size-4' />
                    Ship Medicines
                  </button>
                )}

                {quotation.status === 'Sent' && (
                  <>
                    <button
                      className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600'
                      style={{ borderRadius: 'var(--radius)' }}
                    >
                      <CheckCircle className='mr-2 size-4' />
                      Mark as Accepted
                    </button>
                    <button
                      className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600'
                      style={{ borderRadius: 'var(--radius)' }}
                    >
                      <XCircle className='mr-2 size-4' />
                      Mark as Rejected
                    </button>
                  </>
                )}

                {['Draft', 'Sent', 'Accepted'].includes(quotation.status) && (
                  <button
                    className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-secondary/90'
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    <Edit className='mr-2 size-4' />
                    Edit Quotation
                  </button>
                )}

                {quotation.status === 'Paid' &&
                  quotation.delivery?.status === 'Shipped' && (
                    <button
                      className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600'
                      style={{ borderRadius: 'var(--radius)' }}
                    >
                      <CheckCircle className='mr-2 size-4' />
                      Mark as Delivered
                    </button>
                  )}
              </div>

              {/* Status warnings */}
              {quotation.status === 'Rejected' && (
                <div className='mt-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200'>
                  <AlertTriangle className='mt-0.5 size-5 flex-shrink-0' />
                  <div>
                    <p className='font-medium'>
                      This quotation has been rejected by the client
                    </p>
                    <p className='text-sm'>
                      You may want to create a new quotation with revised terms
                      or pricing.
                    </p>
                  </div>
                </div>
              )}

              {quotation.status === 'Expired' && (
                <div className='mt-4 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200'>
                  <AlertTriangle className='mt-0.5 size-5 flex-shrink-0' />
                  <div>
                    <p className='font-medium'>This quotation has expired</p>
                    <p className='text-sm'>
                      You may need to create a new quotation with updated
                      pricing and availability.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Timeline (simplified version) */}
          <div
            className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className='border-b px-4 py-3'>
              <h3 className='font-medium'>Activity Timeline</h3>
            </div>
            <div className='p-4'>
              <div className='relative space-y-8 border-l border-gray-200 pl-6 dark:border-gray-700'>
                <div className='relative'>
                  <div className='absolute -left-9 top-0.5 h-4 w-4 rounded-full bg-primary'></div>
                  <div>
                    <p className='font-medium'>Quotation Created</p>
                    <time className='text-muted-foreground text-xs'>
                      {new Date(quotation.createdDate).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </time>
                  </div>
                </div>

                {quotation.status !== 'Draft' && (
                  <div className='relative'>
                    <div className='absolute -left-9 top-0.5 h-4 w-4 rounded-full bg-blue-500'></div>
                    <div>
                      <p className='font-medium'>Quotation Sent to Client</p>
                      <time className='text-muted-foreground text-xs'>
                        {new Date(
                          new Date(quotation.createdDate).getTime() +
                            2 * 60 * 60 * 1000
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>
                  </div>
                )}

                {['Accepted', 'Paid', 'Delivered'].includes(
                  quotation.status
                ) && (
                  <div className='relative'>
                    <div className='absolute -left-9 top-0.5 h-4 w-4 rounded-full bg-green-500'></div>
                    <div>
                      <p className='font-medium'>Quotation Accepted</p>
                      <time className='text-muted-foreground text-xs'>
                        {new Date(
                          new Date(quotation.createdDate).getTime() +
                            24 * 60 * 60 * 1000
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>
                  </div>
                )}

                {quotation.status === 'Rejected' && (
                  <div className='relative'>
                    <div className='absolute -left-9 top-0.5 h-4 w-4 rounded-full bg-red-500'></div>
                    <div>
                      <p className='font-medium'>Quotation Rejected</p>
                      <time className='text-muted-foreground text-xs'>
                        {new Date(
                          new Date(quotation.createdDate).getTime() +
                            48 * 60 * 60 * 1000
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>
                  </div>
                )}

                {['Paid', 'Delivered'].includes(quotation.status) &&
                  quotation.payment && (
                    <div className='relative'>
                      <div className='absolute -left-9 top-0.5 h-4 w-4 rounded-full bg-purple-500'></div>
                      <div>
                        <p className='font-medium'>Payment Received</p>
                        <time className='text-muted-foreground text-xs'>
                          {new Date(quotation.payment.date).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </time>
                        <p className='text-xs text-gray-500'>
                          {quotation.payment.method} - $
                          {quotation.payment.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}

                {quotation.delivery && (
                  <div className='relative'>
                    <div className='absolute -left-9 top-0.5 h-4 w-4 rounded-full bg-teal-500'></div>
                    <div>
                      <p className='font-medium'>Medicines Shipped</p>
                      <time className='text-muted-foreground text-xs'>
                        {new Date(quotation.delivery.date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </time>
                      {quotation.delivery.trackingNumber && (
                        <p className='text-xs text-gray-500'>
                          Tracking: {quotation.delivery.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {quotation.status === 'Delivered' && (
                  <div className='relative'>
                    <div className='absolute -left-9 top-0.5 h-4 w-4 rounded-full bg-green-600'></div>
                    <div>
                      <p className='font-medium'>Delivery Completed</p>
                      <time className='text-muted-foreground text-xs'>
                        {new Date(
                          new Date(
                            quotation.delivery?.date || Date.now()
                          ).getTime() +
                            72 * 60 * 60 * 1000
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div
            className='w-full max-w-md rounded-lg bg-white p-6 dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <h3 className='mb-4 text-xl font-bold'>Process Payment</h3>
            <div className='space-y-4'>
              <div>
                <label
                  className='mb-1 block text-sm font-medium'
                  htmlFor='paymentMethod'
                >
                  Payment Method
                </label>
                <select
                  id='paymentMethod'
                  className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as Payment['method'])
                  }
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  <option value='Credit Card'>Credit Card</option>
                  <option value='Bank Transfer'>Bank Transfer</option>
                  <option value='Cash'>Cash</option>
                  <option value='Insurance'>Insurance</option>
                </select>
              </div>

              <div>
                <label
                  className='mb-1 block text-sm font-medium'
                  htmlFor='paymentRef'
                >
                  Reference Number
                </label>
                <input
                  id='paymentRef'
                  type='text'
                  className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  placeholder='Transaction ID, check number, etc.'
                  style={{ borderRadius: 'var(--radius)' }}
                />
              </div>

              <div className='rounded-md bg-gray-50 p-3 dark:bg-gray-900/30'>
                <div className='mb-2 flex justify-between'>
                  <span>Total Amount:</span>
                  <span className='font-bold'>
                    ${quotation.total.toFixed(2)}
                  </span>
                </div>
                <div className='text-muted-foreground text-xs'>
                  This will mark the quotation as paid and allow for shipping of
                  medicines.
                </div>
              </div>

              <div className='mt-6 flex justify-end gap-2'>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className='rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className='flex items-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90'
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  {isProcessing ? 'Processing...' : 'Process Payment'}
                  {!isProcessing && <DollarSign className='ml-1 size-4' />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Modal */}
      {isShippingModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div
            className='w-full max-w-md rounded-lg bg-white p-6 dark:bg-gray-800'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <h3 className='mb-4 text-xl font-bold'>Ship Medicines</h3>
            <div className='space-y-4'>
              <div>
                <label
                  className='mb-1 block text-sm font-medium'
                  htmlFor='trackingNumber'
                >
                  Tracking Number
                </label>
                <input
                  id='trackingNumber'
                  type='text'
                  className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder='Enter shipping tracking number'
                  style={{ borderRadius: 'var(--radius)' }}
                />
              </div>

              <div>
                <label
                  className='mb-1 block text-sm font-medium'
                  htmlFor='estimatedDelivery'
                >
                  Estimated Delivery Date
                </label>
                <input
                  id='estimatedDelivery'
                  type='date'
                  className='w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
                  value={estimatedDelivery}
                  onChange={(e) => setEstimatedDelivery(e.target.value)}
                  style={{ borderRadius: 'var(--radius)' }}
                />
              </div>

              <div className='rounded-md bg-gray-50 p-3 dark:bg-gray-900/30'>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <span>Total Medicines:</span>
                    <span className='font-bold'>
                      {quotation.medicines.length} products
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Total Items:</span>
                    <span className='font-bold'>{totalItems} items</span>
                  </div>
                </div>
              </div>

              <div className='mt-6 flex justify-end gap-2'>
                <button
                  onClick={() => setIsShippingModalOpen(false)}
                  className='rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleShipOrder}
                  disabled={
                    isProcessing || !trackingNumber || !estimatedDelivery
                  }
                  className='flex items-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  {isProcessing ? 'Processing...' : 'Ship Order'}
                  {!isProcessing && <Truck className='ml-1 size-4' />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add this style tag to properly use CSS variables in Tailwind */}
      <style jsx global>{`
        .bg-primary {
          background-color: hsl(var(--primary));
        }
        .bg-primary\\/10 {
          background-color: hsla(var(--primary), 0.1);
        }
        .bg-primary\\/90 {
          background-color: hsla(var(--primary), 0.9);
        }
        .text-primary {
          color: hsl(var(--primary));
        }
        .border-primary {
          border-color: hsl(var(--primary));
        }
        .focus\\:ring-primary:focus {
          --tw-ring-color: hsl(var(--primary));
        }
        .hover\\:bg-primary:hover {
          background-color: hsl(var(--primary));
        }
        .hover\\:bg-primary\\/90:hover {
          background-color: hsla(var(--primary), 0.9);
        }

        .bg-secondary {
          background-color: hsl(var(--secondary));
        }
        .bg-secondary\\/10 {
          background-color: hsla(var(--secondary), 0.1);
        }
        .bg-secondary\\/90 {
          background-color: hsla(var(--secondary), 0.9);
        }
        .text-secondary {
          color: hsl(var(--secondary));
        }
        .border-secondary {
          border-color: hsl(var(--secondary));
        }
        .focus\\:ring-secondary:focus {
          --tw-ring-color: hsl(var(--secondary));
        }
        .hover\\:bg-secondary:hover {
          background-color: hsl(var(--secondary));
        }
        .hover\\:bg-secondary\\/90:hover {
          background-color: hsla(var(--secondary), 0.9);
        }

        .text-muted-foreground {
          color: hsl(var(--sidebar-foreground) / 0.7);
        }
      `}</style>
    </div>
  );
}
