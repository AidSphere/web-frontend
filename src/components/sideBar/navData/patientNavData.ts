import {
  FileChartColumnIncreasing,
  HandCoins,
  LayoutDashboard,
} from 'lucide-react';
import { NavigationArray } from '../types/navigationItemTypes';

//  This contains sidebar navigation items.
// use lowercase when setting url paths
// use Lucide react JSX icon name as icon
//  use - in url path when there is more than one word in the path segment
//  name : Financial Reports     ----->  path: /doctor/financial-reports

export const data: NavigationArray = [
  {
    type: 'main',
    name: 'Overview',
    url: '/patient',
    icon: LayoutDashboard,
  },
  {
    type: 'main',
    name: 'Donations',
    url: '/patient/donation',
    icon: HandCoins,
  },
  {
    type: 'sub',
    title: 'Reports',
    url: '',
    icon: FileChartColumnIncreasing,
    isActive: true,
    items: [
      {
        name: 'Appointment Reports',
        url: '/patient/appointment-reports',
      },
      {
        name: 'Patient Reports',
        url: '/patient/patient-reports',
      },
      {
        name: 'Financial Reports',
        url: '/patient/financial-reports',
      },
    ],
  },
];
