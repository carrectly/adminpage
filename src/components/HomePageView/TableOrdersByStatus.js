import React from 'react';
import { Table } from 'antd';
import columns from '../Table/HomeTableColumns';

const TableOrdersByStatus = ({ ordersArray = [] }) => {
  return (
    <Table
      scroll={{ x: 'max-content' }}
      columns={columns}
      dataSource={ordersArray}
      pagination={false}
      size="small"
      rowKey="hash"
    />
  );
};

export default TableOrdersByStatus;
