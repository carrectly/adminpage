import React, { useState, useRef } from 'react';
import { Table } from 'antd';
import InvoiceColumns from '../Table/InvoicesTableColumns';

const InvoicesTable = ({ loading, ordersArray = [] }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  let searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = InvoiceColumns(
    searchInput,
    searchText,
    searchedColumn,
    handleSearch,
    handleReset,
  );

  return (
    <Table
      columns={columns}
      scroll={{ x: 'max-content' }}
      size="small"
      dataSource={ordersArray}
      pagination={{ position: ['bottomCenter'] }}
      loading={loading}
      rowKey="hash"
    />
  );
};

export default InvoicesTable;
