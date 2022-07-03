import React from 'react';
import getColumnSearchProps from './ColumnFilter.js';
import UpdateService from '../ServicesTableView/UpdateService.js';
import { Tag } from 'antd';
import { Checkbox } from 'antd';

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
    title: 'Show on website',
    dataIndex: 'is_show_user',
    key: 'is_show_user',
    width: 80,
    render: (_, { is_show_user }) => <Checkbox defaultChecked={is_show_user} disabled />,
  },
  {
    title: 'AdminPage Price',
    dataIndex: 'price',
    key: 'price',
    width: 100,
  },
  {
    title: 'Website Price',
    dataIndex: 'price_customer',
    key: 'price_customer',
    width: 200,
    render: (_, { price_customer }) => (
      <>
        {price_customer
          ? price_customer.map((tag, key) => {
              return <Tag key={key}>{tag.toUpperCase()}</Tag>;
            })
          : null}
      </>
    ),
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    width: 150,
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
    width: 100,
    render: (value, row) => <UpdateService value={value} row={row} />,
  },
];

export default ServicesColumns;
