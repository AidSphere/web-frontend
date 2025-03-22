/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import {  SetStateAction, useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  RefreshCw,
  ArrowUpDown,
  AlertTriangle,
  AlertCircle,
  Check,
  Package,
  Pill,
  Calendar,
  Warehouse,
  ServerCrash
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define TypeScript interfaces
interface Medicine {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  totalStock: number;
  availableStock: number;
  unit: string;
  expiryDate: string;
  batchNumber: string;
  price: number;
  reorderLevel: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expired' | 'Nearly Expired';
  lastUpdated: string;
}

// Sample medicines data
const medicinesData: Medicine[] = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    manufacturer: "Generic Pharma Inc.",
    totalStock: 3200,
    availableStock: 2850,
    unit: "Tablets",
    expiryDate: "2026-06-15",
    batchNumber: "AMX-2023-A542",
    price: 0.42,
    reorderLevel: 500,
    status: "In Stock",
    lastUpdated: "2025-03-15"
  },
  {
    id: 2,
    name: "Lisinopril 10mg",
    category: "Cardiovascular",
    manufacturer: "CardioMed Ltd.",
    totalStock: 1250,
    availableStock: 980,
    unit: "Tablets",
    expiryDate: "2026-08-22",
    batchNumber: "LSP-2023-B721",
    price: 0.38,
    reorderLevel: 400,
    status: "In Stock",
    lastUpdated: "2025-03-12"
  },
  {
    id: 3,
    name: "Metformin 1000mg",
    category: "Diabetes",
    manufacturer: "DiabeCare Pharma",
    totalStock: 800,
    availableStock: 320,
    unit: "Tablets",
    expiryDate: "2026-05-10",
    batchNumber: "MET-2023-C103",
    price: 0.31,
    reorderLevel: 350,
    status: "Low Stock",
    lastUpdated: "2025-03-18"
  },
  {
    id: 4,
    name: "Atorvastatin 20mg",
    category: "Cardiovascular",
    manufacturer: "CardioMed Ltd.",
    totalStock: 1500,
    availableStock: 1250,
    unit: "Tablets",
    expiryDate: "2026-09-05",
    batchNumber: "ATV-2023-D298",
    price: 0.76,
    reorderLevel: 300,
    status: "In Stock",
    lastUpdated: "2025-03-10"
  },
  {
    id: 5,
    name: "Albuterol Inhaler",
    category: "Respiratory",
    manufacturer: "RespiCare Solutions",
    totalStock: 0,
    availableStock: 0,
    unit: "Inhalers",
    expiryDate: "2026-04-18",
    batchNumber: "ALB-2023-E512",
    price: 22.50,
    reorderLevel: 50,
    status: "Out of Stock",
    lastUpdated: "2025-03-05"
  },
  {
    id: 6,
    name: "Omeprazole 20mg",
    category: "Gastrointestinal",
    manufacturer: "GastroHealth Inc.",
    totalStock: 2000,
    availableStock: 1850,
    unit: "Capsules",
    expiryDate: "2026-07-30",
    batchNumber: "OMP-2023-F631",
    price: 0.48,
    reorderLevel: 400,
    status: "In Stock",
    lastUpdated: "2025-03-14"
  },
  {
    id: 7,
    name: "Levothyroxine 50mcg",
    category: "Thyroid",
    manufacturer: "EndoCare Pharmaceuticals",
    totalStock: 1800,
    availableStock: 1500,
    unit: "Tablets",
    expiryDate: "2026-06-25",
    batchNumber: "LVT-2023-G782",
    price: 0.35,
    reorderLevel: 350,
    status: "In Stock",
    lastUpdated: "2025-03-11"
  },
  {
    id: 8,
    name: "Hydrochlorothiazide 25mg",
    category: "Cardiovascular",
    manufacturer: "CardioMed Ltd.",
    totalStock: 2200,
    availableStock: 1950,
    unit: "Tablets",
    expiryDate: "2026-08-12",
    batchNumber: "HCT-2023-H913",
    price: 0.28,
    reorderLevel: 400,
    status: "In Stock",
    lastUpdated: "2025-03-09"
  },
  {
    id: 9,
    name: "Sertraline 50mg",
    category: "Mental Health",
    manufacturer: "MindWell Pharma",
    totalStock: 1000,
    availableStock: 820,
    unit: "Tablets",
    expiryDate: "2026-07-08",
    batchNumber: "SRT-2023-I104",
    price: 0.47,
    reorderLevel: 250,
    status: "In Stock",
    lastUpdated: "2025-03-16"
  },
  {
    id: 10,
    name: "Ibuprofen 800mg",
    category: "Pain Relief",
    manufacturer: "PainCare Therapeutics",
    totalStock: 3500,
    availableStock: 3200,
    unit: "Tablets",
    expiryDate: "2026-09-20",
    batchNumber: "IBP-2023-J215",
    price: 0.25,
    reorderLevel: 600,
    status: "In Stock",
    lastUpdated: "2025-03-08"
  },
  {
    id: 11,
    name: "Fluticasone Nasal Spray",
    category: "Allergy",
    manufacturer: "AllerClear Labs",
    totalStock: 650,
    availableStock: 580,
    unit: "Bottles",
    expiryDate: "2026-04-30",
    batchNumber: "FLT-2023-K326",
    price: 28.90,
    reorderLevel: 100,
    status: "In Stock",
    lastUpdated: "2025-03-13"
  },
  {
    id: 12,
    name: "Vitamin D3 2000IU",
    category: "Supplements",
    manufacturer: "VitaHealth Nutrition",
    totalStock: 4000,
    availableStock: 3750,
    unit: "Tablets",
    expiryDate: "2026-10-15",
    batchNumber: "VTD-2023-L437",
    price: 0.14,
    reorderLevel: 800,
    status: "In Stock",
    lastUpdated: "2025-03-07"
  },
  {
    id: 13,
    name: "Amlodipine 5mg",
    category: "Cardiovascular",
    manufacturer: "CardioMed Ltd.",
    totalStock: 1700,
    availableStock: 1480,
    unit: "Tablets",
    expiryDate: "2026-08-05",
    batchNumber: "AML-2023-M548",
    price: 0.31,
    reorderLevel: 300,
    status: "In Stock",
    lastUpdated: "2025-03-10"
  },
  {
    id: 14,
    name: "Losartan 50mg",
    category: "Cardiovascular",
    manufacturer: "CardioMed Ltd.",
    totalStock: 1400,
    availableStock: 250,
    unit: "Tablets",
    expiryDate: "2026-07-22",
    batchNumber: "LST-2023-N659",
    price: 0.56,
    reorderLevel: 300,
    status: "Low Stock",
    lastUpdated: "2025-03-14"
  },
  {
    id: 15,
    name: "Cetirizine 10mg",
    category: "Allergy",
    manufacturer: "AllerClear Labs",
    totalStock: 2800,
    availableStock: 2600,
    unit: "Tablets",
    expiryDate: "2025-04-15",
    batchNumber: "CTZ-2023-O760",
    price: 0.18,
    reorderLevel: 500,
    status: "Nearly Expired",
    lastUpdated: "2025-03-12"
  },
  {
    id: 16,
    name: "Atenolol 50mg",
    category: "Cardiovascular",
    manufacturer: "CardioMed Ltd.",
    totalStock: 900,
    availableStock: 120,
    unit: "Tablets",
    expiryDate: "2026-06-18",
    batchNumber: "ATN-2023-P871",
    price: 0.22,
    reorderLevel: 200,
    status: "Low Stock",
    lastUpdated: "2025-03-15"
  },
  {
    id: 17,
    name: "Doxycycline 100mg",
    category: "Antibiotics",
    manufacturer: "Generic Pharma Inc.",
    totalStock: 50,
    availableStock: 0,
    unit: "Capsules",
    expiryDate: "2024-12-30",
    batchNumber: "DXY-2023-Q982",
    price: 0.62,
    reorderLevel: 150,
    status: "Expired",
    lastUpdated: "2025-03-09"
  },
  {
    id: 18,
    name: "Gabapentin 300mg",
    category: "Neurology",
    manufacturer: "NeuroCare Solutions",
    totalStock: 1200,
    availableStock: 980,
    unit: "Capsules",
    expiryDate: "2026-05-25",
    batchNumber: "GBP-2023-R093",
    price: 0.38,
    reorderLevel: 250,
    status: "In Stock",
    lastUpdated: "2025-03-11"
  },
  {
    id: 19,
    name: "Metoprolol 50mg",
    category: "Cardiovascular",
    manufacturer: "CardioMed Ltd.",
    totalStock: 1600,
    availableStock: 1480,
    unit: "Tablets",
    expiryDate: "2026-07-15",
    batchNumber: "MTP-2023-S104",
    price: 0.30,
    reorderLevel: 300,
    status: "In Stock",
    lastUpdated: "2025-03-13"
  },
  {
    id: 20,
    name: "Fluoxetine 20mg",
    category: "Mental Health",
    manufacturer: "MindWell Pharma",
    totalStock: 700,
    availableStock: 50,
    unit: "Capsules",
    expiryDate: "2026-06-10",
    batchNumber: "FLX-2023-T215",
    price: 0.48,
    reorderLevel: 200,
    status: "Low Stock",
    lastUpdated: "2025-03-16"
  }
];

export default function MedicinesPage() {
  // State for handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [manufacturerFilter, setManufacturerFilter] = useState('All');
  
  // State for sorting
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const router = useRouter();
  
  // Handle search input
  const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  // Handle filters
  const handleStatusFilter = (status: SetStateAction<string>) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };
  
  const handleCategoryFilter = (category: SetStateAction<string>) => {
    setCategoryFilter(category);
    setCurrentPage(1); // Reset to first page when filtering
  };
  
  const handleManufacturerFilter = (manufacturer: SetStateAction<string>) => {
    setManufacturerFilter(manufacturer);
    setCurrentPage(1); // Reset to first page when filtering
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
      case 'In Stock':
        return 'bg-green-500';
      case 'Low Stock':
        return 'bg-amber-500';
      case 'Out of Stock':
        return 'bg-red-500';
      case 'Expired':
        return 'bg-red-600';
      case 'Nearly Expired':
        return 'bg-amber-600';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <Check className="size-4" />;
      case 'Low Stock':
        return <AlertTriangle className="size-4" />;
      case 'Out of Stock':
        return <ServerCrash className="size-4" />;
      case 'Expired':
        return <AlertCircle className="size-4" />;
      case 'Nearly Expired':
        return <Calendar className="size-4" />;
      default:
        return <Package className="size-4" />;
    }
  };
  
  // Get all unique categories
  const categories = ['All', ...Array.from(new Set(medicinesData.map(med => med.category)))];
  
  // Get all unique manufacturers
  const manufacturers = ['All', ...Array.from(new Set(medicinesData.map(med => med.manufacturer)))];
  
  // Calculate stock status percentage
  const calculateStockPercentage = (available: number, total: number, reorderLevel: number) => {
    if (total === 0) return 0;
    return Math.min(100, Math.max(0, (available / Math.max(total, reorderLevel)) * 100));
  };
  
  // Filter and sort the data
  const filteredData = medicinesData.filter(medicine => {
    const matchesSearch = 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || medicine.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || medicine.category === categoryFilter;
    const matchesManufacturer = manufacturerFilter === 'All' || medicine.manufacturer === manufacturerFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesManufacturer;
  }).sort((a, b) => {
    if (sortField === 'availableStock' || sortField === 'totalStock' || sortField === 'price' || sortField === 'reorderLevel') {
      // Sort by number
      return sortDirection === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    } else if (sortField === 'expiryDate' || sortField === 'lastUpdated') {
      // Sort by date
      return sortDirection === 'asc' 
        ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime() 
        : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
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
  
  // Summary statistics
  const summaryStats = {
    totalMedicines: medicinesData.length,
    inStock: medicinesData.filter(m => m.status === 'In Stock').length,
    lowStock: medicinesData.filter(m => m.status === 'Low Stock').length,
    outOfStock: medicinesData.filter(m => m.status === 'Out of Stock').length,
    nearlyExpired: medicinesData.filter(m => m.status === 'Nearly Expired').length,
    expired: medicinesData.filter(m => m.status === 'Expired').length
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Medicine Inventory</h1>
        <p className="text-muted-foreground">
          Manage and track all medicines in your inventory
        </p>
      </div>
      
      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-lg border bg-white dark:bg-gray-800 p-4 flex flex-col">
          <span className="text-xs text-muted-foreground uppercase">Total</span>
          <span className="text-2xl font-bold">{summaryStats.totalMedicines}</span>
          <div className="mt-1 flex items-center gap-1 text-green-500">
            <Package className="size-4" />
            <span className="text-xs">Medicines</span>
          </div>
        </div>
        
        <div className="rounded-lg border bg-white dark:bg-gray-800 p-4 flex flex-col">
          <span className="text-xs text-muted-foreground uppercase">In Stock</span>
          <span className="text-2xl font-bold">{summaryStats.inStock}</span>
          <div className="mt-1 flex items-center gap-1 text-green-500">
            <Check className="size-4" />
            <span className="text-xs">Available</span>
          </div>
        </div>
        
        <div className="rounded-lg border bg-white dark:bg-gray-800 p-4 flex flex-col">
          <span className="text-xs text-muted-foreground uppercase">Low Stock</span>
          <span className="text-2xl font-bold">{summaryStats.lowStock}</span>
          <div className="mt-1 flex items-center gap-1 text-amber-500">
            <AlertTriangle className="size-4" />
            <span className="text-xs">Reorder Soon</span>
          </div>
        </div>
        
        <div className="rounded-lg border bg-white dark:bg-gray-800 p-4 flex flex-col">
          <span className="text-xs text-muted-foreground uppercase">Out of Stock</span>
          <span className="text-2xl font-bold">{summaryStats.outOfStock}</span>
          <div className="mt-1 flex items-center gap-1 text-red-500">
            <ServerCrash className="size-4" />
            <span className="text-xs">Unavailable</span>
          </div>
        </div>
        
        <div className="rounded-lg border bg-white dark:bg-gray-800 p-4 flex flex-col">
          <span className="text-xs text-muted-foreground uppercase">Nearly Expired</span>
          <span className="text-2xl font-bold">{summaryStats.nearlyExpired}</span>
          <div className="mt-1 flex items-center gap-1 text-amber-600">
            <Calendar className="size-4" />
            <span className="text-xs">Use Soon</span>
          </div>
        </div>
        
        <div className="rounded-lg border bg-white dark:bg-gray-800 p-4 flex flex-col">
          <span className="text-xs text-muted-foreground uppercase">Expired</span>
          <span className="text-2xl font-bold">{summaryStats.expired}</span>
          <div className="mt-1 flex items-center gap-1 text-red-600">
            <AlertCircle className="size-4" />
            <span className="text-xs">Dispose</span>
          </div>
        </div>
      </div>
      
      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search medicines..."
              className="pl-8 pr-4 py-2 bg-white dark:bg-gray-800 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={handleSearch}
              style={{ borderRadius: 'var(--radius)' }}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {/* Status Filter */}
            <div className="relative inline-block">
              <select
                className="pl-4 pr-8 py-2 bg-white dark:bg-gray-800 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                style={{ borderRadius: 'var(--radius)' }}
              >
                <option value="All">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Nearly Expired">Nearly Expired</option>
                <option value="Expired">Expired</option>
              </select>
              <Filter className="absolute right-2.5 top-2.5 size-4 pointer-events-none text-muted-foreground" />
            </div>
            
            {/* Category Filter */}
            <div className="relative inline-block">
              <select
                className="pl-4 pr-8 py-2 bg-white dark:bg-gray-800 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                value={categoryFilter}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                style={{ borderRadius: 'var(--radius)' }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Filter className="absolute right-2.5 top-2.5 size-4 pointer-events-none text-muted-foreground" />
            </div>
            
            {/* Manufacturer Filter */}
            <div className="relative inline-block">
              <select
                className="pl-4 pr-8 py-2 bg-white dark:bg-gray-800 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                value={manufacturerFilter}
                onChange={(e) => handleManufacturerFilter(e.target.value)}
                style={{ borderRadius: 'var(--radius)' }}
              >
                {manufacturers.map((manufacturer) => (
                  <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                ))}
              </select>
              <Filter className="absolute right-2.5 top-2.5 size-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-white dark:bg-gray-800 border px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
            style={{ borderRadius: 'var(--radius)' }}>
            <Upload className="mr-2 size-4" />
            Import
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-white dark:bg-gray-800 border px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
            style={{ borderRadius: 'var(--radius)' }}>
            <Download className="mr-2 size-4" />
            Export
          </button>
          <Link href="/importer/medicines/add">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              style={{ borderRadius: 'var(--radius)' }}>
              <Plus className="mr-2 size-4" />
              Add Medicine
            </button>
          </Link>
        </div>
      </div>
      
      {/* Medicines Table */}
      <div className="rounded-lg border bg-white dark:bg-gray-800 shadow-sm overflow-hidden"
        style={{ borderRadius: 'var(--radius)' }}>
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th 
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Name
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-1">
                    Category
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('manufacturer')}
                >
                  <div className="flex items-center gap-1">
                    Manufacturer
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('availableStock')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Available
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('unit')}
                >
                  <div className="flex items-center gap-1">
                    Unit
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Price
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
                  className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown className="size-4" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Stock Level
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentItems.map((medicine) => (
                <tr key={medicine.id} className="border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/20">
                  <td className="px-4 py-3 align-middle font-medium">
                    <Link href={`/importer/medicines/${medicine.id}`} className="hover:text-primary">
                      {medicine.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 align-middle text-muted-foreground">
                    {medicine.category}
                  </td>
                  <td className="px-4 py-3 align-middle text-muted-foreground">
                    {medicine.manufacturer}
                  </td>
                  <td className="px-4 py-3 align-middle text-right">
                    {medicine.availableStock} {medicine.availableStock === 0 && <span className="text-red-500">•</span>}
                  </td>
                  <td className="px-4 py-3 align-middle text-right text-muted-foreground">
                    {medicine.totalStock}
                  </td>
                  <td className="px-4 py-3 align-middle text-muted-foreground">
                    {medicine.unit}
                  </td>
                  <td className="px-4 py-3 align-middle text-right font-medium">
                    ${medicine.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 align-middle text-muted-foreground">
                    {new Date(medicine.expiryDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(medicine.status)} text-white`}>
                      {getStatusIcon(medicine.status)}
                      <span>{medicine.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          medicine.availableStock === 0 ? 'bg-red-500' :
                          medicine.availableStock < medicine.reorderLevel ? 'bg-amber-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${calculateStockPercentage(medicine.availableStock, medicine.totalStock, medicine.reorderLevel)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* Show message when no results found */}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-6 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Pill className="size-6" />
                      <p>No medicines found matching your filters.</p>
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
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} medicines
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="rounded-lg border bg-white dark:bg-gray-800 shadow-sm overflow-hidden p-4"
        style={{ borderRadius: 'var(--radius)' }}>
        <h3 className="font-medium mb-3">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-500 text-white`}>
              <Check className="size-4" />
              <span>In Stock</span>
            </div>
            <span className="text-xs text-muted-foreground">Sufficient quantity available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-500 text-white`}>
              <AlertTriangle className="size-4" />
              <span>Low Stock</span>
            </div>
            <span className="text-xs text-muted-foreground">Reorder soon</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-500 text-white`}>
              <ServerCrash className="size-4" />
              <span>Out of Stock</span>
            </div>
            <span className="text-xs text-muted-foreground">Not available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-600 text-white`}>
              <Calendar className="size-4" />
              <span>Nearly Expired</span>
            </div>
            <span className="text-xs text-muted-foreground">Use within 30 days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-600 text-white`}>
              <AlertCircle className="size-4" />
              <span>Expired</span>
            </div>
            <span className="text-xs text-muted-foreground">Dispose properly</span>
          </div>
        </div>
      </div>
      
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
        .hover\\:text-primary:hover {
          color: hsl(var(--primary));
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