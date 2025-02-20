import React from 'react';
import { Button } from '../ui/button';
import { BellIcon, Dot } from 'lucide-react';

export default function NotificationCenter() {
  return (
    <div className='relative mr-2 w-fit'>
      <Dot className='absolute -right-4 -top-4 h-12 w-12 text-red-600' />
      <Button variant='outline' size='icon'>
        <BellIcon />
      </Button>
    </div>
  );
}
