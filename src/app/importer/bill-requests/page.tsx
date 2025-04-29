/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { useState, useEffect, SetStateAction } from 'react';
import {
  Search,
  Filter,
  FileText,
  Download,
  Upload,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  FilePlus,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Calendar,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';

// Sample data for bill requests
const billRequestsData = [
  {
    id: 'BR-7842',
    requestDate: '2025-03-19',
    clientName: 'John Smith',
    type: 'clientRequest', // Client requesting medicine
    description: 'Monthly prescription refill',
    items: 12,
    status: 'Pending',
  },
  {
    id: 'BR-7841',
    requestDate: '2025-03-18',
    clientName: 'Emma Johnson',
    type: 'clientRequest',
    description: 'Emergency antibiotics order',
    items: 8,
    status: 'Quotation Sent',
  },
  {
    id: 'BR-7840',
    requestDate: '2025-03-18',
    clientName: 'Michael Davis',
    type: 'donorRequest', // Donor offering medicine
    description: 'Hospital bulk donation - cardiac medications',
    items: 15,
    status: 'Accepted',
  },
  {
    id: 'BR-7839',
    requestDate: '2025-03-17',
    clientName: 'Sarah Wilson',
    type: 'clientRequest',
    description: 'Generic antibiotics request',
    items: 5,
    status: 'Declined',
  },
  {
    id: 'BR-7838',
    requestDate: '2025-03-17',
    clientName: 'Robert Brown',
    type: 'clientRequest',
    description: 'Diabetes medications monthly supply',
    items: 10,
    status: 'Accepted',
  },
  {
    id: 'BR-7837',
    requestDate: '2025-03-16',
    clientName: 'Jennifer Miller',
    type: 'donorRequest',
    description: 'Pain management medications donation',
    items: 9,
    status: 'Quotation Sent',
  },
  {
    id: 'BR-7836',
    requestDate: '2025-03-16',
    clientName: 'William Jones',
    type: 'clientRequest',
    description: 'Seasonal allergy medications',
    items: 4,
    status: 'Pending',
  },
  {
    id: 'BR-7835',
    requestDate: '2025-03-15',
    clientName: 'Jessica Taylor',
    type: 'clientRequest',
    description: 'Hypertension medication refill',
    items: 7,
    status: 'Accepted',
  },
  {
    id: 'BR-7834',
    requestDate: '2025-03-15',
    clientName: 'David Anderson',
    type: 'donorRequest',
    description: 'Respiratory medications donation',
    items: 8,
    status: 'Declined',
  },
  {
    id: 'BR-7833',
    requestDate: '2025-03-14',
    clientName: 'Lisa Thomas',
    type: 'clientRequest',
    description: 'Prenatal vitamins and supplements',
    items: 6,
    status: 'Pending',
  },
  {
    id: 'BR-7832',
    requestDate: '2025-03-14',
    clientName: 'Daniel White',
    type: 'donorRequest',
    description: 'Mental health medications donation',
    items: 11,
    status: 'Quotation Sent',
  },
  {
    id: 'BR-7831',
    requestDate: '2025-03-13',
    clientName: 'Maria Garcia',
    type: 'clientRequest',
    description: 'Pediatric fever reducers',
    items: 4,
    status: 'Accepted',
  },
  {
    id: 'BR-7830',
    requestDate: '2025-03-13',
    clientName: 'James Martinez',
    type: 'clientRequest',
    description: 'Post-surgery pain management',
    items: 14,
    status: 'Pending',
  },
  {
    id: 'BR-7829',
    requestDate: '2025-03-12',
    clientName: 'Sophia Rodriguez',
    type: 'donorRequest',
    description: 'Thyroid medications donation',
    items: 5,
    status: 'Quotation Sent',
  },
  {
    id: 'BR-7828',
    requestDate: '2025-03-12',
    clientName: 'Charles Lewis',
    type: 'clientRequest',
    description: 'Monthly prescription package',
    items: 12,
    status: 'Accepted',
  },
];

export default function BillRequests() {
  // State for handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // State for sorting
  const [sortField, setSortField] = useState('requestDate');
  const [sortDirection, setSortDirection] = useState('desc');

  // Handle search input
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle status filter
  const handleStatusFilter = (status: SetStateAction<string>) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle type filter
  const handleTypeFilter = (type: SetStateAction<string>) => {
    setTypeFilter(type);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle date filter
  const handleDateFilter = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setDateFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering by date
  };

  // Handle sort
  const handleSort = (field: SetStateAction<string>) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className='size-4' />;
      case 'Quotation Sent':
        return <FileText className='size-4' />;
      case 'Accepted':
        return <CheckCircle2 className='size-4' />;
      case 'Declined':
        return <XCircle className='size-4' />;
      default:
        return <HelpCircle className='size-4' />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'Quotation Sent':
        return 'bg-secondary hover:bg-secondary/90';
      case 'Accepted':
        return 'bg-green-500 hover:bg-green-600';
      case 'Declined':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Get type label
  const getTypeLabel = (type: string) => {
    return type === 'clientRequest' ? 'Client Request' : 'Donor Request';
  };

  // Get type color
  const getTypeColor = (type: string) => {
    return type === 'clientRequest'
      ? 'bg-primary/10 text-primary'
      : 'bg-secondary/10 text-secondary';
  };

  // Filter and sort the data
  const filteredData = billRequestsData
    .filter((request) => {
      const matchesSearch =
        request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || request.status === statusFilter;
      const matchesType = typeFilter === 'All' || request.type === typeFilter;
      const matchesDate = !dateFilter || request.requestDate === dateFilter;

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    })
    .sort((a, b) => {
      if (sortField === 'items') {
        // Sort by number of items
        return sortDirection === 'asc'
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      } else {
        // Sort by string fields
        if (a[sortField] < b[sortField])
          return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField])
          return sortDirection === 'asc' ? 1 : -1;
        return 0;
      }
    });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Bill Requests</h1>
        <p className='text-muted-foreground'>
          Manage client medicine requests and donor medicine offers
        </p>
      </div>

      {/* Filter and Search Section */}
      <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
        <div className='flex w-full flex-col gap-2 sm:flex-row md:w-auto'>
          <div className='relative'>
            <Search className='text-muted-foreground absolute left-2.5 top-2.5 size-4' />
            <input
              type='text'
              placeholder='Search requests...'
              className='w-full rounded-md border bg-white py-2 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 sm:w-64'
              value={searchTerm}
              onChange={handleSearch}
              style={{ borderRadius: 'var(--radius)' }}
            />
          </div>

          <div className='flex gap-2'>
            <div className='relative'>
              <Calendar className='text-muted-foreground absolute left-2.5 top-2.5 size-4' />
              <input
                type='date'
                className='rounded-md border bg-white py-2 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800'
                value={dateFilter}
                onChange={handleDateFilter}
                style={{ borderRadius: 'var(--radius)' }}
              />
            </div>

            <div className='relative inline-block'>
              <select
                className='appearance-none rounded-md border bg-white py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800'
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                style={{ borderRadius: 'var(--radius)' }}
              >
                <option value='All'>All Statuses</option>
                <option value='Pending'>Pending</option>
                <option value='Quotation Sent'>Quotation Sent</option>
                <option value='Accepted'>Accepted</option>
                <option value='Declined'>Declined</option>
              </select>
              <Filter className='text-muted-foreground pointer-events-none absolute right-2.5 top-2.5 size-4' />
            </div>

            <div className='relative inline-block'>
              <select
                className='appearance-none rounded-md border bg-white py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800'
                value={typeFilter}
                onChange={(e) => handleTypeFilter(e.target.value)}
                style={{ borderRadius: 'var(--radius)' }}
              >
                <option value='All'>All Types</option>
                <option value='clientRequest'>Client Requests</option>
                <option value='donorRequest'>Donor Offers</option>
              </select>
              <UserCircle className='text-muted-foreground pointer-events-none absolute right-2.5 top-2.5 size-4' />
            </div>
          </div>
        </div>

        <div className='flex w-full gap-2 md:w-auto'>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <Upload className='mr-2 size-4' />
            Import
          </button>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <Download className='mr-2 size-4' />
            Export
          </button>
          <button
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary'
            style={{ borderRadius: 'var(--radius)' }}
          >
            <FilePlus className='mr-2 size-4' />
            New Request
          </button>
        </div>
      </div>

      {/* Bill Requests Table */}
      <div
        className='overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800'
        style={{ borderRadius: 'var(--radius)' }}
      >
        <div className='overflow-x-auto'>
          <table className='w-full caption-bottom text-sm'>
            <thead className='bg-gray-50 dark:bg-gray-900/50'>
              <tr>
                <th
                  className='cursor-pointer px-4 py-3 text-left font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  onClick={() => handleSort('id')}
                >
                  <div className='flex items-center gap-1'>
                    Request ID
                    <ArrowUpDown className='size-4' />
                  </div>
                </th>
                <th
                  className='cursor-pointer px-4 py-3 text-left font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  onClick={() => handleSort('requestDate')}
                >
                  <div className='flex items-center gap-1'>
                    Date
                    <ArrowUpDown className='size-4' />
                  </div>
                </th>
                <th
                  className='cursor-pointer px-4 py-3 text-left font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  onClick={() => handleSort('clientName')}
                >
                  <div className='flex items-center gap-1'>
                    Client/Donor
                    <ArrowUpDown className='size-4' />
                  </div>
                </th>
                <th
                  className='cursor-pointer px-4 py-3 text-left font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  onClick={() => handleSort('type')}
                >
                  <div className='flex items-center gap-1'>
                    Type
                    <ArrowUpDown className='size-4' />
                  </div>
                </th>
                <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                  Description
                </th>
                <th
                  className='cursor-pointer px-4 py-3 text-right font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  onClick={() => handleSort('items')}
                >
                  <div className='flex items-center justify-end gap-1'>
                    Items
                    <ArrowUpDown className='size-4' />
                  </div>
                </th>
                <th
                  className='cursor-pointer px-4 py-3 text-left font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  onClick={() => handleSort('status')}
                >
                  <div className='flex items-center gap-1'>
                    Status
                    <ArrowUpDown className='size-4' />
                  </div>
                </th>
                <th className='px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y'>
              {currentItems.map((request) => (
                <tr
                  key={request.id}
                  className='border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/20'
                >
                  <td className='px-4 py-3 align-middle font-medium'>
                    {request.id}
                  </td>
                  <td className='px-4 py-3 align-middle'>
                    {new Date(request.requestDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className='px-4 py-3 align-middle'>
                    {request.clientName}
                  </td>
                  <td className='px-4 py-3 align-middle'>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeColor(request.type)}`}
                    >
                      {getTypeLabel(request.type)}
                    </div>
                  </td>
                  <td className='max-w-xs truncate px-4 py-3 align-middle'>
                    {request.description}
                  </td>
                  <td className='px-4 py-3 text-right align-middle'>
                    {request.items}
                  </td>
                  <td className='px-4 py-3 align-middle'>
                    <div
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(request.status)} text-white`}
                    >
                      {getStatusIcon(request.status)}
                      <span>{request.status}</span>
                    </div>
                  </td>
                  <td className='px-4 py-3 text-right align-middle'>
                    <Link href={`/importer/bill-requests/${request.id}`}>
                      <button className='inline-flex size-8 items-center justify-center rounded-md bg-secondary/10 text-secondary transition-colors hover:bg-secondary hover:text-white'>
                        <Eye className='size-4' />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}

              {/* Show message when no results found */}
              {currentItems.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className='text-muted-foreground px-4 py-6 text-center'
                  >
                    <div className='flex flex-col items-center gap-2'>
                      <AlertCircle className='size-6' />
                      <p>No bill requests found matching your filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-between border-t p-4'>
          <div className='text-muted-foreground text-sm'>
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredData.length)} of{' '}
            {filteredData.length} requests
          </div>

          <div className='flex items-center gap-2'>
            <select
              className='h-8 rounded-md border bg-white px-2 text-sm dark:bg-gray-800'
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ borderRadius: 'var(--radius)' }}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>

            <div className='flex gap-1'>
              <button
                className={`inline-flex size-8 items-center justify-center rounded-md border ${currentPage === 1 ? 'cursor-not-allowed bg-gray-100 opacity-50 dark:bg-gray-800' : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'}`}
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ borderRadius: 'var(--radius)' }}
              >
                <ChevronLeft className='size-4' />
              </button>

              {/* Page number buttons - show up to 5 pages */}
              {Array.from({ length: Math.min(5, totalPages) }).map(
                (_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    // If 5 or fewer pages, show all
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    // If near the start, show first 5 pages
                    pageNum = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    // If near the end, show last 5 pages
                    pageNum = totalPages - 4 + index;
                  } else {
                    // Otherwise show 2 before and 2 after current page
                    pageNum = currentPage - 2 + index;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`inline-flex size-8 items-center justify-center rounded-md border ${pageNum === currentPage ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'}`}
                      onClick={() => paginate(pageNum)}
                      style={{ borderRadius: 'var(--radius)' }}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}

              <button
                className={`inline-flex size-8 items-center justify-center rounded-md border ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-100 opacity-50 dark:bg-gray-800' : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'}`}
                onClick={() =>
                  currentPage < totalPages && paginate(currentPage + 1)
                }
                disabled={currentPage === totalPages || totalPages === 0}
                style={{ borderRadius: 'var(--radius)' }}
              >
                <ChevronRight className='size-4' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
