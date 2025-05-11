import React, { SVGProps, useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
} from '@heroui/react';
import { Ban, Check } from 'lucide-react';
import AdminService from '@/service/AdminService';
import { toast } from '@/hooks/use-toast';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

interface PendingDrugImporter {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string | null;
  licenseNumber: string;
  enabled: boolean;
}

export const columns = [
  { name: 'COMPANY NAME', uid: 'name' },
  { name: 'PHONE NUMBER', uid: 'phone' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'LICENSE NUMBER', uid: 'licenseNumber' },
  { name: 'ACTIONS', uid: 'actions' },
];

export default function DrugImporterRegisterTable() {
  const [importers, setImporters] = useState<PendingDrugImporter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPendingImporters();
  }, []);

  const fetchPendingImporters = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getPendingDrugImporters();
      
      if (response.status === 200 && response.data) {
        setImporters(response.data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch pending drug importers',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching pending drug importers:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch pending drug importers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (email: string) => {
    try {
      const response = await AdminService.approveDrugImporter(email);
      
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Drug importer approved successfully',
        });
        // Refresh the list after approval
        fetchPendingImporters();
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to approve drug importer',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error approving drug importer:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve drug importer',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (email: string) => {
    try {
      const response = await AdminService.rejectDrugImporter(email);
      
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Drug importer rejected successfully',
        });
        // Refresh the list after rejection
        fetchPendingImporters();
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to reject drug importer',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error rejecting drug importer:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject drug importer',
        variant: 'destructive',
      });
    }
  };

  const renderCell = React.useCallback((importer: PendingDrugImporter, columnKey: React.Key) => {
    const cellValue = importer[columnKey as keyof PendingDrugImporter];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: `https://api.dicebear.com/7.x/initials/svg?seed=${importer.name}` }}
            description={importer.email}
            name={cellValue as string}
          >
            {importer.email}
          </User>
        );
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Reject'>
              <span 
                className='cursor-pointer text-lg text-default-400 active:opacity-50'
                onClick={() => handleReject(importer.email)}
              >
                <Ban className='text-red-800' />
              </span>
            </Tooltip>
            <Tooltip content='Accept'>
              <span 
                className='cursor-pointer text-lg text-danger active:opacity-50'
                onClick={() => handleApprove(importer.email)}
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

  if (loading) {
    return <div>Loading pending drug importer requests...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Drug Importer Requests</h2>
      {importers.length === 0 ? (
        <p>No pending requests found.</p>
      ) : (
        <Table aria-label="Table of pending drug importer requests">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === 'actions' ? 'center' : 'start'}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={importers} emptyContent="No pending requests found">
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
