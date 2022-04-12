import React from 'react';
import getColumnSearchProps from './ColumnFilter.js';
import UpdateService from '../ServicesTableView/UpdateService.js';

const ServicesColumns = (searchInput, searchText, searchedColumn, handleSearch, handleReset) => [
  {
    title: 'Service Name',
    dataIndex: 'name',
    key: 'name',
    ...getColumnSearchProps(
      'name',
      searchInput,
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
    ),
  },
  {
    title: 'Standard Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Update Form',
    dataIndex: 'name',
    key: 'id',
    render: (value, row) => <UpdateService value={value} row={row} />,
  },
];

export default ServicesColumns;
