'use client';
import { Progress } from '@heroui/react';
import { Button } from '@heroui/react';
import { donationProgress } from '../../_types/dashboardTypes';
import { useState } from 'react';

type DashboardDonationProgressProps = { donations: donationProgress[] | [] };

const DashboardDonationProgress = ({
  donations,
}: DashboardDonationProgressProps) => {
  // state used for toggling the number of donations to display
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (!donations || donations.length === 0)
    return <div className='text-center'>No donations available</div>;

  // Determine how much donations to display(4 or all) based on isCollapsed state
  const displayedDonations = isCollapsed ? donations.slice(0, 3) : donations;
  return (
    <div className='flex flex-col sm:w-[100%] lg:w-full'>
      {displayedDonations.map((donation) => {
        return (
          <div className='my-2 lg:border-l-4' key={donation.id}>
            <div className='grid grid-flow-row gap-y-2 lg:ml-10'>
              <Progress
                label={donation.name ? donation.name : 'Donation Progress'}
                size='md'
                radius='sm'
                value={((donation.amountCompleted / donation.amount) * 100) | 0}
                valueLabel={`${donation.daysLeft} days left . Rs.${donation.amountCompleted} / ${donation.amount}`}
                maxValue={100}
                color='primary'
                // classNames={{ indicator: 'bg-secondary-400' }}
                showValueLabel={true}
              />
              <div className='flex justify-end gap-4'>
                {donation.amountCompleted / donation.amount < 1 && (
                  <Button
                    size='sm'
                    variant='solid'
                    radius='sm'
                    className='bg-secondary-100 dark:bg-secondary-600'
                  >
                    <span className='lg:text-base'>Pay my bill</span>
                  </Button>
                )}
                {/* <Button size='sm' variant='solid' radius='sm' color='secondary'>
                  <span className='lg:text-base'>Edit bill</span>
                </Button> */}
                <Button size='sm' variant='solid' radius='sm' color='default'>
                  <span className='lg:text-base'>View</span>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      {donations.length > 4 && (
        <Button
          size='md'
          variant='light'
          radius='sm'
          color='primary'
          onPress={() => setIsCollapsed((prev) => !prev)}
          className='place-self-center text-base font-bold sm:place-self-end'
        >
          {isCollapsed ? 'Show more' : 'Show less'}
        </Button>
      )}
    </div>
  );
};

export default DashboardDonationProgress;
