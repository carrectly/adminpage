import React from 'react';
import m from 'moment';
import getColumnSearchProps from './ColumnFilter.js';
import {
  DateCell,
  OrderDetailsCell,
  DeleteOrderCell,
  CustomerNameCell,
  LocationCell,
} from './Cells.js';

const defaultStringCompareOptions = { sensitivity: 'base' };

const ArchivedOrdersColumns = (
  searchInput,
  searchText,
  searchedColumn,
  handleSearch,
  handleReset,
) => [
  {
    title: 'Order Link',
    dataIndex: 'hash',
    key: 'hash',
    render: (value) => <OrderDetailsCell value={value} />,
  },
  {
    title: 'status',
    dataIndex: 'status',
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
  },
  {
    title: 'carMake',
    dataIndex: 'carMake',
    key: 'carMake',
    ...getColumnSearchProps(
      'carMake',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
  },
  {
    title: 'carModel',
    dataIndex: 'carModel',
    key: 'carModel',
    ...getColumnSearchProps(
      'carModel',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
  },
  {
    title: 'Customer Phone #',
    dataIndex: 'customerPhoneNumber',
    key: 'customerPhoneNumber',
    ...getColumnSearchProps(
      'customerPhoneNumber',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
  },
  {
    title: 'Customer Name',
    dataIndex: 'customer',
    key: 'customer',
    sorter: (a, b) => a.customer.localeCompare(b.customer, defaultStringCompareOptions),
    render: (value, row) => <CustomerNameCell value={value} row={row} />,
  },
  {
    title: 'pickupLocation',
    dataIndex: 'pickupLocation',
    key: 'pickupLocation',
    ...getColumnSearchProps(
      'pickupLocation',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
    render: (value) => <LocationCell value={value} />,
  },
  {
    title: 'dropoffLocation',
    dataIndex: 'dropoffLocation',
    key: 'dropoffLocation',
    ...getColumnSearchProps(
      'dropoffLocation',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
    render: (value) => <LocationCell value={value} />,
  },
  {
    title: 'pickupDate',
    dataIndex: 'pickupDate',
    key: 'pickupDate',
    sorter: (a, b) => m(a.pickupDate).diff(m(b.pickupDate)),
    render: (value) => <DateCell value={value} />,
  },
  {
    title: 'updatedAt',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    sorter: (a, b) => m(a.updatedAt).diff(m(b.updatedAt)),
    render: (value) => <DateCell value={value} />,
  },
  {
    title: 'Delete Order',
    dataIndex: 'hash',
    key: 'hash',
    render: (value) => <DeleteOrderCell value={value} />,
  },
];

export default ArchivedOrdersColumns;
