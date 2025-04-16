/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import {  SetStateAction, useState } from 'react';
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
  PlusCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define TypeScript interfaces
interface Quotation {
  id: string;
  requestId: string;
  clientName: string;
  createdDate: string;
  expiryDate: string;
  totalAmount: number;
  itemCount: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
}

// Sample quotations data
const quotationsData: Quotation[] = [
  {
    id: "QT-1001",
    requestId: "BR-7842",
    clientName: "John Smith",
    createdDate: "2025-03-20",
    expiryDate: "2025-04-19",
    totalAmount: 187.72,
    itemCount: 12,
    status: "Sent"
  },
  {
    id: "QT-1000",
    requestId: "BR-7841",
    clientName: "Emma Johnson",
    createdDate: "2025-03-19",
    expiryDate: "2025-04-18",
    totalAmount: 542.75,
    itemCount: 8,
    status: "Draft"
  },
  {
    id: "QT-999",
    requestId: "BR-7837",
    clientName: "Jennifer Miller",
    createdDate: "2025-03-18",
    expiryDate: "2025-04-17",
    totalAmount: 623.80,
    itemCount: 9,
    status: "Accepted"
  },
  {
    id: "QT-998",
    requestId: "BR-7832",
    clientName: "Daniel White",
    createdDate: "2025-03-17",
    expiryDate: "2025-04-16",
    totalAmount: 687.15,
    itemCount: 11,
    status: "Rejected"
  },
  {
    id: "QT-997",
    requestId: "BR-7829",
    clientName: "Sophia Rodriguez",
    createdDate: "2025-03-16",
    expiryDate: "2025-03-15",
    totalAmount: 287.60,
    itemCount: 5,
    status: "Expired"
  },
  {
    id: "QT-996",
    requestId: "BR-7828",
    clientName: "Charles Lewis",
    createdDate: "2025-03-15",
    expiryDate: "2025-04-14",
    totalAmount: 776.30,
    itemCount: 12,
    status: "Accepted"
  },
  {
    id: "QT-995",
    requestId: "BR-7819",
    clientName: "Thomas Wilson",
    createdDate: "2025-03-14",
    expiryDate: "2025-04-13",
    totalAmount: 456.90,
    itemCount: 7,
    status: "Sent"
  },
  {
    id: "QT-994",
    requestId: "BR-7818",
    clientName: "Elizabeth Clark",
    createdDate: "2025-03-13",
    expiryDate: "2025-04-12",
    totalAmount: 342.65,
    itemCount: 6,
    status: "Accepted"
  },
];

export default function QuotationsPage() {
  // State for handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  
  // State for sorting
  const [sortField, setSortField] = useState('createdDate');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const router = useRouter();
  
  // Handle search input
  const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  // Handle status filter
  const handleStatusFilter = (status: SetStateAction<string>) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };
  
  // Handle date filter
  const handleDateFilter = (e: { target: { value: SetStateAction<string>; }; }) => {
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
  
  // Get status color
  const getStatusColor = (status: string) => {
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
      default:
        return 'bg-gray-500';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Draft':
        return <FileText className="size-4" />;
      case 'Sent':
        return <Clock className="size-4" />;
      case 'Accepted':
        return <CheckCircle2 className="size-4" />;
      case 'Rejected':
        return <XCircle className="size-4" />;
      case 'Expired':
        return <AlertCircle className="size-4" />;
      default:
        return <HelpCircle className="size-4" />;
    }
  };
  
  // Filter and sort the data
  const filteredData = quotationsData.filter(quotation => {
    const matchesSearch = 
      quotation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || quotation.status === statusFilter;
    
    const matchesDate = !dateFilter || quotation.createdDate === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  }).sort((a, b) => {
    if (sortField === 'totalAmount' || sortField === 'itemCount') {
      // Sort by number
      return sortDirection === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    } else {
      // Sort by string fields
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  // Change page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
        <p className="text-muted-foreground">
          Manage and track all quotations sent to clients
        </p>
      </div>
      
      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search quotations..."
              className="pl-8 pr-4 py-2 bg-white dark:bg-gray-800 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={handleSearch}
              style={{ borderRadius: 'var(--radius)' }}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <input
                type="date"
                className="pl-8 pr-4 py-2 bg-white dark:bg-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={dateFilter}
                onChange={handleDateFilter}
                style={{ borderRadius: 'var(--radius)' }}
              />
            </div>
            
            <div className="relative inline-block">
              <select
                className="pl-4 pr-8 py-2 bg-white dark:bg-gray-800 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                style={{ borderRadius: 'var(--radius)' }}
              >
                <option value="All">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Expired">Expired</option>
              </select>
              <Filter className="absolute right-2.5 top-2.5 size-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-white dark:bg-gray-800 border px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
            style={{ borderRadius: 'var(--radius)' }}>
            <Download className="mr-2 size-4" />
            Export
          </button>
          <Link href="/importer/quotations/create">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              style={{ borderRadius: 'var(--radius)' }}>
              <PlusCircle className="mr-2 size-4" />
              New Quotation
            </button>
          </Link>
        </div>
      </div>
      
      {/* Quotations Table */}
      <div className="rounded-lg border bg-white dark:bg-gray-800 shadow-sm overflow-hidden"
        style={{ borderRadius: 'var(--radius)' }}>
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th 
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center gap-1">
                    Quotation ID
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('requestId')}
                >
                  <div className="flex items-center gap-1">
                    Request ID
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('clientName')}
                >
                  <div className="flex items-center gap-1">
                    Client
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('createdDate')}
                >
                  <div className="flex items-center gap-1">
                    Created Date
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('expiryDate')}
                >
                  <div className="flex items-center gap-1">
                    Expiry Date
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('itemCount')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Items
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('totalAmount')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Amount
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentItems.map((quotation) => (
                <tr key={quotation.id} className="border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/20">
                  <td className="px-4 py-3 align-middle font-medium">
                    {quotation.id}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {quotation.requestId}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {quotation.clientName}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {new Date(quotation.createdDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {new Date(quotation.expiryDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-4 py-3 align-middle text-right">
                    {quotation.itemCount}
                  </td>
                  <td className="px-4 py-3 align-middle text-right font-medium">
                    ${quotation.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(quotation.status)} text-white`}>
                      {getStatusIcon(quotation.status)}
                      <span>{quotation.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-right">
                    <Link href={`/importer/quotations/${quotation.id}`}>
                      <button className="inline-flex items-center justify-center size-8 rounded-md bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-colors">
                        <Eye className="size-4" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              
              {/* Show message when no results found */}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-6 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="size-6" />
                      <p>No quotations found matching your filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="border-t p-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} quotations
          </div>
          
          <div className="flex items-center gap-2">
            <select
              className="h-8 px-2 bg-white dark:bg-gray-800 border rounded-md text-sm"
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
            
            <div className="flex gap-1">
              <button
                className={`inline-flex items-center justify-center size-8 rounded-md border ${currentPage === 1 ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-50' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ borderRadius: 'var(--radius)' }}
              >
                <ChevronLeft className="size-4" />
              </button>
              
              {/* Page number buttons - show up to 5 pages */}
              {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
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
                    className={`inline-flex items-center justify-center size-8 rounded-md border ${pageNum === currentPage ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => paginate(pageNum)}
                    style={{ borderRadius: 'var(--radius)' }}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                className={`inline-flex items-center justify-center size-8 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-50' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                style={{ borderRadius: 'var(--radius)' }}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}