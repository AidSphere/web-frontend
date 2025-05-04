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
} from '@heroui/react';
import { Search } from 'lucide-react';
import {
  DonationRequest,
  fetchQuotationIssuedRequests,
} from '@/service/api/patient/donationRequestService';
import { useRouter } from 'next/navigation';

export default function SelectImporterPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [data, setData] = React.useState<DonationRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const rowsPerPage = 4;
  const router = useRouter();

  // Fetch data from backend
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchQuotationIssuedRequests();
        setData(response?.data || []);
      } catch (err) {
        console.error('Error fetching quotation issued requests:', err);
        setError('Failed to fetch requests. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = React.useMemo(() => {
    return (Array.isArray(data) ? data : []).filter((row) =>
      Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = filteredData.slice(start, end);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleViewQuotations = (requestId: number) => {
    router.push(`/patient/donation/select-importer/${requestId}`);
  };

  if (isLoading && data.length === 0) {
    return (
      <div className='flex h-64 items-center justify-center'>Loading...</div>
    );
  }

  if (error) {
    return <div className='p-4 text-red-500'>{error}</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Select Importer</h1>
      </div>

      <div className='mb-6'>
        <Input
          placeholder='Search requests...'
          value={searchQuery}
          onValueChange={handleSearch}
          startContent={<Search className='text-default-400' />}
          isClearable
        />
      </div>

      {data.length === 0 && !isLoading ? (
        <div className='rounded-lg bg-gray-50 p-8 text-center'>
          <p className='text-gray-500'>No quotation issued requests found.</p>
        </div>
      ) : (
        <Table
          aria-label='Quotation issued requests table'
          bottomContent={
            pages > 1 ? (
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
            ) : null
          }
        >
          <TableHeader>
            <TableColumn>REQUEST ID</TableColumn>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>EXPECTED DATE</TableColumn>
            <TableColumn>CREATED AT</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.requestId}>
                <TableCell>{row.requestId}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  {new Date(row.expectedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {row.defaultPrice === null || row.defaultPrice === undefined
                    ? 'Not Set'
                    : `Rs. ${row.defaultPrice}`}
                </TableCell>
                <TableCell>
                  <div className='flex justify-start gap-2'>
                    <Button
                      color='primary'
                      size='sm'
                      onPress={() => handleViewQuotations(row.requestId)}
                    >
                      Quotations
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
