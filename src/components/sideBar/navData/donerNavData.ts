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
    url: '/donor/home',
    icon: FileChartLine,
  },
  {
    type: 'main',
    name: 'Donation History',
    url: '/donor/history',
    icon: LayoutDashboard,
  },
  {
    type: 'main',
    name: 'Profile',
    url: '/donor/profile',
    icon: Stethoscope,
  },
];
