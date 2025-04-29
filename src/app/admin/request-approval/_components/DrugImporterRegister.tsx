import React, { SVGProps } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
} from '@heroui/react';
import { Ban, Blocks, Check, StopCircle } from 'lucide-react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  { name: 'COMPANY NAME', uid: 'name' },
  { name: 'PHONE NUMBER', uid: 'phoneNumber' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'REQUEST ID', uid: 'requestId' },
  { name: 'PATIENT MAIL', uid: 'patientmail' },
  { name: 'TOTAL PRICE', uid: 'totalPrice' },
  { name: 'ACTIONS', uid: 'actions' },
];

export const users = [
  {
    id: 1,
    name: 'Tony Reichert',
    requestId: 'Management',
    patientmail: 'hello@gmail.com',
    totalPrice: '29',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    phoneNumber: '+1 234 567 890',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Tony Reichert',
    requestId: 'Management',
    patientmail: 'sample@gmail.com',
    totalPrice: '29',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    phoneNumber: '+1 234 567 890',
    email: 'test@gmail.com',
  },
  {
    id: 3,
    name: 'Jane Doe',
    requestId: 'Finance',
    patientmail: 'jane.doe@gmail.com',
    totalPrice: '45',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024e',
    phoneNumber: '+1 987 654 321',
    email: 'jane.doe@example.com',
  },
  {
    id: 4,
    name: 'John Smith',
    requestId: 'Operations',
    patientmail: 'john.smith@gmail.com',
    totalPrice: '50',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024f',
    phoneNumber: '+1 555 123 456',
    email: 'john.smith@example.com',
  },
  {
    id: 5,
    name: 'Emily Johnson',
    requestId: 'HR',
    patientmail: 'emily.johnson@gmail.com',
    totalPrice: '35',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024g',
    phoneNumber: '+1 444 567 890',
    email: 'emily.johnson@example.com',
  },
  {
    id: 6,
    name: 'Michael Brown',
    requestId: 'IT',
    patientmail: 'michael.brown@gmail.com',
    totalPrice: '60',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024h',
    phoneNumber: '+1 333 678 901',
    email: 'michael.brown@example.com',
  },
];

export const DeleteIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height='1em'
      role='presentation'
      viewBox='0 0 20 20'
      width='1em'
      {...props}
    >
      <path
        d='M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      />
      <path
        d='M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      />
      <path
        d='M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      />
      <path
        d='M8.60834 13.75H11.3833'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      />
      <path
        d='M7.91669 10.4167H12.0834'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height='1em'
      role='presentation'
      viewBox='0 0 20 20'
      width='1em'
      {...props}
    >
      <path
        d='M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d='M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d='M2.5 18.3333H17.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

type User = (typeof users)[0];

export default function PatientRegisterTable() {
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case 'role':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize'>{cellValue}</p>
            <p className='text-bold text-sm capitalize text-default-400'>
              {user.team}
            </p>
          </div>
        );
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Reject'>
              <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                <Ban className='text-red-800' />
              </span>
            </Tooltip>
            <Tooltip content='Accept'>
              <span className='cursor-pointer text-lg text-danger active:opacity-50'>
                <Check className='text-green-800' />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label='Example table with custom cells'>
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
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
