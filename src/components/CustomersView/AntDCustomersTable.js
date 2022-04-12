import React, { useState, useRef } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import CustomersColumns from '../Table/CustomersColumns';

const AntDCustomersTable = ({ loading }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  let searchInput = useRef(null);

  const customersArray = useSelector((state) => state.contacts);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = CustomersColumns(
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
      dataSource={customersArray}
      pagination={{ position: ['bottomCenter'] }}
      loading={loading}
      rowKey="phoneNumber"
    />
  );
};

export default AntDCustomersTable;
