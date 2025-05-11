'use client';
import React, { SVGProps, useEffect, useState } from 'react';
import {
  Table,
  addToast,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Tooltip,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  SortDescriptor,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea
} from '@heroui/react';
import { Ban, Check, Eye } from 'lucide-react';
import AdminService from '@/service/AdminService';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
}

export const PlusIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height={size || height}
      role='presentation'
      viewBox='0 0 24 24'
      width={size || width}
      {...props}
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      >
        <path d='M6 12h12' />
        <path d='M12 18V6' />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height={size || height}
      role='presentation'
      viewBox='0 0 24 24'
      width={size || width}
      {...props}
    >
      <path
        d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
        fill='currentColor'
      />
    </svg>
  );
};

export const SearchIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height='1em'
      role='presentation'
      viewBox='0 0 24 24'
      width='1em'
      {...props}
    >
      <path
        d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M22 22L20 20'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
};

export const ChevronDownIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height='1em'
      role='presentation'
      viewBox='0 0 24 24'
      width='1em'
      {...otherProps}
    >
      <path
        d='m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

interface PrescribedMedicine {
  medicine: string;
  amount: number;
}

interface DonationRequest {
  requestId: number;
  patientId: number;
  title: string;
  description: string;
  prescriptionUrl: string;
  status: string;
  createdAt: string;
  expectedDate: string;
  hospitalName: string;
  images: string[];
  documents: string[];
  prescribedMedicines: PrescribedMedicine[];
}

export const columns = [
  { name: 'TITLE', uid: 'title', sortable: true },
  { name: 'HOSPITAL', uid: 'hospitalName', sortable: true },
  { name: 'CREATED', uid: 'createdAt', sortable: true },
  { name: 'NEEDED BY', uid: 'expectedDate', sortable: true },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = [
  'title',
  'hospitalName',
  'createdAt',
  'expectedDate',
  'status',
  'actions',
];

export default function PatientRequestTable() {
  const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'createdAt',
    direction: 'descending',
  });
  const [page, setPage] = React.useState(1);
  const [selectedRequest, setSelectedRequest] = useState<DonationRequest | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState<string>('');
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  useEffect(() => {
    fetchPendingDonationRequests();
  }, []);

  const fetchPendingDonationRequests = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getPendingDonationRequests();
      
      if (response.status === 200 && response.data) {
        setDonationRequests(response.data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch pending donation requests',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching pending donation requests:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch pending donation requests',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;
    
    try {
      const response = await AdminService.approveDonationRequest(
        selectedRequest.requestId, 
        message || 'Your donation request has been approved.'
      );
      
      if (response.status === 200) {
        addToast({
          title: 'Success',
          description: 'Donation request approved successfully',
          color: 'success',
          variant: 'bordered',
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
        // Refresh the list after approval
        fetchPendingDonationRequests();
        onClose();
      } else {
        addToast({
          title: 'Error',
          description: response.message || 'Failed to approve donation request',
          color: 'danger',
          variant: 'bordered',
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error) {
      console.error('Error approving donation request:', error);
      addToast({
        title: 'Error',
        description: 'Failed to approve donation request',
        color: 'danger',
        variant: 'bordered',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;
    
    try {
      const response = await AdminService.rejectDonationRequest(
        selectedRequest.requestId,
        message || 'Your donation request has been rejected.'
      );
      
      if (response.status === 200) {
        addToast({
          title: 'Success',
          description: 'Donation request rejected successfully',
          color: 'success',
          variant: 'bordered',
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
        // Refresh the list after rejection
        fetchPendingDonationRequests();
        onClose();
      } else {
        addToast({
          title: 'Error',
          description: response.message || 'Failed to reject donation request',
          color: 'danger',
          variant: 'bordered',
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error) {
      console.error('Error rejecting donation request:', error);
      addToast({
        title: 'Error',
        description: 'Failed to reject donation request',
        color: 'danger',
        variant: 'bordered',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
  };
  
  const openActionModal = (request: DonationRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(action);
    setMessage(action === 'approve' 
      ? 'Your donation request has been approved.' 
      : 'Your donation request has been rejected.');
    onOpen();
  };

  const openViewModal = (request: DonationRequest) => {
    setSelectedRequest(request);
    setActionType(null);
    onOpen();
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredRequests = [...donationRequests];

    if (hasSearchFilter) {
      filteredRequests = filteredRequests.filter((request) =>
        request.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        request.hospitalName.toLowerCase().includes(filterValue.toLowerCase()) ||
        request.description.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredRequests;
  }, [donationRequests, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: DonationRequest, b: DonationRequest) => {
      const first = a[sortDescriptor.column as keyof DonationRequest];
      const second = b[sortDescriptor.column as keyof DonationRequest];
      
      // Handle date strings
      if (sortDescriptor.column === 'createdAt' || sortDescriptor.column === 'expectedDate') {
        const dateA = new Date(first as string).getTime();
        const dateB = new Date(second as string).getTime();
        const cmp = dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
        return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      }
      
      // Handle string comparison
      if (typeof first === 'string' && typeof second === 'string') {
        const cmp = first.localeCompare(second);
        return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      }
      
      // Handle number comparison
      if (typeof first === 'number' && typeof second === 'number') {
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      }
      
      return 0;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((request: DonationRequest, columnKey: React.Key) => {
    const cellValue = request[columnKey as keyof DonationRequest];

    switch (columnKey) {
      case 'title':
        return (
          <div className="flex flex-col">
            <span className="text-bold">{cellValue as string}</span>
            <span className="text-small text-default-400">ID: {request.requestId}</span>
          </div>
        );
      case 'createdAt':
        return <span>{format(new Date(request.createdAt), 'MMM dd, yyyy')}</span>;
      case 'expectedDate':
        return <span>{format(new Date(request.expectedDate), 'MMM dd, yyyy')}</span>;
      case 'status':
        return (
          <Chip
            color={request.status === 'PENDING' ? 'warning' : (request.status === 'ADMIN_APPROVED' ? 'success' : 'danger')}
            size="sm"
            variant="flat"
          >
            {request.status}
          </Chip>
        );
      case 'actions':
        return (
          <div className='flex items-center justify-center gap-2'>
            <Tooltip content='View Details'>
              <span 
                className='cursor-pointer text-lg text-default-400 active:opacity-50'
                onClick={() => openViewModal(request)}
              >
                <Eye className='text-blue-800' />
              </span>
            </Tooltip>
            <Tooltip content='Reject'>
              <span 
                className='cursor-pointer text-lg text-default-400 active:opacity-50'
                onClick={() => openActionModal(request, 'reject')}
              >
                <Ban className='text-red-800' />
              </span>
            </Tooltip>
            <Tooltip content='Approve'>
              <span 
                className='cursor-pointer text-lg text-danger active:opacity-50'
                onClick={() => openActionModal(request, 'approve')}
              >
                <Check className='text-green-800' />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const renderActionModal = () => {
    if (!selectedRequest) return null;

    if (actionType) {
      // Render approve/reject modal
      return (
        <ModalContent>
          <ModalHeader>
            {actionType === 'approve' ? 'Approve Donation Request' : 'Reject Donation Request'}
          </ModalHeader>
          <ModalBody>
            <div className="mb-4">
              <h3 className="font-semibold">{selectedRequest.title}</h3>
              <p className="text-sm text-gray-600">{selectedRequest.description}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Message to Patient:</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message for the patient..."
                className="w-full"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button 
              color={actionType === 'approve' ? 'success' : 'danger'}
              onPress={actionType === 'approve' ? handleApprove : handleReject}
            >
              {actionType === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </ModalFooter>
        </ModalContent>
      );
    } else {
      // Render view details modal
      return (
        <ModalContent>
          <ModalHeader>Donation Request Details</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{selectedRequest.title}</h3>
                <p className="text-sm text-gray-600">{selectedRequest.hospitalName}</p>
              </div>
              
              <div>
                <h4 className="font-medium">Description</h4>
                <p>{selectedRequest.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Created</h4>
                  <p>{format(new Date(selectedRequest.createdAt), 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <h4 className="font-medium">Needed By</h4>
                  <p>{format(new Date(selectedRequest.expectedDate), 'MMM dd, yyyy')}</p>
                </div>
              </div>
              
              {selectedRequest.prescribedMedicines.length > 0 && (
                <div>
                  <h4 className="font-medium">Prescribed Medicines</h4>
                  <ul className="list-disc pl-5">
                    {selectedRequest.prescribedMedicines.map((med, index) => (
                      <li key={index}>{med.medicine} - {med.amount} units</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedRequest.documents.length > 0 && (
                <div>
                  <h4 className="font-medium">Documents</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.documents.map((doc, index) => (
                      <a 
                        key={index} 
                        href={doc} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Document {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedRequest.prescriptionUrl && (
                <div>
                  <h4 className="font-medium">Prescription</h4>
                  <a 
                    href={selectedRequest.prescriptionUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Prescription
                  </a>
                </div>
              )}
              
              {selectedRequest.images.length > 0 && (
                <div>
                  <h4 className="font-medium">Images</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRequest.images.map((img, index) => (
                      <a 
                        key={index} 
                        href={img} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <img 
                          src={img} 
                          alt={`Image ${index + 1}`} 
                          className="rounded-md object-cover h-24 w-full"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button 
              color="danger"
              onPress={() => {
                setActionType('reject');
                setMessage('Your donation request has been rejected.');
              }}
            >
              Reject
            </Button>
            <Button 
              color="success"
              onPress={() => {
                setActionType('approve');
                setMessage('Your donation request has been approved.');
              }}
            >
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      );
    }
  };

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-end justify-between gap-3'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Search by title or hospital...'
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={<ChevronDownIcon className='text-small' />}
                  variant='flat'
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode='multiple'
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className='capitalize'>
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-small text-default-400'>
            Total {donationRequests.length} requests
          </span>
          <label className='flex items-center text-small text-default-400'>
            Rows per page:
            <select
              className='bg-transparent text-small text-default-400 outline-none'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    donationRequests.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className='flex items-center justify-between px-2 py-2'>
        <span className='w-[30%] text-small text-default-400'>
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className='hidden w-[30%] justify-end gap-2 sm:flex'>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages]);

  if (loading) {
    return <div>Loading pending donation requests...</div>;
  }

  return (
    <>
      <Table
        isHeaderSticky
        aria-label='Pending donation requests table'
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[600px]',
        }}
        selectedKeys={selectedKeys}
        selectionMode='none'
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
          emptyContent={'No donation requests found'} 
          items={sortedItems}
          isLoading={loading}
          loadingContent={<div>Loading...</div>}
        >
          {(item) => (
            <TableRow key={item.requestId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        {renderActionModal()}
      </Modal>
    </>
  );
}
