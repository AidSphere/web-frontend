'use client';

import { 
  LayoutDashboard, 
  FileText, 
  ClipboardList, 
  Pill,
} from 'lucide-react';

export type NavItemType = {
  type: 'single';
  icon: React.ComponentType;
  name: string;
  url: string;
  isActive?: boolean;
};

export type NavItemWithSubType = {
  type: 'sub';
  icon: React.ComponentType;
  title: string;
  isActive?: boolean;
  items: {
    name: string;
    url: string;
  }[];
};

export const data: (NavItemType | NavItemWithSubType)[] = [
  {
    type: 'single',
    icon: LayoutDashboard,
    name: 'Dashboard',
    url: '/importer',
    isActive: true
  },
  {
    type: 'single',
    icon: FileText,
    name: 'Bill Requests',
    url: '/importer/bill-requests'
  },
  {
    type: 'single',
    icon: ClipboardList,
    name: 'Quotations',
    url: '/importer/quotations'
  },
  {
    type: 'single',
    icon: Pill,
    name: 'Medicines',
    url: '/importer/medicines'
  }
];

export default data;