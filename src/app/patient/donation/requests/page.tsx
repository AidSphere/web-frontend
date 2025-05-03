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
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import { PencilLine, Plus, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
  DonationRequest,
  fetchDonationRequestsByPatient,
  deleteDonationRequest,
} from '@/service/api/patient/donationRequestService';
import { useRouter } from 'next/navigation';

export default function App() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [data, setData] = React.useState<DonationRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedForDelete, setSelectedForDelete] = React.useState<
    number | null
  >(null);
  const rowsPerPage = 4;
  const router = useRouter();

  // Fetch data from backend
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const patientId = 4; // Replace with actual patient ID
        const response = await fetchDonationRequestsByPatient(patientId);
        setData(response?.data);
      } catch (err) {
        console.error('Error fetching donation requests:', err);
        setError('Failed to fetch donation requests. Please try again later.');
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

  const handleView = (requestId: number) => {
    console.log('View request:', requestId);
    router.push(`/patient/donation/edit-request/${requestId}`);
  };

  const handleDeleteClick = (requestId: number) => {
    console.log('Delete request:', requestId);
    setSelectedForDelete(requestId);
    onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (selectedForDelete) {
      try {
        setIsLoading(true);
        await deleteDonationRequest(selectedForDelete);
        setData(data.filter((item) => item.requestId !== selectedForDelete));
        onClose();
      } catch (err) {
        console.error('Error deleting donation request:', err);
        setError('Failed to delete donation request. Please try again later.');
      } finally {
        setIsLoading(false);
        setSelectedForDelete(null);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      case 'completed':
        return 'primary';
      default:
        return 'default';
    }
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
        <h1 className='text-2xl font-bold'>Donation Requests</h1>
        <Button color='primary' startContent={<Plus />}>
          <Link href='/patient/donation/create-request'>Add New Request</Link>
        </Button>
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
          <p className='text-gray-500'>No donation requests found.</p>
          <Link href='/patient/donation/create-request'>
            <Button color='primary' className='mt-4'>
              Create Your First Request
            </Button>
          </Link>
        </div>
      ) : (
        <Table
          aria-label='Donation requests table'
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
            <TableColumn>STATUS</TableColumn>
            <TableColumn>CREATED AT</TableColumn>
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
                  <Chip
                    color={getStatusColor(row.status)}
                    variant='flat'
                    size='sm'
                  >
                    {row.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className='flex justify-end gap-2'>
                    {row.status.toLowerCase() === 'pending' && (
                      <Button
                        isIconOnly
                        color='secondary'
                        variant='light'
                        size='sm'
                        onPress={() => handleView(row.requestId)}
                      >
                        <PencilLine />
                      </Button>
                    )}
                    <Button
                      isIconOnly
                      color='danger'
                      variant='light'
                      size='sm'
                      onPress={() => handleDeleteClick(row.requestId)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this donation request? This
                  action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color='danger'
                  onPress={handleDeleteConfirm}
                  isLoading={isLoading}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
