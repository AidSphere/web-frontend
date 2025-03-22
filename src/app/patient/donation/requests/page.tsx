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

interface DonationRequest {
  donationId: string;
  requestName: string;
  expectedDate: string;
  status: string;
  createdAt: string;
}

const mockDonationTableData: DonationRequest[] = [
  {
    donationId: 'd1a2b3c4',
    requestName: 'John Doe - Urgent Chemotherapy',
    expectedDate: '2025-04-10',
    status: 'Pending',
    createdAt: '2025-03-20',
  },
  {
    donationId: 'e5f6g7h8',
    requestName: 'Alice Smith - Cancer Surgery',
    expectedDate: '2025-05-01',
    status: 'Pending',
    createdAt: '2025-03-15',
  },
  {
    donationId: 'i9j0k1l2',
    requestName: 'David Johnson - Post-Treatment Support',
    expectedDate: '2025-04-20',
    status: 'Rejected',
    createdAt: '2025-03-18',
  },
  {
    donationId: 'm3n4o5p6',
    requestName: 'Emily Brown - Radiation Therapy',
    expectedDate: '2025-06-05',
    status: 'Pending',
    createdAt: '2025-03-25',
  },
  {
    donationId: 'q7r8s9t0',
    requestName: 'Michael Wilson - Palliative Care Support',
    expectedDate: '2025-04-15',
    status: 'Completed',
    createdAt: '2025-03-12',
  },
];

export default function App() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [data, setData] = React.useState(mockDonationTableData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedForDelete, setSelectedForDelete] = React.useState<
    string | null
  >(null);
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

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleView = (donationId: string) => {
    console.log('View donation:', donationId);
  };

  const handleDeleteClick = (donationId: string) => {
    console.log('Delete donation:', donationId);
    setSelectedForDelete(donationId);
    onOpen();
  };

  const handleDeleteConfirm = () => {
    console.log('Delete confirmed:', selectedForDelete);
    if (selectedForDelete) {
      setData(data.filter((item) => item.donationId !== selectedForDelete));
      console.log('Deleted:', data);
      setSearchQuery('');
      setSelectedForDelete(null);

      onClose();
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
          <TableColumn>REQUEST NAME</TableColumn>
          <TableColumn>EXPECTED DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row) => (
            <TableRow key={row.donationId}>
              <TableCell>{row.donationId}</TableCell>
              <TableCell>{row.requestName}</TableCell>
              <TableCell>{row.expectedDate}</TableCell>
              <TableCell>
                <Chip
                  color={getStatusColor(row.status)}
                  variant='flat'
                  size='sm'
                >
                  {row.status}
                </Chip>
              </TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>
                <div className='flex justify-end gap-2'>
                  {row.status === 'Pending' && (
                    <Button
                      isIconOnly
                      color='secondary'
                      variant='light'
                      size='sm'
                      onPress={() => handleView(row.donationId)}
                    >
                      <PencilLine />
                    </Button>
                  )}
                  <Button
                    isIconOnly
                    color='danger'
                    variant='light'
                    size='sm'
                    onPress={() => handleDeleteClick(row.donationId)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
                <Button color='danger' onPress={handleDeleteConfirm}>
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
