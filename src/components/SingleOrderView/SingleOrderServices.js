import React from 'react';
import { Table } from 'antd';
import AddOrderServices from './AddOrderServices';
import { useParams } from 'react-router-dom';
import columns from '../Table/SingleOrderServicesColumns';

const SingleOrderServices = ({ services = [] }) => {
  const { orderid: id } = useParams();

  return (
    <div>
      <AddOrderServices orderid={id} />
      <Table columns={columns} dataSource={services} pagination={false} size="small" rowKey="id" />
    </div>
  );
};

export default SingleOrderServices;
