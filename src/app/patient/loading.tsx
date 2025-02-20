import React from 'react';

export default function loading() {
  return (
    <>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <div className='aspect-video rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50' />
        <div className='aspect-video rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50' />
        <div className='aspect-video rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50' />
      </div>
      <div className='min-h-[100vh] flex-1 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 md:min-h-min' />
    </>
  );
}
