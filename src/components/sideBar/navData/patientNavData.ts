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
  // {
  //   type: 'main',
  //   name: 'Donations',
  //   url: '/patient/donation',
  //   icon: HandCoins,
  // },
  {
    type: 'sub',
    title: 'Donations',
    url: '',
    icon: HandCoins,
    isActive: true,
    items: [
      {
        name: 'Donation Requests',
        url: '/patient/donation/requests',
      },
      {
        name: 'Ongoing Donations',
        url: '/patient/donation/ongoing',
      },
      {
        name: 'Select Drug Importer',
        url: '/patient/donation/select-importer',
      },
    ],
  },
];
