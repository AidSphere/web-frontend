import React from 'react';
import NotificationCenter from '../notificationCenter';
import { ThemeModeToggle } from '../ThemeModeToggle';
import { NavUser } from '../sideBar/nav-user';

const user = {
  name: 'ushan',
  email: 'u@example.com',
  avatar: '',
};

export default function NavBarTopRight() {
  return (
    <span className='mr-2 flex w-fit flex-row items-center gap-4 pr-2'>
      <NotificationCenter />
      <ThemeModeToggle />
      <NavUser user={user} />
    </span>
  );
}
