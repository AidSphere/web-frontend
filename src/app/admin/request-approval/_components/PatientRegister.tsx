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

interface PendingPatient {
  patientId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  permanentAddress: string;
  currentAddress: string | null;
  profileImageUrl: string | null;
}

export const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'PHONE NUMBER', uid: 'phoneNumber' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'ADDRESS', uid: 'address' },
  { name: 'ACTIONS', uid: 'actions' },
];

export default function PatientRegisterTable() {
  const [patients, setPatients] = useState<PendingPatient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPendingPatients();
  }, []);

  const fetchPendingPatients = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getPendingPatients();
      
      if (response.status === 200 && response.data) {
        setPatients(response.data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch pending patients',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching pending patients:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch pending patients',
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
          description: 'Patient approved successfully',
        });
        // Refresh the list after approval
        fetchPendingPatients();
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to approve patient',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error approving patient:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve patient',
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
          description: 'Patient rejected successfully',
        });
        // Refresh the list after rejection
        fetchPendingPatients();
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to reject patient',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error rejecting patient:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject patient',
        variant: 'destructive',
      });
    }
  };

  const renderCell = React.useCallback((patient: PendingPatient, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        const fullName = `${patient.firstName} ${patient.lastName}`;
        return (
          <User
            avatarProps={{ 
              radius: 'lg', 
              src: patient.profileImageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${fullName}` 
            }}
            description={patient.email}
            name={fullName}
          >
            {patient.email}
          </User>
        );
      case 'address':
        return patient.permanentAddress;
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Reject'>
              <span 
                className='cursor-pointer text-lg text-default-400 active:opacity-50'
                onClick={() => handleReject(patient.email)}
              >
                <Ban className='text-red-800' />
              </span>
            </Tooltip>
            <Tooltip content='Accept'>
              <span 
                className='cursor-pointer text-lg text-danger active:opacity-50'
                onClick={() => handleApprove(patient.email)}
              >
                <Check className='text-green-800' />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return patient[columnKey as keyof PendingPatient];
    }
  }, []);

  if (loading) {
    return <div>Loading pending patient requests...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Patient Requests</h2>
      {patients.length === 0 ? (
        <p>No pending requests found.</p>
      ) : (
        <Table aria-label="Table of pending patient requests">
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
          <TableBody items={patients} emptyContent="No pending requests found">
            {(item) => (
              <TableRow key={item.patientId}>
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
