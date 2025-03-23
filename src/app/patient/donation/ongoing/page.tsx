'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
} from '@heroui/react';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface DonationRequest {
  donationId: string;
  donationName: string;
  expectedDate: string;
  donationAmount: string;
  importerName: string;
}

const mockDonationTableData: DonationRequest[] = [
  {
    donationId: 'd1a2b3c4',
    donationName: 'Urgent Chemotherapy',
    expectedDate: '2025-04-10',
    donationAmount: 'Rs.5000',
    importerName: 'MediSupply Inc.',
  },
  {
    donationId: 'e5f6g7h8',
    donationName: 'Cancer Surgery',
    expectedDate: '2025-05-01',
    donationAmount: 'Rs.12000',
    importerName: 'HealthCare Suppliers',
  },
  {
    donationId: 'i9j0k1l2',
    donationName: 'Post-Treatment Support',
    expectedDate: '2025-04-20',
    donationAmount: 'Rs.3000',
    importerName: 'Wellness Pharm',
  },
  {
    donationId: 'm3n4o5p6',
    donationName: 'Radiation Therapy',
    expectedDate: '2025-06-05',
    donationAmount: 'Rs.7000',
    importerName: 'OncoMed Distributors',
  },
  {
    donationId: 'q7r8s9t0',
    donationName: 'Palliative Care Support',
    expectedDate: '2025-04-15',
    donationAmount: 'Rs.2500',
    importerName: 'CareFirst Medics',
  },
];

export default function App() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [data, setData] = React.useState(mockDonationTableData);
  const rowsPerPage = 4;

  const filteredData = React.useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = filteredData.slice(start, end);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Ongoing Donations</h1>
      </div>

      <div className='mb-6'>
        <Input
          placeholder='Search requests...'
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Search className='text-default-400' />}
          isClearable
        />
      </div>

      <Table
        aria-label='Donation requests table'
        bottomContent={
          <div className='flex w-full justify-center gap-4'>
            <Button
              variant='solid'
              color='default'
              isDisabled={currentPage === 1}
              onPress={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              variant='solid'
              color='default'
              isDisabled={currentPage === pages}
              onPress={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>DONATION ID</TableColumn>
          <TableColumn>DONATION NAME</TableColumn>
          <TableColumn>EXPECTED DATE</TableColumn>
          <TableColumn>DONATION AMOUNT</TableColumn>
          <TableColumn>IMPORTER NAME</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row) => (
            <TableRow key={row.donationId}>
              <TableCell>{row.donationId}</TableCell>
              <TableCell>{row.donationName}</TableCell>
              <TableCell>{row.expectedDate}</TableCell>
              <TableCell>{row.donationAmount}</TableCell>
              <TableCell>{row.importerName}</TableCell>
              <TableCell>
                <Button
                  color='primary'
                  variant='solid'
                  size='sm'
                  as={Link}
                  href={`/patient/donation/ongoing/${row.donationId}`}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
