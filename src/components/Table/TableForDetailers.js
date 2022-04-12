import React from 'react';
import m from 'moment';
import {
  DateCell,
  OrderDetailsCell,
  CustomerNameCell,
  StatusCell,
  ConciergeCell,
  CarMakeCell,
  ServicesCell,
} from './Cells.js';

const defaultStringCompareOptions = { sensitivity: 'base' };

const columns = [
  {
    title: 'Order Link',
    dataIndex: 'hash',
    key: 'hash',
    render: (value, row) => <OrderDetailsCell value={value} row={row} />,
  },
  {
    title: 'status',
    dataIndex: 'status',
    align: 'center',
    key: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status, defaultStringCompareOptions),
    sortDirections: ['descend', 'ascend'],
    render: (value) => <StatusCell value={value} />,
  },
  {
    title: 'Pick up driver',
    dataIndex: 'pickUpDriver',
    align: 'center',
    key: 'pickUpDriver',
    render: (value) => <ConciergeCell value={value} />,
  },
  {
    title: 'Return driver',
    dataIndex: 'returnDriver',
    align: 'center',
    key: 'returnDriver',
    render: (value) => <ConciergeCell value={value} />,
  },
  {
    title: 'Car',
    dataIndex: 'carMake',
    key: 'carMake',
    render: (value, row) => <CarMakeCell value={value} row={row} />,
  },
  {
    title: 'Services',
    dataIndex: 'services',
    align: 'center',
    width: 50,
    render: (value, row) => <ServicesCell value={value} row={row} />,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (value, row) => <CustomerNameCell value={value} row={row} />,
  },
  {
    title: 'pickupDate',
    dataIndex: 'pickupDate',
    key: 'pickupDate',
    sorter: (a, b) => m(a.pickupDate).diff(m(b.pickupDate)),
    sortDirections: ['descend', 'ascend'],
    render: (value) => <DateCell value={value} />,
  },
  {
    title: 'dropoffDate',
    dataIndex: 'dropoffDate',
    key: 'dropoffDate',
    sorter: (a, b) => m(a.dropoffDate).diff(m(b.dropoffDate)),
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'ascend',
    render: (value) => <DateCell value={value} />,
  },
];

export default columns;
