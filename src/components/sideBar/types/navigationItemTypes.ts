import { type LucideIcon } from 'lucide-react';

export interface NavBase {
  icon: LucideIcon;
  url: string;
}

export interface NavMain extends NavBase {
  type: 'main'; // <-- Discriminant
  name: string;
}

export interface NavWithSub extends NavBase {
  type: 'sub'; // <-- Discriminant
  title: string;
  isActive?: boolean;
  items: { name: string; url: string }[];
}

export type NavigationItem = NavMain | NavWithSub;

export type NavigationArray = NavigationItem[];
