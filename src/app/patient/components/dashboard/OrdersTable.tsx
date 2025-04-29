'use client';
import { Button } from '@heroui/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@heroui/react';
import { Spinner, Chip, ChipProps } from '@heroui/react';
import { Order } from '../../_types/dashboardTypes';
import React from 'react';
import {
  OrderStatus,
  OrderStatusColors,
} from '@/app/patient/constants/orderStatus';

interface OrdersTableProps {
  orders: Order[];
}

const orderColumns = [
  { key: 'medication_name', name: 'Medication name' },
  { key: 'medication_dosage', name: 'Medication dosage' },
  { key: 'quantity', name: 'Quantity' },
  { key: 'importer', name: 'Importer' },
  { key: 'price', name: 'Price' },
  { key: 'order_status', name: 'Order status' },
  { key: 'location', name: 'Location' },
];

const statusColorMap: Record<string, ChipProps['color']> = {
  Pending: OrderStatusColors.PENDING,
  Approved: OrderStatusColors.APPROVED,
  Cancelled: OrderStatusColors.CANCELLED,
  Processing: OrderStatusColors.PROCESSING,
  Dispatched: OrderStatusColors.DISPATCHED,
};

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  /**
   * Renders the cells in the OrdersTable component based on the given order and column key.
   * @param {Order} order - The order object.
   * @param {React.Key} columnKey - The key of the column.
   * @returns {React.ReactNode} The rendered cells.
   */
  const renderCell = React.useCallback((order: Order, columnKey: React.Key) => {
    /**
     * Represents the value of a cell in the OrdersTable component.
     * @type {string}
     */
    const cellValue: string = (
      columnKey != 'location' ? order[columnKey as keyof Order] : ''
    ).toString();

    switch (columnKey) {
      case 'medication_name':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-medium capitalize'>{cellValue}</p>
          </div>
        );
      case 'medication_dosage':
        return (
          <div className='flex flex-col'>
            <p className='text-medium'>{cellValue}</p>
          </div>
        );
      case 'quantity':
        return (
          <div className='flex flex-col'>
            <p className='text-medium'>{cellValue}</p>
          </div>
        );
      case 'importer':
        return (
          <div className='flex flex-col'>
            <p className='text-medium'>{cellValue}</p>
          </div>
        );
      case 'price':
        return (
          <div className='flex flex-col'>
            <p className='text-medium'>{cellValue}</p>
          </div>
        );
      case 'order_status':
        return (
          <Chip
            className='capitalize'
            color={statusColorMap[order.order_status]}
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        );
      case 'location':
        return (
          <div className='flex flex-col'>
            {order.order_status === OrderStatus.DISPATCHED ? (
              <p className='text-s rounded-md border-medium border-slate-400 p-1 font-semibold text-slate-500'>
                already dispatched
              </p>
            ) : (
              <Button color='primary' size='sm' className='text-medium'>
                Edit location
              </Button>
            )}
          </div>
        );
    }
  }, []);
  return (
    <div className='flex flex-col'>
      <Table
        isHeaderSticky
        aria-label='Order history table'
        className='text-foreground-700 text-medium'
        // to fetch more data to table (after backend implemented)
        // bottomContent={
        //   hasMore && !isLoading ? (
        //     <div className="flex w-full justify-center">
        //       <Button
        //         isDisabled={list.isLoading}
        //         variant="flat"
        //         onPress={list.loadMore}
        //       >
        //         {list.isLoading && <Spinner color="white" size="sm" />}
        //         Load More
        //       </Button>
        //     </div>
        //   ) : null
        // }
      >
        <TableHeader columns={orderColumns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key == 'location' ? 'center' : 'start'}
              className='text-medium'
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={orders}
          isLoading={false}
          loadingContent={<Spinner label='loading...' />}
          emptyContent={'No orders to display.'}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                return <TableCell>{renderCell(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
