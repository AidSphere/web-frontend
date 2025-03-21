import { Button, Divider } from '@heroui/react';
import DashboardDonationProgress from './components/dashboard/DashboardDonationProgress';
import { donationProgress } from './_types/dashboardTypes';
import { RecentDonationCard } from './components/dashboard/RecentDonationCard';
import { OrdersTable } from './components/dashboard/OrdersTable';
import { sampleOrders, recentDonations } from './sampleData';

const donationsProgress: donationProgress[] = [
  {
    id: '1',
    name: 'Charity A',
    amount: 10000,
    amountCompleted: 10000,
    daysLeft: 1,
  },
  {
    id: '2',
    name: 'Charity B',
    amount: 10000,
    amountCompleted: 500,
    daysLeft: 20,
  },
  {
    id: '3',
    name: 'Charity C',
    amount: 10000,
    amountCompleted: 900,
    daysLeft: 5,
  },
  {
    id: '4',
    name: 'Charity D',
    amount: 40000,
    amountCompleted: 300,
    daysLeft: 15,
  },
  {
    id: '5',
    name: 'Charity E',
    amount: 100000,
    amountCompleted: 600,
    daysLeft: 25,
  },
  {
    id: '6',
    name: 'Charity F',
    amount: 20000,
    amountCompleted: 800,
    daysLeft: 8,
  },
];

const PatientDashboard = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      {/* <header className='my-1 text-center text-3xl font-bold'>Dashboard</header> */}
      <section className='w-[calc(100vw-50px)] md:w-4/5'>
        <article>
          <header className='mb-3 mt-5 text-xl font-bold'>
            Donation Progress
          </header>
          <div className='grid gap-y-4'>
            <DashboardDonationProgress donations={donationsProgress} />
          </div>
          <Divider className='mt-4' />
        </article>
        <article className='mt-2'>
          <header className='mb-3 mt-4 text-center text-xl font-bold sm:text-start'>
            Options
          </header>
          <div className='my-6 mb-10 flex justify-between gap-8 sm:justify-normal'>
            <Button
              size='md'
              color='secondary'
              radius='sm'
              className='bg-primary text-medium'
            >
              Quotation reviews
            </Button>
            <Button
              size='md'
              color='secondary'
              radius='sm'
              className='bg-primary text-medium'
            >
              Bill requests
            </Button>
          </div>
          <Divider />
        </article>
        <article className='mt-2'>
          <header className='mb-3 mt-4 text-center text-xl font-bold sm:justify-normal'>
            Recent Donations
          </header>
          <RecentDonationCard recentDonations={recentDonations} />
          <Divider className='mt-4' />
        </article>
        <article className='mt-2'>
          <header className='mb-4 mt-4 text-center text-xl font-bold sm:text-start'>
            Orders
          </header>
          {/* <div className='flex justify-center sm:justify-normal'>
            <Button color='secondary' className='mb-4 mt-2 text-medium'>
              Contact admin
            </Button>
          </div> */}
          <div className='w-[100%]'>
            <OrdersTable orders={sampleOrders} />
          </div>
        </article>
      </section>
    </div>
  );
};

export default PatientDashboard;
