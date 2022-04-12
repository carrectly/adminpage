import React, { useState, useRef } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import ArchivedOrdersColumns from '../Table/ArchivedOrdersColumns';

const AntDOrdersTable = ({ loading }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  let searchInput = useRef(null);

  const ordersArr = useSelector((state) => state.archivedOrders);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = ArchivedOrdersColumns(
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
      dataSource={ordersArr}
      pagination={{ position: ['bottomCenter'] }}
      loading={loading}
      rowKey="hash"
    />
  );
};

export default AntDOrdersTable;
