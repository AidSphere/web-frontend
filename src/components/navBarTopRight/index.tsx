import React from 'react';
import NotificationCenter from '../notificationCenter';
import { ThemeModeToggle } from '../ThemeModeToggle';

export default function NavBarTopRight() {
  return (
    <span className='mr-2 flex w-fit flex-row items-center gap-4 pr-2'>
      <NotificationCenter />
      <ThemeModeToggle />
    </span>
  );
}
