import { FileChartLine, Stethoscope, LayoutDashboard } from 'lucide-react';
import { NavigationArray } from '../types/navigationItemTypes';

//  This contains sidebar navigation items.
// use lowercase when setting url paths
// use Lucide react JSX icons as icons
//  use - in url path when there is more than one word in the path segment
//  name : Financial Reports     ----->  path: /doctor/financial-reports

export const data: NavigationArray = [
  {
    type: 'main',
    name: 'Home',
    url: '/admin/',
    icon: FileChartLine,
  },
  {
    type: 'main',
    name: 'Create Accounts',
    url: '/admin/create-accounts',
    icon: LayoutDashboard,
  },
  {
    type: 'sub',
    title: 'Request Approval',
    url: '/admin/request-approval',
    icon: Stethoscope,
    isActive: true,
    items: [
      {
        name: 'Patient Requests',
        url: '/admin/request-approval/patient-requests',
      },
      {
        name: 'Drug Importer Requests',
        url: '/admin/request-approval/drug-importer-requests',
      },
    ],
  },
];
