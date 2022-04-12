import React from 'react';
import getColumnSearchProps from './ColumnFilter.js';
import { DeleteCustomerCell, CustomerPhoneCell } from './Cells';

const defaultStringCompareOptions = { sensitivity: 'base' };

const CustomersColumns = (searchInput, searchText, searchedColumn, handleSearch, handleReset) => [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: (a, b) => a.firstName.localeCompare(b.firstName, defaultStringCompareOptions),
    ...getColumnSearchProps(
      'firstName',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    sorter: (a, b) => a.lastName.localeCompare(b.lastName, defaultStringCompareOptions),
    ...getColumnSearchProps(
      'lastName',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email, defaultStringCompareOptions),
    ...getColumnSearchProps(
      'email',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
  },
  {
    title: 'Phone #',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    ...getColumnSearchProps(
      'phoneNumber',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
  },
  {
    title: 'Link to customer',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: (value) => <CustomerPhoneCell value={value} />,
  },
  {
    title: 'Delete Customer',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: (value) => <DeleteCustomerCell value={value} />,
  },
];

export default CustomersColumns;
