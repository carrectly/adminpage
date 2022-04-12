import React from 'react';
import m from 'moment';
import {
  DateCell,
  OrderDetailsCell,
  CustomerNameCell,
  StatusCell,
  LocationCell,
  ServicesCell,
  ConciergeCell,
  CarMakeCell,
} from './Cells.js';
import getColumnSearchProps from './ColumnFilter.js';

const defaultStringCompareOptions = { sensitivity: 'base' };

const InvoiceColumns = (searchInput, searchText, searchedColumn, handleSearch, handleReset) => [
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
    ...getColumnSearchProps(
      'status',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
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
    title: 'Services',
    dataIndex: 'services',
    align: 'center',
    width: 50,
    render: (value, row) => <ServicesCell value={value} row={row} />,
  },
  {
    title: 'Car',
    dataIndex: 'carMake',
    key: 'carMake',
    render: (value, row) => <CarMakeCell value={value} row={row} />,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (value, row) => <CustomerNameCell value={value} row={row} />,
  },
  {
    title: 'pickupLocation',
    dataIndex: 'pickupLocation',
    key: 'pickupLocation',
    render: (value) => <LocationCell value={value} />,
  },
  {
    title: 'pickupDate',
    dataIndex: 'pickupDate',
    key: 'pickupDate',
    defaultSortOrder: 'descend',
    sorter: (a, b) => m(a.pickupDate).diff(m(b.pickupDate)),
    sortDirections: ['descend', 'ascend'],
    render: (value) => <DateCell value={value} />,
  },
  {
    title: 'dropoffDate',
    dataIndex: 'dropoffDate',
    key: 'dropoffDate',
    sorter: (a, b) => m(a.pickupDate).diff(m(b.pickupDate)),
    sortDirections: ['descend', 'ascend'],
    render: (value) => <DateCell value={value} />,
  },
];

export default InvoiceColumns;
