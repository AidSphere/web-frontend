import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <h1 className='mb-4 text-4xl font-bold'>404 - Not Found</h1>
      <p className='mb-6 text-lg text-gray-600'>
        The donation you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href='/patient/donation'
        className='rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600'
      >
        Return to Donations
      </Link>
    </div>
  );
}
